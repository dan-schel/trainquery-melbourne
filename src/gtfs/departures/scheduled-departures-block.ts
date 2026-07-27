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
  constructor(
    readonly movements: readonly ScheduledDeparturesBlockEntry[],
    earliestDepartureInstant: Temporal.Instant,
    latestDepartureInstant: Temporal.Instant,
  ) {
    super(earliestDepartureInstant, latestDepartureInstant);
  }
}
