// TODO: Remove this.
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { LineConfig } from "corequery";
import type { TripsCsv } from "../../../src/gtfs/schedule/csv-schemas.js";
import type { IndexedStopTimes } from "../../../src/gtfs/schedule/higher-order/indexed-stop-times.js";
import type { IssueCollector } from "../issue-collector.js";
import type { LineGtfsIdCollection } from "../../../src/gtfs/ids/line-gtfs-id-collection.js";

export function checkLineTripCompatibility({
  config,
  mappedIds,
  gtfsTrips,
  gtfsStopTimes,
  issues,
}: {
  config: LineConfig;
  mappedIds: LineGtfsIdCollection;
  gtfsTrips: TripsCsv;
  gtfsStopTimes: IndexedStopTimes;
  issues: IssueCollector;
}) {
  const relevantTrips = gtfsTrips.filter((t) => mappedIds.includes(t.route_id));

  for (const trip of relevantTrips) {
    const tripStopTimes = gtfsStopTimes.forTrip(trip.trip_id);

    // TODO: Do the thing.
  }
}
