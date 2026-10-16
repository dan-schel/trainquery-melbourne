import { describe, it, assert } from "vitest";
import { stops } from "../../../../src/config/corequery/stops/index.js";
import { getSubfeedsWithStop } from "../../../../src/gtfs/utils/get-subfeeds-with.js";
import * as stop from "../../../../src/config/corequery/stops/stop-ids.js";

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

  it("uses the latest GTFS location for Warragul", () => {
    const warragul = stops.find((entry) => entry.id === stop.WARRAGUL);

    assert.deepEqual(warragul?.location, {
      latitude: -38.16471178,
      longitude: 145.9322366,
    });
  });
});
