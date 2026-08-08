import { itsOk } from "@dan-schel/js-utils";
import type { GtfsScheduleData } from "../data/gtfs-schedule-data.js";
import { GtfsStopTime } from "../data/gtfs-stop-time.js";
import type { GtfsScheduledTrip } from "../data/gtfs-scheduled-trip.js";
import type { GtfsScheduledTripServicingMovement } from "../data/gtfs-scheduled-trip-movements.js";
import { PlainDateRange } from "../data/plain-date-range.js";

export type GtfsScheduledMovementsIndexEntry = {
  readonly trip: GtfsScheduledTrip;
  readonly time: GtfsStopTime;
  readonly movement: GtfsScheduledTripServicingMovement;
};

export class GtfsScheduledMovementsIndex {
  private constructor(
    private readonly _index: Map<
      number,
      readonly GtfsScheduledMovementsIndexEntry[]
    >,
    private readonly _rangeEncompassingAllCalendarsByStop: Map<
      number,
      PlainDateRange
    >,
  ) {}

  getMovementsForStop(
    stopId: number,
  ): readonly GtfsScheduledMovementsIndexEntry[] {
    return this._index.get(stopId) ?? [];
  }

  getRangeEncompassingAllCalendarsForStop(
    stopId: number,
  ): PlainDateRange | null {
    return this._rangeEncompassingAllCalendarsByStop.get(stopId) ?? null;
  }

  static build(schedule: GtfsScheduleData): GtfsScheduledMovementsIndex {
    const index = new Map<number, GtfsScheduledMovementsIndexEntry[]>();
    const calendarsByStop = new Map<number, Set<string>>();

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

        const entry: GtfsScheduledMovementsIndexEntry = {
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
        existingEntries.push(entry);

        if (!calendarsByStop.has(movement.stopId)) {
          calendarsByStop.set(movement.stopId, new Set());
        }
        const existingCalendars = itsOk(calendarsByStop.get(movement.stopId));
        existingCalendars.add(trip.calendar.gtfsCalendarId);
      }
    }

    const rangeEncompassingAllCalendarsByStop = new Map<
      number,
      PlainDateRange
    >();

    for (const [stopId, calendarIds] of calendarsByStop.entries()) {
      let range: PlainDateRange | null = null;

      for (const calendarId of calendarIds) {
        const calendar = schedule.requireCalendar(calendarId);
        const calendarFullDateRange = calendar.getFullDateRange();

        if (range == null) {
          range = calendarFullDateRange;
        } else {
          range = PlainDateRange.encompassing(range, calendarFullDateRange);
        }
      }

      if (range != null) {
        rangeEncompassingAllCalendarsByStop.set(stopId, range);
      }
    }

    return new GtfsScheduledMovementsIndex(
      index,
      rangeEncompassingAllCalendarsByStop,
    );
  }
}
