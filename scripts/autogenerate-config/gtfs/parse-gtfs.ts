import { readGtfs } from "./read-gtfs.js";
import { withGtfsFiles } from "./with-gtfs-files.js";
import { applyPatches } from "../patches/patch.js";
import { gtfsDataPatches } from "../patches/gtfs-data/index.js";

export async function parseGtfs(relayKey: string) {
  const gtfsData = await withGtfsFiles(relayKey, readGtfs);
  const patchedGtfsData = applyPatches(gtfsData, gtfsDataPatches);

  return patchedGtfsData;
}
