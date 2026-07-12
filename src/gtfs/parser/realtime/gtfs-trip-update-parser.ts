import type { GtfsSchedule } from "../../data/gtfs-schedule.js";
import type { GtfsTrip } from "../../data/gtfs-trip.js";
import {
  GtfsUpdatedTrip,
  type GtfsUpdatedTripStop,
} from "../../data/gtfs-updated-trip.js";
import type {
  StopTimeUpdateJson,
  TripUpdateJson,
} from "../../retrieval/realtime/realtime-feed-schema.js";
import {
  GtfsTripUpdateTripIdentifier,
  type GtfsTripUpdateTripIdentificationError,
} from "./gtfs-trip-update-trip-identifier.js";
import type { StopGtfsIdMapping } from "../../data/ids/stop-gtfs-id-mapping.js";

const TRIP_UPDATE_SCHEDULE_RELATIONSHIP_SCHEDULED = "SCHEDULED";
const TRIP_UPDATE_SCHEDULE_RELATIONSHIP_CANCELLED = "CANCELED";
const STOP_TIME_UPDATE_ENTRY_SCHEDULE_RELATIONSHIP_SCHEDULED = "SCHEDULED";

export class GtfsTripUpdateParser {
  private readonly _tripIdentifier: GtfsTripUpdateTripIdentifier;

  constructor(
    private readonly _onError: (error: GtfsTripUpdateParsingError) => void,
  ) {
    this._tripIdentifier = new GtfsTripUpdateTripIdentifier(_onError);
  }

  parse(
    tripUpdate: TripUpdateJson,
    scheduleData: GtfsSchedule,
    stopGtfsIdMapping: StopGtfsIdMapping,
  ) {
    const sr = tripUpdate.trip.scheduleRelationship;

    if (sr === TRIP_UPDATE_SCHEDULE_RELATIONSHIP_SCHEDULED) {
      return this._parseForScheduledTrip(
        tripUpdate,
        scheduleData,
        stopGtfsIdMapping,
      );
    } else if (sr === TRIP_UPDATE_SCHEDULE_RELATIONSHIP_CANCELLED) {
      return this._parseForCancelledTrip(tripUpdate, scheduleData);
    } else {
      this._onError(
        new UnsupportedTripUpdateScheduleRelationshipError(tripUpdate),
      );
      return null;
    }
  }

  private _parseForScheduledTrip(
    tripUpdate: TripUpdateJson,
    scheduleData: GtfsSchedule,
    stopGtfsIdMapping: StopGtfsIdMapping,
  ): GtfsUpdatedTrip | null {
    const result = this._tripIdentifier.identify(tripUpdate.trip, scheduleData);
    if (result == null) return null;
    const { trip, serviceDay } = result;

    if (tripUpdate.stopTimeUpdate == null) {
      this._onError(new NoStopTimeUpdateFieldGivenError(tripUpdate));
      return null;
    }

    // Nothing about this method of parsing implemented below would support a
    // trip changing routes, e.g. terminating early. I'm yet to see how that's
    // represented in the realtime feed and/or if PTV uses it anyway. Given the
    // mention of "changed routes" at the link below, it sounds like they might:
    //
    // https://opendata.transport.vic.gov.au/dataset/gtfs-realtime

    const updatedStopsByIndex = new Map<number, GtfsUpdatedTripStop>();

    for (const entry of tripUpdate.stopTimeUpdate) {
      // This `scheduleRelationship` field is probably how altered routes work.
      const sr = entry.scheduleRelationship;
      if (sr !== STOP_TIME_UPDATE_ENTRY_SCHEDULE_RELATIONSHIP_SCHEDULED) {
        const Err = UnsupportedStopTimeUpdateEntryScheduleRelationshipError;
        this._onError(new Err(tripUpdate, entry));
        return null;
      }

      // Check the fields we're gonna rely on (that PTV seems to reliably give
      // but are technically optional in the GTFS-RT spec) are actually present.
      if (entry.stopSequence == null) {
        const Err = NecessaryFieldNotInStopTimeUpdateEntryError;
        this._onError(new Err(tripUpdate, entry, "stopSequence"));
        return null;
      }
      if (entry.stopId == null) {
        const Err = NecessaryFieldNotInStopTimeUpdateEntryError;
        this._onError(new Err(tripUpdate, entry, "stopId"));
        return null;
      }

      // Find the stop in the scheduled trip that this update is supposed to be
      // for.
      const stopIndex = trip.stops.findIndex(
        (s) =>
          s.type === "serviced" && s.gtfsStopSequence === entry.stopSequence,
      );
      if (stopIndex === -1) {
        const Err = StopTimeUpdateEntryReferencesNonExistentStopSequenceError;
        this._onError(new Err(tripUpdate, entry, trip));
        return null;
      }

      // Enforced by findIndex above.
      const scheduledStop = trip.stops[stopIndex];
      if (scheduledStop?.type !== "serviced") throw new Error();

      // Check that we haven't already matched a stop time update entry to this
      // stop index. (Would happen if `stopSequence` was the same value twice, I
      // guess.)
      if (updatedStopsByIndex.has(stopIndex)) {
        const Err = MultipleStopTimeUpdateEntriesForSameStopIndexError;
        this._onError(new Err(tripUpdate, entry, trip, stopIndex));
        return null;
      }

      // Look up the stop GTFS ID given in the stop time update entry, and check
      // whether it still maps to the same (CoreQuery) stop. In this way, we
      // allow the platform/position ID to change, not the overall stop/station.
      const stopGtfsIdMetadata = stopGtfsIdMapping.tryResolve(entry.stopId);
      if (stopGtfsIdMetadata == null) {
        const Err = StopTimeUpdateEntryReferencesNonExistentStopIdError;
        this._onError(new Err(tripUpdate, entry));
        return null;
      }
      if (stopGtfsIdMetadata.stopId !== scheduledStop.gtfsIdMetadata.stopId) {
        const Err = StopTimeUpdateEntryChangesStopError;
        this._onError(new Err(tripUpdate, entry, trip, stopIndex));
        return null;
      }

      const updatedPositionId =
        stopGtfsIdMetadata.type === "platform"
          ? stopGtfsIdMetadata.positionId
          : null;

      const realtimeArrivalTime = Temporal.Now.instant();
      const realtimeDepartureTime = Temporal.Now.instant();

      updatedStopsByIndex.set(stopIndex, {
        type: "serviced",
        stopId: stopGtfsIdMetadata.stopId,
        picksUp: scheduledStop.picksUp,
        dropsOff: scheduledStop.dropsOff,
        gtfsStopSequence: entry.stopSequence,

        scheduledArrivalTime: scheduledStop.arrivalTime,
        scheduledDepartureTime: scheduledStop.departureTime,
        realtimeArrivalTime,
        realtimeDepartureTime,

        originalPositionId: scheduledStop.positionId,
        updatedPositionId,
        originalGtfsIdMetadata: scheduledStop.gtfsIdMetadata,
        updatedGtfsIdMetadata: stopGtfsIdMetadata,
      });
    }

    let stops = GtfsUpdatedTrip.createStopsWithNoRealtimeData(trip.stops);
    stops = stops.map((s, i) => updatedStopsByIndex.get(i) ?? s);

    return new GtfsUpdatedTrip(trip, serviceDay, stops, false);
  }

