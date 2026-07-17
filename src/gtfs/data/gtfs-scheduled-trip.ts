import type { Color } from "corequery";
import type { GtfsCalendar } from "./gtfs-calendar.js";
import { itsOk } from "@dan-schel/js-utils";
import type {
  GtfsScheduledTripMovement,
  GtfsScheduledTripOriginatingMovement,
  GtfsScheduledTripTerminatingMovement,
} from "./gtfs-scheduled-trip-movements.js";

export type GtfsScheduledTripFields = {
  readonly gtfsTripId: string;
  readonly gtfsRouteId: string;
  readonly calendar: GtfsCalendar;
  readonly movements: readonly GtfsScheduledTripMovement[];

  // TODO: Corequery supports multiple lineIds per service leg, e.g. for Westall
  // trains which are both Cranbourne & Pakenham line, and we should here too,
  // so that filtering by line works as a passenger would expect.
  //
  // I think the strategy should be to match it against the GTFS-given line as
  // we already, and only once establishing that it's compatible with one of the
  // claimed line's routes, then try to match against additional lines. We will
  // provide mapping of which additional lines it should be attempted against
  // (e.g. Cranbourne if the GTFS line is Pakenham and vice versa) for
  // efficiency.
  //
  // The mapping as suggested above would also prevent group escapes. For
  // example, a train running a shuttle between Caulfield and the city could a
  // Frankston line train, but it could also be a Pakenham/Cranbourne footy
  // special via the old route. The train nerd in me doesn't like to think of
  // that as being a combined Frankston/Pakenham/Cranbourne service, it either
  // runs on the Frankston line track pair, or the Pakenham/Cranbourne line
  // track pair, and that's the line it is! Not to draw the line here would mean
  // having to choose between green and blue for the service color too, and no
  // matter how you do that, it'd be a bit inconsistent (unless I add support
  // for a new `blue-green-gradient` color).
  //
  // Related side note: I reckon I should add a patch to make those weird North
  // Melbourne services be considered Craigieburn/Upfield services, because I
  // believe they're currently considered Flemington Racecourse line services,
  // which is absurd to me. Though I have to find a way to do it that doesn't
  // jeopordize matching to realtime data (have an equivalent patch for the
  // realtime data too?).
  readonly lineId: number;

  readonly color: Color;
  readonly serviceTags: readonly number[];
  readonly previousTrip: GtfsScheduledTrip | null;
  readonly nextTrip: GtfsScheduledTrip | null;
};

export class GtfsScheduledTrip {
  readonly gtfsTripId: string;
  readonly gtfsRouteId: string;
  readonly calendar: GtfsCalendar;
  readonly movements: readonly GtfsScheduledTripMovement[];
  readonly lineId: number;
  readonly color: Color;
  readonly serviceTags: readonly number[];
  readonly previousTrip: GtfsScheduledTrip | null;
  readonly nextTrip: GtfsScheduledTrip | null;

  constructor(fields: GtfsScheduledTripFields) {
    this.gtfsTripId = fields.gtfsTripId;
    this.gtfsRouteId = fields.gtfsRouteId;
    this.calendar = fields.calendar;
    this.movements = fields.movements;
    this.lineId = fields.lineId;
    this.color = fields.color;
    this.serviceTags = fields.serviceTags;
    this.previousTrip = fields.previousTrip;
    this.nextTrip = fields.nextTrip;

    if (this.movements.length < 2) throw new Error("Must have 2+ movements.");

    const originOk = itsOk(this.movements[0]).type === "originating";
    const terminusOk = itsOk(this.movements.at(-1)).type === "terminating";
    const othersOk = this.movements.slice(1, -1).every((m) => m.isInBetween);
    if (!originOk) throw new Error("First movement of wrong type.");
    if (!terminusOk) throw new Error("Last movement of wrong type");
    if (!othersOk) throw new Error("Some in-between movements of wrong type.");
  }

  with(newValues: Partial<GtfsScheduledTripFields>): GtfsScheduledTrip {
    return new GtfsScheduledTrip({ ...this, ...newValues });
  }

  static connectAsTransfer(
    from: GtfsScheduledTrip,
    to: GtfsScheduledTrip,
  ): readonly [GtfsScheduledTrip, GtfsScheduledTrip] {
    return [from.with({ nextTrip: to }), to.with({ previousTrip: from })];
  }

  get origination(): GtfsScheduledTripOriginatingMovement {
    const firstMovement = this.movements[0];
    if (firstMovement?.type === "originating") return firstMovement;

    // Can't happen. Checked in constructor.
    throw new Error();
  }

  get termination(): GtfsScheduledTripTerminatingMovement {
    const lastMovement = this.movements.at(-1);
    if (lastMovement?.type === "terminating") return lastMovement;

    // Can't happen. Checked in constructor.
    throw new Error();
  }
}
