// TODO: Contains all the data trainquery needs to know for a single gtfs trip.
// These objects only represent valid trips. Build the indexes for each stop for
// departures from these trips, not prior, so that we can be sure that invalid
// trips have been filtered out first. During parsing, we'll be as resilient as
// possible to funky trips, e.g. provide a callback for each type of error so
// that it can be logged or something in the admin dashboard, but ultimately
// just ignore that trip and continue (i.e. don't throw an error). We've seen

import type { GtfsCalendar } from "./gtfs-calendar.js";

// all sorts from PTV, and it's no reason to throw out all the data.
export class GtfsTrip {
  constructor(readonly calendar: GtfsCalendar) {}
}
