import type { CoreDate } from "../../core-date/core-date.js";
import type { CoreServiceTime } from "../../core-date/core-service-time.js";
import type { CoreUtcDateTime } from "../../core-date/core-utc-date-time.js";

export const MELBOURNE_TIMEZONE = "Australia/Melbourne";

// While we could cast a much wider net (+/- 24 hours) to handle all possible
// timezones, we know that for Melbourne it's either +10 in AEDT or +11 in AEST.
export const MELBOURNE_MINIMUM_VIABLE_OFFSET_MINS = 10 * 60;
export const MELBOURNE_MAXIMUM_VIABLE_OFFSET_MINS = 11 * 60;

export class ServiceDay {
  constructor(
    readonly date: CoreDate,
    readonly offsetSeconds: number,
    readonly earliestServiceTime: CoreServiceTime,
    readonly earliestServiceTimeUtc: CoreUtcDateTime,
    readonly latestServiceTime: CoreServiceTime,
    readonly latestServiceTimeUtc: CoreUtcDateTime,
  ) {}

  static allInWindow(
    start: CoreUtcDateTime,
    end: CoreUtcDateTime,
    timezone: string,
    minimumViableOffsetMins: number,
    maximumViableOffsetMins: number,
    earliestServiceTime: CoreServiceTime,
    latestServiceTime: CoreServiceTime,
  ): ServiceDay[] {}

  static offsetSecondsAtMiddayFor(date: CoreDate, timezone: string): number {
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
        // Throws an error if this is ambiguous, but in practice it shouldn't
        // ever be, at least in Melbourne. (This aligns with the GTFS spec,
        // which operates on the timezone as at 12pm that day.)
        disambiguation: "reject",
      },
    ).offsetNanoseconds;

    return nanoseconds / 1_000_000_000;
  }
}
