import type { GtfsScheduledTrip } from "./gtfs-scheduled-trip.js";
import type { GtfsUpdatedTripMovement } from "./gtfs-updated-trip-movements.js";

type GtfsUpdatedTripFields = {
  readonly scheduledTrip: GtfsScheduledTrip;

  readonly serviceDay: Temporal.PlainDate;

  readonly movements: readonly GtfsUpdatedTripMovement[];
  readonly isCancelled: boolean;
};

export class GtfsUpdatedTrip {
  readonly scheduledTrip: GtfsScheduledTrip;

  // An updated trip is not recurring. It only ever applies to a single
  // instance of a trip.
  readonly serviceDay: Temporal.PlainDate;

  readonly movements: readonly GtfsUpdatedTripMovement[];
  readonly isCancelled: boolean;

  constructor(fields: GtfsUpdatedTripFields) {
    this.scheduledTrip = fields.scheduledTrip;
    this.serviceDay = fields.serviceDay;
    this.movements = fields.movements;
    this.isCancelled = fields.isCancelled;
  }
}
