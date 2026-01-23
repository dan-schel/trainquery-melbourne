import type { AutogenerationContext } from "../autogeneration-context.js";
import type { Subfeed } from "../utils/subfeed.js";
import { namePatterns } from "./name-patterns.js";
import { consolidateStoppingPatterns } from "./consolidate-stopping-patterns.js";

export type ParsedRoute = {
  readonly name: string;
  readonly stops: readonly {
    readonly stopId: number;
    readonly type: "regular" | "hidden-unless-stopped-at";
  }[];
};

export function findRoutesForLine(
  ctx: AutogenerationContext,
  subfeed: Subfeed,
  linePrimaryGtfsId: string,
): ParsedRoute[] {
  const patterns = findUniqueStoppingPatterns(ctx, subfeed, linePrimaryGtfsId);
  const consolidatedPatterns = consolidateStoppingPatterns(patterns);
  const namedPatterns = namePatterns(ctx, consolidatedPatterns);

  return namedPatterns.map((x) => ({
    name: x.name,
    stops: x.pattern.map((stopId) => ({ stopId, type: "regular" })),
  }));
}

function findUniqueStoppingPatterns(
  ctx: AutogenerationContext,
  subfeed: Subfeed,
  linePrimaryGtfsId: string,
): number[][] {
  const trips = ctx.gtfsData[subfeed].trips;
  const matchingTrips = trips.filter((x) => x.route_id === linePrimaryGtfsId);

  const stoppingPatterns = new Map<string, number[]>();

  for (const trip of matchingTrips) {
    const stopIds = ctx.gtfsData[subfeed].stopTimesIndexed
      .forTrip(trip.trip_id)
      .map((x) => ctx.stopGtfsIds.require(x.stop_id).value.stopId);

    const hashKey = stopIds.map((x) => x.toFixed()).join(",");

    if (!stoppingPatterns.has(hashKey)) {
      stoppingPatterns.set(hashKey, stopIds);
    }
  }

  return Array.from(stoppingPatterns.values());
}
