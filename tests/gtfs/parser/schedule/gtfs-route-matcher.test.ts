import { describe, expect, it } from "vitest";
import {
  GtfsRouteMatcher,
  NoMatchingRouteError,
  StopTimeReferencesUnmappedStopIdError,
  UnexpectedDropOffTypeError,
  UnexpectedPickupTypeError,
  type GtfsRouteMatchingError,
} from "../../../../src/gtfs/parser/schedule/gtfs-route-matcher.js";
import { Route } from "../../../../src/gtfs/data/route/route.js";
import { routeStops, stopTime } from "./factories.js";
import { GtfsStopTime } from "../../../../src/gtfs/data/gtfs-stop-time.js";
import { stopMapping } from "../factories.js";

describe("GtfsRouteMatcher", () => {
  it("matches the shortest compatible route and injects passing movements", () => {
    const errors: GtfsRouteMatchingError[] = [];
    const matcher = new GtfsRouteMatcher((e) => errors.push(e));

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
          arrival_time: GtfsStopTime.parse("00:01:00"),
          departure_time: GtfsStopTime.parse("00:01:00"),
          stop_sequence: 1,
        }),
        stopTime({
          stop_id: "C",
          arrival_time: GtfsStopTime.parse("00:03:00"),
          departure_time: GtfsStopTime.parse("00:03:00"),
          stop_sequence: 2,
        }),
        stopTime({
          stop_id: "D",
          arrival_time: GtfsStopTime.parse("00:04:00"),
          departure_time: GtfsStopTime.parse("00:04:00"),
          stop_sequence: 3,
        }),
      ],
      routes,
      stopMapping(["A", "B", "C", "D", "E"]),
    );

    expect(errors).toEqual([]);
    expect(result).not.toBeNull();

    if (result == null) throw new Error("Expected a route match.");

    expect(result.color).toBe("red");
    expect(result.serviceTags).toEqual([10]);
    expect(result.movements.map((movement) => movement.type)).toEqual([
      "originating",
      "passing",
      "servicing",
      "terminating",
    ]);
    expect(result.movements.map((movement) => movement.stopId)).toEqual([
      1, 2, 3, 4,
    ]);
  });

  it("reports when no route matches the served stop order", () => {
    const errors: GtfsRouteMatchingError[] = [];
    const matcher = new GtfsRouteMatcher((e) => errors.push(e));

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
      stopMapping(["A", "B", "C", "D", "E"]),
    );

    expect(result).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(NoMatchingRouteError);
  });

  it("reports stop IDs that are not in the GTFS stop mapping", () => {
    const errors: GtfsRouteMatchingError[] = [];
    const matcher = new GtfsRouteMatcher((e) => errors.push(e));

    const result = matcher.match(
      [stopTime({ stop_id: "missing", stop_sequence: 1 })],
      [
        new Route({
          color: "red",
          stops: routeStops([1, 2]),
          serviceTags: [],
        }),
      ],
      stopMapping(["A", "B", "C", "D", "E"]),
    );

    expect(result).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(StopTimeReferencesUnmappedStopIdError);
  });

  it("reports unexpected pickup types but still matches the trip", () => {
    const errors: GtfsRouteMatchingError[] = [];
    const matcher = new GtfsRouteMatcher((e) => errors.push(e));

    const result = matcher.match(
      [
        stopTime({ stop_id: "A", stop_sequence: 1 }),
        stopTime({ stop_id: "B", stop_sequence: 2, pickup_type: 2 }),
        stopTime({ stop_id: "C", stop_sequence: 3 }),
      ],
      [
        new Route({
          color: "red",
          stops: routeStops([1, 2, 3]),
          serviceTags: [],
        }),
      ],
      stopMapping(["A", "B", "C", "D", "E"]),
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(UnexpectedPickupTypeError);
    expect(result).not.toBeNull();
  });

  it("reports unexpected drop-off types but still matches the trip", () => {
    const errors: GtfsRouteMatchingError[] = [];
    const matcher = new GtfsRouteMatcher((e) => errors.push(e));

    const result = matcher.match(
      [
        stopTime({ stop_id: "A", stop_sequence: 1 }),
        stopTime({ stop_id: "B", stop_sequence: 2, drop_off_type: 2 }),
        stopTime({ stop_id: "C", stop_sequence: 3 }),
      ],
      [
        new Route({
          color: "red",
          stops: routeStops([1, 2, 3]),
          serviceTags: [],
        }),
      ],
      stopMapping(["A", "B", "C", "D", "E"]),
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(UnexpectedDropOffTypeError);
    expect(result).not.toBeNull();
  });
});
