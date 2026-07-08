import { describe, expect, it } from "vitest";
import { GtfsScheduleParser } from "../../../../src/gtfs/schedule/parser/gtfs-schedule-parser.js";
import { LineRoutes } from "../../../../src/gtfs/route/line-routes.js";
import { Route } from "../../../../src/gtfs/route/route.js";
import { LineGtfsIdCollection } from "../../../../src/gtfs/ids/line-gtfs-id-collection.js";
import { LineGtfsIdMapping } from "../../../../src/gtfs/ids/line-gtfs-id-mapping.js";
import { StopGtfsIdCollection } from "../../../../src/gtfs/ids/stop-gtfs-id-collection.js";
import { StopGtfsIdMapping } from "../../../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import type { CalendarCsvRow } from "../../../../src/gtfs/schedule/csv/csv-schemas.js";
import { RouteStop } from "../../../../src/gtfs/route/route-stop.js";

describe("GtfsScheduleParser", () => {
  it("builds a schedule from parsed calendars and trips", () => {
    const parser = new GtfsScheduleParser(routes(), () => {});

    const schedule = parser.parse(
      {
        calendar: [calendarRow()],
        calendarDates: [],
        routes: [],
        stops: [],
        trips: [
          {
            route_id: "route-1",
            service_id: "svc",
            trip_id: "trip-1",
            shape_id: "shape-1",
            trip_headsign: "",
            direction_id: "0",
            block_id: "",
            wheelchair_accessible: 0,
            bikes_allowed: 0,
          },
        ],
        stopTimes: [
          {
            trip_id: "trip-1",
            arrival_time: "00:00:00",
            departure_time: "00:00:00",
            stop_id: "A",
            stop_sequence: 1,
            stop_headsign: "",
            pickup_type: 0,
            drop_off_type: 0,
            shape_dist_traveled: 0,
          },
          {
            trip_id: "trip-1",
            arrival_time: "00:10:00",
            departure_time: "00:10:00",
            stop_id: "B",
            stop_sequence: 2,
            stop_headsign: "",
            pickup_type: 0,
            drop_off_type: 0,
            shape_dist_traveled: 0,
          },
        ],
        transfers: [],
      },
      lineMapping(),
      stopMapping(),
    );

    expect(schedule.trips).toHaveLength(1);

    const trip = schedule.trips[0];
    if (trip == null) throw new Error("Expected one trip.");

    expect(trip.gtfsTripId).toBe("trip-1");
    expect(trip.color).toBe("blue");
    expect(trip.serviceTags).toEqual([7]);
    expect(trip.stops.map((stop) => stop.stopId)).toEqual([1, 2]);
    expect(trip.calendar.gtfsCalendarId).toBe("svc");
    expect(trip.calendar.monday).toBe(true);
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

function calendarRow(overrides: Partial<CalendarCsvRow> = {}): CalendarCsvRow {
  return {
    service_id: "svc",
    monday: true,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    start_date: Temporal.PlainDate.from({ year: 2026, month: 6, day: 15 }),
    end_date: Temporal.PlainDate.from({ year: 2026, month: 6, day: 21 }),
    ...overrides,
  };
}
