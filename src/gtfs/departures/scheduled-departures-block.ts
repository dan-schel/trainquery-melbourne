import { itsOk } from "@dan-schel/js-utils";
import { DeparturesBlock } from "./departures-block.js";
import type { GtfsScheduledTrip } from "../data/gtfs-scheduled-trip.js";
import { GtfsStopTime } from "../data/gtfs-stop-time.js";
import type { GtfsScheduledTripServicingMovement } from "../data/gtfs-scheduled-trip-movements.js";
import type { GtfsScheduledMovementsIndexEntry } from "./gtfs-scheduled-movements-index.js";
import { ScheduledDeparturesBlockIterator } from "./scheduled-departures-block-iterator.js";
import type { RealtimeDeparturesBlockIterator } from "./realtime-departures-block-iterator.js";

export type ScheduledDeparturesBlockEntry = {
  readonly trip: GtfsScheduledTrip;
  readonly time: GtfsStopTime;
  readonly movement: GtfsScheduledTripServicingMovement;
};

export class ScheduledDeparturesBlock extends DeparturesBlock {
  constructor(
    readonly entries: readonly ScheduledDeparturesBlockEntry[],
    readonly serviceDay: Temporal.PlainDate,
    earliestDepartureInstant: Temporal.Instant,
    latestDepartureInstant: Temporal.Instant,
    readonly timezone: string,
  ) {
    super(earliestDepartureInstant, latestDepartureInstant);
  }

  static build(
    movements: readonly GtfsScheduledMovementsIndexEntry[],
    serviceDay: Temporal.PlainDate,
    timezone: string,
  ) {
    if (movements.length === 0) throw new Error("Movements cannot be empty");

    // Right now it happens that GtfsScheduledMovementsIndexEntry and
    // ScheduledDeparturesBlockEntry are identical. I don't expect that to
    // necessarily continue to be the case forever though.
    const entries: readonly ScheduledDeparturesBlockEntry[] = movements;

    const firstEntry = itsOk(entries[0]);
    const lastEntry = itsOk(entries[entries.length - 1]);

    return new ScheduledDeparturesBlock(
      entries,
      serviceDay,
      firstEntry.time.toInstant(serviceDay, timezone),
      lastEntry.time.toInstant(serviceDay, timezone),
      timezone,
    );
  }

  /**
   * Returns the GtfsStopTime for the given instant, relative to the service day
   * (and for the timezone) of this block.
   */
  toGtfsStopTime(time: Temporal.Instant): GtfsStopTime {
    const midnight = GtfsStopTime.fromSecondsSinceMidnight(0);
    const midnightInstant = midnight.toInstant(this.serviceDay, this.timezone);
    const secondsSinceMidnight = time.since(midnightInstant).total("seconds");
    return GtfsStopTime.fromSecondsSinceMidnight(secondsSinceMidnight);
  }

  /**
   * Returns the index of the first movement that is at or after the given time.
   * If all movements come before the given time, returns the length of the
   * movements array, i.e. the index _after_ all movements.
   */
  getIterationIndexOfNextFrom(time: GtfsStopTime): number {
    const result = this.entries.findIndex((m) => m.time.isAfterOrEqual(time));
    return result !== -1 ? result : this.entries.length;
  }

  /**
   * Returns the index of the last movement that is at or before the given time.
   * If all movements come after the given time, returns -1, i.e. the index
   * _before_ all movements.
   */
  getInterationIndexOfPreviousFrom(time: GtfsStopTime): number {
    // No need to handle -1, because we'd want to return -1 in that case anyway!
    return this.entries.findLastIndex((m) => m.time.isBeforeOrEqual(time));
  }

  override createIterator():
    | RealtimeDeparturesBlockIterator
    | ScheduledDeparturesBlockIterator {
    return new ScheduledDeparturesBlockIterator(this);
  }
}
