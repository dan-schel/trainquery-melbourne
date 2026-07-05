import type {
  CalendarCsv,
  CalendarCsvRow,
  CalendarDatesCsv,
} from "../csv/csv-schemas.js";
import { GtfsCalendar } from "../data/gtfs-calendar.js";
import { PlainDateRange } from "../../departures/plain-date-range.js";
import {
  DuplicateCalendarIdError,
  InvalidCalendarDateRangeError,
  UnexpectedCalendarDateExceptionTypeError,
  type GtfsCalendarParsingError,
} from "./errors.js";

// TODO: All these parsers need unit tests :)

const CALENDAR_DATE_EXCEPTION_TYPE_ADDED = 1;
const CALENDAR_DATE_EXCEPTION_TYPE_REMOVED = 2;

export class GtfsCalendarParser {
  constructor(
    private readonly _onError: (error: GtfsCalendarParsingError) => void,
  ) {}

  parse(
    calendarCsv: CalendarCsv,
    calendarDatesCsv: CalendarDatesCsv,
  ): readonly GtfsCalendar[] {
    type MutableGtfsCalendarFields = {
      id: string;
      baseRow: CalendarCsvRow | null;
      addedDates: Temporal.PlainDate[];
      removedDates: Temporal.PlainDate[];
    };

    const calendarData = new Map<string, MutableGtfsCalendarFields>();
    const calendarsToIgnore = new Set<string>();

    // Step 1: Process rows in calendar.txt.
    for (const row of calendarCsv) {
      if (calendarData.has(row.service_id)) {
        this._onError(new DuplicateCalendarIdError(row.service_id));
        calendarsToIgnore.add(row.service_id);
        continue;
      }

      if (Temporal.PlainDate.compare(row.start_date, row.end_date) > 0) {
        this._onError(new InvalidCalendarDateRangeError(row));
        calendarsToIgnore.add(row.service_id);
        continue;
      }

      calendarData.set(row.service_id, {
        id: row.service_id,
        baseRow: row,
        addedDates: [],
        removedDates: [],
      });
    }

    // Step 2: Process rows in calendar_dates.txt, modifying or adding new
    // calendars as necessary.
    for (const row of calendarDatesCsv) {
      // If something goes wrong parsing the row in calendar.txt, don't act as
      // though no row was present. Ignore calendar_dates.txt rows for it too.
      if (calendarsToIgnore.has(row.service_id)) continue;

      const calendar = calendarData.get(row.service_id) ?? {
        id: row.service_id,
        baseRow: null,
        addedDates: [],
        removedDates: [],
      };

      if (row.exception_type === CALENDAR_DATE_EXCEPTION_TYPE_ADDED) {
        calendar.addedDates.push(row.date);
      } else if (row.exception_type === CALENDAR_DATE_EXCEPTION_TYPE_REMOVED) {
        calendar.removedDates.push(row.date);
      } else {
        this._onError(new UnexpectedCalendarDateExceptionTypeError(row));
        continue;
      }

      calendarData.set(row.service_id, calendar);
    }

    // Step 3: Convert to GtfsCalendar instances.
    return Array.from(calendarData.values()).map((data) => {
      const baseRow = data.baseRow ?? {
        service_id: data.id,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        start_date: null,
        end_date: null,
      };

      return new GtfsCalendar(
        data.id,
        baseRow.monday,
        baseRow.tuesday,
        baseRow.wednesday,
        baseRow.thursday,
        baseRow.friday,
        baseRow.saturday,
        baseRow.sunday,
        new PlainDateRange(baseRow.start_date, baseRow.end_date),
        data.addedDates,
        data.removedDates,
      );
    });
  }
}
