import { itsOk } from "@dan-schel/js-utils";
import type { GtfsRealtimeData } from "../data/gtfs-realtime-data.js";
import type { GtfsUpdatedTripServicingMovement } from "../data/gtfs-updated-trip-movements.js";
import type { GtfsUpdatedTrip } from "../data/gtfs-updated-trip.js";
import { DeparturesBlock } from "./departures-block.js";

export type RealtimeDeparturesBlockEntry = {
  readonly trip: GtfsUpdatedTrip;
  readonly time: Temporal.Instant;
  readonly movement: GtfsUpdatedTripServicingMovement;
};

export class RealtimeDeparturesBlock extends DeparturesBlock {
  private constructor(
    readonly movements: readonly RealtimeDeparturesBlockEntry[],
    earliestDepartureInstant: Temporal.Instant,
    latestDepartureInstant: Temporal.Instant,
  ) {
    super(earliestDepartureInstant, latestDepartureInstant);
  }

  build(
    stopId: number,

    // No point using an index for the realtime data, since it can change every
    // 30 seconds, so you're unlikely to re-use it across queries.
    realtimeData: GtfsRealtimeData,
  ): RealtimeDeparturesBlock | null {
    const movements: RealtimeDeparturesBlockEntry[] = [];
    for (const trip of realtimeData.updatedTrips) {
      for (const movement of trip.movements) {
        if (!movement.isServicing) continue;
        if (movement.stopId !== stopId) continue;

        movements.push({
          trip,
          time: movement.timeRelevantToDeparturesAlgorithm,
          movement,
        });
      }
    }

    if (movements.length === 0) return null;

    const earliestDepartureInstant = itsOk(movements[0]).time;
    const latestDepartureInstant = itsOk(movements[movements.length - 1]).time;

    return new RealtimeDeparturesBlock(
      movements,
      earliestDepartureInstant,
      latestDepartureInstant,
    );
  }
}
