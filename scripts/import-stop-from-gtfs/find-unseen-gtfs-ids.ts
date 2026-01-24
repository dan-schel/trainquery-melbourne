import type { StopGtfsIdMapping } from "../../src/config/third-party-id-mapping-types.js";
import type {
  StopsCsvTree,
  StopsCsvTreeNode,
} from "../utils/gtfs/stops-csv-tree.js";

export function findUnseenGtfsIds(
  stopsCsvTree: StopsCsvTree,
  mappedGtfsIds: StopGtfsIdMapping,
): StopsCsvTreeNode[] {
  const result: StopsCsvTreeNode[] = [];

  const knownGtfsIds = new Set<string>();

  for (const mapping of Object.values(mappedGtfsIds)) {
    knownGtfsIds.add(mapping.parent);

    const otherIdLists = [
      mapping.general ?? [],
      mapping.replacementBus ?? [],
      ...Object.values(mapping.platforms ?? {}),
    ];

    otherIdLists.flat().forEach((id) => knownGtfsIds.add(id));
  }

  for (const node of stopsCsvTree.nodes) {
    if (!knownGtfsIds.has(node.stop_id)) {
      result.push(node);
    }
  }

  return result;
}
