import type { GtfsSchedule } from "../../data/gtfs-schedule.js";
import type { GtfsTrip } from "../../data/gtfs-trip.js";
import {
  GtfsUpdatedTrip,
  type GtfsUpdatedTripStop,
} from "../../data/gtfs-updated-trip.js";
import type {
  StopTimeUpdateJson,
  TripUpdateJson,
  UpdatedTimeJson,
} from "../../retrieval/realtime/realtime-feed-schema.js";
import {
  GtfsTripUpdateTripIdentifier,
  type GtfsTripUpdateTripIdentificationError,
} from "./gtfs-trip-update-trip-identifier.js";
import type { StopGtfsIdMapping } from "../../data/ids/stop-gtfs-id-mapping.js";
import type { GtfsStopTime } from "../../data/gtfs-stop-time.js";

const TRIP_UPDATE_SCHEDULE_RELATIONSHIP_SCHEDULED = "SCHEDULED";
const TRIP_UPDATE_SCHEDULE_RELATIONSHIP_CANCELLED = "CANCELED";
const STOP_TIME_UPDATE_ENTRY_SCHEDULE_RELATIONSHIP_SCHEDULED = "SCHEDULED";

export class GtfsTripUpdateParser {
  private readonly _tripIdentifier: GtfsTripUpdateTripIdentifier;

