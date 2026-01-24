import { unique } from "@dan-schel/js-utils";
import { isPresent } from "../utils/is-present.js";
import type { StopsCsvTree, StopsCsvTreeNode } from "./build-stops-csv-tree.js";
import type { Subfeed } from "../utils/subfeed.js";

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
    if (existingNode != null) {
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
    subfeeds: unique<Subfeed>([...a.subfeeds, ...b.subfeeds]),
  };
}

function selectBetterNode(a: StopsCsvTreeNode, b: StopsCsvTreeNode) {
  // Prefer nodes with a platform code defined.
  if (isPresent(a.platform_code) && !isPresent(b.platform_code)) return a;
  if (isPresent(b.platform_code) && !isPresent(a.platform_code)) return b;

  return a;
}
