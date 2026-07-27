import { InstantRange } from "../data/instant-range.js";

export abstract class DeparturesBlock {
  constructor(
    readonly earliestDepartureInstant: Temporal.Instant,
    readonly latestDepartureInstant: Temporal.Instant,
  ) {}

  get instantRange(): InstantRange {
    return new InstantRange(
      this.earliestDepartureInstant,
      this.latestDepartureInstant,
    );
  }
}
