import type { GtfsTrip } from "./gtfs-trip.js";

export class GtfsSchedule {
  // TODO: We also want to have pre-prepared lists per stop for departures, to
  // help speed up the departures algorithm. It'll be formulated from the trips
  // in this object, but does it itself belong in this object too?
  //
  // Kinda feeling "no" at this stage, but for what it's worth, the
  // `StopGtfsIdMapping` class has reverse mappings within it, so it wouldn't be
  // unprecedented. Maybe??
  //
  // Note: Advantage of "no" is that we don't have to construct it everytime we
  // construct a GtfsSchedule, there could be method on this class to construct
  // it instead. Although outside of unit tests, I can't think of a case where
  // we'd construct an instance of this class and never use it to query
  // departures from. Shrug.

  private readonly _tripsById: Map<string, GtfsTrip>;

  constructor(private readonly _trips: readonly GtfsTrip[]) {
    // Arguably we should be taking the map as the constructor argument because
    // the GtfsTransferConnector operates on a map, that it converts back to an
    // array, only to have it immediately passed on to this constructor where
    // we convert it back again :)

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
