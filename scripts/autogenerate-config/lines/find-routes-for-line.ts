import { areUnique, distanceInMeters, itsOk } from "@dan-schel/js-utils";
import type { AutogenerationContext } from "../autogeneration-context.js";
import type { Subfeed } from "../utils/subfeed.js";

export type ParsedRoute = {
  readonly name: string;
  readonly stops: readonly {
    readonly stopId: number;
  }[];
};

export function findRoutesForLine(
  ctx: AutogenerationContext,
  subfeed: Subfeed,
  linePrimaryGtfsId: string,
): ParsedRoute[] {
  const patterns = findUniqueStoppingPatterns(ctx, subfeed, linePrimaryGtfsId);
  const consolidatedPatterns = eliminateSubsequenceStoppingPatterns(patterns);
  const namedPatterns = namePatterns(ctx, consolidatedPatterns);

  return namedPatterns.map((x) => ({
    name: x.name,
    stops: x.pattern.map((stopId) => ({ stopId })),
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
    const stopIds = ctx.gtfsData[subfeed].stopTimes
      .filter((st) => st.trip_id === trip.trip_id)
      .sort((a, b) => a.stop_sequence - b.stop_sequence)
      .map((x) => ctx.stopGtfsIds.require(x.stop_id).value.stopId);

    const hashKey = stopIds.map((x) => x.toFixed()).join(",");

    if (!stoppingPatterns.has(hashKey)) {
      stoppingPatterns.set(hashKey, stopIds);
    }
  }

  return Array.from(stoppingPatterns.values());
}

function eliminateSubsequenceStoppingPatterns(
  patterns: number[][],
): number[][] {
  // Returns true if `potentialSubset` is the same as `other` with/without some
  // elements removed.
  function isSubsequence(potentialSubset: number[], other: number[]) {
    let start = 0;
    for (const stopId of potentialSubset) {
      const idx = other.indexOf(stopId, start);
      if (idx === -1) return false;

      // Only check the remaining part of `other` in the next iteration.
      start = idx + 1;
    }
    return true;
  }

  return patterns.filter(
    (me, i) =>
      !patterns.some((other, j) => i !== j && isSubsequence(me, other)),
  );
}

function namePatterns(ctx: AutogenerationContext, patterns: number[][]) {
  const automaticNames = patterns.map((pattern) => ({
    name: guessUpOrDown(ctx, pattern),
    pattern,
  }));

  const allHaveNames = automaticNames.every((x) => x.name !== null);
  const namesAreUnique = areUnique(automaticNames.map((x) => x.name));
  if (allHaveNames && namesAreUnique) {
    return automaticNames.map((x) => ({ ...x, name: itsOk(x.name) }));
  }

  return patterns.map((pattern, index) => ({
    name: `Route ${index + 1}`,
    pattern,
  }));
}

function guessUpOrDown(ctx: AutogenerationContext, pattern: number[]) {
  const cityLocation = ctx.stops.require("Flinders Street").location;
  const firstStop = ctx.stops.requireById(itsOk(pattern.at(0))).location;
  const lastStop = ctx.stops.requireById(itsOk(pattern.at(-1))).location;

  if (cityLocation == null || firstStop == null || lastStop == null) {
    return null;
  }

  const distanceToFirst = distanceInMeters(
    cityLocation.latitude,
    cityLocation.longitude,
    firstStop.latitude,
    firstStop.longitude,
  );

  const distanceToLast = distanceInMeters(
    cityLocation.latitude,
    cityLocation.longitude,
    lastStop.latitude,
    lastStop.longitude,
  );

  return distanceToFirst < distanceToLast ? "down" : "up";
}
