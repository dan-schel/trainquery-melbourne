export class PlainDateRange {
  constructor(
    readonly start: Temporal.PlainDate | null,
    readonly end: Temporal.PlainDate | null,
  ) {}

  includes(date: Temporal.PlainDate): boolean {
    return !this.startsAfter(date) && !this.endsBefore(date);
  }

  startsAfter(date: Temporal.PlainDate): boolean {
    return (
      this.start !== null && Temporal.PlainDate.compare(date, this.start) < 0
    );
  }

  endsBefore(date: Temporal.PlainDate): boolean {
    return this.end !== null && Temporal.PlainDate.compare(date, this.end) > 0;
  }

  startsAfterOrOn(date: Temporal.PlainDate): boolean {
    return (
      this.start !== null && Temporal.PlainDate.compare(date, this.start) <= 0
    );
  }

  endsBeforeOrOn(date: Temporal.PlainDate): boolean {
    return this.end !== null && Temporal.PlainDate.compare(date, this.end) >= 0;
  }
}
