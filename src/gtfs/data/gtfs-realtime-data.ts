import type { GtfsUpdatedTrip } from "./gtfs-updated-trip.js";

export class GtfsRealtimeData {
  constructor(readonly updatedTrips: readonly GtfsUpdatedTrip[]) {}
}
