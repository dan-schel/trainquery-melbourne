import type { ServiceTime } from "./service-time.js";

export const MELBOURNE_TIMEZONE = "Australia/Melbourne";

// While we could cast a much wider net (+/- 24 hours) to handle all possible
// timezones, we know that for Melbourne it's either +10 in AEDT or +11 in AEST.
export const MELBOURNE_MINIMUM_VIABLE_OFFSET_MINS = 10 * 60;
export const MELBOURNE_MAXIMUM_VIABLE_OFFSET_MINS = 11 * 60;

export class ServiceDay {
  constructor(
    readonly date: Temporal.PlainDate,
    readonly offsetSeconds: number,
    readonly earliestServiceTime: ServiceTime,
    readonly earliestServiceInstant: Temporal.Instant,
    readonly latestServiceTime: ServiceTime,
    readonly latestServiceInstant: Temporal.Instant,
  ) {}

  static allInWindow(
    start: Temporal.Instant,
    end: Temporal.Instant,
    timezone: string,
    minimumViableOffsetMins: number,
    maximumViableOffsetMins: number,
    earliestServiceTime: ServiceTime,
    latestServiceTime: ServiceTime,
  ): ServiceDay[] {
    // TODO: Based on image.png, return all the ServiceDay objects relevant for
    // the given UTC datetime window.
  }

  static offsetSecondsAtMiddayFor(
    date: Temporal.PlainDate,
    timezone: string,
  ): number {
    // Should be safe to use Temporal, as this code (as with all code in the
    // `trainquery-melbourne` repo) runs on the server only.
    const nanoseconds = Temporal.ZonedDateTime.from(
      {
        timeZone: timezone,
        year: date.year,
        month: date.month,
        day: date.day,
        hour: 12,
        minute: 0,
      },
      {
        // Throws an error if this is ambiguous (just like 2:30am can be
        // ambiguous during DST changes in Melbourne). The GTFS spec operates on
        // the timezone as at 12pm that day, which should avoid this problem,
        // and certainly does for Melbourne.
        disambiguation: "reject",
      },
    ).offsetNanoseconds;

    return nanoseconds / 1_000_000_000;
  }
}
