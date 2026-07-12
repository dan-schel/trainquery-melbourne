import type { GtfsSchedule } from "../../data/gtfs-schedule.js";
import type { GtfsScheduledTripStopTimeUpdate } from "../../data/gtfs-scheduled-trip-stop-time-update.js";
import type { GtfsTrip } from "../../data/gtfs-trip.js";
import type {
  TripDescriptorJson,
  TripUpdateJson,
} from "../../retrieval/realtime/realtime-feed-schema.js";

const TRIP_UPDATE_SCHEDULE_RELATIONSHIP_SCHEDULED = "SCHEDULED";

export class GtfsTripUpdateParser {
  constructor(
    private readonly _onError: (error: GtfsTripUpdateParsingError) => void,
  ) {}

  parse(tripUpdate: TripUpdateJson, scheduleData: GtfsSchedule) {
    if (
      tripUpdate.trip.scheduleRelationship ===
      TRIP_UPDATE_SCHEDULE_RELATIONSHIP_SCHEDULED
    ) {
      return this.parseForScheduledTrip(tripUpdate, scheduleData);
    } else {
      return null;
    }
  }

  parseForScheduledTrip(
    tripUpdate: TripUpdateJson,
    scheduleData: GtfsSchedule,
  ): GtfsScheduledTripStopTimeUpdate | null {
    const result = this._identifyTrip(tripUpdate.trip, scheduleData);
    if (result == null) return null;
    const { trip, serviceDay } = result;

    return null;
  }

  private _identifyTrip(
    tripDescriptor: TripDescriptorJson,
    scheduleData: GtfsSchedule,
  ) {
    // Currently it seems like PTV always gives `tripId` and `startDate` in the
    // trip descriptor, even though the GTFS-RT spec allows other methods of
    // identifying the trip. We'll rely on them being present unless it later
    // turns out we can't.
    if (tripDescriptor.tripId == null) {
      this._onError(
        new NecessaryFieldNotInTripDescriptorError(tripDescriptor, "tripId"),
      );
      return null;
    }
    if (tripDescriptor.startDate == null) {
      this._onError(
        new NecessaryFieldNotInTripDescriptorError(tripDescriptor, "startDate"),
      );
      return null;
    }

    const trip = scheduleData.getTripById(tripDescriptor.tripId);
    if (trip == null) {
      this._onError(
        new TripDescriptorReferencesNonExistentTripIdError(tripDescriptor),
      );
      return null;
    }

    // It's unclear to me whether the startDate in GTFS-RT is meant to be the
    // "service day" of the trip, or just the calendar date of the first stop.
    // I'm assuming it's the service date for now, since startTime can exceed
    // 24:00:00, so they probably work together as a pair to be consistent with
    // the GTFS schedule representation.
    //
    // If this error ever fires, it indicates that that assumption is incorrect!
    // (Or that PTV made a mistake I guess.)
    if (!trip.calendar.occursOn(tripDescriptor.startDate)) {
      this._onError(new TripDoesNotOccurOnStartDateError(tripDescriptor, trip));
      return null;
    }

    return { trip, serviceDay: tripDescriptor.startDate };
  }
}

export type GtfsTripUpdateParsingError =
  | UnsupportedScheduleRelationshipError
  | NecessaryFieldNotInTripDescriptorError
  | TripDescriptorReferencesNonExistentTripIdError
  | TripDoesNotOccurOnStartDateError;

export class UnsupportedScheduleRelationshipError extends Error {
  readonly type = "unsupported-schedule-relationship";
  constructor() {
    super();
  }
}

// Naming "necessary" rather that "required" since "required" implies that it
// breaks the GTFS-RT spec, but in reality it's just that we don't support other
// methods of identifying the trip yet.
export class NecessaryFieldNotInTripDescriptorError extends Error {
  readonly type = "necessary-field-not-in-trip-descriptor";
  constructor(
    readonly tripDescriptor: TripDescriptorJson,
    readonly field: "tripId" | "startDate",
  ) {
    super();
  }
}

export class TripDescriptorReferencesNonExistentTripIdError extends Error {
  readonly type = "trip-descriptor-references-non-existent-trip-id";
  constructor(readonly tripDescriptor: TripDescriptorJson) {
    super();
  }
}

export class TripDoesNotOccurOnStartDateError extends Error {
  readonly type = "trip-does-not-occur-on-start-date";
  constructor(
    readonly tripDescriptor: TripDescriptorJson,
    readonly trip: GtfsTrip,
  ) {
    super();
  }
}
