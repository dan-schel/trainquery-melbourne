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
  const consolidatedPatterns = consolidateStoppingPatterns(patterns);
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

function consolidateStoppingPatterns(patterns: number[][]): number[][] {
  const result: number[][] = [...patterns];

  for (let i = 0; i < result.length - 1; i++) {
    for (let j = i + 1; j < result.length; j++) {
      const merged = getMergedPattern(itsOk(result[i]), itsOk(result[j]));

      if (merged != null) {
        // Replace the two patterns in the array with the merged one.
        result.splice(j, 1);
        result.splice(i, 1, merged);

        // Start from the start again. Something that previously couldn't merge
        // might be able to merge now.
        // (We actually want the next iteration to do i=0, j=1, but have to set
        // j=0 to compensate for the j++ at the end of this loop. We don't exit
        // the outer loop until this inner loop stops iterating so i=0 is fine.)
        i = 0;
        j = 0;
      }
    }
  }

  // Once we've been through all pairs without restarting, there must be no more
  // merges possible, so return the result.
  return result;
}

function getMergedPattern(a: number[], b: number[]): number[] | null {
  let i = 0;
  let j = 0;

  const merged: number[] = [];

  let aSkips = 0;
  let bSkips = 0;

  while (i < a.length || j < b.length) {
    if (i >= a.length) {
      merged.push(itsOk(b[j]));
      j++;
      continue;
    }

    if (j >= b.length) {
      merged.push(itsOk(a[i]));
      i++;
      continue;
    }

    const elementA = itsOk(a[i]);
    const elementB = itsOk(b[j]);

    if (elementA === elementB) {
      merged.push(elementA);
      i++;
      j++;
    } else if (a.indexOf(elementB, i + 1) !== -1) {
      merged.push(elementA);
      i++;
      aSkips++;
    } else if (b.indexOf(elementA, j + 1) !== -1) {
      merged.push(elementB);
      j++;
      bSkips++;
    } else {
      return null;
    }
  }

  // Don't merge patterns if you skipped all stops except one to achieve it.
  // Avoids A -> B -> C merging with C -> B -> A to form A -> B -> C -> B -> A.
  if (aSkips >= a.length - 1 || bSkips >= b.length - 1) {
    return null;
  }

  return merged;
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
