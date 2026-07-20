import type { LineGtfsIdsConfig, StopGtfsIdsConfig } from "./ids.js";
import type { LineOverridesConfig, LineRoutesConfig } from "./routes.js";

export type GtfsConfig = {
  readonly lineGtfsIds: LineGtfsIdsConfig;
  readonly stopGtfsIds: StopGtfsIdsConfig;
  readonly lineRoutes: LineRoutesConfig;
  readonly lineOverrides?: LineOverridesConfig;
};
