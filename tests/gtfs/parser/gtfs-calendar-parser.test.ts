import { describe, expect, it } from "vitest";
import {
  DuplicateCalendarIdError,
  GtfsCalendarParser,
  InvalidCalendarDateRangeError,
  MultipleExceptionsForSameDateError,
  UnexpectedCalendarDateExceptionTypeError,
  type GtfsCalendarParsingError,
} from "../../../src/gtfs/parser/gtfs-calendar-parser.js";
import { calendarRow } from "./factories.js";

describe("GtfsCalendarParser", () => {
  it("parses base calendars and calendar date exceptions", () => {
    const errors: GtfsCalendarParsingError[] = [];
    const parser = new GtfsCalendarParser((error) => errors.push(error));

    const addedDate = Temporal.PlainDate.from({
      year: 2026,
      month: 6,
      day: 17,
    });
    const removedDate = Temporal.PlainDate.from({
      year: 2026,
      month: 6,
      day: 18,
    });

    const calendars = parser.parse(
      [calendarRow({ service_id: "svc", monday: true })],
      [
        { service_id: "svc", date: addedDate, exception_type: 1 },
        { service_id: "svc", date: removedDate, exception_type: 2 },
      ],
    );

    expect(errors).toEqual([]);
    expect(calendars).toHaveLength(1);

    const calendar = calendars[0];
    if (calendar == null) throw new Error("Expected one calendar.");

    expect(calendar.gtfsCalendarId).toBe("svc");
    expect(calendar.addedDates).toEqual([addedDate]);
    expect(calendar.removedDates).toEqual([removedDate]);
    expect(calendar.monday).toBe(true);
  });

  it("creates calendars from calendar_dates only", () => {
    const errors: GtfsCalendarParsingError[] = [];
    const parser = new GtfsCalendarParser((error) => errors.push(error));

    const addedDate = Temporal.PlainDate.from({
      year: 2026,
      month: 6,
      day: 19,
    });

    const calendars = parser.parse(
      [],
      [{ service_id: "svc", date: addedDate, exception_type: 1 }],
    );

    expect(errors).toEqual([]);
    expect(calendars).toHaveLength(1);

    const calendar = calendars[0];
    if (calendar == null) throw new Error("Expected one calendar.");

    expect(calendar.gtfsCalendarId).toBe("svc");
    expect(calendar.addedDates).toEqual([addedDate]);
    expect(calendar.isRecurring).toBe(false);
  });

  it("reports, but ultimately ignores subsequent rows with the same ID", () => {
    const errors: GtfsCalendarParsingError[] = [];
    const parser = new GtfsCalendarParser((error) => errors.push(error));

    const calendars = parser.parse(
      [
        calendarRow({ service_id: "svc", monday: true }),
        calendarRow({ service_id: "svc", monday: false, tuesday: true }),
      ],
      [],
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(DuplicateCalendarIdError);
    expect(calendars).toHaveLength(1);

    const calendar = calendars[0];
    if (calendar == null) throw new Error("Expected one calendar.");

    expect(calendar.monday).toBe(true);
    expect(calendar.tuesday).toBe(false);
  });

  it("does not create calendars which are invalid, even if rows in calendar_dates for that calendar exist", () => {
    const errors: GtfsCalendarParsingError[] = [];
    const parser = new GtfsCalendarParser((error) => errors.push(error));

    const calendars = parser.parse(
      [
        calendarRow({
          service_id: "bad",
          start_date: Temporal.PlainDate.from({
            year: 2026,
            month: 6,
            day: 20,
          }),
          end_date: Temporal.PlainDate.from({ year: 2026, month: 6, day: 19 }),
        }),
      ],

      // Because the calendar above is invalid, it will be reported and then
      // ignored. The parser needs to be smart enough to know that the
      // calendar_dates row below is associated with that broken calendar above,
      // not just think "ah, a calendar_dates row for a calendar that doesn't
      // exist, I'll create a calendar for it!".
      [
        {
          service_id: "bad",
          date: Temporal.PlainDate.from({ year: 2026, month: 6, day: 21 }),
          exception_type: 1,
        },
      ],
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(InvalidCalendarDateRangeError);
    expect(calendars).toEqual([]);
  });

  it("reports unexpected exception types in calendar_dates rows", () => {
    const errors: GtfsCalendarParsingError[] = [];
    const parser = new GtfsCalendarParser((error) => errors.push(error));

    const calendars = parser.parse(
      [],
      [
        {
          service_id: "svc",
          date: Temporal.PlainDate.from({ year: 2026, month: 6, day: 21 }),
          exception_type: 3,
        },
      ],
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(UnexpectedCalendarDateExceptionTypeError);
    expect(calendars).toEqual([]);
  });

  it("reports duplicate calendar_dates exceptions for the same date", () => {
    const errors: GtfsCalendarParsingError[] = [];
    const parser = new GtfsCalendarParser((error) => errors.push(error));

    const date = Temporal.PlainDate.from({ year: 2026, month: 6, day: 21 });
    const calendars = parser.parse(
      [],
      [
        { service_id: "svc", date, exception_type: 1 },
        { service_id: "svc", date, exception_type: 2 },
      ],
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(MultipleExceptionsForSameDateError);
    expect(calendars).toHaveLength(1);
  });
});
