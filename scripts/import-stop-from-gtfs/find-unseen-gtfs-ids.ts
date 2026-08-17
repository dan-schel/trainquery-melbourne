import { type GtfsConfig, StopGtfsIdMapping } from "corequery-gtfs";
import type {
  StopsCsvTree,
  StopsCsvTreeNode,
} from "../utils/gtfs/stops-csv-tree.js";

export function findUnseenGtfsIds(
  stopsCsvTree: StopsCsvTree,
  suburbanGtfsConfig: GtfsConfig,
  regionalGtfsConfig: GtfsConfig,
): StopsCsvTreeNode[] {
  const result: StopsCsvTreeNode[] = [];

  const suburbanGtfsIdMapping = StopGtfsIdMapping.build(
    suburbanGtfsConfig.stopGtfsIds,
  );
  const regionalGtfsIdMapping = StopGtfsIdMapping.build(
    regionalGtfsConfig.stopGtfsIds,
  );

  for (const node of stopsCsvTree.nodes) {
    const isSuburban = suburbanGtfsIdMapping.tryResolve(node.stop_id) != null;
    const isRegional = regionalGtfsIdMapping.tryResolve(node.stop_id) != null;

    if (!isSuburban && !isRegional) {
      result.push(node);
    }
  }

  return result;
}
