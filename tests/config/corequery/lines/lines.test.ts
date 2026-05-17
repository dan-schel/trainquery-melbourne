import { describe, it, assert } from "vitest";
import { lines } from "../../../../src/config/corequery/lines/index.js";
import { getSubfeedsWithLine } from "../../../../src/gtfs/utils/get-subfeeds-with.js";
import { Tags } from "corequery";
import { lineTagSuccession } from "../../../../src/config/corequery/lines/line-tag-succession.js";
import * as tag from "../../../../src/config/corequery/lines/line-tags.js";

describe("lines", () => {
  it("all lines are tagged for exactly one subfeed", () => {
    for (const line of lines) {
      const result = getSubfeedsWithLine(line);
      const subfeedCount = Object.values(result).filter((x) => x).length;

      assert(
        subfeedCount === 1,
        `${line.name} (#${line.id}) is tagged for ${subfeedCount} GTFS subfeeds.`,
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

  it("all lines are tagged as either full time or part time", () => {
    for (const line of lines) {
      const tags = Tags.build(line.tags, lineTagSuccession);
      const hasFullTimeTag = tags.has(tag.FULL_TIME);
      const hasPartTimeTag = tags.has(tag.PART_TIME);

      assert(
        hasFullTimeTag || hasPartTimeTag,
        `${line.name} (#${line.id}) is not tagged as either full time or part time.`,
      );
      assert(
        !(hasFullTimeTag && hasPartTimeTag),
        `${line.name} (#${line.id}) is tagged as both full time and part time.`,
      );
    }
  });
});
