import type { LineConfig } from "corequery";
import { compareArrays, nonNull } from "@dan-schel/js-utils";
import type { IssueCollector } from "../issue-collector.js";
import type { LineGtfsIdMapping, LineGtfsIdCollection } from "corequery-gtfs";
import type {
  FullRoutesCsv,
  FullRoutesCsvRow,
} from "../../../src/gtfs/retrieval/schedule/csv-schemas.js";

type OnMatchCallback = (
  config: LineConfig,
  mappedIds: LineGtfsIdCollection,
  gtfsRow: FullRoutesCsvRow,
) => void;

export function compareLineItems({
  lines,
  idMapping,
  gtfsRoutes,
  issues,
  onMatch,
  isLineMissingFromConfigIgnored,
  isLineMissingFromGtfsIgnored,
}: {
  lines: readonly LineConfig[];
  idMapping: LineGtfsIdMapping;
  gtfsRoutes: FullRoutesCsv;
  issues: IssueCollector;
  onMatch: OnMatchCallback;
  isLineMissingFromConfigIgnored: (gtfsId: FullRoutesCsvRow) => boolean;
  isLineMissingFromGtfsIgnored: (config: LineConfig) => boolean;
}) {
  function reportLineMissingFromGtfs(
    config: LineConfig,
    mappedIds: LineGtfsIdCollection,
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
    if (idMapping.tryResolve(line.route_id) != null) return;

    if (isLineMissingFromConfigIgnored(line)) return;

    issues.add({
      category: "Additional lines found in GTFS",
      message: `Additional line "${line.route_long_name}" ("${line.route_id}") found in GTFS.`,
    });
  }

  const linesWithGtfsIds = mapToGtfsIds(lines, idMapping);

  compareArrays({
    a: linesWithGtfsIds,
    b: gtfsRoutes,
    aKeyFunc: (s) => s.gtfsId.primary,
    bKeyFunc: (s) => s.route_id,
    onMatch: (a, b) => onMatch(a.line, a.gtfsId, b),
    onMissingFromA: (b) => reportLineMissingFromConfig(b),
    onMissingFromB: (a) => reportLineMissingFromGtfs(a.line, a.gtfsId),
  });
}

function mapToGtfsIds(
  lines: readonly LineConfig[],
  idMapping: LineGtfsIdMapping,
) {
  return lines
    .map((line) => {
      const gtfsId = idMapping.getForLine(line.id);
      if (gtfsId == null) return null;
      return { line, gtfsId };
    })
    .filter(nonNull);
}
