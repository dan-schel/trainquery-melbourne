import { AutogenerationContext } from "./autogeneration-context";
import { StopsCsvRow } from "./gtfs/csv-schemas";

type StopsCsvTreeNode = StopsCsvRow & { readonly children: StopsCsvTree };
type StopsCsvTree = readonly StopsCsvTreeNode[];

export type ParsedStop = {
  readonly name: string;
};

export function parseStops(ctx: AutogenerationContext) {
  const allRows = [
    ...ctx.gtfsData.suburban.stops,
    ...ctx.gtfsData.regional.stops,
  ];

  const tree = buildTree(allRows);

  // Everything at the top level of the tree (i.e. a stop without parents) is a
  // station. Under each station are its platforms and other marked locations
  // (entrances, "decision points", etc.).
  return tree.map((station) => parseStop(station));
}

function buildTree(allRows: StopsCsvRow[]): StopsCsvTree {
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

  return Array.from(tree.values()).filter((n) => n.parent_station === "");
}

function parseStop(station: StopsCsvTreeNode): ParsedStop {
  const name = station.stop_name.replace(/( Railway)? Station$/, "");

  // TODO: Parse platforms.

  return { name };
}
