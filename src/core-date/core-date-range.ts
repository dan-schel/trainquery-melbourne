// TODO: Move to corequery.

import { CoreDate } from "./core-date.js";

export class CoreDateRange {
  constructor(
    readonly start: CoreDate | null,
    readonly end: CoreDate | null,
  ) {}

  includes(date: CoreDate): boolean {
    return !this.startsAfter(date) && !this.endsBefore(date);
  }

  startsAfter(date: CoreDate): boolean {
    return this.start !== null && date.isBefore(this.start);
  }

  endsBefore(date: CoreDate): boolean {
    return this.end !== null && date.isAfter(this.end);
  }

  startsAfterOrOn(date: CoreDate): boolean {
    return this.start !== null && date.isBeforeOrEqual(this.start);
  }

  endsBeforeOrOn(date: CoreDate): boolean {
    return this.end !== null && date.isAfterOrEqual(this.end);
  }
}
