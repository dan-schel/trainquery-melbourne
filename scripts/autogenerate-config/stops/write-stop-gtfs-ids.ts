import type { StopGtfsIdMappingMetadata } from "../../../src/third-party-id-mapping-types.js";
import type { AutogenerationContext } from "../autogeneration-context.js";
import type { WithId } from "../utils/sync-ids.js";
import {
  assignPositionId,
  type WithPlatformIds,
} from "./assign-position-ids.js";
import type { WithUrlPath } from "./assign-url-paths.js";
import type { ParsedGtfsId, ParsedStop } from "./extract-stops-from-tree.js";

type FullStop = WithPlatformIds<WithUrlPath<WithId<ParsedStop>>>;

export function writeStopGtfsIds(
  ctx: AutogenerationContext,
  stops: FullStop[],
) {
  for (const stop of stops) {
    for (const gtfsId of stop.gtfsIds) {
      ctx.stopGtfsIds.add(
        gtfsId.id,
        createMetadata(ctx, stop, gtfsId),
        stop.name,
        stop.id,
        createComment(gtfsId),
      );
    }
  }
}

function createMetadata(
  ctx: AutogenerationContext,
  stop: FullStop,
  gtfsId: ParsedGtfsId,
): StopGtfsIdMappingMetadata {
  if (gtfsId.type === "replacement-bus") {
    return { stopId: stop.id, replacementBus: true };
  } else if (gtfsId.platformCode != null) {
    const position = assignPositionId(ctx, gtfsId.platformCode);
    return { stopId: stop.id, positionId: position?.positionId ?? null };
  } else {
    return { stopId: stop.id };
  }
}

function createComment(gtfsId: ParsedGtfsId): string | null {
  const subfeeds = gtfsId.subfeeds.join(" and ");

  if (gtfsId.type === "parent") return `Parent (${subfeeds})`;
  if (gtfsId.type === "replacement-bus") return `Replacement bus (${subfeeds})`;

  return `Platform ${gtfsId.platformCode ?? "?"} (${subfeeds})`;
}
