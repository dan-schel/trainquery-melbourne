import type { StopsCsvTreeNode } from "../../../utils/gtfs/stops-csv-tree.js";

export function flattenStopsCsvTree(node: StopsCsvTreeNode) {
  const result: StopsCsvTreeNode[] = [];

  function recurse(currentNode: StopsCsvTreeNode) {
    result.push(currentNode);

    for (const child of currentNode.children) {
      recurse(child);
    }
  }

  recurse(node);

  return result;
}
