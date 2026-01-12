import z from "zod";
import { readCsv } from "./utils/read-csv";
import path from "path";

const stopsCsvSchema = z.object({
  stop_id: z.string(),
  stop_name: z.string().transform((x) => x.trim()),
  stop_lat: z.string(),
  stop_lon: z.string(),
  parent_station: z.string(),
  platform_code: z.string().optional(),
});

export async function readStops(regionalDir: string, suburbanDir: string) {
  const suburbanCsvPath = path.join(suburbanDir, "stops.txt");
  const regionalCsvPath = path.join(regionalDir, "stops.txt");

  const suburbanRaw = await readCsv(suburbanCsvPath, stopsCsvSchema);
  const regionalRaw = await readCsv(regionalCsvPath, stopsCsvSchema);

  const suburban = suburbanRaw.filter((stop) =>
    stop.stop_name.endsWith(" Railway Station"),
  );
  const regional = regionalRaw.filter((stop) =>
    stop.stop_name.endsWith(" Railway Station"),
  );

  const all = [...suburban, ...regional];
  return all;
}
