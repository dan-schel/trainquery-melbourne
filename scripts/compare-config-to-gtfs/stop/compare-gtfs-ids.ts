import type { IssueCollector } from "../issue-collector.js";
import { flattenStopsCsvTree } from "./utils/flatten-stops-csv-tree.js";
import type { StopConfig } from "corequery";
import { StopGtfsIdCollection, type StopGtfsIdMetadata } from "corequery-gtfs";
import type { StopsCsvTreeNode } from "../../utils/gtfs/stops-csv-tree.js";
import { compareArrays } from "@dan-schel/js-utils";

export function compareStopGtfsIds({
  config,
  mappedIds,
  gtfsNode,
  issues,
  isIdMissingFromConfigIgnored,
  isIdMissingFromGtfsIgnored,
}: {
  config: StopConfig;
  mappedIds: StopGtfsIdCollection;
  gtfsNode: StopsCsvTreeNode;
  issues: IssueCollector;
  isIdMissingFromConfigIgnored: (gtfsId: StopsCsvTreeNode) => boolean;
  isIdMissingFromGtfsIgnored: (gtfsId: StopGtfsIdMetadata) => boolean;
}) {
  function reportMissingFromConfig(row: StopsCsvTreeNode) {
    if (isIdMissingFromConfigIgnored(row)) return;
    issues.add({
      category: "Child GTFS stop IDs not mapped",
      message: `GTFS ID "${row.stop_id}" ("${row.stop_name}", platform code: ${JSON.stringify(row.platform_code)}) belonging to ${config.name} (#${config.id}) found in GTFS but not mapped.`,
    });
  }

  function reportMissingFromActualGtfs(mappedId: StopGtfsIdMetadata) {
    if (isIdMissingFromGtfsIgnored(mappedId)) return;
    issues.add({
      category: "Mapped GTFS stop IDs not found in GTFS",
      message: `GTFS ID "${mappedId.id}" mapped to ${config.name} (#${config.id}) not found in GTFS.`,
    });
  }

  const actualGtfsIdList = flattenStopsCsvTree(gtfsNode);

  compareArrays({
    a: actualGtfsIdList,
    b: mappedIds.all(),

    // Note: We're not comparing the ID types, or the platform codes here. Just
    // checking that the list of IDs matches up.
    //
    // TODO: Checking platform_code should be implemented too though, maybe as
    // a separate check.
    aKeyFunc: (a) => a.stop_id,
    bKeyFunc: (b) => b.id,

    onMissingFromA: reportMissingFromActualGtfs,
    onMissingFromB: reportMissingFromConfig,
  });
}
