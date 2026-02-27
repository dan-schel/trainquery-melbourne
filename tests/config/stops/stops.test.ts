import { describe, it, assert } from "vitest";
import { stops } from "../../../src/config/stops/index.js";
import { stopTagSuccession } from "../../../src/config/stops/stop-tag-succession.js";
import * as tag from "../../../src/config/stops/stop-tags.js";
import { Tags } from "corequery";

describe("stops", () => {
  it("all stops are tagged for at least one GTFS subfeed", () => {
    const subfeedTags = [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED];

    for (const stop of stops) {
      const stopTags = Tags.build(stop.tags, stopTagSuccession);
      const subfeedTagCount = subfeedTags.filter((t) => stopTags.has(t)).length;

      assert(
        subfeedTagCount >= 1,
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
