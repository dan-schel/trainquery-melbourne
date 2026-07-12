import type { GtfsSchedule } from "../../data/gtfs-schedule.js";
import type { GtfsScheduledTripStopTimeUpdate } from "../../data/gtfs-scheduled-trip-stop-time-update.js";
import type { TripUpdateJson } from "../../retrieval/realtime/realtime-feed-schema.js";

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
      return this.parseForScheduledTrip(tripUpdate);
    } else {
      return null;
    }
  }

  parseForScheduledTrip(
    tripUpdate: TripUpdateJson,
    scheduleData: GtfsSchedule,
  ): GtfsScheduledTripStopTimeUpdate | null {
    const trip = this._identifyTrip(scheduleData);
  }

  private _identifyTrip(scheduleData: GtfsSchedule) {}
}

export type GtfsTripUpdateParsingError = UnsupportedScheduleRelationshipError;

export class UnsupportedScheduleRelationshipError extends Error {
  readonly type = "unsupported-schedule-relationship";
  constructor() {
    super();
  }
}
