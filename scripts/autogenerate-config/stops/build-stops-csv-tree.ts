import { AutogenerationContext } from "../autogeneration-context";
import { StopsCsvRow } from "../gtfs/csv-schemas";

export type StopsCsvTreeNode = StopsCsvRow & {
  readonly children: StopsCsvTree;
};
export type StopsCsvTree = readonly StopsCsvTreeNode[];

export function buildStopsCsvTree(ctx: AutogenerationContext): StopsCsvTree {
  // This assumes that the GTFS data from both subfeeds uses the same stop IDs
  // for the parent stations, so that platforms from both subfeeds get grouped
  // correctly under their parent stations.
  const allRows = [
    ...ctx.gtfsData.suburban.stops,
    ...ctx.gtfsData.regional.stops,
  ];

  const tree = arrangeRowsIntoTree(allRows);
  return tree;
}

function arrangeRowsIntoTree(allRows: StopsCsvRow[]): StopsCsvTree {
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
