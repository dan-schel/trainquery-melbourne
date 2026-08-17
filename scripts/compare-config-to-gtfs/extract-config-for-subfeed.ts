import type { Subfeed } from "../../src/gtfs/subfeed.js";
import { lintableConfig } from "../../src/config/corequery/lintable-config.js";
import { StopGtfsIdMapping, LineGtfsIdMapping } from "corequery-gtfs";
import {
  getSubfeedsWithLine,
  getSubfeedsWithStop,
} from "../../src/gtfs/utils/get-subfeeds-with.js";
import {
  regionalGtfsConfig,
  suburbanGtfsConfig,
} from "../../src/config/gtfs/index.js";

export function extractConfigForSubfeed(subfeed: Subfeed) {
  const stopGtfsIds = {
    suburban: suburbanGtfsConfig.stopGtfsIds,
    regional: regionalGtfsConfig.stopGtfsIds,
  }[subfeed];

  const lineGtfsIds = {
    suburban: suburbanGtfsConfig.lineGtfsIds,
    regional: regionalGtfsConfig.lineGtfsIds,
  }[subfeed];

  const lineRoutesMapping = {
    suburban: suburbanGtfsConfig.lineRoutesMapping,
    regional: regionalGtfsConfig.lineRoutesMapping,
  }[subfeed];

  return {
    stops: lintableConfig.stops.filter((x) => getSubfeedsWithStop(x)[subfeed]),
    lines: lintableConfig.lines.filter((x) => getSubfeedsWithLine(x)[subfeed]),
    stopIdMapping: StopGtfsIdMapping.build(stopGtfsIds),
    lineIdMapping: LineGtfsIdMapping.build(lineGtfsIds),
    routes: lineRoutesMapping,
  };
}