  private _parseForCancelledTrip(
    tripUpdate: TripUpdateJson,
    scheduleData: GtfsSchedule,
  ): GtfsUpdatedTrip | null {
    const result = this._tripIdentifier.identify(tripUpdate.trip, scheduleData);
    if (result == null) return null;
    const { trip, serviceDay } = result;

    const stops = GtfsUpdatedTrip.createStopsWithNoRealtimeData(trip.stops);
    return new GtfsUpdatedTrip(trip, serviceDay, stops, true);
  }
}

export type GtfsTripUpdateParsingError =
  | UnsupportedTripUpdateScheduleRelationshipError
  | GtfsTripUpdateTripIdentificationError
  | NoStopTimeUpdateFieldGivenError
  | UnsupportedStopTimeUpdateEntryScheduleRelationshipError
  | NecessaryFieldNotInStopTimeUpdateEntryError
  | StopTimeUpdateEntryReferencesNonExistentStopSequenceError
  | MultipleStopTimeUpdateEntriesForSameStopIndexError
  | StopTimeUpdateEntryReferencesNonExistentStopIdError
  | StopTimeUpdateEntryChangesStopError;

export class UnsupportedTripUpdateScheduleRelationshipError extends Error {
  readonly type = "unsupported-trip-update-schedule-relationship";
  constructor(readonly tripUpdate: TripUpdateJson) {
    super();
  }
}

export class NoStopTimeUpdateFieldGivenError extends Error {
  readonly type = "no-stop-time-update-field-given";
  constructor(readonly tripUpdate: TripUpdateJson) {
    super();
  }
}

export class UnsupportedStopTimeUpdateEntryScheduleRelationshipError extends Error {
  readonly type = "unsupported-stop-time-update-entry-schedule-relationship";
  constructor(
    readonly tripUpdate: TripUpdateJson,
    readonly stopTimeUpdateEntry: StopTimeUpdateJson,
  ) {
    super();
  }
}

export class NecessaryFieldNotInStopTimeUpdateEntryError extends Error {
  readonly type = "necessary-field-not-in-stop-time-update-entry";
  constructor(
    readonly tripUpdate: TripUpdateJson,
    readonly stopTimeUpdateEntry: StopTimeUpdateJson,
    readonly field: "stopSequence" | "stopId",
  ) {
    super();
  }
}

export class StopTimeUpdateEntryReferencesNonExistentStopSequenceError extends Error {
  readonly type =
    "stop-time-update-entry-references-non-existent-stop-sequence";
  constructor(
    readonly tripUpdate: TripUpdateJson,
    readonly stopTimeUpdateEntry: StopTimeUpdateJson,
    readonly matchedTrip: GtfsTrip,
  ) {
    super();
  }
}

export class MultipleStopTimeUpdateEntriesForSameStopIndexError extends Error {
  readonly type = "multiple-stop-time-update-entries-for-same-stop-index";
  constructor(
    readonly tripUpdate: TripUpdateJson,
    readonly stopTimeUpdateEntry: StopTimeUpdateJson,
    readonly matchedTrip: GtfsTrip,
    readonly matchedStopIndex: number,
  ) {
    super();
  }
}

export class StopTimeUpdateEntryReferencesNonExistentStopIdError extends Error {
  readonly type = "stop-time-update-entry-references-non-existent-stop-id";
  constructor(
    readonly tripUpdate: TripUpdateJson,
    readonly stopTimeUpdateEntry: StopTimeUpdateJson,
  ) {
    super();
  }
}

// i.e. It changes the stop, not just the platform (which we support).
export class StopTimeUpdateEntryChangesStopError extends Error {
  readonly type = "stop-time-update-entry-changes-stop";
  constructor(
    readonly tripUpdate: TripUpdateJson,
    readonly stopTimeUpdateEntry: StopTimeUpdateJson,
    readonly matchedTrip: GtfsTrip,
    readonly matchedStopIndex: number,
  ) {
    super();
  }
}
