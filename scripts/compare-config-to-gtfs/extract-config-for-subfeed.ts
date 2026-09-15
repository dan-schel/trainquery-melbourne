import type { Subfeed } from "../../src/gtfs/subfeed.js";
import { lintableConfig } from "../../src/config/corequery/lintable-config.js";
import {
  getSubfeedsWithLine,
  getSubfeedsWithStop,
} from "../../src/gtfs/utils/get-subfeeds-with.js";
import {
  regionalGtfsConfig,
  suburbanGtfsConfig,
} from "../../src/config/gtfs/index.js";
import { splitMultifeedIdConfig } from "../../src/gtfs/ids.js";
import { stopGtfsIds } from "../../src/config/gtfs/stop-gtfs-ids.js";
import { lineGtfsIds } from "../../src/config/gtfs/line-gtfs-ids.js";

export function extractConfigForSubfeed(subfeed: Subfeed) {
  const lineRoutesMapping = {
    suburban: suburbanGtfsConfig.lineRoutesMapping,
    regional: regionalGtfsConfig.lineRoutesMapping,
  }[subfeed];

  return {
    stops: lintableConfig.stops.filter((x) => getSubfeedsWithStop(x)[subfeed]),
    lines: lintableConfig.lines.filter((x) => getSubfeedsWithLine(x)[subfeed]),
    stopGtfsIdsConfig: splitMultifeedIdConfig(stopGtfsIds)[subfeed],
    lineGtfsIdsConfig: splitMultifeedIdConfig(lineGtfsIds)[subfeed],
    routes: lineRoutesMapping,
  };
}
