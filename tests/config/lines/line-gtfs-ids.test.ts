import { assert, describe, it } from "vitest";
import { expectedSortedSourceCode } from "../support/expect-sorted-source-code.js";
import { lines } from "../../../src/config/lines/index.js";
import { lineGtfsIds } from "../../../src/config/lines/line-gtfs-ids.js";
import { expectUniqueIds } from "../support/expect-unique-ids.js";

const linesExemptedFromHavingGtfsId: number[] = [];

describe("lineGtfsIds", () => {
  it("has an entry for each line", () => {
    for (const line of lines) {
      if (linesExemptedFromHavingGtfsId.includes(line.id)) continue;

      // TODO: Check that it's present in the correct subfeed, considering the
      // tag.
      assert(
        lineGtfsIds[line.id] != null,
        `No GTFS IDs found for line ${line.name} (#${line.id}).`,
      );
    }
  });

  it("no GTFS ID appears in the mapping twice", () => {
    // IDs can be duplicated across the two subfeeds, just not intra-subfeed.
    const suburbanGtfsIds = Object.values(lineGtfsIds).map((x) => x.suburban);
    const regionalGtfsIds = Object.values(lineGtfsIds).map((x) => x.regional);

    expectUniqueIds(suburbanGtfsIds, "Line GTFS ID (suburban subfeed)");
    expectUniqueIds(regionalGtfsIds, "Line GTFS ID (regional subfeed)");
  });

  it("are listed alphabetically", async () => {
    await expectedSortedSourceCode(
      "src/config/lines/line-gtfs-ids.ts",
      /^  \[([^\]]+)\]:/,
      (match) => match[1],
    );
  });
});
