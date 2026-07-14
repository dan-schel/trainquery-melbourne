import { GtfsSchedule } from "../../../../src/gtfs/data/gtfs-schedule.js";
import { GtfsStopTime } from "../../../../src/gtfs/data/gtfs-stop-time.js";
import type { GtfsTrip } from "../../../../src/gtfs/data/gtfs-trip.js";
import type {
  RealtimeFeedJson,
  StopTimeUpdateJson,
  TripDescriptorJson,
  TripUpdateJson,
} from "../../../../src/gtfs/retrieval/realtime/realtime-feed-schema.js";
import { makeTrip } from "../factories.js";

export const SERVICE_DAY_2026_07_14 = Temporal.PlainDate.from({
  year: 2026,
  month: 7,
  day: 14,
});

export function tripDescriptor(
  overrides: Partial<TripDescriptorJson> = {},
): TripDescriptorJson {
  return {
    tripId: "trip-1",
    startTime: GtfsStopTime.parse("00:01:00"),
    startDate: SERVICE_DAY_2026_07_14,
    scheduleRelationship: "SCHEDULED",
    routeId: "route-1",
    ...overrides,
  };
}

export function stopTimeUpdate(
  overrides: Partial<StopTimeUpdateJson> = {},
): StopTimeUpdateJson {
  return {
    stopSequence: 1,
    stopId: "A",
    arrival: { delay: 0 },
    departure: { delay: 0 },
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

export function scheduleWithTrip(): { schedule: GtfsSchedule; trip: GtfsTrip } {
  const trip = makeTrip("trip-1", "A", "B");
  return {
    schedule: new GtfsSchedule([trip]),
    trip,
  };
}
