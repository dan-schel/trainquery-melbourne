import type { DepartureSearchDirection } from "./corequery-departure-iterator.js";

// TODO: I wonder if this really needs to be abstract. Are realtime and
// scheduled departure blocks really gonna be implemented differently in any
// way? Or is it just the data within that's different, and therefore we don't
// need different classes for them?
export abstract class DeparturesBlock {
  constructor(
    protected readonly _earliestDepartureInstant: Temporal.Instant,
    protected readonly _latestDepartureInstant: Temporal.Instant,
  ) {}

  // Used when this block intersect the search start time.
  abstract setAtTime(
    time: Temporal.Instant,
    direction: DepartureSearchDirection,
  ): void;

  // Used when this block does not intersect the initial search start time, but
  // the search continues into this block.
  abstract setToStart(direction: DepartureSearchDirection): void;

  // TODO: Not void. Should return the departure.
  abstract take(): void;
  abstract peek(): void;
}
