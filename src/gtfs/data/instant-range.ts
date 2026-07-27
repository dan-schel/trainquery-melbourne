export class InstantRange {
  constructor(
    readonly start: Temporal.Instant | null,
    readonly end: Temporal.Instant | null,
  ) {
    if (
      start !== null &&
      end !== null &&
      Temporal.Instant.compare(start, end) > 0
    ) {
      throw new Error(`Start instant cannot be after end instant.`);
    }
  }

  // TODO: I haven't tested any of the methods on this class yet.
  intersects(other: InstantRange): boolean {
    return !this.startsAfter(other) && !this.endsBefore(other);
  }

  startsAfter(other: InstantRange): boolean {
    return (
      this.start !== null &&
      other.end !== null &&
      Temporal.Instant.compare(this.start, other.end) > 0
    );
  }

  endsBefore(other: InstantRange): boolean {
    return (
      this.end !== null &&
      other.start !== null &&
      Temporal.Instant.compare(this.end, other.start) < 0
    );
  }
}
