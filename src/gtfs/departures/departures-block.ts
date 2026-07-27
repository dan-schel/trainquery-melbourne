export abstract class DeparturesBlock {
  constructor(
    readonly earliestDepartureInstant: Temporal.Instant,
    readonly latestDepartureInstant: Temporal.Instant,
  ) {}
}
