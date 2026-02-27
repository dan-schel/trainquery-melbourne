import { describe, it, assert } from "vitest";
import { lines } from "../../../src/config/lines";
import { lineTagSuccession } from "../../../src/config/lines/line-tag-succession";
import * as tag from "../../../src/config/lines/line-tags";
import { Tags } from "corequery";

describe("lines", () => {
  it("all lines are tagged for exactly one subfeed", () => {
    const subfeedTags = [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED];

    for (const line of lines) {
      const tags = Tags.build(line.tags, lineTagSuccession);
      const subfeedTagCount = subfeedTags.filter((t) => tags.has(t)).length;

      assert(
        subfeedTagCount === 1,
        `${line.name} (#${line.id})  is tagged for ${subfeedTagCount} GTFS subfeeds.`,
      );
    }
  });
});
