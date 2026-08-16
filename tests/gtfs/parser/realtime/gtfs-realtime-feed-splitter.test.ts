import { describe, expect, it } from "vitest";
import {
  GtfsRealtimeFeedSplitter,
  RouteIdNotInTripDescriptorError,
  TripDescriptorReferencesUnmappedRouteIdError,
  type GtfsRealtimeFeedSplittingError,
} from "../../../../src/gtfs/parser/realtime/gtfs-realtime-feed-splitter.js";
import { LineGtfsIdMapping } from "../../../../src/gtfs/corequery-gtfs/data/ids/line-gtfs-id-mapping.js";
import { LineGtfsIdCollection } from "../../../../src/gtfs/corequery-gtfs/data/ids/line-gtfs-id-collection.js";
import { GtfsStopTime } from "../../../../src/gtfs/data/gtfs-stop-time.js";

describe("GtfsRealtimeFeedSplitter", () => {
  const SUBURBAN_LINE_GTFS_ID_MAPPING = new LineGtfsIdMapping(
    new Map([[1, LineGtfsIdCollection.withParentOnly(1, "suburban-route")]]),
  );
  const REGIONAL_LINE_GTFS_ID_MAPPING = new LineGtfsIdMapping(
    new Map([[2, LineGtfsIdCollection.withParentOnly(1, "regional-route")]]),
  );

  function tripUpdateWithRouteId(routeId: string | undefined) {
    return {
      trip: {
        tripId: "trip-1",
        startTime: GtfsStopTime.parse("00:00:00"),
        startDate: Temporal.PlainDate.from({ year: 2026, month: 7, day: 14 }),
        scheduleRelationship: "SCHEDULED",
        routeId: routeId,
      },
      stopTimeUpdate: [],
    };
  }

  it("splits trip updates into suburban and regional buckets", () => {
    const errors: GtfsRealtimeFeedSplittingError[] = [];
    const splitter = new GtfsRealtimeFeedSplitter(
      SUBURBAN_LINE_GTFS_ID_MAPPING,
      REGIONAL_LINE_GTFS_ID_MAPPING,
      (e) => errors.push(e),
    );

    const result = splitter.split({
      tripUpdates: [
        tripUpdateWithRouteId("suburban-route"),
        tripUpdateWithRouteId("regional-route"),
      ],
    });

    expect(errors).toEqual([]);
    expect(result.suburban.tripUpdates).toHaveLength(1);
    expect(result.regional.tripUpdates).toHaveLength(1);
  });

  it("reports trip updates without route IDs", () => {
    const errors: GtfsRealtimeFeedSplittingError[] = [];
    const splitter = new GtfsRealtimeFeedSplitter(
      SUBURBAN_LINE_GTFS_ID_MAPPING,
      REGIONAL_LINE_GTFS_ID_MAPPING,
      (e) => errors.push(e),
    );

    const result = splitter.split({
      tripUpdates: [tripUpdateWithRouteId(undefined)],
    });

    expect(result.suburban.tripUpdates).toEqual([]);
    expect(result.regional.tripUpdates).toEqual([]);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(RouteIdNotInTripDescriptorError);
  });

  it("reports trip updates with unmapped route IDs", () => {
    const errors: GtfsRealtimeFeedSplittingError[] = [];
    const splitter = new GtfsRealtimeFeedSplitter(
      SUBURBAN_LINE_GTFS_ID_MAPPING,
      REGIONAL_LINE_GTFS_ID_MAPPING,
      (e) => errors.push(e),
    );

    const result = splitter.split({
      tripUpdates: [tripUpdateWithRouteId("unknown-route")],
    });

    expect(result.suburban.tripUpdates).toEqual([]);
    expect(result.regional.tripUpdates).toEqual([]);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      TripDescriptorReferencesUnmappedRouteIdError,
    );
  });
});
