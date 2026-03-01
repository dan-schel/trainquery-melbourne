import type { LineConfig, RouteConfig } from "corequery";
import type { TripsCsv } from "../../../src/gtfs/schedule/csv-schemas.js";
import type { IndexedStopTimes } from "../../../src/gtfs/schedule/higher-order/indexed-stop-times.js";
import type { IssueCollector } from "../issue-collector.js";
import type { LineGtfsIdCollection } from "../../../src/gtfs/ids/line-gtfs-id-collection.js";
import type { StopGtfsIdMapping } from "../../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import { isSubsequence } from "./utils/is-subsequence.js";
import { Trip } from "./utils/trip.js";
import {
  UniqueStoppingPatternTracker,
  type UniqueStoppingPattern,
} from "./utils/unique-stopping-pattern-tracker.js";

export function checkLineTripCompatibility({
  config,
  mappedLineIds,
  gtfsTrips,
  gtfsStopTimes,
  stopIdMapping,
  getStopName,
  issues,
  isIncompatibleStoppingPatternIgnored,
}: {
  config: LineConfig;
  mappedLineIds: LineGtfsIdCollection;
  gtfsTrips: TripsCsv;
  gtfsStopTimes: IndexedStopTimes;
  stopIdMapping: StopGtfsIdMapping;
  getStopName: (stopId: number) => string | null;
  issues: IssueCollector;
  isIncompatibleStoppingPatternIgnored: (
    pattern: UniqueStoppingPattern,
  ) => boolean;
}) {
  // Find the trips which belong to this line. (Ignore replacement bus trips.
  // Right now TrainQuery is only attempting to model actual train trips.)
  const trips = gtfsTrips
    .filter((t) =>
      mappedLineIds.includes(t.route_id, { ignoreReplacementBusIds: true }),
    )
    .map((t) =>
      Trip.fromCsv({
        tripCsvRow: t,
        stopTimes: gtfsStopTimes.forTrip(t.trip_id),
        stopIdMapping,
        onUnmappedGtfsStopIdInUse: (stopId) =>
          issues.addUnmappedGtfsStopIdInUse(stopId),
      }),
    );

  const instances = UniqueStoppingPatternTracker.process(trips);

  for (const instance of instances) {
    const hasMatch = config.routes.some((r) => isCompatible(instance, r));
    const isIgnored = isIncompatibleStoppingPatternIgnored(instance);

    if (hasMatch || isIgnored) continue;

    const formattedInstanceCount = `${instance.tripCount} ${instance.tripCount === 1 ? "instance" : "instances"}`;
    const formattedExampleTripId = `e.g. in trip "${instance.exampleTripId}" on route "${instance.exampleRouteId}"`;
    const formattedStopList = instance.pattern.format(getStopName);

    issues.add({
      message: `${formattedInstanceCount} of stopping pattern for ${config.name} (#${config.id}) line, ${formattedExampleTripId}: ${formattedStopList}`,
    });
  }
}

function isCompatible(
  instance: UniqueStoppingPattern,
  route: RouteConfig,
): boolean {
  const routeStops = route.stops.map((s) => s.stopId);
  return isSubsequence(instance.pattern.stops, routeStops);
}
