// TODO: Contains the calendars, trips, and transfers(?) for one GTFS subfeed.
// Does not include the realtime data, as it will be parsed independently of the
// schedule data (so that an error parsing the realtime data doesn't impact our
// ability to keep using the schedule data). Should this be named somehow to
// indicate that?

import type { GtfsTrip } from "./gtfs-trip.js";

export class GtfsSchedule {
  constructor(readonly trips: readonly GtfsTrip[]) {}
}
