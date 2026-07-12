import type { GtfsSchedule } from "../../data/gtfs-schedule.js";
import {
  GtfsUpdatedTrip,
  type GtfsUpdatedTripStop,
} from "../../data/gtfs-updated-trip.js";
import type { TripUpdateJson } from "../../retrieval/realtime/realtime-feed-schema.js";
import {
  GtfsTripUpdateTripIdentifier,
  type GtfsTripUpdateTripIdentificationError,
} from "./gtfs-trip-update-trip-identifier.js";

const TRIP_UPDATE_SCHEDULE_RELATIONSHIP_SCHEDULED = "SCHEDULED";
const TRIP_UPDATE_SCHEDULE_RELATIONSHIP_CANCELLED = "CANCELED";

export class GtfsTripUpdateParser {
  private readonly _tripIdentifier: GtfsTripUpdateTripIdentifier;

  constructor(
    private readonly _onError: (error: GtfsTripUpdateParsingError) => void,
  ) {
    this._tripIdentifier = new GtfsTripUpdateTripIdentifier(_onError);
  }

  parse(tripUpdate: TripUpdateJson, scheduleData: GtfsSchedule) {
    const sr = tripUpdate.trip.scheduleRelationship;

    if (sr === TRIP_UPDATE_SCHEDULE_RELATIONSHIP_SCHEDULED) {
      return this.parseForScheduledTrip(tripUpdate, scheduleData);
    } else if (sr === TRIP_UPDATE_SCHEDULE_RELATIONSHIP_CANCELLED) {
      return this.parseForCancelledTrip(tripUpdate, scheduleData);
    } else {
      this._onError(new UnsupportedScheduleRelationshipError(tripUpdate));
      return null;
    }
  }

  parseForScheduledTrip(
    tripUpdate: TripUpdateJson,
    scheduleData: GtfsSchedule,
  ): GtfsUpdatedTrip | null {
    const result = this._tripIdentifier.identify(tripUpdate.trip, scheduleData);
    if (result == null) return null;
    const { trip, serviceDay } = result;

    // TODO: Fill this out.
    const stops: GtfsUpdatedTripStop[] = [];

    return new GtfsUpdatedTrip(trip, serviceDay, stops, false);
  }

  parseForCancelledTrip(
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
  | UnsupportedScheduleRelationshipError
  | GtfsTripUpdateTripIdentificationError;

export class UnsupportedScheduleRelationshipError extends Error {
  readonly type = "unsupported-schedule-relationship";
  constructor(readonly tripUpdate: TripUpdateJson) {
    super();
  }
}
