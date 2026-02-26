import { describe, it, assert } from "vitest";
import { stops } from "../../../src/config/stops";
import { stopTagSuccession } from "../../../src/config/stops/stop-tag-succession";
import * as tags from "../../../src/config/stops/stop-tags";
import { Tags } from "corequery";

describe("stops", () => {
  it("all stops are tagged for at least one GTFS subfeed", () => {
    const subfeedTags = [
      tags.SUBURBAN_GTFS_SUBFEED,
      tags.REGIONAL_GTFS_SUBFEED,
    ];

    for (const stop of stops) {
      const stopTags = Tags.build(stop.tags, stopTagSuccession);
      const subfeedTagCount = subfeedTags.filter((tag) =>
        stopTags.has(tag),
      ).length;

      assert(
        subfeedTagCount >= 1,
        `${stop.name} (#${stop.id}) is not tagged with a GTFS subfeed.`,
      );
    }
  });
});
