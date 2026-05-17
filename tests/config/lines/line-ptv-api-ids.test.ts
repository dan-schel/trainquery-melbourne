import { assert, describe, it } from "vitest";
import { linePtvApiIds } from "../../../src/config/gtfs/line-ptv-api-ids.js";
import { lines } from "../../../src/config/lines/index.js";
import { expectedSortedSourceCode } from "../support/expect-sorted-source-code.js";
import { expectUniqueIds } from "../support/expect-unique-ids.js";
import * as line from "../../../src/config/lines/line-ids.js";

const linesExemptedFromHavingPtvId: number[] = [
  // I don't think it HAS a PTV API ID.
  line.CITY_CIRCLE,
];

describe("linePtvApiIds", () => {
  it("has an entry for each line", () => {
    for (const line of lines) {
      if (linesExemptedFromHavingPtvId.includes(line.id)) continue;

      assert(
        linePtvApiIds[line.id] != null,
        `No PTV API ID found for line ${line.name} (#${line.id}).`,
      );
    }
  });

  it("no PTV API ID appears in the mapping twice", () => {
    expectUniqueIds(linePtvApiIds, "Line PTV API ID");
  });

  it("are listed alphabetically", async () => {
    await expectedSortedSourceCode(
      "src/config/gtfs/line-ptv-api-ids.ts",
      /^  \[([^\]]+)\]:/,
      (match) => match[1],
    );
  });
});
