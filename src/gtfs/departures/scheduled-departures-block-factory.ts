import { ScheduledDeparturesBlock } from "./scheduled-departures-block.js";
import { ServiceDay } from "./service-day.js";
import type { GtfsStopTime } from "../data/gtfs-stop-time.js";

export const MELBOURNE_TIMEZONE = "Australia/Melbourne";

// While we could cast a much wider net (+/- 24 hours) to handle all possible
// timezones, we know that for Melbourne it's either +10 in AEDT or +11 in AEST.
const MELBOURNE_MINIMUM_VIABLE_OFFSET_MINS = 10 * 60;
const MELBOURNE_MAXIMUM_VIABLE_OFFSET_MINS = 11 * 60;

export class ScheduledDeparturesBlockFactory {
  constructor(
    private readonly _earliestServiceTime: GtfsStopTime,
    private readonly _latestServiceTime: GtfsStopTime,
  ) {}

  create(
    start: Temporal.Instant,
    end: Temporal.Instant,
  ): ScheduledDeparturesBlock[] {
    return ServiceDay.allIntersectingTimeRange(
      start,
      end,
      MELBOURNE_TIMEZONE,
      MELBOURNE_MINIMUM_VIABLE_OFFSET_MINS,
      MELBOURNE_MAXIMUM_VIABLE_OFFSET_MINS,
      this._earliestServiceTime,
      this._latestServiceTime,
    ).map((x) => new ScheduledDeparturesBlock(x));
  }
}
