import { AutogenerationContext } from "./autogeneration-context";
import { parseStops } from "./parse-stops";

export async function autogenerateConfig(
  ctx: AutogenerationContext,
): Promise<void> {
  const stops = await parseStops(ctx);
  console.log(stops.length);
}
