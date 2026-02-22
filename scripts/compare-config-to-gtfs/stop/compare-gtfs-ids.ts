import type { StopConfig } from "corequery";
import type { StopGtfsIds } from "../../../src/config/third-party-id-mapping-types.js";
import type { StopsCsvTreeNode } from "../../utils/gtfs/stops-csv-tree.js";
import type { StopLintOptions } from "../comparison-options.js";
import type { IssueCollector } from "../issue-collector.js";
import { flattenStopsCsvTree } from "./utils/flatten-stops-csv-tree.js";
import { reverseMapGtfsIds } from "./utils/reverse-map-gtfs-ids.js";

export function compareStopGtfsIds(
  issues: IssueCollector,
  stopConfig: StopConfig,
  stopGtfs: StopsCsvTreeNode,
  stopGtfsIds: StopGtfsIds,
  stopOptions: StopLintOptions,
) {
  const gtfsIdList = flattenStopsCsvTree(stopGtfs);
  const configGtfsIdList = reverseMapGtfsIds(stopGtfsIds);

  for (const gtfsIdEntry of configGtfsIdList) {
    const match = gtfsIdList.find(
      (gtfsNode) => gtfsNode.stop_id === gtfsIdEntry.gtfsId,
    );

    if (match == null) {
      issues.add({
        message: `GTFS ID "${gtfsIdEntry.gtfsId}" mapped to ${stopConfig.name} (#${stopConfig.id}) no longer exists or isn't a child of "${stopGtfs.stop_id}".`,
      });
      continue;
    }
  }

  for (const gtfsNode of gtfsIdList) {
    const match = configGtfsIdList.find(
      (configEntry) => configEntry.gtfsId === gtfsNode.stop_id,
    );

    if (match == null) {
      issues.add({
        message: `GTFS ID "${gtfsNode.stop_id}" is not mapped to ${stopConfig.name} (#${stopConfig.id}) despite being a child of "${stopGtfs.stop_id}".`,
      });
    }
  }
}
