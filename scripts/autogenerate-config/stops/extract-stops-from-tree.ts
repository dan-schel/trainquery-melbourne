import {
  type StopsCsvTree,
  type StopsCsvTreeNode,
} from "./build-stops-csv-tree.js";

const replacementBusCode = "Replacement bus";

type ParsedPlatform = {
  readonly platformCode: string;
};

type ParsedGtfsId = {
  readonly id: string;
  readonly type: "parent" | "train" | "replacement-bus";
  readonly platformCode: string | null;
};

export type ParsedStop = {
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly platforms: readonly ParsedPlatform[];
  readonly gtfsIds: readonly ParsedGtfsId[];
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

  const platforms = parsePlatforms(station);
  const gtfsIds = parseGtfsIds(station);

  return {
    name: station.stop_name,
    latitude: station.stop_lat,
    longitude: station.stop_lon,
    platforms,
    gtfsIds,
  };
}

function parsePlatforms(station: StopsCsvTreeNode): ParsedPlatform[] {
  type TreeNodeWithPlatformCode = StopsCsvTreeNode & { platform_code: string };

  return station.children
    .filter((c): c is TreeNodeWithPlatformCode => isPresent(c.platform_code))
    .filter((c) => c.platform_code !== replacementBusCode)
    .map((platform) => ({ platformCode: platform.platform_code }));
}

function parseGtfsIds(station: StopsCsvTreeNode): ParsedGtfsId[] {
  const primaryGtfsId: ParsedGtfsId = {
    id: station.stop_id,
    type: "parent",
    platformCode: null,
  };

  const childGtfsIds: ParsedGtfsId[] = station.children.map((c) => ({
    id: c.stop_id,
    type: c.platform_code === replacementBusCode ? "replacement-bus" : "train",
    platformCode: isPresent(c.platform_code) ? c.platform_code : null,
  }));

  return [primaryGtfsId, ...childGtfsIds];
}

function isPresent(str: string | null | undefined): str is string {
  return str != null && str.length > 0;
}
