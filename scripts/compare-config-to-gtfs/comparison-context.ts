import type { LintableConfig } from "corequery";
import { readGtfs, type GtfsData } from "../../src/gtfs/schedule/read-gtfs.js";
import { StopsCsvTree } from "../utils/gtfs/stops-csv-tree.js";
import { withGtfsFiles } from "../../src/gtfs/schedule/with-gtfs-files.js";
import { lintableConfig } from "../../src/config/index.js";
import { IndexedStopTimes } from "../../src/gtfs/schedule/higher-order/indexed-stop-times.js";
import type {
  LineGtfsIdMapping,
  LinePtvApiIdMapping,
  StopGtfsIdMapping,
  StopPtvApiIdMapping,
} from "../../src/config/third-party-id-mapping-types.js";
import { stopGtfsIds } from "../../src/config/stops/stop-gtfs-ids.js";
import { stopPtvApiIds } from "../../src/config/stops/stop-ptv-api-ids.js";
import { lineGtfsIds } from "../../src/config/lines/line-gtfs-ids.js";
import { linePtvApiIds } from "../../src/config/lines/line-ptv-api-ids.js";
import { IssueCollector } from "./issue-collector.js";
import type { ComparisonOptions } from "./comparison-options.js";

export class ComparisonContext {
  readonly issues;

  constructor(
    readonly lintableConfig: LintableConfig,
    readonly stopGtfsIds: StopGtfsIdMapping,
    readonly stopPtvApiIds: StopPtvApiIdMapping,
    readonly lineGtfsIds: LineGtfsIdMapping,
    readonly linePtvApiIds: LinePtvApiIdMapping,
    readonly gtfsData: GtfsData,
    readonly stopsCsvTree: StopsCsvTree,
    readonly suburbanIndexedStopTimes: IndexedStopTimes,
    readonly regionalIndexedStopTimes: IndexedStopTimes,
    readonly options: ComparisonOptions,
  ) {
    this.issues = new IssueCollector();
  }

  static async build(relayKey: string, options: ComparisonOptions) {
    const gtfsData = await withGtfsFiles(relayKey, readGtfs);

    return new ComparisonContext(
      lintableConfig,
      stopGtfsIds,
      stopPtvApiIds,
      lineGtfsIds,
      linePtvApiIds,
      gtfsData,
      StopsCsvTree.fromGtfsData(gtfsData),
      IndexedStopTimes.build(gtfsData.suburban.stopTimes),
      IndexedStopTimes.build(gtfsData.regional.stopTimes),
      options,
    );
  }
}
