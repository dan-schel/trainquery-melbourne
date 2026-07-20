import { GtfsCalendar } from "../../../../src/gtfs/data/gtfs-calendar.js";
import { PlainDateRange } from "../../../../src/gtfs/data/plain-date-range.js";

export const CALENDAR_EVERYDAY = new GtfsCalendar(
  "svc",
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  new PlainDateRange(null, null),
  [],
  [],
);
