import { AutogenerationContext } from "./autogeneration-context";
import { parseStops } from "./parse-stops";
import { IdList } from "./utils/id-list";

export const STOP_IDS_PATH = "./src/ids/stop-ids.ts";

export async function autogenerateConfig(
  ctx: AutogenerationContext,
): Promise<void> {
  const stopIds = await IdList.parse(STOP_IDS_PATH);
  const stops = await parseStops(ctx);

  for (const stop of stops) {
    const constName = IdList.constantize(stop.name);
    if (!stopIds.has(constName)) {
      stopIds.add(constName);
    }
  }

  for (const id of stopIds.entries().filter(([, v]) => v.isActive)) {
    if (!stops.some((stop) => IdList.constantize(stop.name) === id[0])) {
      stopIds.deactivate(id[0]);
    }
  }

  ctx.output(STOP_IDS_PATH, stopIds.asOutput());
}
