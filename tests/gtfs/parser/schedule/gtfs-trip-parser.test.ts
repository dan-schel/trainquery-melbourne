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
import { GtfsStopTime } from "../../../../src/gtfs/data/gtfs-stop-time.js";
import { LineOverrides } from "../../../../src/gtfs/data/route/line-overrides.js";
import { GtfsCalendar } from "../../../../src/gtfs/data/gtfs-calendar.js";
import { LineRoutes } from "../../../../src/gtfs/data/route/line-routes.js";
import { LineGtfsIdMapping } from "../../../../src/gtfs/data/ids/line-gtfs-id-mapping.js";
import { LineGtfsIdCollection } from "../../../../src/gtfs/data/ids/line-gtfs-id-collection.js";
import { StopGtfsIdMapping } from "../../../../src/gtfs/data/ids/stop-gtfs-id-mapping.js";
import { StopGtfsIdCollection } from "../../../../src/gtfs/data/ids/stop-gtfs-id-collection.js";

describe("GtfsTripParser", () => {
  const LINE_ID = 1;
  const LINE_GTFS_ID = "line-1";

  const LINE_GTFS_ID_MAPPING = new LineGtfsIdMapping(
    new Map([
      [LINE_ID, LineGtfsIdCollection.withParentOnly(LINE_ID, LINE_GTFS_ID)],
    ]),
  );
  const STOP_GTFS_ID_MAPPING = new StopGtfsIdMapping(
    new Map([
      [1, StopGtfsIdCollection.withParentOnly(1, "1")],
      [2, StopGtfsIdCollection.withParentOnly(2, "2")],
    ]),
  );

  const LINE_ROUTES = LineRoutes.build({
    [LINE_ID]: [
      {
        color: "blue",
        serviceTags: [7],
        stops: [
          { stopId: 1, collapseInStoppingPatterns: false },
          { stopId: 2, collapseInStoppingPatterns: false },
        ],
      },
    ],
  });

  const LINE_OVERRIDES_NONE = LineOverrides.build({});
  const CALENDAR_EVERYDAY = GtfsCalendar.everyday("cal");

  const TRIP_ROW = {
    trip_id: "trip-1",
    route_id: LINE_GTFS_ID,
    service_id: CALENDAR_EVERYDAY.gtfsCalendarId,
  };
  const STOP_TIME_A = {
    trip_id: TRIP_ROW.trip_id,
    arrival_time: GtfsStopTime.parse("00:00:00"),
    departure_time: GtfsStopTime.parse("00:00:00"),
    stop_id: "1",
    stop_sequence: 1,
    pickup_type: 0,
    drop_off_type: 0,
  };
  const STOP_TIME_B = {
    trip_id: TRIP_ROW.trip_id,
    arrival_time: GtfsStopTime.parse("00:10:00"),
    departure_time: GtfsStopTime.parse("00:10:00"),
    stop_id: "2",
    stop_sequence: 2,
    pickup_type: 0,
    drop_off_type: 0,
  };

  it("parses one simple trip end-to-end", () => {
    const errors: GtfsTripParsingError[] = [];
    const parser = new GtfsTripParser(LINE_ROUTES, LINE_OVERRIDES_NONE, (e) =>
      errors.push(e),
    );

    const tripsCsv = [TRIP_ROW];
    const stopTimesCsv = [STOP_TIME_A, STOP_TIME_B];

    const trips = parser.parse(
      tripsCsv,
      stopTimesCsv,
      [],
      [CALENDAR_EVERYDAY],
      LINE_GTFS_ID_MAPPING,
      STOP_GTFS_ID_MAPPING,
    );

    expect(errors).toEqual([]);
    expect(trips).toHaveLength(1);

    const trip = trips[0];
    if (trip == null) throw new Error();

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
    const parser = new GtfsTripParser(LINE_ROUTES, LINE_OVERRIDES_NONE, (e) =>
      errors.push(e),
    );

    const tripsCsv = [TRIP_ROW];
    const stopTimesCsv = [
      STOP_TIME_A,
      STOP_TIME_B,

      // Repeat the same stop_sequence values again. (Use different
      // arrival/departure times to check which ones are ultimately used.)
      {
        ...STOP_TIME_A,
        arrival_time: GtfsStopTime.parse("01:00:00"),
        departure_time: GtfsStopTime.parse("01:00:00"),
      },
      {
        ...STOP_TIME_B,
        arrival_time: GtfsStopTime.parse("01:10:00"),
        departure_time: GtfsStopTime.parse("01:10:00"),
      },
    ];

    const trips = parser.parse(
      tripsCsv,
      stopTimesCsv,
      [],
      [CALENDAR_EVERYDAY],
      LINE_GTFS_ID_MAPPING,
      STOP_GTFS_ID_MAPPING,
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(MultipleStopSequencesError);
    expect(trips).toHaveLength(1);

    const trip = trips[0];
    if (trip == null) throw new Error("Expected one trip.");

    expect(trip.movements.map((stop) => stop.stopId)).toEqual([1, 2]);
    expect(trip.origination.departureTime.asString()).toEqual("00:00:00");
    expect(trip.termination.arrivalTime.asString()).toEqual("00:10:00");
  });

  it("reports duplicate trip rows and keeps the first one", () => {
    const errors: GtfsTripParsingError[] = [];
    const parser = new GtfsTripParser(LINE_ROUTES, LINE_OVERRIDES_NONE, (e) =>
      errors.push(e),
    );

    const tripsCsv = [TRIP_ROW, TRIP_ROW];
    const stopTimesCsv = [STOP_TIME_A, STOP_TIME_B];

    const trips = parser.parse(
      tripsCsv,
      stopTimesCsv,
      [],
      [CALENDAR_EVERYDAY],
      LINE_GTFS_ID_MAPPING,
      STOP_GTFS_ID_MAPPING,
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(DuplicateTripIdError);
    expect(trips).toHaveLength(1);
  });

  it("reports stop_times rows that reference non-existent trips", () => {
    const errors: GtfsTripParsingError[] = [];
    const parser = new GtfsTripParser(LINE_ROUTES, LINE_OVERRIDES_NONE, (e) =>
      errors.push(e),
    );

    const tripsCsv = [TRIP_ROW];
    const stopTimesCsv = [
      STOP_TIME_A,
      STOP_TIME_B,
      { ...STOP_TIME_A, trip_id: "missing-trip" },
    ];

    const trips = parser.parse(
      tripsCsv,
      stopTimesCsv,
      [],
      [CALENDAR_EVERYDAY],
      LINE_GTFS_ID_MAPPING,
      STOP_GTFS_ID_MAPPING,
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(StopTimeReferencesNonExistentTripError);
    expect(trips).toHaveLength(1);
  });

  it("reports trips that reference non-existent calendars", () => {
    const errors: GtfsTripParsingError[] = [];
    const parser = new GtfsTripParser(LINE_ROUTES, LINE_OVERRIDES_NONE, (e) =>
      errors.push(e),
    );

    const tripsCsv = [{ ...TRIP_ROW, service_id: "missing-cal" }];
    const stopTimesCsv = [STOP_TIME_A, STOP_TIME_B];

    const trips = parser.parse(
      tripsCsv,
      stopTimesCsv,
      [],
      [CALENDAR_EVERYDAY],
      LINE_GTFS_ID_MAPPING,
      STOP_GTFS_ID_MAPPING,
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TripReferencesNonExistentCalendarError);
    expect(trips).toEqual([]);
  });

  it("reports trips that reference unmapped route IDs", () => {
    const errors: GtfsTripParsingError[] = [];
    const parser = new GtfsTripParser(LINE_ROUTES, LINE_OVERRIDES_NONE, (e) =>
      errors.push(e),
    );

    const tripsCsv = [{ ...TRIP_ROW, route_id: "missing-route" }];
    const stopTimesCsv = [STOP_TIME_A, STOP_TIME_B];

    const trips = parser.parse(
      tripsCsv,
      stopTimesCsv,
      [],
      [CALENDAR_EVERYDAY],
      LINE_GTFS_ID_MAPPING,
      STOP_GTFS_ID_MAPPING,
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TripReferencesUnmappedRouteIdError);
    expect(trips).toEqual([]);
  });
});
