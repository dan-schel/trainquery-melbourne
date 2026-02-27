import type { LineConfig, StopConfig } from "corequery";
import type { ComparisonOptions } from "./comparison-options.js";
import { IssueCollector } from "./issue-collector.js";
import { compareLines } from "./line/index.js";
import { compareStops } from "./stop/index.js";
import type { GtfsFeed } from "../../src/gtfs/schedule/read-gtfs.js";
import type { StopGtfsIdMapping } from "../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import type { LineGtfsIdMapping } from "../../src/gtfs/ids/line-gtfs-id-mapping.js";

export function compareSubfeed({
  stops,
  lines,
  stopIdMapping,
  lineIdMapping,
  gtfsFeed,
  issues,
  options,
}: {
  stops: readonly StopConfig[];
  lines: readonly LineConfig[];
  stopIdMapping: StopGtfsIdMapping;
  lineIdMapping: LineGtfsIdMapping;
  gtfsFeed: GtfsFeed;
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
    gtfsRoutes: gtfsFeed.routes,
    gtfsTrips: gtfsFeed.trips,
    gtfsStopTimes: gtfsFeed.stopTimes,
    issues,

    getOptionsForLine: (lineId) => ({
      ...options.lines?.all,
      ...options.lines?.[lineId],
    }),

    isLineMissingFromConfigIgnored: (n) =>
      options.ignoredGtfsRouteIdsMissingFromConfig?.includes(n.route_id) ??
      false,
  });
}
