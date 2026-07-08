import type { LineGtfsIdsConfig, StopGtfsIdsConfig } from "./ids.js";
import type { LineRoutesConfig } from "./routes.js";

export type GtfsConfig = {
  lineGtfsIds: LineGtfsIdsConfig;
  stopGtfsIds: StopGtfsIdsConfig;
  lineRoutes: LineRoutesConfig;
};
