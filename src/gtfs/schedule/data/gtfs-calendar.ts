import type { PlainDateRange } from "../../departures/plain-date-range.js";

// TODO: Note when parsing that it's completely valid for added/removed dates
// to be given in calendar_dates.txt without any corresponding entry in
// calendar.txt, even though that probably doesn't happen in the PTV feed.
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
    readonly dateRange: PlainDateRange,
    readonly addedDates: readonly Temporal.PlainDate[],
    readonly removedDates: readonly Temporal.PlainDate[],
  ) {}

  occursOn(date: Temporal.PlainDate): boolean {
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
   * (This function is designed to be used to determine when departures from a
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
  mayOccurAgainAfter(date: Temporal.PlainDate): boolean {
    return (
      this._containsAddedDateAfter(date) ||
      (this.isRecurring && this.dateRange.endsAfter(date))
    );
  }

  /**
   * Returns true if one of `monday`, `tuesday`, `wednesday`, etc. is true, i.e.
   * we don't purely rely on `addedDates` to provide days to this calendar.
   */
  get isRecurring() {
    return (
      this.monday ||
      this.tuesday ||
      this.wednesday ||
      this.thursday ||
      this.friday ||
      this.saturday ||
      this.sunday
    );
  }

  private _isDayOfWeekIncluded(dayOfWeek: number): boolean {
    switch (dayOfWeek) {
      case 1:
        return this.monday;
      case 2:
        return this.tuesday;
      case 3:
        return this.wednesday;
      case 4:
        return this.thursday;
      case 5:
        return this.friday;
      case 6:
        return this.saturday;
      case 7:
        return this.sunday;
      default:
        throw new Error(`Invalid day of week number: ${dayOfWeek}`);
    }
  }

  private _isDateAdded(date: Temporal.PlainDate): boolean {
    return this.addedDates.some((addedDate) => addedDate.equals(date));
  }

  private _isDateRemoved(date: Temporal.PlainDate): boolean {
    return this.removedDates.some((removedDate) => removedDate.equals(date));
  }

  private _containsAddedDateAfter(date: Temporal.PlainDate): boolean {
    return this.addedDates.some((a) => Temporal.PlainDate.compare(a, date) > 0);
  }
}
