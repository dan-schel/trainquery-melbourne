import { GtfsSchedule } from "../../../../src/gtfs/data/gtfs-schedule.js";
import { GtfsStopTime } from "../../../../src/gtfs/data/gtfs-stop-time.js";
import type { GtfsTrip } from "../../../../src/gtfs/data/gtfs-trip.js";
import type {
  RealtimeFeedJson,
  StopTimeUpdateJson,
  TripDescriptorJson,
  TripUpdateJson,
  UpdatedTimeJson,
} from "../../../../src/gtfs/retrieval/realtime/realtime-feed-schema.js";
import { lineMapping, makeTrip, stopMapping } from "../factories.js";

export function serviceDay(
  overrides: Partial<{ year: number; month: number; day: number }> = {},
) {
  return Temporal.PlainDate.from({
    year: 2026,
    month: 7,
    day: 14,
    ...overrides,
  });
}

export function tripDescriptor(
  overrides: Partial<TripDescriptorJson> = {},
): TripDescriptorJson {
  return {
    tripId: "trip-1",
    startTime: GtfsStopTime.parse("00:01:00"),
    startDate: serviceDay(),
    scheduleRelationship: "SCHEDULED",
    routeId: "route-1",
    ...overrides,
  };
}

function updatedTime(
  overrides: Partial<UpdatedTimeJson> = {},
): UpdatedTimeJson {
  return {
    delay: 0,
    ...overrides,
  };
}

export function stopTimeUpdate(
  overrides: Partial<StopTimeUpdateJson> = {},
): StopTimeUpdateJson {
  return {
    stopSequence: 1,
    stopId: "A",
    arrival: updatedTime(),
    departure: updatedTime(),
    scheduleRelationship: "SCHEDULED",
    ...overrides,
  };
}

export function tripUpdate(
  overrides: Partial<TripUpdateJson> = {},
): TripUpdateJson {
  return {
    trip: tripDescriptor(),
    stopTimeUpdate: [stopTimeUpdate()],
    ...overrides,
  };
}

export function realtimeFeed(
  updates: readonly TripUpdateJson[] = [tripUpdate()],
): RealtimeFeedJson {
  return {
    tripUpdates: [...updates],
  };
}

export function scheduleWithTrip(
  overrides: {
    tripId?: string;
    originGtfsStopId?: string;
    terminusGtfsStopId?: string;
  } = {},
): { schedule: GtfsSchedule; trip: GtfsTrip } {
  const {
    tripId = "trip-1",
    originGtfsStopId = "A",
    terminusGtfsStopId = "B",
  } = overrides;

  const trip = makeTrip(tripId, originGtfsStopId, terminusGtfsStopId);
  return {
    schedule: new GtfsSchedule([trip]),
    trip,
  };
}

export { lineMapping, stopMapping };
