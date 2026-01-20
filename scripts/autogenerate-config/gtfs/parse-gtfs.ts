import { type GtfsData, readGtfs } from "./read-gtfs.js";
import { withGtfsFiles } from "./with-gtfs-files.js";
import { applyPatches, type Patch } from "../patches/patch.js";
import { jolimontStationNamePatch } from "../patches/gtfs-data/jolimont-station-name.js";
import { springhurstStationNamePatch } from "../patches/gtfs-data/springhurst-station-name.js";
import { stAlbansStationNamePatch } from "../patches/gtfs-data/st-albans-station-name.js";

const patches: Patch<GtfsData>[] = [
  jolimontStationNamePatch,
  stAlbansStationNamePatch,
  springhurstStationNamePatch,
];

export async function parseGtfs(relayKey: string) {
  const gtfsData = await withGtfsFiles(relayKey, readGtfs);
  const patchedGtfsData = applyPatches(gtfsData, patches);

  return patchedGtfsData;
}
