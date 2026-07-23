import type { LineGtfsIdsConfig, StopGtfsIdsConfig } from "./ids.js";
import type { BonusLinesMappingConfig, LineRoutesConfig } from "./routes.js";

export type GtfsConfig = {
  readonly lineGtfsIds: LineGtfsIdsConfig;
  readonly stopGtfsIds: StopGtfsIdsConfig;
  readonly lineRoutes: LineRoutesConfig;
  readonly bonusLinesMapping?: BonusLinesMappingConfig;
};
