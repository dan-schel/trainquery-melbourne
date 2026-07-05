import { GtfsSchedule } from "../data/gtfs-schedule.js";
import type { GtfsFeedCsv } from "../csv/read-gtfs-csvs.js";
import { GtfsCalendarParser } from "./gtfs-calendar-parser.js";
import type { GtfsParsingError } from "./errors.js";
import { GtfsTripParser } from "./gtfs-trip-parser.js";
import type { LineRoutesConfig } from "../../../config/gtfs/types.js";
import type { LineGtfsIdMapping } from "../../ids/line-gtfs-id-mapping.js";
import type { StopGtfsIdMapping } from "../../ids/stop-gtfs-id-mapping.js";

export class GtfsScheduleParser {
  private readonly _calendarParser: GtfsCalendarParser;
  private readonly _tripParser: GtfsTripParser;

  constructor(
    _lineRoutes: LineRoutesConfig,
    _onError: (error: GtfsParsingError) => void,
  ) {
    this._calendarParser = new GtfsCalendarParser(_onError);
    this._tripParser = new GtfsTripParser(_lineRoutes, _onError);
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
