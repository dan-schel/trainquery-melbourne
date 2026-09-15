import type { LineConfig } from "corequery";
import { compareArrays, nonNull } from "@dan-schel/js-utils";
import type { IssueCollector } from "../issue-collector.js";
import type {
  FullRoutesCsv,
  FullRoutesCsvRow,
} from "../../../src/gtfs/retrieval/schedule/csv-schemas.js";
import type {
  TrainqueryLineGtfsIdCollectionConfig,
  TrainqueryLineGtfsIdsConfig,
} from "../../../src/gtfs/ids.js";
import { extractAllStringValues } from "../../utils/gtfs/extract-all-string-values.js";

type OnMatchCallback = (
  config: LineConfig,
  mappedIds: TrainqueryLineGtfsIdCollectionConfig,
  gtfsRow: FullRoutesCsvRow,
) => void;

export function compareLineItems({
  lines,
  lineGtfsIdsConfig,
  gtfsRoutes,
  issues,
  onMatch,
  isLineMissingFromConfigIgnored,
  isLineMissingFromGtfsIgnored,
}: {
  lines: readonly LineConfig[];
  lineGtfsIdsConfig: TrainqueryLineGtfsIdsConfig;
  gtfsRoutes: FullRoutesCsv;
  issues: IssueCollector;
  onMatch: OnMatchCallback;
  isLineMissingFromConfigIgnored: (gtfsId: FullRoutesCsvRow) => boolean;
  isLineMissingFromGtfsIgnored: (config: LineConfig) => boolean;
}) {
  const allMappedLineIds = extractAllStringValues(lineGtfsIdsConfig);

  function reportLineMissingFromGtfs(
    config: LineConfig,
    mappedIds: TrainqueryLineGtfsIdCollectionConfig,
  ) {
    if (isLineMissingFromGtfsIgnored(config)) return;
    issues.add({
      category: "Lines not found in GTFS",
      message: `GTFS ID "${mappedIds.primary}" mapped to ${config.name} (#${config.id}) not found in GTFS.`,
    });
  }

  function reportLineMissingFromConfig(line: FullRoutesCsvRow) {
    // The `compareArrays` below is only comparing against GTFS IDs mapped as
    // "primary" IDs, so let's check first if it's mapped as a non-primary ID
    // before declaring it "missing".
    if (allMappedLineIds.has(line.route_id)) return;

    if (isLineMissingFromConfigIgnored(line)) return;

    issues.add({
      category: "Additional lines found in GTFS",
      message: `Additional line "${line.route_long_name}" ("${line.route_id}") found in GTFS.`,
    });
  }

  const linesWithGtfsIds = mapToGtfsIds(lines, lineGtfsIdsConfig);

  compareArrays({
    a: linesWithGtfsIds,
    b: gtfsRoutes,
    aKeyFunc: (s) => s.gtfsIds.primary,
    bKeyFunc: (s) => s.route_id,
    onMatch: (a, b) => onMatch(a.line, a.gtfsIds, b),
    onMissingFromA: (b) => reportLineMissingFromConfig(b),
    onMissingFromB: (a) => reportLineMissingFromGtfs(a.line, a.gtfsIds),
  });
}

function mapToGtfsIds(
  lines: readonly LineConfig[],
  lineGtfsIdsConfig: TrainqueryLineGtfsIdsConfig,
) {
  return lines
    .map((line) => {
      const gtfsIds = lineGtfsIdsConfig[line.id] ?? null;
      if (gtfsIds == null) return null;
      return { line, gtfsIds };
    })
    .filter(nonNull);
}
