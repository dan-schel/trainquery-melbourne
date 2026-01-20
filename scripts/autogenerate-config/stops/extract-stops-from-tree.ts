import { StopsCsvTree, StopsCsvTreeNode } from "./build-stops-csv-tree";

export type ParsedStop = {
  readonly name: string;
  readonly urlPath: string;
  readonly latitude: number;
  readonly longitude: number;
};

export function extractStopsFromTree(tree: StopsCsvTree): ParsedStop[] {
  // Everything at the top level of the tree (i.e. a stop without parents) is a
  // station. Under each station are its platforms and other marked locations
  // (entrances, "decision points", etc.).
  return tree.map((station) => parseStop(station));
}

function parseStop(station: StopsCsvTreeNode): ParsedStop {
  // TODO: Parse platforms.

  return {
    name: station.stop_name,
    urlPath: generateUrlPath(station.stop_name),
    latitude: station.stop_lat,
    longitude: station.stop_lon,
  };
}

function generateUrlPath(name: string): string {
  const lowercased = name.toLowerCase();

  if (!/^[a-z ]$/g.test(lowercased)) throw new Error(`Tricky name: ${name}`);

  return lowercased.replaceAll(" ", "");
}
