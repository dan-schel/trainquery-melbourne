import { AutogenerationContext } from "../autogeneration-context.js";
import { type ParsedStop } from "./extract-stops-from-tree.js";

export type WithId<T> = T & {
  readonly id: number;
  readonly constantName: string;
};

export function syncStopIds<T extends ParsedStop>(
  ctx: AutogenerationContext,
  stops: T[],
): WithId<T>[] {
  const stopsWithIds = assignStopIds(ctx, stops);
  deactivateMissingStops(ctx, stops);

  return stopsWithIds;
}

function assignStopIds<T extends ParsedStop>(
  ctx: AutogenerationContext,
  stops: T[],
): WithId<T>[] {
  const result: WithId<T>[] = [];

  for (const stop of stops) {
    const entry = ctx.stopIds.get(stop.name) ?? ctx.stopIds.add(stop.name);

    if (!entry.isActive) ctx.stopIds.reactivate(stop.name);

    result.push({
      ...stop,
      id: entry.id,
      constantName: entry.constantName,
    });
  }

  return result;
}

function deactivateMissingStops(
  ctx: AutogenerationContext,
  stops: ParsedStop[],
) {
  const activeEntries = ctx.stopIds.entries.filter((x) => x.isActive);

  for (const entry of activeEntries) {
    const matchingStop = stops.find((s) => s.name === entry.name);

    if (matchingStop == null) {
      ctx.stopIds.deactivate(entry.name);
    }
  }
}
