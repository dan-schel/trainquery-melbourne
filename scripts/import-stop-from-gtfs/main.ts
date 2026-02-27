import { stopGtfsIds } from "../../src/config/stops/stop-gtfs-ids.js";
import { StopsCsvTree } from "../utils/gtfs/stops-csv-tree.js";
import { readGtfs } from "../../src/gtfs/schedule/read-gtfs.js";
import { withGtfsFiles } from "../../src/gtfs/schedule/with-gtfs-files.js";
import { askWhichStopToImport } from "./ask-which-stop-to-import.js";
import { env } from "./env.js";
import { findUnseenGtfsIds } from "./find-unseen-gtfs-ids.js";
import { printStopData } from "./print-stop-data.js";

async function main() {
  console.log("Downloading/parsing GTFS data...");

  const gtfsData = await withGtfsFiles(env.RELAY_KEY, readGtfs);
  const allStops = StopsCsvTree.buildCombined(gtfsData);

  console.log("Checking for unseen stops...");

  const unseenStops = findUnseenGtfsIds(allStops, stopGtfsIds);

  if (unseenStops.length === 0) {
    console.log("🤷 Didn't find any new stops to import.");
    return;
  }

  const stopToImport = await askWhichStopToImport(unseenStops);
  if (stopToImport == null) return;

  await printStopData(stopToImport);

  console.log("\n✅ Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
