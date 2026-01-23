import { areUnique, distanceInMeters, itsOk } from "@dan-schel/js-utils";
import type { AutogenerationContext } from "../autogeneration-context.js";

const cityLoopDetectorStation = "Melbourne Central";
const metroTunnelDetectorStation = "Town Hall";

type NamedPattern = {
  readonly name: string;
  readonly pattern: number[];
};

export function namePatterns(
  ctx: AutogenerationContext,
  patterns: number[][],
): NamedPattern[] {
  const automaticNames = patterns.map((pattern) => ({
    name: selectName(ctx, pattern),
    pattern,
  }));

  const allHaveNames = automaticNames.every((x) => x.name !== null);
  const namesAreUnique = areUnique(automaticNames.map((x) => x.name));
  if (allHaveNames && namesAreUnique) {
    const namedPatterns: NamedPattern[] = automaticNames.map((x) => ({
      ...x,
      name: itsOk(x.name),
    }));

    return namedPatterns.map((x) => ({
      ...x,
      name: finalizeName(x.name, namedPatterns),
    }));
  }

  return patterns.map((pattern, index) => ({
    name: `Route ${index + 1}`,
    pattern,
  }));
}

function selectName(ctx: AutogenerationContext, pattern: number[]) {
  const upOrDown = guessUpOrDown(ctx, pattern);
  if (upOrDown == null) return null;

  return applyModifier(ctx, upOrDown, pattern);
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

  return distanceToFirst < distanceToLast ? "Down" : "Up";
}

function applyModifier(
  ctx: AutogenerationContext,
  name: string,
  pattern: number[],
): string {
  const cityLoopStopId = ctx.stops.require(cityLoopDetectorStation).id;
  const metroTunnelStopId = ctx.stops.require(metroTunnelDetectorStation).id;

  if (pattern.includes(cityLoopStopId)) {
    return `${name} via City Loop`;
  }

  if (pattern.includes(metroTunnelStopId)) {
    return `${name} via Metro Tunnel`;
  }

  return name;
}

function finalizeName(name: string, others: NamedPattern[]): string {
  const lineUsesCityLoop = others.some((r) => r.name.includes("via City Loop"));

  if (name === "Up" && lineUsesCityLoop) {
    return "Up Direct";
  }

  if (name === "Down" && lineUsesCityLoop) {
    return "Down Direct";
  }

  return name;
}
