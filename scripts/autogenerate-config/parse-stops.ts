import { unique } from "@dan-schel/js-utils";
import { AutogenerationContext } from "./autogeneration-context";
import { StopsCsvRow } from "./gtfs/csv-schemas";
import { IdList } from "./source-code/id-list";

type StopsCsvTreeNode = StopsCsvRow & { readonly children: StopsCsvTree };
type StopsCsvTree = readonly StopsCsvTreeNode[];

export function parseStops(ctx: AutogenerationContext) {
  const allRows = [
    ...ctx.gtfsData.suburban.stops,
    ...ctx.gtfsData.regional.stops,
  ];

  const tree = buildTree(allRows);
  const uniqueStations = unique(tree, (a, b) => a.stop_id === b.stop_id);
  return uniqueStations.map((station) => processStation(station, allRows));
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

function processStation(station: StopsCsvRow, allRows: StopsCsvRow[]) {
  const name = station.stop_name.replace(/( Railway)? Station$/, "");
  const constantName = IdList.constantize(name);

  return { name, constantName };
}
