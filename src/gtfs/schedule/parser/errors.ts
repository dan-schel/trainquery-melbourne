import type {
  CalendarCsvRow,
  CalendarDatesCsvRow,
} from "../csv/csv-schemas.js";

export type GtfsParsingError = GtfsCalendarParsingError | GtfsTripParsingError;

export type GtfsCalendarParsingError =
  | DuplicateCalendarIdError
  | UnexpectedCalendarDateExceptionTypeError
  | InvalidCalendarDateRangeError;

export type GtfsTripParsingError =
  | StopTimeWithoutTripError
  | DuplicateTripIdError
  | CalendarNotFoundForTripError
  | RouteIdNotMappedError
  | GtfsStopTimeNormalisationError
  | GtfsRouteMatchingError;

export type GtfsStopTimeNormalisationError = StopSequenceDuplicatedError;

export type GtfsRouteMatchingError = NoMatchingRouteError;

export class DuplicateCalendarIdError extends Error {
  readonly type = "duplicate-calendar";
  constructor(calendarId: string) {
    super(`Duplicate service_id "${calendarId}" found in calendar.txt.`);
  }
}

export class InvalidCalendarDateRangeError extends Error {
  readonly type = "invalid-calendar-date-range";
  constructor(row: CalendarCsvRow) {
    super(
      `Invalid date range for service_id "${row.service_id}" found in calendar.txt: start date ${row.start_date.toString()} is after end date ${row.end_date.toString()}.`,
    );
  }
}

export class UnexpectedCalendarDateExceptionTypeError extends Error {
  readonly type = "unexpected-calendar-date-exception-type";
  constructor(row: CalendarDatesCsvRow) {
    super(
      `Unexpected exception_type "${row.exception_type}" found in calendar_dates.txt for service_id "${row.service_id}".`,
    );
  }
}

export class DuplicateTripIdError extends Error {
  readonly type = "duplicate-trip-id";
  constructor(tripId: string) {
    super(`Duplicate trip_id "${tripId}" found in trips.txt.`);
  }
}

export class StopTimeWithoutTripError extends Error {
  readonly type = "stop-time-without-trip";
  constructor(tripId: string) {
    super(
      `Stop time found for trip_id "${tripId}" which does not exist in trips.txt.`,
    );
  }
}

export class RouteIdNotMappedError extends Error {
  readonly type = "route-id-not-mapped";
  constructor(routeId: string) {
    super(`Unmapped route_id "${routeId}" cannot be resolved to a line.`);
  }
}

export class CalendarNotFoundForTripError extends Error {
  readonly type = "calendar-not-found-for-trip";
  constructor(tripId: string, serviceId: string) {
    super(
      `Trip with trip_id "${tripId}" references service_id "${serviceId}" which does not exist in calendar.txt or calendar_dates.txt.`,
    );
  }
}

export class StopSequenceDuplicatedError extends Error {
  readonly type = "stop-sequence-duplicated";
  constructor(tripId: string) {
    super(
      `Trip with trip_id "${tripId}" has duplicate stop_sequence values in stop_times.txt.`,
    );
  }
}

export class NoMatchingRouteError extends Error {
  readonly type = "no-matching-route";
  constructor(tripId: string, stopIds: readonly number[]) {
    // TODO: Pass a stop name resolving function so this can be human readable.
    super(
      `Trip with trip_id "${tripId}" has stop_ids [${stopIds.join(
        ", ",
      )}] which do not match any route for the line.`,
    );
  }
}
