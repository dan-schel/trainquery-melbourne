import { AutogenerationContext } from "./autogeneration-context";
import { parseStops } from "./parse-stops";
import { IdList } from "./source-code/id-list";

export const STOP_IDS_PATH = "./src/ids/stop-ids.ts";

export async function autogenerateConfig(
  ctx: AutogenerationContext,
): Promise<void> {
  // TODO: Move to ctx.
  const stopIds = await IdList.parse(STOP_IDS_PATH);

  const stops = parseStops(ctx);

  for (const stop of stops) {
    if (!stopIds.has(stop.constantName)) {
      stopIds.add(stop.constantName);
    }
  }

  const activeConstants = stopIds.entries().filter(([, v]) => v.isActive);
  for (const [constantName] of activeConstants) {
    if (!stops.some((stop) => stop.constantName === constantName)) {
      stopIds.deactivate(constantName);
    }
  }

  // TODO: Have ctx do this automatically when everything in this function is
  // done.
  await ctx.output(STOP_IDS_PATH, stopIds.asOutput());
}
