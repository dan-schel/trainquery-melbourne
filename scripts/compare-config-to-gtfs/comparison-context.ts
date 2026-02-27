import type { LintableConfig } from "corequery";
import { readGtfs, type GtfsData } from "../../src/gtfs/schedule/read-gtfs.js";
import { StopsCsvTree } from "../utils/gtfs/stops-csv-tree.js";
import { withGtfsFiles } from "../../src/gtfs/schedule/with-gtfs-files.js";
import { lintableConfig } from "../../src/config/index.js";
import { IndexedStopTimes } from "../../src/gtfs/schedule/higher-order/indexed-stop-times.js";
import type {
  LineGtfsIdsConfig,
  LinePtvApiIdsConfig,
  StopGtfsIdsConfig,
  StopPtvApiIdsConfig,
} from "../../src/config/third-party-id-mapping-types.js";
import { stopGtfsIds } from "../../src/config/stops/stop-gtfs-ids.js";
import { stopPtvApiIds } from "../../src/config/stops/stop-ptv-api-ids.js";
import { lineGtfsIds } from "../../src/config/lines/line-gtfs-ids.js";
import { linePtvApiIds } from "../../src/config/lines/line-ptv-api-ids.js";
import type { ComparisonOptions } from "./comparison-options.js";

export type ComparisonContext = {
  readonly lintableConfig: LintableConfig;
  readonly stopGtfsIds: StopGtfsIdsConfig;
  readonly stopPtvApiIds: StopPtvApiIdsConfig;
  readonly lineGtfsIds: LineGtfsIdsConfig;
  readonly linePtvApiIds: LinePtvApiIdsConfig;
  readonly gtfsData: GtfsData;
  readonly stopsCsvTree: StopsCsvTree;
  readonly suburbanIndexedStopTimes: IndexedStopTimes;
  readonly regionalIndexedStopTimes: IndexedStopTimes;
  readonly options: ComparisonOptions;
};

export async function buildComparisonContext(
  relayKey: string,
  options: ComparisonOptions,
): Promise<ComparisonContext> {
  const gtfsData = await withGtfsFiles(relayKey, readGtfs);

  const stopsCsvTree = StopsCsvTree.buildCombined(gtfsData);
  const suburbanIndexedStopTimes = IndexedStopTimes.build(
    gtfsData.suburban.stopTimes,
  );
  const regionalIndexedStopTimes = IndexedStopTimes.build(
    gtfsData.regional.stopTimes,
  );

  return {
    lintableConfig,
    stopGtfsIds,
    stopPtvApiIds,
    lineGtfsIds,
    linePtvApiIds,
    gtfsData,
    stopsCsvTree,
    suburbanIndexedStopTimes,
    regionalIndexedStopTimes,
    options,
  };
}
