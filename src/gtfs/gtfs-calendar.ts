import type { CoreDateRange } from "../core-date/core-date-range.js";
import type { CoreDate } from "../core-date/core-date.js";
import { CoreDayOfWeek } from "../core-date/core-day-of-week.js";

export class GtfsCalendar {
  constructor(
    readonly id: string,
    readonly monday: boolean,
    readonly tuesday: boolean,
    readonly wednesday: boolean,
    readonly thursday: boolean,
    readonly friday: boolean,
    readonly saturday: boolean,
    readonly sunday: boolean,
    readonly dateRange: CoreDateRange,
    readonly addedDates: readonly CoreDate[],
    readonly removedDates: readonly CoreDate[],
  ) {}

  occursOn(date: CoreDate): boolean {
    // Note: The GTFS spec doesn't seem to specify what would happen if a date
    // was both added and removed, so I'm making an assumption that added dates
    // take precedence over removed dates.
    if (this._isDateAdded(date)) {
      return true;
    }

    return (
      this.dateRange.includes(date) &&
      this._isDayOfWeekIncluded(date.dayOfWeek) &&
      !this._isDateRemoved(date)
    );
  }

  /**
   * Returns false if this GTFS calendar has no further eligible dates after the
   * given date. Note that a return value of true does not guarantee that there
   * are future dates, only that there _may_ be.
   *
   * (I believe this function will be used to determine when departures from a
   * certain stop should be considered exhausted, as when we iterate through the
   * departures for a given stop, we will track which departures will never
   * occur again, and when all departures never occur again, stop iterating
   * (which is necessary given that the GTFS feed is not infinite). For this
   * purpose, I have determined that it's probably not worth the computational
   * cost of truly figuring out if a service never occurs again, as to do so
   * properly would require iterating though all dates between the given date
   * and the end date and returning true if we find a date which has not been
   * removed and where the weekday is included. Typically this will end early
   * when the first eligible date is found, but could theoretically be
   * expensive.)
   */
  mayOccurAgainAfter(date: CoreDate): boolean {
    if (this.addedDates.some((addedDate) => addedDate.isAfter(date))) {
      return true;
    }

    return !this.dateRange.endsBeforeOrOn(date);
  }

  private _isDayOfWeekIncluded(dow: CoreDayOfWeek): boolean {
    return (
      (dow.isSunday() && this.sunday) ||
      (dow.isMonday() && this.monday) ||
      (dow.isTuesday() && this.tuesday) ||
      (dow.isWednesday() && this.wednesday) ||
      (dow.isThursday() && this.thursday) ||
      (dow.isFriday() && this.friday) ||
      (dow.isSaturday() && this.saturday)
    );
  }
  private _isDateAdded(date: CoreDate): boolean {
    return this.addedDates.some((addedDate) => addedDate.isEqual(date));
  }
  private _isDateRemoved(date: CoreDate): boolean {
    return this.removedDates.some((removedDate) => removedDate.isEqual(date));
  }
}
