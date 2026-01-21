import { AutogenerationContext } from "./autogeneration-context.js";
import { parseLines } from "./lines/parse-lines.js";
import { writeLines } from "./lines/write-lines.js";
import { assignPositionIds } from "./stops/assign-position-ids.js";
import { assignUrlPaths } from "./stops/assign-url-paths.js";
import { parseStops } from "./stops/parse-stops.js";
import { writeStopGtfsIds } from "./stops/write-stop-gtfs-ids.js";
import { writeStopPtvApiIds } from "./stops/write-stop-ptv-api-ids.js";
import { writeStops } from "./stops/write-stops.js";
import { syncIds } from "./utils/sync-ids.js";

export function autogenerateConfig(ctx: AutogenerationContext) {
  const stops = parseStops(ctx);
  const stopsWithIds = syncIds(ctx.stopIds, stops);
  const stopsWithUrlPaths = assignUrlPaths(stopsWithIds);
  const stopsWithPositionIds = assignPositionIds(ctx, stopsWithUrlPaths);

  writeStops(ctx, stopsWithPositionIds);
  writeStopGtfsIds(ctx, stopsWithPositionIds);
  writeStopPtvApiIds(ctx, stopsWithPositionIds);

  const lines = parseLines(ctx);
  const linesWithIds = syncIds(ctx.lineIds, lines);

  writeLines(ctx, linesWithIds);
}
