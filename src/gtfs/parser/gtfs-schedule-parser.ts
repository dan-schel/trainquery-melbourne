import { GtfsSchedule } from "../schedule/data/gtfs-schedule.js";
import type { GtfsFeedCsv } from "../schedule/csv/read-gtfs-csvs.js";
import {
  GtfsCalendarParser,
  type GtfsCalendarParsingError,
} from "./gtfs-calendar-parser.js";
import {
  GtfsTripParser,
  type GtfsTripParsingError,
} from "./gtfs-trip-parser.js";
import type { LineGtfsIdMapping } from "../ids/line-gtfs-id-mapping.js";
import type { StopGtfsIdMapping } from "../ids/stop-gtfs-id-mapping.js";
import type { LineRoutes } from "../route/line-routes.js";

export class GtfsScheduleParser {
  private readonly _calendarParser: GtfsCalendarParser;
  private readonly _tripParser: GtfsTripParser;

  constructor(
    lineRoutes: LineRoutes,
    onError: (error: GtfsParsingError) => void,
  ) {
    this._calendarParser = new GtfsCalendarParser(onError);
    this._tripParser = new GtfsTripParser(lineRoutes, onError);
  }

  parse(
    csvs: GtfsFeedCsv,
    lineGtfsIdMapping: LineGtfsIdMapping,
    stopGtfsIdMapping: StopGtfsIdMapping,
  ): GtfsSchedule {
    const { calendar, calendarDates, trips, stopTimes, transfers } = csvs;

    const parsedCalendars = this._calendarParser.parse(calendar, calendarDates);

    const parsedTrips = this._tripParser.parse(
      trips,
      stopTimes,
      transfers,
      parsedCalendars,
      lineGtfsIdMapping,
      stopGtfsIdMapping,
    );

    return new GtfsSchedule(parsedTrips);
  }
}

export type GtfsParsingError = GtfsCalendarParsingError | GtfsTripParsingError;
