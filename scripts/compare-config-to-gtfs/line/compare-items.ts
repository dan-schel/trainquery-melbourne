import type { LineConfig } from "corequery";
import { compareArrays, groupBy, nonNull } from "@dan-schel/js-utils";
import type { IssueCollector } from "../issue-collector.js";
import type { LineGtfsIdMapping } from "../../../src/gtfs/ids/line-gtfs-id-mapping.js";
import type { LineGtfsIdCollection } from "../../../src/gtfs/ids/line-gtfs-id-collection.js";
import type {
  RoutesCsv,
  RoutesCsvRow,
} from "../../../src/gtfs/schedule/csv-schemas.js";

type OnMatchCallback = (
  config: LineConfig,
  mappedIds: LineGtfsIdCollection,
  gtfsRow: RoutesCsvRow,
) => void;

export function compareLineItems({
  lines,
  idMapping,
  gtfsRoutes,
  issues,
  onMatch,
  isLineMissingFromConfigIgnored,
  isLineMissingFromGtfsIgnored,
  isLineWithNoConfiguredGtfsIdIgnored,
}: {
  lines: readonly LineConfig[];
  idMapping: LineGtfsIdMapping;
  gtfsRoutes: RoutesCsv;
  issues: IssueCollector;
  onMatch: OnMatchCallback;
  isLineWithNoConfiguredGtfsIdIgnored: (config: LineConfig) => boolean;
  isLineMissingFromConfigIgnored: (gtfsId: RoutesCsvRow) => boolean;
  isLineMissingFromGtfsIgnored: (config: LineConfig) => boolean;
}) {
  // TODO: Theoretically, this doesn't belong here. It could be caught in a unit
  // test.
  function reportUnmappedLine(config: LineConfig) {
    if (isLineWithNoConfiguredGtfsIdIgnored(config)) return;
    issues.add({
      message: `No GTFS ID configured for ${config.name} (#${config.id}).`,
    });
  }

  function reportLineMissingFromGtfs(
    config: LineConfig,
    mappedIds: LineGtfsIdCollection,
  ) {
    if (isLineMissingFromGtfsIgnored(config)) return;
    issues.add({
      message: `GTFS ID "${mappedIds.primary}" belonging to ${config.name} (#${config.id}) not found in GTFS.`,
    });
  }

  function reportLineMissingFromConfig(line: RoutesCsvRow) {
    // The `compareArrays` below is only comparing against GTFS IDs mapped as
    // "primary" IDs, so let's check first if it's mapped as a non-primary ID
    // before declaring it "missing".
    if (idMapping.tryResolve(line.route_id) != null) return;

    if (isLineMissingFromConfigIgnored(line)) return;

    issues.add({
      message: `Additional line "${line.route_long_name}" ("${line.route_id}") found in GTFS.`,
    });
  }

  const linesWithGtfsIds = mapToGtfsIds(lines, idMapping, reportUnmappedLine);

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
  onUnmappedLine: (config: LineConfig) => void,
) {
  return lines
    .map((line) => {
      const gtfsId = idMapping.getForLine(line.id);
      if (gtfsId != null) return { line, gtfsId };

      onUnmappedLine(line);
      return null;
    })
    .filter(nonNull);
}
