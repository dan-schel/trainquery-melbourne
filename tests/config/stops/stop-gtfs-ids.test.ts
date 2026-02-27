import { assert, describe, it } from "vitest";
import { expectedSortedSourceCode } from "../support/expect-sorted-source-code.js";
import { stops } from "../../../src/config/stops/index.js";
import { stopGtfsIds } from "../../../src/config/stops/stop-gtfs-ids.js";
import { expectUniqueIds } from "../support/expect-unique-ids.js";

const stopsExemptedFromHavingGtfsId: number[] = [];

describe("stopGtfsIds", () => {
  it("has an entry for each stop", () => {
    for (const stop of stops) {
      if (stopsExemptedFromHavingGtfsId.includes(stop.id)) continue;

      // TODO: Check that it's present in the correct subfeed, considering the
      // tag.
      assert(
        stopGtfsIds[stop.id] != null,
        `No GTFS IDs found for stop ${stop.name} (#${stop.id}).`,
      );
    }
  });

  it("no GTFS ID appears in the mapping twice", () => {
    // IDs can be duplicated across the two subfeeds, just not intra-subfeed.
    const suburbanGtfsIds = Object.values(stopGtfsIds).map((x) => x.suburban);
    const regionalGtfsIds = Object.values(stopGtfsIds).map((x) => x.regional);

    expectUniqueIds(suburbanGtfsIds, "Stop GTFS ID (suburban subfeed)");
    expectUniqueIds(regionalGtfsIds, "Stop GTFS ID (regional subfeed)");
  });

  it("are listed alphabetically", async () => {
    await expectedSortedSourceCode(
      "src/config/stops/stop-gtfs-ids.ts",
      /^  \[([^\]]+)\]:/,
      (match) => match[1],
    );
  });
});
