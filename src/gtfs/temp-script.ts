import type { Corequery } from "corequery";
import { env } from "../env.js";
import { LineGtfsIdMapping } from "./ids/line-gtfs-id-mapping.js";
import { StopGtfsIdMapping } from "./ids/stop-gtfs-id-mapping.js";
import { readGtfsCsvs } from "./schedule/csv/read-gtfs-csvs.js";
import { withGtfsCsvs } from "./schedule/csv/with-gtfs-csvs.js";
import { GtfsScheduleParser } from "./schedule/parser/gtfs-schedule-parser.js";
import type {
  LineGtfsIdsConfig,
  LineRoutesConfig,
  StopGtfsIdsConfig,
} from "../config/gtfs/types.js";

type GtfsConfig = {
  lineGtfsIds: LineGtfsIdsConfig;
  stopGtfsIds: StopGtfsIdsConfig;
  lineRoutes: LineRoutesConfig;
};

export async function runGtfsTempScript(ctx: Corequery, config: GtfsConfig) {
  console.log("downloading/reading...");
  const gtfsData = await withGtfsCsvs(env.RELAY_KEY, readGtfsCsvs);

  console.log("parsing...");

  let hadErrors = false;
  const parser = new GtfsScheduleParser(
    ctx.lines,
    config.lineRoutes,
    (error: unknown) => {
      hadErrors = true;
      console.error("Error:", error);
    },
  );

  const schedule = parser.parse(
    gtfsData.suburban,
    LineGtfsIdMapping.build(config.lineGtfsIds, "suburban"),
    StopGtfsIdMapping.build(config.stopGtfsIds, "suburban"),
  );

  if (!hadErrors) {
    console.log(schedule);
  }
}
