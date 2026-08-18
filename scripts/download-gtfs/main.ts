import "temporal-polyfill/global";
import fsp from "fs/promises";
import path from "path";
import { withGtfsCsvs } from "../../src/gtfs/retrieval/schedule/with-gtfs-csvs.js";
import { env } from "./env.js";
import { fetchGtfsRealtimeRaw } from "../../src/gtfs/retrieval/realtime/fetch-gtfs-realtime.js";

const saveDirectory = "./local/gtfs";
const saveSuburbanDirectory = path.join(saveDirectory, "suburban");
const saveRegionalDirectory = path.join(saveDirectory, "regional");
const suburbanRealtimePath = path.join(saveSuburbanDirectory, "realtime.json");
const regionalRealtimePath = path.join(saveRegionalDirectory, "realtime.json");

async function main() {
  console.log(`Clearing "${saveDirectory}" folder...`);
  await fsp.rm(saveDirectory, { recursive: true, force: true });

  console.log("Downloading/extracting GTFS schedule data...");

  await withGtfsCsvs(env.RELAY_KEY, async ({ suburban, regional }) => {
    console.log(`Copying files into "${saveDirectory}" folder...`);

    await fsp.mkdir(saveSuburbanDirectory, { recursive: true });
    await fsp.mkdir(saveRegionalDirectory, { recursive: true });

    await fsp.cp(suburban, saveSuburbanDirectory, { recursive: true });
    await fsp.cp(regional, saveRegionalDirectory, { recursive: true });

    console.log("Cleaning up temp files...");
  });

  console.log("Fetching GTFS Realtime data...");
  const suburbanRtData = await fetchGtfsRealtimeRaw(env.RELAY_KEY, "suburban");
  const regionalRtData = await fetchGtfsRealtimeRaw(env.RELAY_KEY, "regional");
  const suburbanRealtimeJson = JSON.stringify(suburbanRtData, null, 2);
  const regionalRealtimeJson = JSON.stringify(regionalRtData, null, 2);
  await fsp.writeFile(suburbanRealtimePath, suburbanRealtimeJson);
  await fsp.writeFile(regionalRealtimePath, regionalRealtimeJson);

  console.log("✅ Done!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
