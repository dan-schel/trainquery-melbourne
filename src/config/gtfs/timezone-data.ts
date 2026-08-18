import type { TimezoneData } from "corequery-gtfs";

export const timezoneData: TimezoneData = {
  timezone: "Australia/Melbourne",
  minimumViableOffsetSeconds: 10 * 60 * 60, // +10 in AEST
  maximumViableOffsetSeconds: 11 * 60 * 60, // +11 in AEDT
};
