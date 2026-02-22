import type { TripsCsv } from "../../../src/gtfs/schedule/csv-schemas.js";
import type { IndexedStopTimes } from "../../../src/gtfs/schedule/higher-order/indexed-stop-times.js";
import type { IssueCollector } from "../issue-collector.js";
import type { LineComparisonContext } from "./line-comparison-context.js";

export function checkLineTripCompatibility(
  ctx: LineComparisonContext,
  issues: IssueCollector,
) {
  checkLineTripCompatibilityInSubfeed(
    ctx,
    issues,
    ctx.gtfsData.suburban.trips,
    ctx.suburbanIndexedStopTimes,
  );
  checkLineTripCompatibilityInSubfeed(
    ctx,
    issues,
    ctx.gtfsData.regional.trips,
    ctx.regionalIndexedStopTimes,
  );
}

function checkLineTripCompatibilityInSubfeed(
  ctx: LineComparisonContext,
  issues: IssueCollector,
  trips: TripsCsv,
  stopTimes: IndexedStopTimes,
) {
  const { config, routesGtfs } = ctx.currentLine;

  const tripsOnThisLine = trips.filter((trip) =>
    routesGtfs.some((route) => route.route_id === trip.route_id),
  );

  for (const trip of tripsOnThisLine) {
    const tripStopTimes = stopTimes.forTrip(trip.trip_id);

    // I stopped here.
    //
    // At this point we have some rows from trips.txt which represent a single
    // trip, and we want to ensure at least one route on the line would be
    // compatible with that trip. If not, we want to report an issue.
    // For this, we need a nice way to convert gtfs stop IDs to stop IDs.
    // I should implement a nice class for this, and for the actual production
    // code to use as well. The class would replace the reverseStopGtfsIds
    // function I'm using in the stop lint rules. Other than that, I think
    // implementing this check is pretty straightforward.
    //
    // Another concern I have is that we're already starting to mix subfeeds in
    // a dangerous way. All GTFS ID mappings need to be updated to be
    // subfeed-specific, just in case one day PTV duplicates an ID across
    // subfeeds for different meanings. Anywhere we lookup a stop/line by GTFS
    // ID, we look it up in the context of a subfeed (i.e. where did you get
    // this ID from? Was it a trip in the suburban feed? Then use the suburban
    // GTFS ID mapping). Probably the easiest way to enforce this is to have
    // two separate GTFS ID mapping objects, one for suburban IDs and one for
    // regional. For the purposes of this script, it might be a good idea to tag
    // each stop/line as suburban/regional/both so we can know if we're
    // expecting to see a matching stop. Even better, we could have the script
    // run twice, separately linting suburban (against the list of suburban
    // stops and lines), and then regional (against the list of regional stops
    // and lines).
  }
}
