import type { AutogenerationContext } from "../autogeneration-context.js";
import { type WithPlatformIds } from "./assign-position-ids.js";
import type { WithUrlPath } from "./assign-url-paths.js";
import type { ParsedStop } from "./extract-stops-from-tree.js";
import type { WithId } from "./sync-stop-ids.js";

type FullStop = WithPlatformIds<WithUrlPath<WithId<ParsedStop>>>;

export function writeStopPtvApiIds(
  ctx: AutogenerationContext,
  stops: FullStop[],
) {
  for (const stop of stops) {
    ctx.stopPtvApiIds.add(stop.ptvApiId, stop.id, stop.name, stop.id, null);
  }
}
