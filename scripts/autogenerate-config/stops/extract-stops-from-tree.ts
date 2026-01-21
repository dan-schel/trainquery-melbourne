import { itsOk, unique } from "@dan-schel/js-utils";
import { isPresent } from "../utils/is-present.js";
import { numberWiseSort } from "../utils/number-wise-sort.js";
import type { Subfeed } from "../utils/subfeed.js";
import {
  type StopsCsvTree,
  type StopsCsvTreeNode,
} from "./build-stops-csv-tree.js";

const replacementBusCode = "Replacement bus";

type ParsedPlatform = {
  readonly platformCode: string;
};

export type ParsedGtfsId = {
  readonly id: string;
  readonly type: "parent" | "train" | "replacement-bus";
  readonly platformCode: string | null;
  readonly subfeeds: readonly Subfeed[];
};

export type ParsedStop = {
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly platforms: readonly ParsedPlatform[];
  readonly gtfsIds: readonly ParsedGtfsId[];
  readonly ptvApiId: string;
};

export function extractStopsFromTree(tree: StopsCsvTree): ParsedStop[] {
  // Everything at the top level of the tree (i.e. a stop without parents) is a
  // station. Under each station are its platforms and other marked locations
  // (entrances, "decision points", etc.).
  return tree.map((station) => parseStop(station));
}

function parseStop(station: StopsCsvTreeNode): ParsedStop {
  const platforms = parsePlatforms(station);
  const gtfsIds = parseGtfsIds(station);
  const ptvApiId = parsePtvApiId(station);

  return {
    name: station.stop_name,
    latitude: station.stop_lat,
    longitude: station.stop_lon,
    platforms,
    gtfsIds,
    ptvApiId,
  };
}

function parsePlatforms(station: StopsCsvTreeNode): ParsedPlatform[] {
  type TreeNodeWithPlatformCode = StopsCsvTreeNode & { platform_code: string };

  return station.children
    .filter((c): c is TreeNodeWithPlatformCode => isPresent(c.platform_code))
    .filter((c) => c.platform_code !== replacementBusCode)
    .map((platform) => ({ platformCode: platform.platform_code }))
    .sort((a, b) => numberWiseSort(a.platformCode, b.platformCode));
}

function parseGtfsIds(station: StopsCsvTreeNode): ParsedGtfsId[] {
  const primaryGtfsId: ParsedGtfsId = {
    id: station.stop_id,
    type: "parent",
    platformCode: null,
    subfeeds: station.subfeeds,
  };

  const childGtfsIds: ParsedGtfsId[] = station.children.map((c) => ({
    id: c.stop_id,
    type: c.platform_code === replacementBusCode ? "replacement-bus" : "train",
    platformCode:
      isPresent(c.platform_code) && c.platform_code !== replacementBusCode
        ? c.platform_code
        : null,
    subfeeds: c.subfeeds,
  }));

  return [primaryGtfsId, ...childGtfsIds].sort((a, b) => compareGtfsIds(a, b));
}

function compareGtfsIds(a: ParsedGtfsId, b: ParsedGtfsId): number {
  // Always sort "parent", before "train", before "replacement-bus".
  const typeOrder = { "parent": 0, "train": 1, "replacement-bus": 2 };
  const typeDiff = typeOrder[a.type] - typeOrder[b.type];
  if (typeDiff !== 0) return typeDiff;

  // Then, sort by platform code (any without a platform code go to the bottom).
  if (a.platformCode != null && b.platformCode != null) {
    const platformDiff = numberWiseSort(a.platformCode, b.platformCode);
    if (platformDiff !== 0) return platformDiff;
  } else if (b.platformCode != null) {
    return 1;
  } else if (a.platformCode != null) {
    return -1;
  }

  // Finally, sort any remaining IDs by their GTFS ID.
  return a.id.localeCompare(b.id);
}

export function platformSortOrder(
  a: ParsedPlatform,
  b: ParsedPlatform,
): number {
  return numberWiseSort(a.platformCode, b.platformCode);
}

export function parsePtvApiId(station: StopsCsvTreeNode): string {
  const stopName = station.stop_name;

  const urls = station.children
    .filter((x) => x.stop_url.startsWith("https://transport.vic.gov.au/stop/"))
    .map((x) => x.stop_url);

  if (urls.length === 0) throw new Error(`No URL for ${stopName}.`);

  const urlsAreIdentical = unique(urls).length === 1;
  if (!urlsAreIdentical) throw new Error(`Multiple URLs for ${stopName}.`);

  const url = itsOk(urls[0]);

  const pattern = /https:\/\/transport\.vic\.gov\.au\/stop\/([0-9]+)($|\/)/g;
  const match = pattern.exec(url);
  if (match == null) throw new Error(`Weird URL for ${stopName}: ${url}`);

  return itsOk(match[1]);
}
