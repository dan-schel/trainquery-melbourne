import type { Subfeed } from "../../src/gtfs/schedule/utils/subfeed.js";
import { lintableConfig } from "../../src/config/corequery/index.js";
import { StopGtfsIdMapping } from "../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import { stopGtfsIds } from "../../src/config/gtfs/stop-gtfs-ids.js";
import { LineGtfsIdMapping } from "../../src/gtfs/ids/line-gtfs-id-mapping.js";
import { lineGtfsIds } from "../../src/config/gtfs/line-gtfs-ids.js";
import {
  getSubfeedsWithLine,
  getSubfeedsWithStop,
} from "../../src/gtfs/utils/get-subfeeds-with.js";
import { lineRoutes } from "../../src/config/gtfs/routes.js";

export function extractConfigForSubfeed(subfeed: Subfeed) {
  return {
    stops: lintableConfig.stops.filter((x) => getSubfeedsWithStop(x)[subfeed]),
    lines: lintableConfig.lines.filter((x) => getSubfeedsWithLine(x)[subfeed]),
    stopIdMapping: StopGtfsIdMapping.build(stopGtfsIds, subfeed),
    lineIdMapping: LineGtfsIdMapping.build(lineGtfsIds, subfeed),
    routes: lineRoutes,
  };
}
