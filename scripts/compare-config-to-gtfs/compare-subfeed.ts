import { type LineConfig, type StopConfig } from "corequery";
import type { ComparisonOptions } from "./comparison-options.js";
import { IssueCollector } from "./issue-collector.js";
import { compareLines } from "./line/index.js";
import { compareStops } from "./stop/index.js";
import type {
  StopGtfsIdMapping,
  LineGtfsIdMapping,
  LineRoutesMappingConfig,
} from "corequery-gtfs";
import { getStopName } from "../../src/utils/get-stop-name.js";
import type { FullGtfsFeedCsv } from "../../src/gtfs/retrieval/schedule/csv-schemas.js";

export function compareSubfeed({
  stops,
  lines,
  stopIdMapping,
  lineIdMapping,
  routes,
  gtfsFeed,
  issues,
  options,
}: {
  stops: readonly StopConfig[];
  lines: readonly LineConfig[];
  stopIdMapping: StopGtfsIdMapping;
  lineIdMapping: LineGtfsIdMapping;
  routes: LineRoutesMappingConfig;
  gtfsFeed: FullGtfsFeedCsv;
  issues: IssueCollector;
  options: ComparisonOptions;
}) {
  compareStops({
    stops,
    idMapping: stopIdMapping,
    gtfsStops: gtfsFeed.stops,
    issues,

    getOptionsForStop: (stopId) => ({
      ...options.stops?.all,
      ...options.stops?.[stopId],
    }),

    isStopMissingFromConfigIgnored: (n) =>
      options.ignoredParentGtfsStopIdsMissingFromConfig?.includes(n.stop_id) ??
      false,
  });

  compareLines({
    lines,
    idMapping: lineIdMapping,
    routes,
    gtfsRoutes: gtfsFeed.routes,
    gtfsTrips: gtfsFeed.trips,
    gtfsStopTimes: gtfsFeed.stopTimes,
    stopIdMapping: stopIdMapping,

    getStopName: (stopId) => getStopName(stopId, stops),

    issues,

    getOptionsForLine: (lineId) => ({
      ...options.lines?.all,
      ...options.lines?.[lineId],
    }),

    isLineMissingFromConfigIgnored: (n) =>
      options.ignoredGtfsRouteIdsMissingFromConfig?.includes(n.route_id) ??
      false,

    isTripNotAssignedToALineIgnored: (trip) =>
      options.ignoreTripNotAssignedToALine?.(trip) ?? false,
  });
}
