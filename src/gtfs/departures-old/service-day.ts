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
}
