import { describe, expect, it } from "vitest";
import {
  DuplicateTripIdError,
  GtfsTripParser,
  StopTimeReferencesNonExistentTripError,
  TripReferencesNonExistentCalendarError,
  TripReferencesUnmappedRouteIdError,
  type GtfsTripParsingError,
} from "../../../../src/gtfs/parser/schedule/gtfs-trip-parser.js";
import { MultipleStopSequencesError } from "../../../../src/gtfs/parser/schedule/gtfs-stop-time-normaliser.js";
import { routes, stopTime, tripRow } from "./factories.js";
import { GtfsStopTime } from "../../../../src/gtfs/data/gtfs-stop-time.js";
import { CALENDAR_EVERYDAY, lineMapping, stopMapping } from "../factories.js";

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
          arrival_time: GtfsStopTime.parse("00:00:00"),
          departure_time: GtfsStopTime.parse("00:00:00"),
        }),
        stopTime({
          stop_id: "B",
          stop_sequence: 2,
          arrival_time: GtfsStopTime.parse("00:10:00"),
          departure_time: GtfsStopTime.parse("00:10:00"),
        }),
      ],
      [],
      [CALENDAR_EVERYDAY],
      lineMapping(),
      stopMapping(["A", "B"]),
    );

    expect(errors).toEqual([]);
    expect(trips).toHaveLength(1);

    const trip = trips[0];
    if (trip == null) throw new Error("Expected one trip.");

    expect(trip.gtfsTripId).toBe("trip-1");
    expect(trip.movements.map((stop) => stop.stopId)).toEqual([1, 2]);
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
          arrival_time: GtfsStopTime.parse("00:00:00"),
          departure_time: GtfsStopTime.parse("00:00:00"),
        }),
        stopTime({
          stop_id: "B",
          stop_sequence: 2,
          arrival_time: GtfsStopTime.parse("00:10:00"),
          departure_time: GtfsStopTime.parse("00:10:00"),
        }),
        stopTime({
          stop_id: "A",
          stop_sequence: 1,
          arrival_time: GtfsStopTime.parse("01:00:00"),
          departure_time: GtfsStopTime.parse("01:00:00"),
        }),
        stopTime({
          stop_id: "B",
          stop_sequence: 2,
          arrival_time: GtfsStopTime.parse("01:10:00"),
          departure_time: GtfsStopTime.parse("01:10:00"),
        }),
      ],
      [],
      [CALENDAR_EVERYDAY],
      lineMapping(),
      stopMapping(["A", "B"]),
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(MultipleStopSequencesError);
    expect(trips).toHaveLength(1);

    const trip = trips[0];
    if (trip == null) throw new Error("Expected one trip.");

    expect(trip.movements.map((stop) => stop.stopId)).toEqual([1, 2]);
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
      [CALENDAR_EVERYDAY],
      lineMapping(),
      stopMapping(["A", "B"]),
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
      [CALENDAR_EVERYDAY],
      lineMapping(),
      stopMapping(["A", "B"]),
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
      [CALENDAR_EVERYDAY],
      lineMapping(),
      stopMapping(["A", "B"]),
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
      [CALENDAR_EVERYDAY],
      lineMapping(),
      stopMapping(["A", "B"]),
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TripReferencesUnmappedRouteIdError);
    expect(trips).toEqual([]);
  });
});
