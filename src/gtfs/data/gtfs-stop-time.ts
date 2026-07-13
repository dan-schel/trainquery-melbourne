import { itsOk, posMod } from "@dan-schel/js-utils";

export class GtfsStopTime {
  private constructor(
    /**
     * The number of seconds since midnight. Allows values greater than
     * 24 * 60 * 60 to indicate times that are on the next day or an arbitrary
     * number of days into the future.
     */
    readonly secondsSinceMidnight: number,
  ) {}

  static fromSecondsSinceMidnight(secondsSinceMidnight: number): GtfsStopTime {
    return new GtfsStopTime(secondsSinceMidnight);
  }

  /** Parses strings like `05:30:00` or `25:04:42`. */
  static tryParse(input: string): GtfsStopTime | null {
    const match = /^(\d+):(\d\d):(\d\d)$/.exec(input);
    if (match == null) return null;

    const h = parseInt(itsOk(match[1]), 10);
    const m = parseInt(itsOk(match[2]), 10);
    const s = parseInt(itsOk(match[3]), 10);
    if (m >= 60 || s >= 60) return null;

    return GtfsStopTime.fromSecondsSinceMidnight(h * 60 * 60 + m * 60 + s);
  }

  /** Parses strings like `05:30:00` or `25:04:42`. */
  static parse(input: string): GtfsStopTime {
    const parsed = GtfsStopTime.tryParse(input);
    if (parsed == null) throw new Error(`Invalid GTFS stop time: ${input}`);
    return parsed;
  }

  /**
   * Returns a value `0 <= x < 24 * 60 * 60`. Combines with `dayOffset` to
   * provide the full picture.
   */
  get secondOfDay(): number {
    return posMod(this.secondsSinceMidnight, 24 * 60 * 60);
  }

  /**
   * Returns 0 if `secondsSinceMidnight` is less than 24 hours, 1 if 24-48
   * hours, etc.
   */
  get dayOffset(): number {
    return Math.floor(this.secondsSinceMidnight / (24 * 60 * 60));
  }

  toInstant(
    serviceDay: Temporal.PlainDate,
    timezone: string,
  ): Temporal.Instant {
    const midnightUtc = serviceDay.toZonedDateTime("UTC").toInstant();
    const offset = GtfsStopTime.offsetSecondsAtMiddayFor(serviceDay, timezone);

    // Subtract the offset because we're converting a local time to UTC, i.e.
    // 11am AEST becomes 1am UTC.
    return midnightUtc.add({ seconds: this.secondsSinceMidnight - offset });
  }

  static offsetSecondsAtMiddayFor(
    date: Temporal.PlainDate,
    timezone: string,
  ): number {
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
        // the timezone as at 12pm that day, as do we, and so that should mean
        // it's never a problem (both for Melbourne, and elsewhere).
        disambiguation: "reject",
      },
    ).offsetNanoseconds;

    return nanoseconds / 1_000_000_000;
  }
}
