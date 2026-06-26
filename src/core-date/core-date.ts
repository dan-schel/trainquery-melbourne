// TODO: Move to corequery.

import { CoreDayOfWeek } from "./core-day-of-week.js";

export class CoreDate {
  private constructor(
    readonly year: number,
    readonly month: number,
    readonly day: number,
  ) {}

  static from(year: number, month: number, day: number): CoreDate {
    return new CoreDate(year, month, day);
  }

  private get _decimalValue(): number {
    return this.year * 10000 + this.month * 100 + this.day;
  }

  isBefore(other: CoreDate): boolean {
    return this._decimalValue < other._decimalValue;
  }

  isAfter(other: CoreDate): boolean {
    return this._decimalValue > other._decimalValue;
  }

  isEqual(other: CoreDate): boolean {
    return this._decimalValue === other._decimalValue;
  }

  isBeforeOrEqual(other: CoreDate): boolean {
    return this._decimalValue <= other._decimalValue;
  }

  isAfterOrEqual(other: CoreDate): boolean {
    return this._decimalValue >= other._decimalValue;
  }

  get dayOfWeek(): CoreDayOfWeek {
    return CoreDayOfWeek.fromDate(this.year, this.month, this.day);
  }
}
