import type { StopGtfsIdMetadata } from "../../ids/stop-gtfs-id-metadata.js";
import type { GtfsStopTime } from "../../schedule/data/gtfs-stop-time.js";

export class GtfsScheduledTripStopTimeUpdate {
  constructor(
    readonly gtfsTripId: string,
    readonly startDate: Temporal.PlainDate,
    readonly startTime: GtfsStopTime,
  ) {}
}

export class GtfsScheduledTripStopTimeUpdateStop {
  constructor(
    readonly stopId: string,
    readonly gtfsStopIdMetadata: StopGtfsIdMetadata,
  ) {}
}
