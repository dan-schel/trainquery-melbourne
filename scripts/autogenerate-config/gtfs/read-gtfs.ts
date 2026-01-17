import { StopsCsv, stopsCsvSchema } from "./csv-schemas";
import { readCsv } from "../utils/read-csv";
import path from "path";
import { GtfsDirectories } from "./with-gtfs-files";

export type GtfsData = {
  readonly suburban: GtfsFeed;
  readonly regional: GtfsFeed;
};

export type GtfsFeed = {
  readonly stops: StopsCsv;
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
  };
}
