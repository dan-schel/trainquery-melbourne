import type { LineConfig } from "corequery";
import type { LineAllGtfsIdCollectionConfig } from "../../../src/config/third-party-id-mapping-types.js";
import type { ComparisonContext } from "../comparison-context.js";
import type { LineLintOptions } from "../comparison-options.js";
import type { RoutesCsvRow } from "../../../src/gtfs/schedule/csv-schemas.js";

export type LineComparisonContext = ComparisonContext & {
  currentLine: {
    config: LineConfig;
    routesGtfs: readonly RoutesCsvRow[];
    gtfsIds: LineAllGtfsIdCollectionConfig;
    options: LineLintOptions;
  };
};
