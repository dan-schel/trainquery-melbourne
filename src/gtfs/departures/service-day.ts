// TODO: Remove this.
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { GtfsStopTime } from "../data/gtfs-stop-time.js";

export class ServiceDay {
  constructor(
    readonly date: Temporal.PlainDate,
    readonly offsetSeconds: number,
    readonly earliestServiceTime: GtfsStopTime,
    readonly earliestServiceInstant: Temporal.Instant,
    readonly latestServiceTime: GtfsStopTime,
    readonly latestServiceInstant: Temporal.Instant,
  ) {}

  static allIntersectingTimeRange(
    start: Temporal.Instant,
    end: Temporal.Instant,
    timezone: string,
    minimumViableOffsetMins: number,
    maximumViableOffsetMins: number,
    earliestServiceTime: GtfsStopTime,
    latestServiceTime: GtfsStopTime,
  ): ServiceDay[] {
    // TODO: Based on image.png, return all the ServiceDay objects relevant for
    // the given UTC datetime window.

    throw new Error("Method not implemented.");
  }

  // TODO: Remove this (it's on GtfsStopTime now instead), and move test.
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
