import { AutogenerationContext } from "./autogeneration-context.js";
import { assignPositionIds } from "./stops/assign-position-ids.js";
import { assignUrlPaths } from "./stops/assign-url-paths.js";
import { parseStops } from "./stops/parse-stops.js";
import { syncStopIds } from "./stops/sync-stop-ids.js";
import { writeStopGtfsIds } from "./stops/write-stop-gtfs-ids.js";
import { writeStops } from "./stops/write-stops.js";

export function autogenerateConfig(ctx: AutogenerationContext) {
  const stops = parseStops(ctx);
  const stopsWithIds = syncStopIds(ctx, stops);
  const stopsWithUrlPaths = assignUrlPaths(stopsWithIds);
  const stopsWithPositionIds = assignPositionIds(ctx, stopsWithUrlPaths);

  writeStops(ctx, stopsWithPositionIds);
  writeStopGtfsIds(ctx, stopsWithPositionIds);
}
