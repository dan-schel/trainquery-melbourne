import { describe, it, assert } from "vitest";
import { stops } from "../../../src/config/stops";
import { stopTagSuccession } from "../../../src/config/stops/stop-tag-succession";
import * as tag from "../../../src/config/stops/stop-tags";
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
});
