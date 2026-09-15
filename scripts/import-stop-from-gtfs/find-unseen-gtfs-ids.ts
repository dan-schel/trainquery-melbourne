import type {
  StopsCsvTree,
  StopsCsvTreeNode,
} from "../utils/gtfs/stops-csv-tree.js";
import type { MultifeedStopGtfsIdsConfig } from "../../src/gtfs/ids.js";

export function findUnseenGtfsIds(
  stopsCsvTree: StopsCsvTree,
  stopGtfsIds: MultifeedStopGtfsIdsConfig,
): StopsCsvTreeNode[] {
  const result: StopsCsvTreeNode[] = [];

  const allMappedIds = extractAllIds(stopGtfsIds);

  for (const node of stopsCsvTree.nodes) {
    if (!allMappedIds.has(node.stop_id)) {
      result.push(node);
    }
  }

  return result;
}

function extractAllIds(stopGtfsIds: MultifeedStopGtfsIdsConfig): Set<string> {
  const result = new Set<string>();
  addAllValuesInside(stopGtfsIds, result);
  return result;
}

function addAllValuesInside(value: unknown, set: Set<string>) {
  if (typeof value === "string") {
    set.add(value);
  } else if (Array.isArray(value)) {
    for (const item of value) {
      addAllValuesInside(item, set);
    }
  } else if (value != null && typeof value === "object") {
    for (const v of Object.values(value)) {
      addAllValuesInside(v, set);
    }
  }
}
