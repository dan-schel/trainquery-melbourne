import {
  type CalendarCsv,
  calendarCsvSchema,
  type CalendarDatesCsv,
  calendarDatesCsvSchema,
  type RoutesCsv,
  routesCsvSchema,
  type StopsCsv,
  stopsCsvSchema,
  type StopTimesCsv,
  stopTimesCsvSchema,
  type TransfersCsv,
  transfersCsvSchema,
  type TripsCsv,
  tripsCsvSchema,
} from "../../corequery-gtfs/data/raw/schedule-csvs.js";
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
  readonly calendar: CalendarCsv;
  readonly calendarDates: CalendarDatesCsv;
  readonly transfers: TransfersCsv;
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
