import { itsOk } from "@dan-schel/js-utils";
import { DeparturesBlock } from "./departures-block.js";
import type { GtfsScheduledMovementsIndex } from "./gtfs-scheduled-movements-index.js";
import type { GtfsScheduledTrip } from "../data/gtfs-scheduled-trip.js";
import type { GtfsStopTime } from "../data/gtfs-stop-time.js";
import type { GtfsScheduledTripServicingMovement } from "../data/gtfs-scheduled-trip-movements.js";

export type ScheduledDeparturesBlockEntry = {
  readonly trip: GtfsScheduledTrip;
  readonly time: GtfsStopTime;
  readonly movement: GtfsScheduledTripServicingMovement;
};

export class ScheduledDeparturesBlock extends DeparturesBlock {
  private constructor(
    readonly movements: readonly ScheduledDeparturesBlockEntry[],
    earliestDepartureInstant: Temporal.Instant,
    latestDepartureInstant: Temporal.Instant,
  ) {
    super(earliestDepartureInstant, latestDepartureInstant);
  }

  static tryBuild(
    stopId: number,
    index: GtfsScheduledMovementsIndex,
    serviceDay: Temporal.PlainDate,
    timezone: string,
  ): ScheduledDeparturesBlock | null {
    const movements = index.getMovementsForStop(stopId);
    if (movements.length === 0) return null;

    const first = itsOk(movements[0]);
    const last = itsOk(movements[movements.length - 1]);
    const earliestDepartureInstant = first.time.toInstant(serviceDay, timezone);
    const latestDepartureInstant = last.time.toInstant(serviceDay, timezone);

    return new ScheduledDeparturesBlock(
      movements,
      earliestDepartureInstant,
      latestDepartureInstant,
    );
  }
}
