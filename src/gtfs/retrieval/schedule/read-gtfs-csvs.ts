import path from "path";
import { type GtfsDirectories } from "./with-gtfs-csvs.js";
import type z from "zod";
import { readCsv } from "./utils/read-csv.js";
import { applyPatches } from "./patches/index.js";
import {
  calendarCsvSchema,
  calendarDatesCsvSchema,
  routesCsvSchema,
  stopsCsvSchema,
  stopTimesCsvSchema,
  transfersCsvSchema,
  tripsCsvSchema,
  type FullGtfsFeedCsv,
} from "./csv-schemas.js";

export type MelbourneGtfsCsvData = {
  readonly suburban: FullGtfsFeedCsv;
  readonly regional: FullGtfsFeedCsv;
};

export async function readGtfsCsvs(
  dirs: GtfsDirectories,
): Promise<MelbourneGtfsCsvData> {
  return applyPatches({
    suburban: await readFeed(dirs.suburban),
    regional: await readFeed(dirs.regional),
  });
}

async function readFeed(dir: string): Promise<FullGtfsFeedCsv> {
  async function read<T extends z.ZodType>(file: string, schema: T) {
    return await readCsv(path.join(dir, file), schema);
  }

  return {
    stops: await read("stops.txt", stopsCsvSchema),
    routes: await read("routes.txt", routesCsvSchema),
    trips: await read("trips.txt", tripsCsvSchema),
    stopTimes: await read("stop_times.txt", stopTimesCsvSchema),
    calendar: await read("calendar.txt", calendarCsvSchema),
    calendarDates: await read("calendar_dates.txt", calendarDatesCsvSchema),
    transfers: await read("transfers.txt", transfersCsvSchema),
  };
}
