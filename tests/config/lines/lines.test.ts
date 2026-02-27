import { describe, it, assert } from "vitest";
import { lines } from "../../../src/config/lines/index.js";
import { lineTagSuccession } from "../../../src/config/lines/line-tag-succession.js";
import * as tag from "../../../src/config/lines/line-tags.js";
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

  it("are listed alphabetically", () => {
    lines.forEach((entry, i) => {
      const previous = lines[i - 1];
      if (previous == null) return;

      assert(
        entry.name.localeCompare(previous.name) >= 0,
        `${previous.name} should be listed after ${entry.name} in alphabetical order.`,
      );
    });
  });
});
