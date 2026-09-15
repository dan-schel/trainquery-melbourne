import { lineGtfsIds } from "./line-gtfs-ids.js";
import { lineRoutesMapping } from "./line-routes-mapping.js";
import { stopGtfsIds } from "./stop-gtfs-ids.js";
import type { GtfsConfig } from "corequery-gtfs";
import { bonusLinesMapping } from "./bonus-lines-mapping.js";
import { timezoneData } from "./timezone-data.js";
import {
  convertToCorequeryGtfsLineIdsConfig,
  convertToCorequeryGtfsStopIdsConfig,
  splitMultifeedIdConfig,
} from "../../gtfs/ids.js";

const splitLineGtfsIds = splitMultifeedIdConfig(lineGtfsIds);
const splitStopGtfsIds = splitMultifeedIdConfig(stopGtfsIds);

export const suburbanGtfsConfig: GtfsConfig = {
  lineGtfsIds: convertToCorequeryGtfsLineIdsConfig(splitLineGtfsIds.suburban),
  stopGtfsIds: convertToCorequeryGtfsStopIdsConfig(splitStopGtfsIds.suburban),
  lineRoutesMapping: lineRoutesMapping,
  bonusLinesMapping: bonusLinesMapping,
  timezoneData: timezoneData,
};

export const regionalGtfsConfig: GtfsConfig = {
  lineGtfsIds: convertToCorequeryGtfsLineIdsConfig(splitLineGtfsIds.regional),
  stopGtfsIds: convertToCorequeryGtfsStopIdsConfig(splitStopGtfsIds.regional),
  lineRoutesMapping: lineRoutesMapping,
  bonusLinesMapping: bonusLinesMapping,
  timezoneData: timezoneData,
};