  constructor(
    // TODO: Should this field come from the GtfsSchedule object instead? It's
    // in the schedule feed agency.txt (which we currently don't read).
    private readonly _timezone: string,

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

    // TODO: Nothing about this method of parsing implemented below would
    // support a trip changing routes, e.g. terminating early. I'm yet to see
    // how that's represented in the realtime feed and/or if PTV uses it anyway.
    // Given the mention of "changed routes" at the link below, it sounds like
    // they might:
    //
    // https://opendata.transport.vic.gov.au/dataset/gtfs-realtime
    //
    // Update: Yeah they do.
    //
    //            ⬇️⬇️
    // UnsupportedTripUpdateScheduleRelationshipError
    //     at GtfsTripUpdateParser.parse (/home/dan/repos/trainquery-melbourne/src/gtfs/parser/realtime/gtfs-trip-update-parser.ts:47:9)
    //     at GtfsRealtimeDataParser.parse (/home/dan/repos/trainquery-melbourne/src/gtfs/parser/realtime/gtfs-realtime-data-parser.ts:26:45)
    //     at parseRealtime (/home/dan/repos/trainquery-melbourne/src/gtfs/temp-script.ts:150:39)
    //     at runGtfsTempScript (/home/dan/repos/trainquery-melbourne/src/gtfs/temp-script.ts:51:58)
    //     at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
    //     at async main (/home/dan/repos/trainquery-melbourne/src/index.ts:18:3) {
    //   tripUpdate: {
    //     trip: {
    //       tripId: 'vic:02FKN:_:H:vpt._Frankston_7419_20260712',
    //       startTime: [GtfsStopTime],
    //       startDate: PlainDate [Temporal.PlainDate] {},
    //       scheduleRelationship: 'ADDED', ⬅️ ⬅️ ⬅️
    //       routeId: 'aus:vic:vic-02-FKN:'
    //     },
    //     stopTimeUpdate: [
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object]
    //     ]
    //   },
    //   type: 'unsupported-trip-update-schedule-relationship'
    // }
    //
    //            ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
    // UnsupportedStopTimeUpdateEntryScheduleRelationshipError
    //     at GtfsTripUpdateParser._parseForScheduledTrip (/home/dan/repos/trainquery-melbourne/src/gtfs/parser/realtime/gtfs-trip-update-parser.ts:81:23)
    //     at GtfsTripUpdateParser.parse (/home/dan/repos/trainquery-melbourne/src/gtfs/parser/realtime/gtfs-trip-update-parser.ts:38:19)
    //     at GtfsRealtimeDataParser.parse (/home/dan/repos/trainquery-melbourne/src/gtfs/parser/realtime/gtfs-realtime-data-parser.ts:26:45)
    //     at parseRealtime (/home/dan/repos/trainquery-melbourne/src/gtfs/temp-script.ts:155:39)
    //     at runGtfsTempScript (/home/dan/repos/trainquery-melbourne/src/gtfs/temp-script.ts:51:58)
    //     at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
    //     at async main (/home/dan/repos/trainquery-melbourne/src/index.ts:18:3) {
    //   tripUpdate: {
    //     trip: {
    //       tripId: '01-ABY--5-T3-8630',
    //       startTime: [GtfsStopTime],
    //       startDate: PlainDate [Temporal.PlainDate] {},
    //       scheduleRelationship: 'SCHEDULED',
    //       routeId: 'aus:vic:vic-01-ABY:'
    //     },
    //     stopTimeUpdate: [ [Object], [Object], [Object], [Object], [Object], [Object] ]
    //   },
    //   stopTimeUpdateEntry: {
    //     stopSequence: 6,
    //     arrival: { time: 1783845360 },
    //     departure: { time: 1783845480 },
    //     stopId: '20295',
    //     scheduleRelationship: 'SKIPPED' ⬅️ ⬅️ ⬅️
    //   },
    //   type: 'unsupported-stop-time-update-entry-schedule-relationship'
    // }
    //
    //            ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
    // UnsupportedStopTimeUpdateEntryScheduleRelationshipError
    //     at GtfsTripUpdateParser._parseForScheduledTrip (/home/dan/repos/trainquery-melbourne/src/gtfs/parser/realtime/gtfs-trip-update-parser.ts:81:23)
    //     at GtfsTripUpdateParser.parse (/home/dan/repos/trainquery-melbourne/src/gtfs/parser/realtime/gtfs-trip-update-parser.ts:38:19)
    //     at GtfsRealtimeDataParser.parse (/home/dan/repos/trainquery-melbourne/src/gtfs/parser/realtime/gtfs-realtime-data-parser.ts:26:45)
    //     at parseRealtime (/home/dan/repos/trainquery-melbourne/src/gtfs/temp-script.ts:155:39)
    //     at runGtfsTempScript (/home/dan/repos/trainquery-melbourne/src/gtfs/temp-script.ts:51:58)
    //     at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
    //     at async main (/home/dan/repos/trainquery-melbourne/src/index.ts:18:3) {
    //   tripUpdate: {
    //     trip: {
    //       tripId: '01-ABY--5-T3-8625',
    //       startTime: [GtfsStopTime],
    //       startDate: PlainDate [Temporal.PlainDate] {},
    //       scheduleRelationship: 'SCHEDULED',
    //       routeId: 'aus:vic:vic-01-ABY:'
    //     },
    //     stopTimeUpdate: [
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object], [Object],
    //       [Object]
    //     ]
    //   },
    //   stopTimeUpdateEntry: {
    //     stopSequence: 5,
    //     arrival: { time: 1783850160 },
    //     departure: { time: 1783850160 },
    //     stopId: '20312',
    //     scheduleRelationship: 'SKIPPED' ⬅️ ⬅️ ⬅️
    //   },
    //   type: 'unsupported-stop-time-update-entry-schedule-relationship'
    // }

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
        const Err = StopTimeUpdateEntryReferencesUnmappedStopIdError;
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

      // Parse the updated times from the `arrivalTime` and `departureTime`
      // fields.
      const realtimeArrivalTime = this._parseUpdatedTime(
        entry.arrival ?? null,
        scheduledStop.arrivalTime,
        serviceDay,
        tripUpdate,
        entry,
      );
      const realtimeDepartureTime = this._parseUpdatedTime(
        entry.departure ?? null,
        scheduledStop.departureTime,
        serviceDay,
        tripUpdate,
        entry,
      );
      if (realtimeArrivalTime == null && realtimeDepartureTime == null) {
        const Err = NeitherArrivalNorDepartureGivenError;
        this._onError(new Err(tripUpdate, entry));
        return null;
      }

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

  private _parseUpdatedTime(
    updatedTime: UpdatedTimeJson | null,
    scheduledTime: GtfsStopTime,
    serviceDay: Temporal.PlainDate,
    tripUpdate: TripUpdateJson,
    stopTimeUpdateEntry: StopTimeUpdateJson,
  ): Temporal.Instant | null {
    if (updatedTime == null) {
      return null;
    }

    const { time, delay } = updatedTime;

    const fromTime =
      time != null ? Temporal.Instant.fromEpochMilliseconds(time * 1000) : null;

    const fromDelay =
      delay != null
        ? scheduledTime
            .toInstant(serviceDay, this._timezone)
            .add({ seconds: delay })
        : null;

    // Most/all trips in PTV's realtime feed have both time and delay. If using
    // both of those methods gives us different results, then I've probably
    // messed something up (e.g. maybe my service day assumption in the trip
    // identifier is wrong)... or PTV has.
    //
    // We'll press on (this check is only meant for reporting/my interest), but
    // the something's probably gonna be very broken for this trip!
    if (fromTime != null && fromDelay != null && !fromTime.equals(fromDelay)) {
      console.log(fromTime.toString(), fromDelay.toString());
      const Err = TimeAndDelayDisagreeWithEachOtherError;
      this._onError(
        new Err(
          tripUpdate,
          stopTimeUpdateEntry,
          updatedTime,
          fromTime,
          fromDelay,
        ),
      );
    }

    // I don't think it really matters which of `delay` or `time` we preference,
    // since they're either identical, or we've (probably) messed up the service
    // day, in which case we're either applying the right time to the wrong
    // service (`time`), or the we've calculated the time assuming the wrong
    // service day (`delay`).
    //
    // It'll probably be clearer to me trying to debug this if we apply this
    // realtime update to yesterday/tomorrow's service and it makes it look like
    // there's two departures of the same service happening at/near to the same
    // time, so I'll pick `time`.
    if (fromTime != null) {
      return fromTime;
    } else if (fromDelay != null) {
      return fromDelay;
    } else {
      const Err = NeitherTimeNorDelayGivenError;
      this._onError(new Err(tripUpdate, stopTimeUpdateEntry, updatedTime));
      return null;
    }
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
  | StopTimeUpdateEntryReferencesUnmappedStopIdError
  | StopTimeUpdateEntryChangesStopError
  | NeitherTimeNorDelayGivenError
  | TimeAndDelayDisagreeWithEachOtherError
  | NeitherArrivalNorDepartureGivenError;

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

export class StopTimeUpdateEntryReferencesUnmappedStopIdError extends Error {
  readonly type = "stop-time-update-entry-references-unmapped-stop-id";
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

export class NeitherTimeNorDelayGivenError extends Error {
  readonly type = "neither-time-nor-delay-given";
  constructor(
    readonly tripUpdate: TripUpdateJson,
    readonly stopTimeUpdateEntry: StopTimeUpdateJson,
    readonly updatedTime: UpdatedTimeJson,
  ) {
    super();
  }
}

export class TimeAndDelayDisagreeWithEachOtherError extends Error {
  readonly type = "time-and-delay-disagree-with-each-other";
  constructor(
    readonly tripUpdate: TripUpdateJson,
    readonly stopTimeUpdateEntry: StopTimeUpdateJson,
    readonly updatedTime: UpdatedTimeJson,
    readonly parsedFromTime: Temporal.Instant,
    readonly parsedFromDelay: Temporal.Instant,
  ) {
    super();
  }
}

export class NeitherArrivalNorDepartureGivenError extends Error {
  readonly type = "neither-arrival-nor-departure-given";
  constructor(
    readonly tripUpdate: TripUpdateJson,
    readonly stopTimeUpdateEntry: StopTimeUpdateJson,
  ) {
    super();
  }
}
