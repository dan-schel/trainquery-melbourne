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
import { readCsv } from "../utils/read-csv.js";
import path from "path";
import { type GtfsDirectories } from "./with-gtfs-files.js";
import type z from "zod";
import { IndexedStopTimes } from "./indexed-stop-times.js";

export type GtfsData = {
  readonly suburban: GtfsFeed;
  readonly regional: GtfsFeed;
};

export type GtfsFeed = {
  readonly stops: StopsCsv;
  readonly routes: RoutesCsv;
  readonly trips: TripsCsv;
  readonly stopTimes: StopTimesCsv;
  readonly stopTimesIndexed: IndexedStopTimes;
};

export async function readGtfs(dirs: GtfsDirectories): Promise<GtfsData> {
  return {
    suburban: await readFeed(dirs.suburban),
    regional: await readFeed(dirs.regional),
  };
}

async function readFeed(dir: string): Promise<GtfsFeed> {
  async function readCsvNamed<T extends z.ZodType>(file: string, schema: T) {
    return await readCsv(path.join(dir, file), schema);
  }

  const stopTimes = await readCsvNamed("stop_times.txt", stopTimesCsvSchema);

  return {
    stops: await readCsvNamed("stops.txt", stopsCsvSchema),
    routes: await readCsvNamed("routes.txt", routesCsvSchema),
    trips: await readCsvNamed("trips.txt", tripsCsvSchema),
    stopTimes,
    stopTimesIndexed: IndexedStopTimes.build(stopTimes),
  };
}
