import { AutogenerationContext } from "./autogeneration-context";
import { STOPS_CSV } from "./utils/gtfs-file";

export async function parseStops(ctx: AutogenerationContext) {
  const suburbanRaw = await ctx.readGtfsFile("suburban", STOPS_CSV);
  const regionalRaw = await ctx.readGtfsFile("regional", STOPS_CSV);

  const suburban = suburbanRaw.filter((stop) =>
    stop.stop_name.endsWith(" Railway Station"),
  );
  const regional = regionalRaw.filter(
    (stop) =>
      stop.stop_name.endsWith(" Railway Station") &&
      !suburban.some((x) => x.stop_id === stop.stop_id),
  );

  const all = [...suburban, ...regional];
  return all;
}
