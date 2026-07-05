import { stopGtfsIds } from "../../src/config/gtfs/stop-gtfs-ids.js";
import { StopsCsvTree } from "../utils/gtfs/stops-csv-tree.js";
import { readGtfsCsvs } from "../../src/gtfs/schedule/csv/read-gtfs-csvs.js";
import { withGtfsCsvs } from "../../src/gtfs/schedule/csv/with-gtfs-csvs.js";
import { askWhichStopToImport } from "./ask-which-stop-to-import.js";
import { env } from "./env.js";
import { findUnseenGtfsIds } from "./find-unseen-gtfs-ids.js";
import { printStopData } from "./print-stop-data.js";

async function main() {
  console.log("Downloading/parsing GTFS data...");

  const gtfsData = await withGtfsCsvs(env.RELAY_KEY, readGtfsCsvs);
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
