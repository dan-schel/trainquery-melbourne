import type { StopsCsvTree, StopsCsvTreeNode } from "./build-stops-csv-tree.js";

export function mergeRootsOfAllSubfeeds(
  subfeedTrees: StopsCsvTree[],
): StopsCsvTree {
  let merged: StopsCsvTree = [];
  for (const tree of subfeedTrees) {
    merged = mergeTrees(merged, tree);
  }
  return merged;
}

function mergeTrees(a: StopsCsvTree, b: StopsCsvTree): StopsCsvTree {
  const map = new Map<string, StopsCsvTreeNode>();
  for (const node of a) {
    map.set(node.stop_id, node);
  }
  for (const node of b) {
    const existingNode = map.get(node.stop_id);
    if (existingNode) {
      const mergedNode = mergeLikeNodes(existingNode, node);
      map.set(node.stop_id, mergedNode);
    } else {
      map.set(node.stop_id, node);
    }
  }
  return Array.from(map.values());
}

function mergeLikeNodes(
  a: StopsCsvTreeNode,
  b: StopsCsvTreeNode,
): StopsCsvTreeNode {
  const children = mergeTrees(a.children, b.children);
  const betterNode = selectBetterNode(a, b);
  return {
    ...betterNode,
    children,
  };
}

function selectBetterNode(a: StopsCsvTreeNode, b: StopsCsvTreeNode) {
  function hasPlatformCode(node: StopsCsvTreeNode) {
    return node.platform_code != null && node.platform_code.length > 0;
  }

  // Prefer nodes with a platform code defined.
  if (hasPlatformCode(a) && !hasPlatformCode(b)) return a;
  if (hasPlatformCode(b) && !hasPlatformCode(a)) return b;

  return a;
}
