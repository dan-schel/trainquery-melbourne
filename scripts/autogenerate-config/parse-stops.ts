import { unique } from "@dan-schel/js-utils";
import { AutogenerationContext } from "./autogeneration-context";
import { STOPS_CSV } from "./utils/gtfs-file";

export async function parseStops(ctx: AutogenerationContext) {
  const suburbanRows = await ctx.readGtfsFile("suburban", STOPS_CSV);
  const regionalRows = await ctx.readGtfsFile("regional", STOPS_CSV);
  const allRows = [...suburbanRows, ...regionalRows];

  // Find all the rows that are parents of other rows, as each station has a
  // parent row, while each platform has child rows.
  const parentRows = allRows.filter((row) => {
    return allRows.some((otherRow) => otherRow.parent_station === row.stop_id);
  });

  // Deduplicate stations which are present in both the suburban and regional
  // feeds.
  const uniqueStations = unique(parentRows, (a, b) => a.stop_id === b.stop_id);

  return uniqueStations.map((station) => ({
    name: station.stop_name.replace(/( Railway)? Station$/, ""),
  }));
}
