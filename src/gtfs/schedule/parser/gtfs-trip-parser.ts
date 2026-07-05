import type { LineCollection } from "corequery";
import type { LineGtfsIdMapping } from "../../ids/line-gtfs-id-mapping.js";
import type { StopGtfsIdMapping } from "../../ids/stop-gtfs-id-mapping.js";
import type {
  StopTimesCsv,
  TransfersCsv,
  TripsCsv,
} from "../csv/csv-schemas.js";
import type { GtfsCalendar } from "../data/gtfs-calendar.js";
import type { GtfsTrip } from "../data/gtfs-trip.js";
import type { GtfsTripParsingError } from "./errors.js";
import type { LineRoutesConfig } from "../../../config/gtfs/types.js";

export class GtfsTripParser {
  constructor(
    // Unlike csvs, lineGtfsIdMapping, and stopGtfsIdMapping, these are not
    // subfeed-dependent, so I'm opting to make them constructor args.
    private readonly _lines: LineCollection,
    private readonly _lineRoutes: LineRoutesConfig,

    private readonly _onError: (error: GtfsTripParsingError) => void,
  ) {}

  parse(
    trips: TripsCsv,
    stopTimes: StopTimesCsv,
    transfers: TransfersCsv,
    calendars: readonly GtfsCalendar[],
    lineGtfsIdMapping: LineGtfsIdMapping,
    stopGtfsIdMapping: StopGtfsIdMapping,
  ): readonly GtfsTrip[] {
    const calendarMap = new Map<string, GtfsCalendar>(
      calendars.map((c) => [c.id, c]),
    );

    return [];
  }
}
