import { describe, expect, it } from "vitest";
import {
  GtfsRouteMatcher,
  InvalidGtfsTimeStringError,
  NoMatchingRouteError,
  StopTimeReferencesUnmappedStopIdError,
  UnexpectedDropOffTypeError,
  UnexpectedPickupTypeError,
  type GtfsRouteMatchingError,
} from "../../../../src/gtfs/schedule/parser/gtfs-route-matcher.js";
import { Route } from "../../../../src/gtfs/route/route.js";
import { RouteStop } from "../../../../src/gtfs/route/route-stop.js";
import { StopGtfsIdCollection } from "../../../../src/gtfs/ids/stop-gtfs-id-collection.js";
import { StopGtfsIdMapping } from "../../../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import type { StopTimesCsvRow } from "../../../../src/gtfs/schedule/csv/csv-schemas.js";

describe("GtfsRouteMatcher", () => {
  it("matches the shortest compatible route and injects express stops", () => {
    const errors: GtfsRouteMatchingError[] = [];
    const matcher = new GtfsRouteMatcher((error) => errors.push(error));

    const routes = [
      new Route({
        color: "red",
        stops: routeStops([1, 2, 3, 4]),
        serviceTags: [10],
      }),
      new Route({
        color: "blue",
        stops: routeStops([1, 2, 3, 4, 5]),
        serviceTags: [20],
      }),
    ];

    const result = matcher.match(
      [
        stopTime({
          stop_id: "A",
          arrival_time: "00:01:00",
          departure_time: "00:01:00",
          stop_sequence: 1,
        }),
        stopTime({
          stop_id: "C",
          arrival_time: "00:03:00",
          departure_time: "00:03:00",
          stop_sequence: 2,
        }),
        stopTime({
          stop_id: "D",
          arrival_time: "00:04:00",
          departure_time: "00:04:00",
          stop_sequence: 3,
        }),
      ],
      routes,
      stopMapping(),
    );

    expect(errors).toEqual([]);
    expect(result).not.toBeNull();

    if (result == null) throw new Error("Expected a route match.");

    expect(result.color).toBe("red");
    expect(result.serviceTags).toEqual([10]);
    expect(result.stops.map((stop) => stop.type)).toEqual([
      "serviced",
      "express",
      "serviced",
      "serviced",
    ]);
    expect(result.stops.map((stop) => stop.stopId)).toEqual([1, 2, 3, 4]);
  });

  it("reports when no route matches the served stop order", () => {
    const errors: GtfsRouteMatchingError[] = [];
    const matcher = new GtfsRouteMatcher((error) => errors.push(error));

    const result = matcher.match(
      [
        stopTime({ stop_id: "A", stop_sequence: 1 }),
        stopTime({ stop_id: "C", stop_sequence: 2 }),
      ],
      [
        new Route({
          color: "red",
          stops: routeStops([1, 2]),
          serviceTags: [],
        }),
      ],
      stopMapping(),
    );

    expect(result).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(NoMatchingRouteError);
  });

  it("reports stop IDs that are not in the GTFS stop mapping", () => {
    const errors: GtfsRouteMatchingError[] = [];
    const matcher = new GtfsRouteMatcher((error) => errors.push(error));

    const result = matcher.match(
      [stopTime({ stop_id: "missing", stop_sequence: 1 })],
      [
        new Route({
          color: "red",
          stops: routeStops([1, 2]),
          serviceTags: [],
        }),
      ],
      stopMapping(),
    );

    expect(result).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(StopTimeReferencesUnmappedStopIdError);
  });

  it("reports unexpected pickup types but still matches the trip", () => {
    const errors: GtfsRouteMatchingError[] = [];
    const matcher = new GtfsRouteMatcher((error) => errors.push(error));

    const result = matcher.match(
      [
        stopTime({ stop_id: "A", stop_sequence: 1, pickup_type: 2 }),
        stopTime({ stop_id: "B", stop_sequence: 2 }),
      ],
      [
        new Route({
          color: "red",
          stops: routeStops([1, 2]),
          serviceTags: [],
        }),
      ],
      stopMapping(),
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(UnexpectedPickupTypeError);
    expect(result).not.toBeNull();
  });

  it("reports unexpected drop-off types but still matches the trip", () => {
    const errors: GtfsRouteMatchingError[] = [];
    const matcher = new GtfsRouteMatcher((error) => errors.push(error));

    const result = matcher.match(
      [
        stopTime({ stop_id: "A", stop_sequence: 1, drop_off_type: 2 }),
        stopTime({ stop_id: "B", stop_sequence: 2 }),
      ],
      [
        new Route({
          color: "red",
          stops: routeStops([1, 2]),
          serviceTags: [],
        }),
      ],
      stopMapping(),
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(UnexpectedDropOffTypeError);
    expect(result).not.toBeNull();
  });

  it("reports invalid GTFS time strings", () => {
    const errors: GtfsRouteMatchingError[] = [];
    const matcher = new GtfsRouteMatcher((error) => errors.push(error));

    const result = matcher.match(
      [
        stopTime({
          stop_id: "A",
          stop_sequence: 1,
          arrival_time: "not-a-time",
        }),
      ],
      [
        new Route({
          color: "red",
          stops: routeStops([1]),
          serviceTags: [],
        }),
      ],
      stopMapping(),
    );

    expect(result).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(InvalidGtfsTimeStringError);
  });
});

function stopMapping() {
  return new StopGtfsIdMapping(
    new Map([
      [1, new StopGtfsIdCollection(1, "A", [], new Map(), [])],
      [2, new StopGtfsIdCollection(2, "B", [], new Map(), [])],
      [3, new StopGtfsIdCollection(3, "C", [], new Map(), [])],
      [4, new StopGtfsIdCollection(4, "D", [], new Map(), [])],
      [5, new StopGtfsIdCollection(5, "E", [], new Map(), [])],
    ]),
  );
}

function routeStops(stopIds: readonly number[]) {
  return stopIds.map(
    (stopId) => new RouteStop({ stopId, collapseInStoppingPatterns: false }),
  );
}

function stopTime(overrides: Partial<StopTimesCsvRow> = {}): StopTimesCsvRow {
  return {
    trip_id: "trip-1",
    arrival_time: "00:00:00",
    departure_time: "00:00:00",
    stop_id: "A",
    stop_sequence: 1,
    stop_headsign: "",
    pickup_type: 0,
    drop_off_type: 0,
    shape_dist_traveled: 0,
    ...overrides,
  };
}
