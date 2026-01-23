import type { AutogenerationContext } from "../autogeneration-context.js";
import type { GtfsData } from "../gtfs/read-gtfs.js";
import type { ParsedLine } from "../lines/extract-lines-from-subfeed.js";
import type { ParsedStop } from "../stops/extract-stops-from-tree.js";

export type Patch<T> = (data: T) => T;
export type ContextAwarePatch<T> = (ctx: AutogenerationContext, data: T) => T;

export type GtfsPatch = Patch<GtfsData>;
export type LinePatch = ContextAwarePatch<ParsedLine[]>;
export type StopPatch = ContextAwarePatch<ParsedStop[]>;

export function applyPatches<T>(input: T, patches: Patch<T>[]): T {
  let result = input;

  for (const patch of patches) {
    result = patch(result);
  }

  return result;
}

export function applyContextAwarePatches<T>(
  ctx: AutogenerationContext,
  input: T,
  patches: ContextAwarePatch<T>[],
): T {
  let result = input;

  for (const patch of patches) {
    result = patch(ctx, result);
  }

  return result;
}
