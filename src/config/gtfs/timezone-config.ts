import type { TimezoneConfig } from "corequery-gtfs";

export const timezoneConfig: TimezoneConfig = {
  timezone: "Australia/Melbourne",
  minimumViableOffsetSeconds: 10 * 60 * 60, // +10 in AEST
  maximumViableOffsetSeconds: 11 * 60 * 60, // +11 in AEDT
};
