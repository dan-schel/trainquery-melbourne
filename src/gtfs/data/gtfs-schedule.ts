import type { GtfsScheduledTrip } from "./gtfs-scheduled-trip.js";

export class GtfsSchedule {
  private readonly _tripsById: Map<string, GtfsScheduledTrip>;

  constructor(private readonly _trips: readonly GtfsScheduledTrip[]) {
    // Arguably we should be taking the map as the constructor argument because
    // the GtfsTransferConnector operates on a map, that it converts back to an
    // array, only to have it immediately passed on to this constructor where
    // we convert it back again :)

    this._tripsById = new Map<string, GtfsScheduledTrip>(
      _trips.map((trip) => [trip.gtfsTripId, trip]),
    );
  }

  allTrips(): readonly GtfsScheduledTrip[] {
    return this._trips;
  }

  getTripById(gtfsTripId: string): GtfsScheduledTrip | null {
    return this._tripsById.get(gtfsTripId) ?? null;
  }
}
