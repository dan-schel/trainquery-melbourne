import { describe, expect, it } from "vitest";
import {
  DuplicateTripIdError,
  GtfsTripParser,
  StopTimeReferencesNonExistentTripError,
  TripReferencesNonExistentCalendarError,
  TripReferencesUnmappedRouteIdError,
  type GtfsTripParsingError,
} from "../../../../src/gtfs/schedule/parser/gtfs-trip-parser.js";
import { GtfsCalendar } from "../../../../src/gtfs/schedule/data/gtfs-calendar.js";
import { PlainDateRange } from "../../../../src/gtfs/departures/plain-date-range.js";
import { LineRoutes } from "../../../../src/gtfs/route/line-routes.js";
import { Route } from "../../../../src/gtfs/route/route.js";
import { RouteStop } from "../../../../src/gtfs/route/route-stop.js";
import { LineGtfsIdCollection } from "../../../../src/gtfs/ids/line-gtfs-id-collection.js";
import { LineGtfsIdMapping } from "../../../../src/gtfs/ids/line-gtfs-id-mapping.js";
import { StopGtfsIdCollection } from "../../../../src/gtfs/ids/stop-gtfs-id-collection.js";
import { StopGtfsIdMapping } from "../../../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import { MultipleStopSequencesError } from "../../../../src/gtfs/schedule/parser/gtfs-stop-time-normaliser.js";
import type {
  StopTimesCsvRow,
  TripsCsvRow,
} from "../../../../src/gtfs/schedule/csv/csv-schemas.js";

