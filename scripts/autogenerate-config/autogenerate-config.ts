import { AutogenerationContext } from "./autogeneration-context.js";
import { assignPositionIds } from "./stops/assign-position-ids.js";
import { assignUrlPaths } from "./stops/assign-url-paths.js";
import { parseStops } from "./stops/parse-stops.js";
import { syncStopIds } from "./stops/sync-stop-ids.js";

export function autogenerateConfig(ctx: AutogenerationContext) {
  const stops = parseStops(ctx);
  const stopsWithIds = syncStopIds(ctx, stops);
  const stopsWithUrlPaths = assignUrlPaths(stopsWithIds);
  const stopsWithPositionIds = assignPositionIds(ctx, stopsWithUrlPaths);

  for (const stop of stopsWithPositionIds) {
    ctx.stops.add(ctx, {
      id: stop.id,
      name: stop.name,
      urlPath: stop.urlPath,
      tags: [],
      location: {
        latitude: stop.latitude,
        longitude: stop.longitude,
      },
      positions: stop.platforms.map((platform) => ({
        name: platform.platformCode,
        stopPositionId: platform.positionId,
      })),
    });
  }
}
