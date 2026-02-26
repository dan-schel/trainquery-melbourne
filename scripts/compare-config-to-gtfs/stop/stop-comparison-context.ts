import type { StopConfig } from "corequery";
import type { StopGtfsIdsBySubfeedConfig } from "../../../src/config/third-party-id-mapping-types.js";
import type { StopsCsvTreeNode } from "../../utils/gtfs/stops-csv-tree.js";
import type { ComparisonContext } from "../comparison-context.js";
import type { StopLintOptions } from "../comparison-options.js";

export type StopComparisonContext = ComparisonContext & {
  currentStop: {
    config: StopConfig;
    gtfs: StopsCsvTreeNode;
    gtfsIds: StopGtfsIdsBySubfeedConfig;
    options: StopLintOptions;
  };
};
