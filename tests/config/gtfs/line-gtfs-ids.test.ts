import { assert, describe, it } from "vitest";
import { expectedSortedSourceCode } from "../support/expect-sorted-source-code.js";
import { lines } from "../../../src/config/corequery/lines/index.js";
import { lineGtfsIds } from "../../../src/config/gtfs/line-gtfs-ids.js";
import { expectUniqueIds } from "../support/expect-unique-ids.js";
import { getSubfeedsWithLine } from "../../../src/gtfs/utils/get-subfeeds-with.js";
import { LineGtfsIdMapping } from "../../../src/gtfs/ids/line-gtfs-id-mapping.js";

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

      assert(
        getSubfeedsWithLine(line).suburban === (idConfig.suburban != null),
        `Tag ${line.name} line (#${line.id}) with SUBURBAN_GTFS_SUBFEED if and only if it has suburban GTFS IDs mapped.`,
      );
      assert(
        getSubfeedsWithLine(line).regional === (idConfig.regional != null),
        `Tag ${line.name} line (#${line.id}) with REGIONAL_GTFS_SUBFEED if and only if it has regional GTFS IDs mapped.`,
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

  it("mapped lines all exist in the config", () => {
    const suburbanMapping = LineGtfsIdMapping.build(lineGtfsIds, "suburban");
    const regionalMapping = LineGtfsIdMapping.build(lineGtfsIds, "regional");

    for (const mapping of [suburbanMapping, regionalMapping]) {
      for (const gtfsId of mapping.allIds()) {
        const mappedTo = `mapped to GTFS ID "${gtfsId.id}"`;

        const line = lines.find((s) => s.id === gtfsId.lineId);
        assert(line != null, `Line #${gtfsId.lineId}, ${mappedTo}, not found.`);
      }
    }
  });

  it("are listed alphabetically", async () => {
    await expectedSortedSourceCode(
      "src/config/gtfs/line-gtfs-ids.ts",
      /^  \[([^\]]+)\]:/,
      (match) => match[1],
    );
  });
});
