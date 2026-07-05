import {
  type RoutesCsv,
  routesCsvSchema,
  type StopsCsv,
  stopsCsvSchema,
  type StopTimesCsv,
  stopTimesCsvSchema,
  type TripsCsv,
  tripsCsvSchema,
} from "./csv-schemas.js";
import path from "path";
import { type GtfsDirectories } from "./with-gtfs-csvs.js";
import type z from "zod";
import { readCsv } from "./utils/read-csv.js";
import { applyPatches } from "./patches/index.js";

export type GtfsCsvData = {
  readonly suburban: GtfsFeedCsv;
  readonly regional: GtfsFeedCsv;
};

export type GtfsFeedCsv = {
  readonly stops: StopsCsv;
  readonly routes: RoutesCsv;
  readonly trips: TripsCsv;
  readonly stopTimes: StopTimesCsv;
};

export async function readGtfsCsvs(
  dirs: GtfsDirectories,
): Promise<GtfsCsvData> {
  return applyPatches({
    suburban: await readFeed(dirs.suburban),
    regional: await readFeed(dirs.regional),
  });
}

async function readFeed(dir: string): Promise<GtfsFeedCsv> {
  async function readCsvNamed<T extends z.ZodType>(file: string, schema: T) {
    return await readCsv(path.join(dir, file), schema);
  }

  return {
    stops: await readCsvNamed("stops.txt", stopsCsvSchema),
    routes: await readCsvNamed("routes.txt", routesCsvSchema),
    trips: await readCsvNamed("trips.txt", tripsCsvSchema),
    stopTimes: await readCsvNamed("stop_times.txt", stopTimesCsvSchema),
  };
}
