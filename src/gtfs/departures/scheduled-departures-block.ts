import { itsOk } from "@dan-schel/js-utils";
import { DeparturesBlock } from "./departures-block.js";
import type { GtfsScheduledTrip } from "../data/gtfs-scheduled-trip.js";
import type { GtfsStopTime } from "../data/gtfs-stop-time.js";
import type { GtfsScheduledTripServicingMovement } from "../data/gtfs-scheduled-trip-movements.js";

export type ScheduledDeparturesBlockEntry = {
  readonly trip: GtfsScheduledTrip;
  readonly time: GtfsStopTime;
  readonly movement: GtfsScheduledTripServicingMovement;
};

export class ScheduledDeparturesBlock extends DeparturesBlock {
  constructor(
    readonly movements: readonly ScheduledDeparturesBlockEntry[],
    readonly serviceDay: Temporal.PlainDate,
    earliestDepartureInstant: Temporal.Instant,
    latestDepartureInstant: Temporal.Instant,
  ) {
    super(earliestDepartureInstant, latestDepartureInstant);
  }

  static build(
    movements: readonly ScheduledDeparturesBlockEntry[],
    serviceDay: Temporal.PlainDate,
    timezone: string,
  ) {
    if (movements.length === 0) throw new Error("Movements cannot be empty");

    const firstMovement = itsOk(movements[0]);
    const lastMovement = itsOk(movements[movements.length - 1]);

    return new ScheduledDeparturesBlock(
      movements,
      serviceDay,
      firstMovement.time.toInstant(serviceDay, timezone),
      lastMovement.time.toInstant(serviceDay, timezone),
    );
  }
}
