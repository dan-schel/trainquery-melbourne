import type { GtfsUpdatedTrip } from "./gtfs-updated-trip.js";

export class GtfsRealtimeData {
  constructor(readonly updatedTrips: readonly GtfsUpdatedTrip[]) {}

  // Or (GtfsUpdatedTrip | GtfsAddedTrip | GtfsCancelledTrip)[] one day.
  allTrips(): readonly GtfsUpdatedTrip[] {
    return this.updatedTrips;
  }
}
