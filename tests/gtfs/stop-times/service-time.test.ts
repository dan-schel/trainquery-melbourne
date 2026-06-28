import { describe, it, expect } from "vitest";
import { ServiceTime } from "../../../src/gtfs/stop-times/service-time.js";

// TODO: Move to corequery.

describe("CoreServiceTime", () => {
  describe("#secondOfDay", () => {
    function run(secondsSinceMidnight: number) {
      return ServiceTime.fromSecondsSinceMidnight(secondsSinceMidnight)
        .secondOfDay;
    }

    it("returns the number of seconds since midnight, modulo 24 hours", () => {
      expect(run(0)).toBe(0);
      expect(run(10)).toBe(10);
      expect(run(24 * 60 * 60)).toBe(0);
      expect(run(24 * 60 * 60 + 10)).toBe(10);
      expect(run(24 * 60 * 60 * 2 + 10)).toBe(10);
      expect(run(24 * 60 * 60 * 2 + 0.2)).toBeCloseTo(0.2, 8);
    });

    // I don't really expect negative secondsSinceMidnight to be used in
    // practice, but being resilient never hurts.
    it("works for negative secondsSinceMidnight", () => {
      expect(run(-10)).toBe(24 * 60 * 60 - 10);
      expect(run(-0.2)).toBeCloseTo(24 * 60 * 60 - 0.2, 8);
      expect(run(-0)).toBe(0);
    });
  });

  describe("#dayOffset", () => {
    function run(secondsSinceMidnight: number) {
      return ServiceTime.fromSecondsSinceMidnight(secondsSinceMidnight)
        .dayOffset;
    }

    it("returns the number of days since midnight", () => {
      expect(run(0)).toBe(0);
      expect(run(10)).toBe(0);
      expect(run(24 * 60 * 60)).toBe(1);
      expect(run(24 * 60 * 60 + 10)).toBe(1);
      expect(run(24 * 60 * 60 * 2 + 10)).toBe(2);
      expect(run(24 * 60 * 60 * 2 + 0.2)).toBe(2);
      expect(run(24 * 60 * 60 * 2 - 0.2)).toBe(1);
    });

    // I don't really expect negative secondsSinceMidnight to be used in
    // practice, but being resilient never hurts.
    it("works for negative secondsSinceMidnight", () => {
      expect(run(-10)).toBe(-1);
      expect(run(-0.2)).toBe(-1);
    });
  });
});
