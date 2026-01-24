import { stopGtfsIds } from "../../src/config/stops/stop-gtfs-ids.js";
import { StopsCsvTree } from "../../src/gtfs/schedule/higher-order/stops-csv-tree.js";
import { readGtfs } from "../../src/gtfs/schedule/read-gtfs.js";
import { withGtfsFiles } from "../../src/gtfs/schedule/with-gtfs-files.js";
import { askStopToImport } from "./ask-stop-to-import.js";
import { env } from "./env.js";
import { findUnseenGtfsIds } from "./find-unseen-gtfs-ids.js";
import { outputStopData } from "./output-stop.js";

async function main() {
  console.log("Downloading/parsing GTFS data...");

  const gtfsData = await withGtfsFiles(env.RELAY_KEY, readGtfs);

  const allStops = StopsCsvTree.merge(
    StopsCsvTree.build(gtfsData.suburban.stops).setSubfeed("suburban"),
    StopsCsvTree.build(gtfsData.suburban.stops).setSubfeed("regional"),
  );

  console.log("Checking for unseen stops...");

  const unseenStops = findUnseenGtfsIds(allStops, stopGtfsIds);

  if (unseenStops.length === 0) {
    console.log("🤷 Didn't find any new stops to import.");
    return;
  }

  const stopToImport = await askStopToImport(unseenStops);
  if (stopToImport == null) return;

  outputStopData(stopToImport);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