describe("GtfsTripParser", () => {
  it("parses one simple trip end-to-end", () => {
    const errors: GtfsTripParsingError[] = [];
    const parser = new GtfsTripParser(routes(), (error) => errors.push(error));

    const trips = parser.parse(
      [tripRow()],
      [
        stopTime({
          stop_id: "A",
          stop_sequence: 1,
          arrival_time: "00:00:00",
          departure_time: "00:00:00",
        }),
        stopTime({
          stop_id: "B",
          stop_sequence: 2,
          arrival_time: "00:10:00",
          departure_time: "00:10:00",
        }),
      ],
      [],
      [calendar()],
      lineMapping(),
      stopMapping(),
    );

    expect(errors).toEqual([]);
    expect(trips).toHaveLength(1);

    const trip = trips[0];
    if (trip == null) throw new Error("Expected one trip.");

    expect(trip.gtfsTripId).toBe("trip-1");
    expect(trip.stops.map((stop) => stop.stopId)).toEqual([1, 2]);
  });

  it("reports the correct error when multiple stop time sequences are given for a trip", () => {
    // Identifying multiple stop time sequences is a responsibility of
    // StopTimeNormaliser, but it can't do it's job correctly if GtfsTripParser
    // sorts the stop times by stop_sequence before passing them onto
    // StopTimeNormaliser, so this test is essentially just checking that it
    // doesn't do that sort!

    const errors: GtfsTripParsingError[] = [];
    const parser = new GtfsTripParser(routes(), (error) => errors.push(error));

    const trips = parser.parse(
      [tripRow()],
      [
        stopTime({
          stop_id: "A",
          stop_sequence: 1,
          arrival_time: "00:00:00",
          departure_time: "00:00:00",
        }),
        stopTime({
          stop_id: "B",
          stop_sequence: 2,
          arrival_time: "00:10:00",
          departure_time: "00:10:00",
        }),
        stopTime({
          stop_id: "A",
          stop_sequence: 1,
          arrival_time: "01:00:00",
          departure_time: "01:00:00",
        }),
        stopTime({
          stop_id: "B",
          stop_sequence: 2,
          arrival_time: "01:10:00",
          departure_time: "01:10:00",
        }),
      ],
      [],
      [calendar()],
      lineMapping(),
      stopMapping(),
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(MultipleStopSequencesError);
    expect(trips).toHaveLength(1);

    const trip = trips[0];
    if (trip == null) throw new Error("Expected one trip.");

    expect(trip.stops.map((stop) => stop.stopId)).toEqual([1, 2]);
  });

  it("reports duplicate trip rows and keeps the first one", () => {
    const errors: GtfsTripParsingError[] = [];
    const parser = new GtfsTripParser(routes(), (error) => errors.push(error));

    const trips = parser.parse(
      [tripRow(), tripRow()],
      [
        stopTime({ stop_id: "A", stop_sequence: 1 }),
        stopTime({ stop_id: "B", stop_sequence: 2 }),
      ],
      [],
      [calendar()],
      lineMapping(),
      stopMapping(),
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(DuplicateTripIdError);
    expect(trips).toHaveLength(1);
  });

  it("reports stop_times rows that reference non-existent trips", () => {
    const errors: GtfsTripParsingError[] = [];
    const parser = new GtfsTripParser(routes(), (error) => errors.push(error));

    const trips = parser.parse(
      [tripRow()],
      [
        stopTime({ stop_id: "A", stop_sequence: 1 }),
        stopTime({ stop_id: "B", stop_sequence: 2 }),
        stopTime({ trip_id: "missing-trip", stop_id: "A", stop_sequence: 1 }),
      ],
      [],
      [calendar()],
      lineMapping(),
      stopMapping(),
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(StopTimeReferencesNonExistentTripError);
    expect(trips).toHaveLength(1);
  });

  it("reports trips that reference non-existent calendars", () => {
    const errors: GtfsTripParsingError[] = [];
    const parser = new GtfsTripParser(routes(), (error) => errors.push(error));

    const trips = parser.parse(
      [tripRow({ service_id: "missing-svc" })],
      [
        stopTime({ stop_id: "A", stop_sequence: 1 }),
        stopTime({ stop_id: "B", stop_sequence: 2 }),
      ],
      [],
      [calendar()],
      lineMapping(),
      stopMapping(),
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TripReferencesNonExistentCalendarError);
    expect(trips).toEqual([]);
  });

  it("reports trips that reference unmapped route IDs", () => {
    const errors: GtfsTripParsingError[] = [];
    const parser = new GtfsTripParser(routes(), (error) => errors.push(error));

    const trips = parser.parse(
      [tripRow({ route_id: "missing-route" })],
      [
        stopTime({ stop_id: "A", stop_sequence: 1 }),
        stopTime({ stop_id: "B", stop_sequence: 2 }),
      ],
      [],
      [calendar()],
      lineMapping(),
      stopMapping(),
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TripReferencesUnmappedRouteIdError);
    expect(trips).toEqual([]);
  });
});

function routes() {
  return new LineRoutes(
    new Map([
      [
        1,
        [
          new Route({
            color: "blue",
            stops: [
              new RouteStop({ stopId: 1, collapseInStoppingPatterns: false }),
              new RouteStop({ stopId: 2, collapseInStoppingPatterns: false }),
            ],
            serviceTags: [7],
          }),
        ],
      ],
    ]),
  );
}

function lineMapping() {
  return new LineGtfsIdMapping(
    new Map([[1, new LineGtfsIdCollection(1, "route-1", [], [])]]),
  );
}

function stopMapping() {
  return new StopGtfsIdMapping(
    new Map([
      [1, new StopGtfsIdCollection(1, "A", [], new Map(), [])],
      [2, new StopGtfsIdCollection(2, "B", [], new Map(), [])],
    ]),
  );
}

function calendar() {
  return new GtfsCalendar(
    "svc",
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    new PlainDateRange(null, null),
    [],
    [],
  );
}

function tripRow(overrides: Partial<TripsCsvRow> = {}): TripsCsvRow {
  return {
    route_id: "route-1",
    service_id: "svc",
    trip_id: "trip-1",
    shape_id: "shape-1",
    trip_headsign: "",
    direction_id: "0",
    block_id: "",
    wheelchair_accessible: 0,
    bikes_allowed: 0,
    ...overrides,
  };
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
