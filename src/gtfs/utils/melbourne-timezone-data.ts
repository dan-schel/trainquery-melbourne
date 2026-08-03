import type { TimezoneData } from "../departures/departures-blocks-builder.js";

export const MELBOURNE_TIMEZONE = "Australia/Melbourne";

// While we could cast a much wider net (+/- 24 hours) to handle all possible
// timezones, we know that for Melbourne it's either +10 in AEST or +11 in AEDT.
export const MELBOURNE_MINIMUM_VIABLE_OFFSET_SECONDS = 10 * 60 * 60;
export const MELBOURNE_MAXIMUM_VIABLE_OFFSET_SECONDS = 11 * 60 * 60;

export const MELBOURNE_TIMEZONE_DATA: TimezoneData = {
  timezone: MELBOURNE_TIMEZONE,
  minimumViableOffsetSeconds: MELBOURNE_MINIMUM_VIABLE_OFFSET_SECONDS,
  maximumViableOffsetSeconds: MELBOURNE_MAXIMUM_VIABLE_OFFSET_SECONDS,
};
