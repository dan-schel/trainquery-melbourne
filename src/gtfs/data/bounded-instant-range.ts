export class BoundedInstantRange {
  constructor(
    readonly start: Temporal.Instant,
    readonly end: Temporal.Instant,
  ) {
    if (Temporal.Instant.compare(start, end) > 0) {
      throw new Error(`Start must be later than end.`);
    }
  }

  intersects(other: BoundedInstantRange): boolean {
    return (
      Temporal.Instant.compare(this.start, other.end) < 0 &&
      Temporal.Instant.compare(other.start, this.end) < 0
    );
  }

  touches(other: BoundedInstantRange): boolean {
    return (
      Temporal.Instant.compare(this.start, other.end) <= 0 &&
      Temporal.Instant.compare(other.start, this.end) <= 0
    );
  }
}
