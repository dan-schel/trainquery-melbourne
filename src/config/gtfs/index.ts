import { lineGtfsIds } from "./line-gtfs-ids.js";
import { lineRoutesMapping } from "./line-routes-mapping.js";
import { stopGtfsIds } from "./stop-gtfs-ids.js";
import type { GtfsConfig } from "../../gtfs/corequery-gtfs/config/index.js";
import { bonusLinesMapping } from "./bonus-lines-mapping.js";
import { timezoneData } from "./timezone-data.js";
import {
  splitMultifeedLineGtfsIdsConfig,
  splitMultifeedStopGtfsIdsConfig,
} from "../../gtfs/ids.js";

const { suburban: suburbanLineGtfsIds, regional: regionalLineGtfsIds } =
  splitMultifeedLineGtfsIdsConfig(lineGtfsIds);

const { suburban: suburbanStopGtfsIds, regional: regionalStopGtfsIds } =
  splitMultifeedStopGtfsIdsConfig(stopGtfsIds);

export const suburbanGtfsConfig: GtfsConfig = {
  lineGtfsIds: suburbanLineGtfsIds,
  stopGtfsIds: suburbanStopGtfsIds,
  lineRoutesMapping: lineRoutesMapping,
  bonusLinesMapping: bonusLinesMapping,
  timezoneData: timezoneData,
};

export const regionalGtfsConfig: GtfsConfig = {
  lineGtfsIds: regionalLineGtfsIds,
  stopGtfsIds: regionalStopGtfsIds,
  lineRoutesMapping: lineRoutesMapping,
  bonusLinesMapping: bonusLinesMapping,
  timezoneData: timezoneData,
};
