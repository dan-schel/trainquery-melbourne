import type { TimezoneData } from "../../gtfs/corequery-gtfs/departures/scheduled-departures-blocks-builder.js";

export const timezoneData: TimezoneData = {
  timezone: "Australia/Melbourne",
  minimumViableOffsetSeconds: 10 * 60 * 60, // +10 in AEST
  maximumViableOffsetSeconds: 11 * 60 * 60, // +11 in AEDT
};
