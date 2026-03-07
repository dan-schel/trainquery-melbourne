import { assert, describe, it } from "vitest";
import { expectedSortedSourceCode } from "../support/expect-sorted-source-code.js";
import { stops } from "../../../src/config/stops/index.js";
import { stopGtfsIds } from "../../../src/config/stops/stop-gtfs-ids.js";
import { expectUniqueIds } from "../support/expect-unique-ids.js";
import { getSubfeedsWithStop } from "../../../src/gtfs/utils/get-subfeeds-with.js";
import { StopGtfsIdMapping } from "../../../src/gtfs/ids/stop-gtfs-id-mapping.js";

const stopsExemptedFromHavingGtfsId: number[] = [];

describe("stopGtfsIds", () => {
  it("has an entry for each stop", () => {
    for (const stop of stops) {
      if (stopsExemptedFromHavingGtfsId.includes(stop.id)) continue;

      const idConfig = stopGtfsIds[stop.id];
      assert(
        idConfig != null,
        `No GTFS IDs found for ${stop.name} (#${stop.id}).`,
      );

      if (getSubfeedsWithStop(stop).suburban) {
        assert(
          idConfig.suburban != null,
          `Use of tags indicates ${stop.name} (#${stop.id}) should have suburban GTFS IDs mapped.`,
        );
      }
      if (getSubfeedsWithStop(stop).regional) {
        assert(
          idConfig.regional != null,
          `Use of tags indicates ${stop.name} (#${stop.id}) should have regional GTFS IDs mapped.`,
        );
      }
    }
  });

  it("no GTFS ID appears in the mapping twice", () => {
    // IDs can be duplicated across the two subfeeds, just not intra-subfeed.
    const suburbanGtfsIds = Object.values(stopGtfsIds).map((x) => x.suburban);
    const regionalGtfsIds = Object.values(stopGtfsIds).map((x) => x.regional);

    expectUniqueIds(suburbanGtfsIds, "Stop GTFS ID (suburban subfeed)");
    expectUniqueIds(regionalGtfsIds, "Stop GTFS ID (regional subfeed)");
  });

  it("mapped stops and positions all exist in the config", () => {
    const suburbanMapping = StopGtfsIdMapping.build(stopGtfsIds, "suburban");
    const regionalMapping = StopGtfsIdMapping.build(stopGtfsIds, "regional");

    for (const mapping of [suburbanMapping, regionalMapping]) {
      for (const gtfsId of mapping.allIds()) {
        const mappedTo = `mapped to GTFS ID "${gtfsId.id}"`;

        const stop = stops.find((s) => s.id === gtfsId.stopId);
        assert(stop != null, `Stop #${gtfsId.stopId}, ${mappedTo}, not found.`);

        if (gtfsId.type === "platform") {
          const position = stop.positions.find((p) => {
            return p.stopPositionId === gtfsId.positionId;
          });

          assert(
            position != null,
            `Position ID #${gtfsId.positionId}, ${mappedTo}, not found on stop #${gtfsId.stopId}.`,
          );
        }
      }
    }
  });

  it("are listed alphabetically", async () => {
    await expectedSortedSourceCode(
      "src/config/stops/stop-gtfs-ids.ts",
      /^  \[([^\]]+)\]:/,
      (match) => match[1],
    );
  });
});
