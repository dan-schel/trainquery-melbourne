import type { Subfeed } from "../../src/gtfs/schedule/utils/subfeed.js";
import { lintableConfig } from "../../src/config/index.js";
import { StopGtfsIdMapping } from "../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import { stopGtfsIds } from "../../src/config/stops/stop-gtfs-ids.js";
import { LineGtfsIdMapping } from "../../src/gtfs/ids/line-gtfs-id-mapping.js";
import { lineGtfsIds } from "../../src/config/lines/line-gtfs-ids.js";
import {
  getSubfeedsWithLine,
  getSubfeedsWithStop,
} from "../../src/gtfs/utils/get-subfeeds-with.js";

export function extractConfigForSubfeed(subfeed: Subfeed) {
  return {
    stops: lintableConfig.stops.filter((x) => getSubfeedsWithStop(x)[subfeed]),
    lines: lintableConfig.lines.filter((x) => getSubfeedsWithLine(x)[subfeed]),
    stopIdMapping: StopGtfsIdMapping.build(stopGtfsIds, subfeed),
    lineIdMapping: LineGtfsIdMapping.build(lineGtfsIds, subfeed),
  };
}
