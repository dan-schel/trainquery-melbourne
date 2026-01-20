import { GtfsData, readGtfs } from "./read-gtfs";
import { withGtfsFiles } from "./with-gtfs-files";
import { applyPatches, Patch } from "../patches/patch";
import { jolimontStationNamePatch } from "../patches/gtfs-data/jolimont-station-name";
import { springhurstStationNamePatch } from "../patches/gtfs-data/springhurst-station-name";
import { stAlbansStationNamePatch } from "../patches/gtfs-data/st-albans-station-name";

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
