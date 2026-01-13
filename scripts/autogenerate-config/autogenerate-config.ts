import { AutogenerationContext } from "./autogeneration-context";
import { parseStops } from "./parse-stops";

export async function autogenerateConfig(
  ctx: AutogenerationContext,
): Promise<void> {
  const stops = parseStops(ctx);

  for (const stop of stops) {
    if (!ctx.stopIds.has(stop.constantName)) {
      ctx.stopIds.add(stop.constantName);
    }
  }

  const activeConstants = ctx.stopIds.entries().filter(([, v]) => v.isActive);
  for (const [constantName] of activeConstants) {
    if (!stops.some((stop) => stop.constantName === constantName)) {
      ctx.stopIds.deactivate(constantName);
    }
  }
}
