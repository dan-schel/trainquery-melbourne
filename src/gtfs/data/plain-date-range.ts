export class PlainDateRange {
  constructor(
    readonly start: Temporal.PlainDate | null,
    readonly end: Temporal.PlainDate | null,
  ) {
    if (
      start !== null &&
      end !== null &&
      Temporal.PlainDate.compare(start, end) > 0
    ) {
      throw new Error(`Start date cannot be after end date.`);
    }
  }

  includes(date: Temporal.PlainDate): boolean {
    return !this.startsAfter(date) && !this.endsBefore(date);
  }

  startsAfter(date: Temporal.PlainDate): boolean {
    return (
      this.start != null && Temporal.PlainDate.compare(date, this.start) < 0
    );
  }

  endsBefore(date: Temporal.PlainDate): boolean {
    return this.end != null && Temporal.PlainDate.compare(date, this.end) > 0;
  }

  endsAfter(date: Temporal.PlainDate): boolean {
    return this.end == null || Temporal.PlainDate.compare(date, this.end) < 0;
  }
}
