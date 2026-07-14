import { describe, expect, it } from "vitest";
import {
  GtfsRealtimeFeedSplitter,
  RouteIdNotInTripDescriptorError,
  TripDescriptorReferencesUnmappedRouteIdError,
  type GtfsRealtimeFeedSplittingError,
} from "../../../../src/gtfs/parser/realtime/gtfs-realtime-feed-splitter.js";
import { lineMapping, realtimeFeed, tripUpdate } from "./factories.js";

describe("GtfsRealtimeFeedSplitter", () => {
  it("splits trip updates into suburban and regional buckets", () => {
    const errors: GtfsRealtimeFeedSplittingError[] = [];
    const splitter = new GtfsRealtimeFeedSplitter(
      lineMapping({ lineId: 1, routeId: "suburban-route" }),
      lineMapping({ lineId: 2, routeId: "regional-route" }),
      (e) => errors.push(e),
    );

    const result = splitter.split(
      realtimeFeed([
        tripUpdate({
          trip: { ...tripUpdate().trip, routeId: "suburban-route" },
        }),
        tripUpdate({
          trip: { ...tripUpdate().trip, routeId: "regional-route" },
        }),
      ]),
    );

    expect(errors).toEqual([]);
    expect(result.suburban.tripUpdates).toHaveLength(1);
    expect(result.regional.tripUpdates).toHaveLength(1);
  });

  it("reports trip updates without route IDs", () => {
    const errors: GtfsRealtimeFeedSplittingError[] = [];
    const splitter = new GtfsRealtimeFeedSplitter(
      lineMapping({ lineId: 1, routeId: "suburban-route" }),
      lineMapping({ lineId: 2, routeId: "regional-route" }),
      (e) => errors.push(e),
    );

    const result = splitter.split(
      realtimeFeed([
        tripUpdate({ trip: { ...tripUpdate().trip, routeId: undefined } }),
      ]),
    );

    expect(result.suburban.tripUpdates).toEqual([]);
    expect(result.regional.tripUpdates).toEqual([]);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(RouteIdNotInTripDescriptorError);
  });

  it("reports trip updates with unmapped route IDs", () => {
    const errors: GtfsRealtimeFeedSplittingError[] = [];
    const splitter = new GtfsRealtimeFeedSplitter(
      lineMapping({ lineId: 1, routeId: "suburban-route" }),
      lineMapping({ lineId: 2, routeId: "regional-route" }),
      (e) => errors.push(e),
    );

    const result = splitter.split(
      realtimeFeed([
        tripUpdate({
          trip: { ...tripUpdate().trip, routeId: "unknown-route" },
        }),
      ]),
    );

    expect(result.suburban.tripUpdates).toEqual([]);
    expect(result.regional.tripUpdates).toEqual([]);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      TripDescriptorReferencesUnmappedRouteIdError,
    );
  });
});
