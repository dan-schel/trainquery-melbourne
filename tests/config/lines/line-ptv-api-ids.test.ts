import { assert, describe, it } from "vitest";
import { linePtvApiIds } from "../../../src/config/lines/line-ptv-api-ids.js";
import { lines } from "../../../src/config/lines/index.js";

const linesExemptedFromHavingPtvId: number[] = [];

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

  it("no two lines have the same PTV API ID", () => {
    const seenApiIds = new Set<string>();

    for (const ptvApiId of Object.values(linePtvApiIds).flat()) {
      assert(
        !seenApiIds.has(ptvApiId),
        `PTV API ID "${ptvApiId}" is present twice.`,
      );
      seenApiIds.add(ptvApiId);
    }
  });
});
