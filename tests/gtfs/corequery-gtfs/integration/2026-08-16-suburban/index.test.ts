import { describe, it, expect } from "vitest";
import { createGtfsSystemForIntegrationTest } from "../support/create-gtfs-system-for-integration-test.js";
import path from "path";

// TODO: Update this to match date of GTFS data fetch.
describe("2026-08-15", () => {
  const system = createGtfsSystemForIntegrationTest(import.meta.dirname);

  describe("Flinders Street, 2026-08-15T21:03:00+10:00, no filtering", () => {
    it("gives correct departures", () => {
      expect(false).toBe(true);
    });
  });
});
