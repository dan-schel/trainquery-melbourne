import { assert, describe, it } from "vitest";
import { stopPtvApiIds } from "../../../src/config/stops/stop-ptv-api-ids.js";
import { stops } from "../../../src/config/stops/index.js";
import { expectUniqueIds } from "../support/expect-unique-ids.js";
import { expectedSortedSourceCode } from "../support/expect-sorted-source-code.js";

const stopsExemptedFromHavingPtvId: number[] = [];

describe("stopPtvApiIds", () => {
  it("has an entry for each stop", () => {
    for (const stop of stops) {
      if (stopsExemptedFromHavingPtvId.includes(stop.id)) continue;

      assert(
        stopPtvApiIds[stop.id] != null,
        `No PTV API ID found for stop ${stop.name} (#${stop.id}).`,
      );
    }
  });

  it("no PTV API ID appears in the mapping twice", () => {
    expectUniqueIds(stopPtvApiIds, "Stop PTV API ID");
  });

  it("are listed alphabetically", async () => {
    await expectedSortedSourceCode(
      "src/config/stops/stop-ptv-api-ids.ts",
      /^  \[([^\]]+)\]:/,
      (match) => match[1],
    );
  });
});
