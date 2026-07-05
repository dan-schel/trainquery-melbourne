import { lineGtfsIds } from "../config/gtfs/line-gtfs-ids.js";
import { env } from "../env.js";
import { LineGtfsIdMapping } from "./ids/line-gtfs-id-mapping.js";
import { readGtfsCsvs } from "./schedule/csv/read-gtfs-csvs.js";
import { withGtfsCsvs } from "./schedule/csv/with-gtfs-csvs.js";

export async function runGtfsTempScript() {
  // TODO: Should we be importing directly from config in trainquery-melbourne?
  const lineGtfsIdMapping = LineGtfsIdMapping.build(lineGtfsIds, "suburban");

  console.log("downloading/reading...");
  const gtfsData = await withGtfsCsvs(env.RELAY_KEY, readGtfsCsvs);

  console.log(gtfsData.suburban.stopTimes.length);
}
