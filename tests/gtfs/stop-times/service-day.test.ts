import { describe, it, expect } from "vitest";
import { ServiceDay } from "../../../src/gtfs/stop-times/service-day.js";

describe("ServiceDay", () => {
  describe(".offsetAtMiddayInMinsFor", () => {
    it("returns AEST offset for Melbourne winter dates", () => {
      const offset = ServiceDay.offsetSecondsAtMiddayFor(
        Temporal.PlainDate.from({ year: 2026, month: 6, day: 15 }),
        "Australia/Melbourne",
      );

      expect(offset).toBe(10 * 60 * 60);
    });

    it("returns AEDT offset for Melbourne summer dates", () => {
      const offset = ServiceDay.offsetSecondsAtMiddayFor(
        Temporal.PlainDate.from({ year: 2026, month: 1, day: 15 }),
        "Australia/Melbourne",
      );

      expect(offset).toBe(11 * 60 * 60);
    });

    it("supports non-integer hour offsets", () => {
      const offset = ServiceDay.offsetSecondsAtMiddayFor(
        Temporal.PlainDate.from({ year: 2026, month: 6, day: 15 }),
        "Australia/Adelaide",
      );

      expect(offset).toBe((9 * 60 + 30) * 60);
    });
  });
});
