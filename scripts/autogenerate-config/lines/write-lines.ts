import type { AutogenerationContext } from "../autogeneration-context.js";
import type { WithId } from "../utils/sync-ids.js";
import type { ParsedLine } from "./extract-lines-from-subfeed.js";

type FullLine = WithId<ParsedLine>;

export function writeLines(ctx: AutogenerationContext, lines: FullLine[]) {
  for (const line of lines) {
    ctx.lines.add(ctx, {
      id: line.id,
      name: line.name,
      code: null,
      tags: [],
      urlPath: "",
      routes: [],
      diagram: { entries: [] },
    });
  }
}
