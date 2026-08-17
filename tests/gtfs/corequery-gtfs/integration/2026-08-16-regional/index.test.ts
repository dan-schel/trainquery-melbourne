import { describe, it, expect } from "vitest";
import { createGtfsSystemForIntegrationTest } from "../support/create-gtfs-system/index.js";

describe("2026-08-16-regional", () => {
  const system = createGtfsSystemForIntegrationTest(import.meta.dirname);

  // TODO: Or whatever.
  describe("Flinders Street, 2026-08-15T21:03:00+10:00, no filtering", () => {
    it("gives correct departures", () => {
      expect(false).toBe(true);
    });
  });
});
