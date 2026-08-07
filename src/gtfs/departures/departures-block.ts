import { BoundedInstantRange } from "../data/bounded-instant-range.js";
import type { RealtimeDeparturesBlockIterator } from "./realtime-departures-block-iterator.js";
import type { ScheduledDeparturesBlockIterator } from "./scheduled-departures-block-iterator.js";

export abstract class DeparturesBlock {
  constructor(
    readonly earliestDepartureInstant: Temporal.Instant,
    readonly latestDepartureInstant: Temporal.Instant,
  ) {}

  get instantRange(): BoundedInstantRange {
    return new BoundedInstantRange(
      this.earliestDepartureInstant,
      this.latestDepartureInstant,
    );
  }

  abstract createIterator():
    | RealtimeDeparturesBlockIterator
    | ScheduledDeparturesBlockIterator;
}
