// import { type StopsCsv, type StopsCsvRow } from "../gtfs/csv-schemas.js";
// import type { Subfeed } from "../utils/subfeed.js";

// export type StopsCsvTreeNode = StopsCsvRow & {
//   readonly children: StopsCsvTree;
//   readonly subfeeds: readonly Subfeed[];
// };

// type MutableStopsCsvTreeNode = StopsCsvRow & {
//   readonly children: MutableStopsCsvTreeNode[];
//   readonly subfeeds: readonly Subfeed[];
// };

// export type StopsCsvTree = readonly StopsCsvTreeNode[];

// export function buildStopsCsvTree(
//   rows: StopsCsv,
//   subfeed: Subfeed,
// ): StopsCsvTree {
//   const tree = new Map<string, MutableStopsCsvTreeNode>();
//   for (const row of rows) {
//     tree.set(row.stop_id, { ...row, children: [], subfeeds: [subfeed] });
//   }

//   for (const node of tree.values()) {
//     if (node.parent_station === "") continue;

//     const parentNode = tree.get(node.parent_station);
//     if (parentNode == null) throw new Error(`Orphaned node: ${node.stop_id}`);

//     parentNode.children.push(node);
//   }

//   const nodes = Array.from(tree.values());
//   const topLevelNodes = nodes.filter((n) => n.parent_station === "");
//   return topLevelNodes;
// }
