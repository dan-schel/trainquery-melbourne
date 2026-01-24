import { readGtfs } from "../../src/gtfs/schedule/read-gtfs.js";
import { withGtfsFiles } from "../../src/gtfs/schedule/with-gtfs-files.js";
import { StopsCsvTree } from "../utils/gtfs/stops-csv-tree.js";
import { env } from "./env.js";

async function main() {
  console.log("Downloading/parsing GTFS data...");

  const gtfsData = await withGtfsFiles(env.RELAY_KEY, readGtfs);
  const allStops = StopsCsvTree.fromGtfsData(gtfsData);
  console.log(`That's ${allStops.nodes.length} stops!`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
