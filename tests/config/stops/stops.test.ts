import { describe, it, assert } from "vitest";
import { stops } from "../../../src/config/stops/index.js";
import { getSubfeedsWithStop } from "../../../src/gtfs/utils/get-subfeeds-with.js";

describe("stops", () => {
  it("all stops are tagged for at least one GTFS subfeed", () => {
    for (const stop of stops) {
      const result = getSubfeedsWithStop(stop);
      const subfeedCount = Object.values(result).filter((x) => x).length;

      assert(
        subfeedCount >= 1,
        `${stop.name} (#${stop.id}) is not tagged with a GTFS subfeed.`,
      );
    }
  });

  it("are listed alphabetically", () => {
    stops.forEach((entry, i) => {
      const previous = stops[i - 1];
      if (previous == null) return;

      assert(
        entry.name.localeCompare(previous.name) >= 0,
        `${previous.name} should be listed after ${entry.name} in alphabetical order.`,
      );
    });
  });
});
