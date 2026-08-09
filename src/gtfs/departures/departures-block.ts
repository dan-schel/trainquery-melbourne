import { BoundedInstantRange } from "../data/bounded-instant-range.js";

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
}
