import {
  type RoutesCsv,
  routesCsvSchema,
  type StopsCsv,
  stopsCsvSchema,
} from "./csv-schemas.js";
import { readCsv } from "../utils/read-csv.js";
import path from "path";
import { type GtfsDirectories } from "./with-gtfs-files.js";

export type GtfsData = {
  readonly suburban: GtfsFeed;
  readonly regional: GtfsFeed;
};

export type GtfsFeed = {
  readonly stops: StopsCsv;
  readonly routes: RoutesCsv;
};

export async function readGtfs(dirs: GtfsDirectories): Promise<GtfsData> {
  return {
    suburban: await readFeed(dirs.suburban),
    regional: await readFeed(dirs.regional),
  };
}

async function readFeed(dir: string): Promise<GtfsFeed> {
  return {
    stops: await readCsv(path.join(dir, "stops.txt"), stopsCsvSchema),
    routes: await readCsv(path.join(dir, "routes.txt"), routesCsvSchema),
  };
}
