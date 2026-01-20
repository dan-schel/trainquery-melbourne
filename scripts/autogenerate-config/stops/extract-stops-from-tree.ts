import {
  type StopsCsvTree,
  type StopsCsvTreeNode,
} from "./build-stops-csv-tree.js";

export type ParsedStop = {
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;

  readonly platforms: readonly {
    readonly platformCode: string;
  }[];

  readonly gtfsIds: readonly {
    readonly id: string;
    readonly platformCode: string | null;
  }[];
};

export function extractStopsFromTree(tree: StopsCsvTree): ParsedStop[] {
  // Everything at the top level of the tree (i.e. a stop without parents) is a
  // station. Under each station are its platforms and other marked locations
  // (entrances, "decision points", etc.).
  return tree.map((station) => parseStop(station));
}

function parseStop(station: StopsCsvTreeNode): ParsedStop {
  // TODO: GTFS Data patches:
  // - Remove rows without platform codes unless they're parent rows
  // - Remove replacement bus platforms
  // - Add V/Line platforms.

  type TreeNodeWithPlatformCode = StopsCsvTreeNode & { platform_code: string };
  const platforms = station.children
    .filter((c): c is TreeNodeWithPlatformCode => isPresent(c.platform_code))
    .map((platform) => ({ platformCode: platform.platform_code }));

  const primaryGtfsId = { id: station.stop_id, platformCode: null };
  const childGtfsIds = station.children.map((c) => ({
    id: c.stop_id,
    platformCode: isPresent(c.platform_code) ? c.platform_code : null,
  }));

  return {
    name: station.stop_name,
    latitude: station.stop_lat,
    longitude: station.stop_lon,
    platforms: platforms,
    gtfsIds: [primaryGtfsId, ...childGtfsIds],
  };
}

function isPresent(str: string | null | undefined): str is string {
  return str != null && str.length > 0;
}
