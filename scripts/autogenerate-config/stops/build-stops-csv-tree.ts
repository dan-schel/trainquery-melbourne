import { type StopsCsv, type StopsCsvRow } from "../gtfs/csv-schemas.js";

export type StopsCsvTreeNode = StopsCsvRow & {
  readonly children: StopsCsvTree;
};
export type StopsCsvTree = readonly StopsCsvTreeNode[];

export function buildStopsCsvTree(allRows: StopsCsv): StopsCsvTree {
  type MutableStopsCsvTreeNode = StopsCsvRow & {
    readonly children: MutableStopsCsvTreeNode[];
  };

  const tree = new Map<string, MutableStopsCsvTreeNode>();
  for (const row of allRows) {
    tree.set(row.stop_id, { ...row, children: [] });
  }

  for (const node of tree.values()) {
    if (node.parent_station === "") continue;

    const parentNode = tree.get(node.parent_station);
    if (parentNode == null) throw new Error(`Orphaned node: ${node.stop_id}`);

    parentNode.children.push(node);
  }

  const nodes = Array.from(tree.values());
  const topLevelNodes = nodes.filter((n) => n.parent_station === "");
  return topLevelNodes;
}
