import type { Corequery } from "corequery";
import { env } from "../env.js";
import { LineGtfsIdMapping } from "./ids/line-gtfs-id-mapping.js";
import { StopGtfsIdMapping } from "./ids/stop-gtfs-id-mapping.js";
import { readGtfsCsvs } from "./retrieval/schedule/read-gtfs-csvs.js";
import { withGtfsCsvs } from "./retrieval/schedule/with-gtfs-csvs.js";
import {
  GtfsScheduleParser,
  type GtfsParsingError,
} from "./parser/gtfs-schedule-parser.js";
import type { GtfsConfig } from "./config/index.js";
import { LineRoutes } from "./route/line-routes.js";

export async function runGtfsTempScript(ctx: Corequery, config: GtfsConfig) {
  const lineRoutes = LineRoutes.build(config.lineRoutes);

  console.log("Downloading/reading...");
  const gtfsData = await withGtfsCsvs(env.RELAY_KEY, readGtfsCsvs);

  console.log("Parsing...");
  const start = performance.now();

  const errors: GtfsParsingError[] = [];
  const parser = new GtfsScheduleParser(lineRoutes, (error) =>
    errors.push(error),
  );

  const suburban = parser.parse(
    gtfsData.suburban,
    LineGtfsIdMapping.build(config.lineGtfsIds, "suburban"),
    StopGtfsIdMapping.build(config.stopGtfsIds, "suburban"),
  );
  const regional = parser.parse(
    gtfsData.regional,
    LineGtfsIdMapping.build(config.lineGtfsIds, "regional"),
    StopGtfsIdMapping.build(config.stopGtfsIds, "regional"),
  );

  const end = performance.now();
  const diff = end - start;
  console.log(`Done parsing! (${diff.toFixed(2)}ms)`);

  if (errors.length !== 0) {
    for (const error of errors) {
      console.error(error);
    }
    return;
  }

  const tripLines = [...suburban.trips, ...regional.trips].map((x) => x.lineId);

  console.log("\nTrip counts:");
  for (const line of ctx.lines.all()) {
    const count = tripLines.filter((x) => x === line.id).length;
    console.log(` - ${line.name}: ${count} trips`);
  }
}
