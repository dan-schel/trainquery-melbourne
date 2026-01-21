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

export type GtfsData = {
  readonly suburban: GtfsFeed;
  readonly regional: GtfsFeed;
};

export type GtfsFeed = {
  readonly stops: StopsCsv;
  readonly routes: RoutesCsv;
  readonly trips: TripsCsv;
  readonly stopTimes: StopTimesCsv;
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

  return {
    stops: await readCsvNamed("stops.txt", stopsCsvSchema),
    routes: await readCsvNamed("routes.txt", routesCsvSchema),
    trips: await readCsvNamed("trips.txt", tripsCsvSchema),
    stopTimes: await readCsvNamed("stopTimes.txt", stopTimesCsvSchema),
  };
}
