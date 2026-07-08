import { lineGtfsIds } from "./line-gtfs-ids.js";
import { lineRoutes } from "./line-routes.js";
import { stopGtfsIds } from "./stop-gtfs-ids.js";
import type { GtfsConfig } from "../../gtfs/config/index.js";

export const gtfsConfig: GtfsConfig = {
  lineGtfsIds: lineGtfsIds,
  stopGtfsIds: stopGtfsIds,
  lineRoutes: lineRoutes,
};
