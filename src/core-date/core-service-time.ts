// TODO: Move to corequery.

import { posMod } from "@dan-schel/js-utils";

export class CoreServiceTime {
  private constructor(
    /**
     * The number of seconds since midnight. Allows values greater than
     * 24 * 60 * 60 to indicate times that are on the next day or an arbitrary
     * number of days into the future.
     */
    readonly secondsSinceMidnight: number,
  ) {}

  static fromSecondsSinceMidnight(
    secondsSinceMidnight: number,
  ): CoreServiceTime {
    return new CoreServiceTime(secondsSinceMidnight);
  }

  /**
   * Returns a value `0 <= x < 24 * 60 * 60`. Combines with `dayOffset` to
   * provide the full picture.
   */
  get secondOfDay(): number {
    return posMod(this.secondsSinceMidnight, 24 * 60 * 60);
  }

  /**
   * Returns 0 if `secondsSinceMidnight` is less than 24 hours, 1 if 24-48
   * hours, etc.
   */
  get dayOffset(): number {
    return Math.floor(this.secondsSinceMidnight / (24 * 60 * 60));
  }
}
