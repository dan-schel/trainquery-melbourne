import type { GtfsSchedule } from "./data/gtfs-schedule.js";
import type { GtfsCsvData } from "./csv/read-gtfs-csvs.js";

export class GtfsScheduleParser {
  constructor(
    private readonly _gtfsData: GtfsCsvData,
    private readonly _onError: (error: Error) => void,
  ) {}

  parse(): GtfsSchedule {
    throw new Error("Not implemented");
  }
}
