import type {
  StopsCsvTree,
  StopsCsvTreeNode,
} from "../utils/gtfs/stops-csv-tree.js";
import type { TrainqueryMultifeedStopGtfsIdsConfig } from "../../src/gtfs/ids.js";
import { extractAllStringValues } from "../utils/gtfs/extract-all-string-values.js";

export function findUnseenGtfsIds(
  stopsCsvTree: StopsCsvTree,
  stopGtfsIds: TrainqueryMultifeedStopGtfsIdsConfig,
): StopsCsvTreeNode[] {
  const result: StopsCsvTreeNode[] = [];

  const allMappedIds = extractAllStringValues(stopGtfsIds);

  for (const node of stopsCsvTree.nodes) {
    if (!allMappedIds.has(node.stop_id)) {
      result.push(node);
    }
  }

  return result;
}
