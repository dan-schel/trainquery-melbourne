import { itsOk } from "@dan-schel/js-utils";
import { DeparturesBlock } from "./departures-block.js";
import type { GtfsScheduledTrip } from "../data/gtfs-scheduled-trip.js";
import { GtfsStopTime } from "../data/gtfs-stop-time.js";
import type { GtfsScheduledTripServicingMovement } from "../data/gtfs-scheduled-trip-movements.js";
import type { GtfsScheduledMovementsIndexEntry } from "./gtfs-scheduled-movements-index.js";

// TODO: Somewhere else I make a comment that this should be a class so we can
// implement .instant on it, memoized. I now disagree, because converting all
// the movements to entries on build() would partially undermine my logic for
// waiting until the iterator to skip irrelevant entries. If we're gonna
// rebuild the array anyway, why not do the filtering then? I now think (see
// TODO below) that we should drop this class, and instead lean in to the idea
// that _entries is just a reference to the movements index for this stop.
// Maybe GtfsScheduledMovementsForStop should be a class, equivalent to
// GtfsScheduledMovementsIndexEntry[]?
export type ScheduledDeparturesBlockEntry = {
  readonly trip: GtfsScheduledTrip;
  readonly time: GtfsStopTime;
  readonly movement: GtfsScheduledTripServicingMovement;
};

export class ScheduledDeparturesBlock extends DeparturesBlock {
  constructor(
    // TODO: I should rename this so it's clearer that this is just a reference
    // to the movements index for this stop, and therefore includes movements
    // which don't occur on the service day for this block.
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

  override getIterationIndexOfNextFrom(instant: Temporal.Instant): number {
    const time = this.toGtfsStopTime(instant);
    const result = this.entries.findIndex((m) => m.time.isAfterOrEqual(time));
    return result !== -1 ? result : this.entries.length;
  }

  override getIterationIndexOfPreviousFrom(instant: Temporal.Instant): number {
    const time = this.toGtfsStopTime(instant);
    // No need to handle -1, because we'd want to return -1 in that case anyway!
    return this.entries.findLastIndex((m) => m.time.isBeforeOrEqual(time));
  }
}
