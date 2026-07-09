import type { Color } from "corequery";
import type { GtfsCalendar } from "./gtfs-calendar.js";
import type { GtfsStopTime } from "./gtfs-stop-time.js";
import type { StopGtfsIdMetadata } from "../../ids/stop-gtfs-id-metadata.js";
import { itsOk } from "@dan-schel/js-utils";

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
  gtfsStopSequence: number;
};

type GtfsTripExpressStop = {
  type: "express";
  stopId: number;
};

export type GtfsTripFields = {
  readonly gtfsTripId: string;
  readonly gtfsRouteId: string;
  readonly calendar: GtfsCalendar;
  readonly stops: readonly GtfsTripStop[];
  readonly lineId: number;
  readonly color: Color;
  readonly serviceTags: readonly number[];
  readonly previousTrip: GtfsTrip | null;
  readonly nextTrip: GtfsTrip | null;
};

export class GtfsTrip {
  readonly gtfsTripId: string;
  readonly gtfsRouteId: string;
  readonly calendar: GtfsCalendar;
  readonly stops: readonly GtfsTripStop[];
  readonly lineId: number;
  readonly color: Color;
  readonly serviceTags: readonly number[];
  readonly previousTrip: GtfsTrip | null;
  readonly nextTrip: GtfsTrip | null;

  constructor(fields: GtfsTripFields) {
    this.gtfsTripId = fields.gtfsTripId;
    this.gtfsRouteId = fields.gtfsRouteId;
    this.calendar = fields.calendar;
    this.stops = fields.stops;
    this.lineId = fields.lineId;
    this.color = fields.color;
    this.serviceTags = fields.serviceTags;
    this.previousTrip = fields.previousTrip;
    this.nextTrip = fields.nextTrip;

    if (this.stops.length < 2) throw new Error("Must have 2 or more stops.");

    const firstStopOk = itsOk(this.stops[0]).type === "serviced";
    const lastStopOk = itsOk(this.stops.at(-1)).type === "serviced";
    if (!firstStopOk) throw new Error("First stop must be serviced.");
    if (!lastStopOk) throw new Error("Last stop must be serviced");
  }

  with(newValues: Partial<GtfsTripFields>): GtfsTrip {
    return new GtfsTrip({ ...this, ...newValues });
  }

  static connect(from: GtfsTrip, to: GtfsTrip): readonly [GtfsTrip, GtfsTrip] {
    return [from.with({ nextTrip: to }), to.with({ previousTrip: from })];
  }

  get origin(): GtfsTripServicedStop {
    if (this.stops[0]?.type === "serviced") return this.stops[0];

    // Can't happen. Checked in constructor.
    throw new Error();
  }

  get terminus(): GtfsTripServicedStop {
    const lastStop = this.stops.at(-1);
    if (lastStop?.type === "serviced") return lastStop;

    // Can't happen. Checked in constructor.
    throw new Error();
  }
}
