import { lineGtfsIds } from "./line-gtfs-ids.js";
import { lineRoutesMapping } from "./line-routes-mapping.js";
import { stopGtfsIds } from "./stop-gtfs-ids.js";
import type { GtfsConfig } from "../../gtfs/corequery-gtfs/config/index.js";
import { bonusLinesMapping } from "./bonus-lines-mapping.js";
import { timezoneData } from "./timezone-data.js";

export const gtfsConfig: GtfsConfig = {
  lineGtfsIds: lineGtfsIds,
  stopGtfsIds: stopGtfsIds,
  lineRoutesMapping: lineRoutesMapping,
  bonusLinesMapping: bonusLinesMapping,
  timezoneData: timezoneData,
};
