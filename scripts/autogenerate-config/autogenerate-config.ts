import { AutogenerationContext } from "./autogeneration-context";
import { ParsedStop } from "./stops/extract-stops-from-tree";
import { parseStops } from "./stops/parse-stops";

export type ParsedStopWithId = ParsedStop & {
  readonly id: number;
  readonly constantName: string;
};

export function autogenerateConfig(ctx: AutogenerationContext) {
  const stops = parseStops(ctx);
  const stopsWithIds = assignStopIds(ctx, stops);
  deactivateMissingStops(ctx, stops);

  for (const stop of stopsWithIds) {
    ctx.stops.add({
      id: stop.id,
      name: stop.name,
      urlPath: stop.urlPath,
      tags: [],
      location: {
        latitude: stop.latitude,
        longitude: stop.longitude,
      },
      positions: [],
    });
  }
}

function assignStopIds(
  ctx: AutogenerationContext,
  stops: ParsedStop[],
): ParsedStopWithId[] {
  const result: ParsedStopWithId[] = [];

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
