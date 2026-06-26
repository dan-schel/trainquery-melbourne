import { describe, it, expect } from "vitest";
import { GtfsCalendar } from "../../src/gtfs/gtfs-calendar.js";
import { CoreDateRange } from "../../src/core-date/core-date-range.js";
import { CoreDate } from "../../src/core-date/core-date.js";

describe("GtfsCalendar", () => {
  describe("#mayOccurAgainAfter", () => {
    it("returns false for the last date in range", () => {
      const cal = new GtfsCalendar(
        "cal1",
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        new CoreDateRange(
          CoreDate.from(2026, 6, 20),
          CoreDate.from(2026, 6, 26),
        ),
        [],
        [],
      );

      expect(cal.mayOccurAgainAfter(CoreDate.from(2026, 6, 25))).toBe(true);
      expect(cal.mayOccurAgainAfter(CoreDate.from(2026, 6, 26))).toBe(false);
      expect(cal.mayOccurAgainAfter(CoreDate.from(2026, 6, 27))).toBe(false);
    });
  });
});
