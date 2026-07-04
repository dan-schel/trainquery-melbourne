import { lineGtfsIds } from "../config/gtfs/line-gtfs-ids.js";
import { env } from "../env.js";
import { LineGtfsIdMapping } from "./ids/line-gtfs-id-mapping.js";
import { readGtfs } from "./schedule/read-gtfs.js";
import { withGtfsFiles } from "./schedule/with-gtfs-files.js";

export async function runGtfsTempScript() {
  // TODO: Should we be importing directly from config in trainquery-melbourne?
  const lineGtfsIdMapping = LineGtfsIdMapping.build(lineGtfsIds, "suburban");

  console.log("downloading/reading...");
  const gtfsData = await withGtfsFiles(env.RELAY_KEY, readGtfs);

  console.log(gtfsData.suburban.stopTimes.length);
}
