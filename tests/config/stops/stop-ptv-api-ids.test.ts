import { assert, describe, it } from "vitest";
import { stopPtvApiIds } from "../../../src/config/stops/stop-ptv-api-ids.js";
import { stops } from "../../../src/config/stops/index.js";

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

  it("no two stops have the same PTV API ID", () => {
    const seenApiIds = new Set<string>();

    for (const ptvApiId of Object.values(stopPtvApiIds).flat()) {
      assert(
        !seenApiIds.has(ptvApiId),
        `PTV API ID "${ptvApiId}" is present twice.`,
      );
      seenApiIds.add(ptvApiId);
    }
  });
});
