import type { AutogenerationContext } from "../autogeneration-context.js";
import type { WithPlatformIds } from "./assign-position-ids.js";
import type { WithUrlPath } from "./assign-url-paths.js";
import type { ParsedStop } from "./extract-stops-from-tree.js";
import type { WithId } from "./sync-stop-ids.js";

type FullStop = WithPlatformIds<WithUrlPath<WithId<ParsedStop>>>;

export function writeStops(ctx: AutogenerationContext, stops: FullStop[]) {
  for (const stop of stops) {
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
