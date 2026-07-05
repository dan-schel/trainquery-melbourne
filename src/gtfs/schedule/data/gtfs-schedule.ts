import type { GtfsTrip } from "./gtfs-trip.js";

export class GtfsSchedule {
  // TODO: We also want to have pre-prepared lists per stop for departures, to
  // help speed up the departures algorithm. It'll be formulated from the trips
  // in this object, but does it itself belong in this object too?
  //
  // Kinda feeling "no" at this stage, but for what it's worth, the
  // `StopGtfsIdMapping` class has reverse mappings within it, so it wouldn't be
  // unprecedented. Maybe??

  constructor(readonly trips: readonly GtfsTrip[]) {}
}
