import { itsOk } from "@dan-schel/js-utils";
import type { GtfsScheduleData } from "../data/gtfs-schedule-data.js";
import { GtfsStopTime } from "../data/gtfs-stop-time.js";
import type { ScheduledDeparturesBlockEntry } from "./scheduled-departures-block.js";

export class GtfsScheduledMovementsIndex {
  private constructor(
    private readonly _index: Map<
      number,
      readonly ScheduledDeparturesBlockEntry[]
    >,
    private readonly _earliestMovementByStop: Map<number, GtfsStopTime>,
    private readonly _latestMovementByStop: Map<number, GtfsStopTime>,
  ) {}

  getMovementsForStop(
    stopId: number,
  ): readonly ScheduledDeparturesBlockEntry[] {
    return this._index.get(stopId) ?? [];
  }
  getEarliestMovementForStop(stopId: number): GtfsStopTime | null {
    return this._earliestMovementByStop.get(stopId) ?? null;
  }
  getLatestMovementForStop(stopId: number): GtfsStopTime | null {
    return this._latestMovementByStop.get(stopId) ?? null;
  }

  static build(schedule: GtfsScheduleData): GtfsScheduledMovementsIndex {
    const index = new Map<number, ScheduledDeparturesBlockEntry[]>();

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
        //
        // TODO: This assumes both trips have the same calendar, i.e. that the
        // next trip is actually running on the same day as this terminating
        // trip. The GTFS spec doesn't seem to mention that, so I don't know if
        // it's supposed to be true or not. If one trip wasn't running today,
        // would the transfer just not apply for that day, or would that
        // situation be considered invalid data?
        //
        // If the above can happen, maybe we need to include these in the index
        // for now, and then filter them out at query time once we're talking
        // about a specific service day (when we can check if the next trip is
        // running).
        //
        // In fact I think I have to remove this, because the next trip might
        // get cancelled in the realtime data! You don't know until you query!
        if (movement.type === "terminating" && trip.nextTrip != null) continue;

        const entry: ScheduledDeparturesBlockEntry = {
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
