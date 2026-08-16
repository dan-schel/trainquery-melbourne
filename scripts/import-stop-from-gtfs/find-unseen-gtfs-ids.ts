import type { GtfsConfig } from "../../src/gtfs/corequery-gtfs/config/index.js";
import { StopGtfsIdMapping } from "../../src/gtfs/corequery-gtfs/data/ids/stop-gtfs-id-mapping.js";
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
