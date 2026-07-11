import type { GtfsScheduledTripStopTimeUpdate } from "./gtfs-scheduled-trip-stop-time-update.js";

export class GtfsRealtimeData {
  constructor(
    readonly scheduledTripStopTimeUpdates: readonly GtfsScheduledTripStopTimeUpdate[],
  ) {}
}
