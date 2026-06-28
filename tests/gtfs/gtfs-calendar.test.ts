import { describe, it, expect } from "vitest";
import { GtfsCalendar } from "../../src/gtfs/gtfs-calendar.js";
import { PlainDateRange } from "../../src/gtfs/stop-times/plain-date-range.js";

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
        new PlainDateRange(
          Temporal.PlainDate.from({ year: 2026, month: 6, day: 20 }),
          Temporal.PlainDate.from({ year: 2026, month: 6, day: 26 }),
        ),
        [],
        [],
      );

      expect(
        cal.mayOccurAgainAfter(
          Temporal.PlainDate.from({ year: 2026, month: 6, day: 25 }),
        ),
      ).toBe(true);
      expect(
        cal.mayOccurAgainAfter(
          Temporal.PlainDate.from({ year: 2026, month: 6, day: 26 }),
        ),
      ).toBe(false);
      expect(
        cal.mayOccurAgainAfter(
          Temporal.PlainDate.from({ year: 2026, month: 6, day: 27 }),
        ),
      ).toBe(false);
    });
  });
});
