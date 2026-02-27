import type { StopGtfsIdsConfig } from "../../src/config/third-party-id-mapping-types.js";
import { StopGtfsIdMapping } from "../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import type {
  StopsCsvTree,
  StopsCsvTreeNode,
} from "../utils/gtfs/stops-csv-tree.js";

export function findUnseenGtfsIds(
  stopsCsvTree: StopsCsvTree,
  mappedGtfsIds: StopGtfsIdsConfig,
): StopsCsvTreeNode[] {
  const result: StopsCsvTreeNode[] = [];

  const suburbanGtfsIds = StopGtfsIdMapping.build(mappedGtfsIds, "suburban");
  const regionalGtfsIds = StopGtfsIdMapping.build(mappedGtfsIds, "regional");

  for (const node of stopsCsvTree.nodes) {
    const resolvesAsSuburban = suburbanGtfsIds.tryResolve(node.stop_id) != null;
    const resolvesAsRegional = regionalGtfsIds.tryResolve(node.stop_id) != null;

    if (!resolvesAsSuburban && !resolvesAsRegional) {
      result.push(node);
    }
  }

  return result;
}
