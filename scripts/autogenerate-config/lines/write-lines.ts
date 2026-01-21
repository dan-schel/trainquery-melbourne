import type { AutogenerationContext } from "../autogeneration-context.js";
import type { WithUrlPath } from "../utils/assign-url-paths.js";
import type { WithId } from "../utils/sync-ids.js";
import type { ParsedLine } from "./extract-lines-from-subfeed.js";

type FullLine = WithUrlPath<WithId<ParsedLine>>;

export function writeLines(ctx: AutogenerationContext, lines: FullLine[]) {
  for (const line of lines) {
    ctx.lines.add({
      id: line.id,
      name: line.name,
      code: null,
      tags: [],
      urlPath: line.urlPath,
      routes: line.routes.map((route) => ({
        id: 1,
        name: route.name,
        tags: [],
        stops: route.stops.map((s) => ({
          stopId: s.stopId,
          type: "regular",
        })),
        color: null,
      })),
      diagram: { entries: [] },
    });
  }
}
