import { assert, describe, expect, it } from "vitest";
import { expectedSortedSourceCode } from "../support/expect-sorted-source-code.js";
import { stops } from "../../../src/config/stops/index.js";
import { stopGtfsIds } from "../../../src/config/stops/stop-gtfs-ids.js";
import { expectUniqueIds } from "../support/expect-unique-ids.js";
import { getSubfeedsWithStop } from "../../../src/gtfs/utils/get-subfeeds-with.js";
import { StopGtfsIdMapping } from "../../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import * as stop from "../../../src/config/stops/stop-ids.js";
import * as position from "../../../src/config/stops/stop-position-ids.js";

const stopsExemptedFromHavingGtfsId: number[] = [];

const platformsExemptedFromHavingGtfsId: {
  stopId: number;
  positionId: number;
}[] = [
  // Platform not in use anymore, so it makes sense that the GTFS feed hasn't
  // given an ID for it.
  { stopId: stop.FLINDERS_STREET, positionId: position.PLATFORM_14 },

  // Only the suburban feed gives platform-level IDs, so we don't have them for
  // the regional-only platforms that suburban trains never use. We do have them
  // for platforms 9 to 14 though, and also "standard" platform 8 (sometimes
  // used by Racecourse line trains).
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_1 },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_2 },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_2A },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_2B },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_3 },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_3A },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_3B },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_4 },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_4A },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_4B },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_5 },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_5A },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_5B },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_6 },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_6A },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_6B },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_7 },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_7A },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_7B },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_8A },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_8B },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_8S },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_15 },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_15A },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_15B },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_16 },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_16A },
  { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_16B },
];

describe("stopGtfsIds", () => {
  it("has an entry for each stop", () => {
    for (const stop of stops) {
      if (stopsExemptedFromHavingGtfsId.includes(stop.id)) continue;

      const idConfig = stopGtfsIds[stop.id];
      assert(
        idConfig != null,
        `No GTFS IDs found for ${stop.name} (#${stop.id}).`,
      );

      assert(
        getSubfeedsWithStop(stop).suburban === (idConfig.suburban != null),
        `Tag ${stop.name} (#${stop.id}) with SUBURBAN_GTFS_SUBFEED if and only if it has suburban GTFS IDs mapped.`,
      );
      assert(
        getSubfeedsWithStop(stop).regional === (idConfig.regional != null),
        `Tag ${stop.name} (#${stop.id}) with REGIONAL_GTFS_SUBFEED if and only if it has regional GTFS IDs mapped.`,
      );
    }
  });

  it("has an entry for each platform of each suburban station", () => {
    for (const stop of stops) {
      const idConfig = stopGtfsIds[stop.id];
      if (idConfig?.suburban == null) continue;

      for (const position of stop.positions) {
        const positionId = position.stopPositionId;

        const isExempt = platformsExemptedFromHavingGtfsId.some(
          (e) => e.stopId === stop.id && e.positionId === positionId,
        );
        if (isExempt) continue;

        const mappedIdForPlatform = idConfig.suburban.platforms?.[positionId];
        assert(
          mappedIdForPlatform != null && mappedIdForPlatform.length > 0,
          `No suburban GTFS IDs found for platform "${position.name}" (position #${positionId}) at ${stop.name} (#${stop.id}).`,
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

  it("keeps both known Arden and Parkville replacement-bus ID variants mapped", () => {
    const suburbanMapping = StopGtfsIdMapping.build(stopGtfsIds, "suburban");

    expect(suburbanMapping.resolveOrThrow("26323")).toMatchObject({
      stopId: stop.ARDEN,
      type: "replacement-bus",
    });
    expect(suburbanMapping.resolveOrThrow("126323")).toMatchObject({
      stopId: stop.ARDEN,
      type: "replacement-bus",
    });
    expect(suburbanMapping.resolveOrThrow("26324")).toMatchObject({
      stopId: stop.PARKVILLE,
      type: "replacement-bus",
    });
    expect(suburbanMapping.resolveOrThrow("126324")).toMatchObject({
      stopId: stop.PARKVILLE,
      type: "replacement-bus",
    });
  });

  it("are listed alphabetically", async () => {
    await expectedSortedSourceCode(
      "src/config/stops/stop-gtfs-ids.ts",
      /^  \[([^\]]+)\]:/,
      (match) => match[1],
    );
  });
});
