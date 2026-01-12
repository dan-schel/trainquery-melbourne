import { unique } from "@dan-schel/js-utils";
import { AutogenerationContext } from "./autogeneration-context";
import { STOPS_CSV } from "./utils/gtfs-file";

export async function parseStops(ctx: AutogenerationContext) {
  const suburbanRaw = await ctx.readGtfsFile("suburban", STOPS_CSV);
  const regionalRaw = await ctx.readGtfsFile("regional", STOPS_CSV);

  const stations = [...suburbanRaw, ...regionalRaw].filter((stop) =>
    stop.stop_name.endsWith(" Railway Station"),
  );

  const uniqueStations = unique(stations, (a, b) => a.stop_id === b.stop_id);

  return uniqueStations.map((station) => ({
    name: station.stop_name.replace(" Railway Station", ""),
  }));
}
