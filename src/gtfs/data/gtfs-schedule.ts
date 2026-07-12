import type { GtfsTrip } from "./gtfs-trip.js";

export class GtfsSchedule {
  // TODO: We also want to have pre-prepared lists per stop for departures, to
  // help speed up the departures algorithm. It'll be formulated from the trips
  // in this object, but does it itself belong in this object too?
  //
  // Kinda feeling "no" at this stage, but for what it's worth, the
  // `StopGtfsIdMapping` class has reverse mappings within it, so it wouldn't be
  // unprecedented. Maybe??

  private readonly _tripsById: Map<string, GtfsTrip>;

  constructor(private readonly _trips: readonly GtfsTrip[]) {
    this._tripsById = new Map<string, GtfsTrip>(
      _trips.map((trip) => [trip.gtfsTripId, trip]),
    );
  }

  allTrips(): readonly GtfsTrip[] {
    return this._trips;
  }

  getTripById(gtfsTripId: string): GtfsTrip | null {
    return this._tripsById.get(gtfsTripId) ?? null;
  }
}
