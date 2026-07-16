import { itsOk } from "@dan-schel/js-utils";
import type { GtfsSchedule } from "../data/gtfs-schedule.js";
import { GtfsStopTime } from "../data/gtfs-stop-time.js";
import type { GtfsTrip, GtfsTripServicingMovement } from "../data/gtfs-trip.js";

export type GtfsMovementsIndexEntry = {
  readonly trip: GtfsTrip;
  readonly time: GtfsStopTime;
  readonly movement: GtfsTripServicingMovement;
};

export class GtfsMovementsIndex {
  private constructor(
    private readonly _index: Map<number, readonly GtfsMovementsIndexEntry[]>,
    private readonly _earliestMovementByStop: Map<number, GtfsStopTime>,
    private readonly _latestMovementByStop: Map<number, GtfsStopTime>,
  ) {}

  static build(schedule: GtfsSchedule): GtfsMovementsIndex {
    const index = new Map<number, GtfsMovementsIndexEntry[]>();

    for (const trip of schedule.allTrips()) {
      for (const movement of trip.movements) {
        if (movement.type !== "servicing") continue;

        // Filter out "fake" arrivals. If a train is not ACTUALLY terminating
        // but continuing as another service, then that next service's
        // originating movement will be the one that makes it into this array.
        //
        // This means users who aren't filtering out arrivals won't see
        // duplicates, e.g. at Town Hall where an ex-East Pakenham train is
        // "arriving and terminating" at the same time as a Sunbury train is
        // "originating and departing".
        if (movement === trip.terminus && trip.nextTrip != null) continue;

        const entry: GtfsMovementsIndexEntry = {
          trip,
          movement,
          time: itsOk(movement.departureTime ?? movement.arrivalTime),
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

      const firstMovement = itsOk(entries[0]).movement;
      const lastMovement = itsOk(entries.at(-1)).movement;

      earliestMovementByStop.set(stopId, firstMovement.departureTime);
      latestMovementByStop.set(stopId, lastMovement.departureTime);
    }

    return new GtfsMovementsIndex(
      index,
      earliestMovementByStop,
      latestMovementByStop,
    );
  }
}
