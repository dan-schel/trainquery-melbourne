import { assert, describe, it } from "vitest";
import { expectedSortedSourceCode } from "../support/expect-sorted-source-code.js";
import { lines } from "../../../src/config/lines/index.js";
import { lineGtfsIds } from "../../../src/config/lines/line-gtfs-ids.js";
import { expectUniqueIds } from "../support/expect-unique-ids.js";
import { getSubfeedsWithLine } from "../../../src/gtfs/utils/get-subfeeds-with.js";

const linesExemptedFromHavingGtfsId: number[] = [];

describe("lineGtfsIds", () => {
  it("has an entry for each line", () => {
    for (const line of lines) {
      if (linesExemptedFromHavingGtfsId.includes(line.id)) continue;

      const idConfig = lineGtfsIds[line.id];
      assert(
        idConfig != null,
        `No GTFS IDs found for ${line.name} line (#${line.id}).`,
      );

      if (getSubfeedsWithLine(line).suburban) {
        assert(
          idConfig.suburban != null,
          `Use of tags indicates ${line.name} line (#${line.id}) should have suburban GTFS IDs mapped.`,
        );
      }
      if (getSubfeedsWithLine(line).regional) {
        assert(
          idConfig.regional != null,
          `Use of tags indicates ${line.name} line (#${line.id}) should have regional GTFS IDs mapped.`,
        );
      }
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
