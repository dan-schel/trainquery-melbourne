import type {
  CalendarCsvRow,
  CalendarDatesCsvRow,
} from "../csv/csv-schemas.js";

export type GtfsParsingError = GtfsCalendarParsingError | GtfsTripParsingError;

export type GtfsCalendarParsingError =
  | DuplicateCalendarIdError
  | UnexpectedCalendarDateExceptionTypeError
  | InvalidCalendarDateRangeError;

export type GtfsTripParsingError = null; // TODO: Implement.

export class DuplicateCalendarIdError extends Error {
  constructor(id: string) {
    super(`Duplicate service_id "${id}" found in calendar.txt.`);
  }
}

export class InvalidCalendarDateRangeError extends Error {
  constructor(row: CalendarCsvRow) {
    super(
      `Invalid date range for service_id "${row.service_id}" found in calendar.txt: start date ${row.start_date.toString()} is after end date ${row.end_date.toString()}.`,
    );
  }
}

export class UnexpectedCalendarDateExceptionTypeError extends Error {
  constructor(row: CalendarDatesCsvRow) {
    super(
      `Unexpected exception_type "${row.exception_type}" found in calendar_dates.txt for service_id "${row.service_id}".`,
    );
  }
}
