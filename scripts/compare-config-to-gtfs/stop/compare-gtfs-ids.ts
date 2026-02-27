import type { IssueCollector } from "../issue-collector.js";
import { flattenStopsCsvTree } from "./utils/flatten-stops-csv-tree.js";
import type { StopConfig } from "corequery";
import { StopGtfsIdCollection } from "../../../src/gtfs/ids/stop-gtfs-id-collection.js";
import type { StopsCsvTreeNode } from "../../utils/gtfs/stops-csv-tree.js";
import { compareArrays } from "@dan-schel/js-utils";
import type { StopGtfsIdMetadata } from "../../../src/gtfs/ids/stop-gtfs-id-metadata.js";

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
      message: `GTFS ID "${row.stop_id}" belonging to ${config.name} (#${config.id}) found in GTFS but not mapped.`,
    });
  }

  function reportMissingFromActualGtfs(mappedId: StopGtfsIdMetadata) {
    if (isIdMissingFromGtfsIgnored(mappedId)) return;
    issues.add({
      message: `GTFS ID "${mappedId.id}" mapped to ${config.name} (#${config.id}) no found in GTFS.`,
    });
  }

  const actualGtfsIdList = flattenStopsCsvTree(gtfsNode);

  compareArrays({
    a: actualGtfsIdList,
    b: mappedIds.all(),

    // Note: We're not comparing the ID types, or the platform codes here. Just
    // checking that the list of IDs matches up.
    aKeyFunc: (a) => a.stop_id,
    bKeyFunc: (b) => b.id,

    onMissingFromA: reportMissingFromActualGtfs,
    onMissingFromB: reportMissingFromConfig,
  });
}
