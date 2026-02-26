import { describe, it, assert } from "vitest";
import { lines } from "../../../src/config/lines";
import { lineTagSuccession } from "../../../src/config/lines/line-tag-succession";
import * as tags from "../../../src/config/lines/line-tags";
import { Tags } from "corequery";

describe("lines", () => {
  it("all lines are tagged for exactly one subfeed", () => {
    const subfeedTags = [
      tags.SUBURBAN_GTFS_SUBFEED,
      tags.REGIONAL_GTFS_SUBFEED,
    ];

    for (const line of lines) {
      const tags = Tags.build(line.tags, lineTagSuccession);
      const subfeedTagCount = subfeedTags.filter((tag) => tags.has(tag)).length;

      assert(
        subfeedTagCount === 1,
        `Line ${line.id} is tagged for ${subfeedTagCount} GTFS subfeeds.`,
      );
    }
  });
});
