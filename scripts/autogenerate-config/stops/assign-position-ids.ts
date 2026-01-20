import { AutogenerationContext } from "../autogeneration-context.js";
import { type ParsedStop } from "./extract-stops-from-tree.js";

export type WithPlatformIds<T extends ParsedStop> = Omit<T, "platforms"> & {
  readonly platforms: (T["platforms"][number] & {
    readonly positionId: number;
    readonly constantName: string;
  })[];
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
    platforms: stop.platforms.map((platform) => {
      const name = generateNameFromPlatformCode(platform.platformCode);
      const entry = ctx.positionIds.get(name) ?? ctx.positionIds.add(name);

      if (!entry.isActive) ctx.stopIds.reactivate(stop.name);

      return {
        platformCode: platform.platformCode,
        positionId: entry.id,
        constantName: entry.constantName,
      };
    }),
  };
}

function generateNameFromPlatformCode(platformCode: string) {
  return platformCode.toUpperCase();
}
