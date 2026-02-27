import { describe, it, assert } from "vitest";
import { lines } from "../../../src/config/lines/index.js";
import { getSubfeedsWithLine } from "../../../src/gtfs/utils/get-subfeeds-with.js";

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
});
