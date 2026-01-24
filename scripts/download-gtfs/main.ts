import fsp from "fs/promises";
import path from "path";
import { withGtfsFiles } from "../../src/gtfs/schedule/with-gtfs-files.js";
import { env } from "./env.js";

const saveDirectory = "./local/gtfs";
const saveSuburbanDirectory = path.join(saveDirectory, "suburban");
const saveRegionalDirectory = path.join(saveDirectory, "regional");

async function main() {
  console.log(`Clearing "${saveDirectory}" folder...`);
  await fsp.rm(saveDirectory, { recursive: true, force: true });

  console.log("Downloading/extracting GTFS data...");

  await withGtfsFiles(env.RELAY_KEY, async ({ suburban, regional }) => {
    console.log(`Copying files into "${saveDirectory}" folder...`);

    await fsp.mkdir(saveSuburbanDirectory, { recursive: true });
    await fsp.mkdir(saveRegionalDirectory, { recursive: true });

    await fsp.cp(suburban, saveSuburbanDirectory, { recursive: true });
    await fsp.cp(regional, saveRegionalDirectory, { recursive: true });

    console.log("Cleaning up temp files...");
  });

  // TODO: GTFS realtime.

  console.log("✅ Done!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
