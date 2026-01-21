import type { AutogenerationContext } from "../autogeneration-context.js";
import {
  extractLinesFromSubfeed,
  type ParsedLine,
} from "./extract-lines-from-subfeed.js";
import { parsedLinesPatches } from "../patches/parsed-lines/index.js";
import { applyPatches } from "../patches/patch.js";

export function parseLines(ctx: AutogenerationContext): ParsedLine[] {
  const lines = [
    ...extractLinesFromSubfeed(ctx, "suburban"),
    ...extractLinesFromSubfeed(ctx, "regional"),
  ];

  const patchedLines = applyPatches(lines, parsedLinesPatches);
  return patchedLines;
}
