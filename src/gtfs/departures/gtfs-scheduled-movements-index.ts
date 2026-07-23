import { itsOk } from "@dan-schel/js-utils";
import type { GtfsSchedule } from "../data/gtfs-schedule.js";
import { GtfsStopTime } from "../data/gtfs-stop-time.js";
import type { GtfsScheduledTrip } from "../data/gtfs-scheduled-trip.js";
import type { GtfsScheduledTripServicingMovement } from "../data/gtfs-scheduled-trip-movements.js";

export type GtfsMovementsIndexEntry = {
  readonly trip: GtfsScheduledTrip;
  readonly time: GtfsStopTime;
  readonly movement: GtfsScheduledTripServicingMovement;
};

export class GtfsScheduledMovementsIndex {
  private constructor(
    private readonly _index: Map<number, readonly GtfsMovementsIndexEntry[]>,
    private readonly _earliestMovementByStop: Map<number, GtfsStopTime>,
    private readonly _latestMovementByStop: Map<number, GtfsStopTime>,
  ) {}

  static build(schedule: GtfsSchedule): GtfsScheduledMovementsIndex {
    const index = new Map<number, GtfsMovementsIndexEntry[]>();

    for (const trip of schedule.allTrips()) {
      for (const movement of trip.movements) {
        if (!movement.isServicing) continue;

        // Filter out "fake" arrivals. If a train is not ACTUALLY terminating
        // but continuing as another service, then that next service's
        // originating movement will be the one that makes it into this array.
        //
        // This means users who aren't filtering out arrivals won't see
        // duplicates, e.g. at Town Hall where an ex-East Pakenham train is
        // "arriving and terminating" at the same time as a Sunbury train is
        // "originating and departing".
        if (movement.type === "terminating" && trip.nextTrip != null) continue;

        const entry: GtfsMovementsIndexEntry = {
          trip,
          movement,

          // The departure time, unless it's a terminating movement, in which
          // case it's the arrival time.
          time: movement.timeRelevantToDeparturesAlgorithm,
        };

        if (!index.has(movement.stopId)) {
          index.set(movement.stopId, []);
        }

        const existingEntries = itsOk(index.get(movement.stopId));
        existingEntries?.push(entry);
      }
    }

    const earliestMovementByStop = new Map<number, GtfsStopTime>();
    const latestMovementByStop = new Map<number, GtfsStopTime>();

    for (const [stopId, entries] of index.entries()) {
      entries.sort((a, b) => GtfsStopTime.compare(a.time, b.time));

      // Can guarantee `entries` will definitely have at least one entry,
      // otherwise the stopId wouldn't be registered in the index.
      const first = itsOk(entries[0]);
      const last = itsOk(entries.at(-1));

      earliestMovementByStop.set(stopId, first.time);
      latestMovementByStop.set(stopId, last.time);
    }

    return new GtfsScheduledMovementsIndex(
      index,
      earliestMovementByStop,
      latestMovementByStop,
    );
  }
}
