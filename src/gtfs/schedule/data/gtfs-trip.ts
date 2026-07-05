import type { Color } from "corequery";
import type { GtfsCalendar } from "./gtfs-calendar.js";
import type { GtfsStopTime } from "./gtfs-stop-time.js";
import type { StopGtfsIdMetadata } from "../../ids/stop-gtfs-id-metadata.js";

export type GtfsTripStop = GtfsTripServicedStop | GtfsTripExpressStop;

export type GtfsTripServicedStop = {
  type: "serviced";
  stopId: number;
  positionId: number | null;
  arrivalTime: GtfsStopTime;
  departureTime: GtfsStopTime;
  picksUp: boolean;
  dropsOff: boolean;
  gtfsIdMetadata: StopGtfsIdMetadata;
};

export type GtfsTripExpressStop = {
  type: "express";
  stopId: number;
};

export class GtfsTrip {
  constructor(
    readonly gtfsTripId: string,
    readonly gtfsRouteId: string,
    readonly calendar: GtfsCalendar,
    readonly stops: readonly GtfsTripStop[],
    readonly lineId: number,
    readonly color: Color,
    readonly serviceTags: readonly number[],
    readonly previousTrip: GtfsTrip | null,
    readonly nextTrip: GtfsTrip | null,
  ) {}
}
