import { distanceInMeters, itsOk } from "@dan-schel/js-utils";
import type { AutogenerationContext } from "../autogeneration-context.js";

export type ParsedRoute = {
  readonly name: string;
  readonly stops: readonly {
    readonly stopId: number;
  }[];
};

export function findRoutesForLine(
  ctx: AutogenerationContext,
  linePrimaryGtfsId: string,
): ParsedRoute[] {
  return [];
}

function guessUpOrDown(ctx: AutogenerationContext, stopIds: number[]) {
  const cityLocation = ctx.stops.require("Flinders Street").location;
  const firstStop = ctx.stops.requireById(itsOk(stopIds.at(0))).location;
  const lastStop = ctx.stops.requireById(itsOk(stopIds.at(-1))).location;

  if (cityLocation == null || firstStop == null || lastStop == null) {
    return "other";
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
