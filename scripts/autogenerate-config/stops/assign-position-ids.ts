import { AutogenerationContext } from "../autogeneration-context.js";
import { type ParsedStop } from "./extract-stops-from-tree.js";

export type AssignedPositionId = {
  readonly positionId: number;
  readonly constantName: string;
};

export type WithPlatformIds<T extends ParsedStop> = Omit<T, "platforms"> & {
  readonly platforms: (T["platforms"][number] & AssignedPositionId)[];
};

export function assignPositionIds<T extends ParsedStop>(
  ctx: AutogenerationContext,
  stops: T[],
): WithPlatformIds<T>[] {
  return stops.map((stop) => assignPositionIdsToStop(ctx, stop));
}

function assignPositionIdsToStop<T extends ParsedStop>(
  ctx: AutogenerationContext,
  stop: T,
): WithPlatformIds<T> {
  return {
    ...stop,
    platforms: stop.platforms.map((platform) => ({
      platformCode: platform.platformCode,
      ...assignPositionId(ctx, platform.platformCode),
    })),
  };
}

export function assignPositionId(
  ctx: AutogenerationContext,
  platformCode: string,
): AssignedPositionId {
  const name = generateNameFromPlatformCode(platformCode);
  const entry = ctx.positionIds.get(name) ?? ctx.positionIds.add(name);

  if (!entry.isActive) ctx.stopIds.reactivate(name);

  return {
    positionId: entry.id,
    constantName: entry.constantName,
  };
}

function generateNameFromPlatformCode(platformCode: string) {
  return platformCode.toUpperCase();
}
