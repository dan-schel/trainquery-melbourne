import { Route } from "../../../../src/gtfs/data/route/route.js";
import { LineRoutes } from "../../../../src/gtfs/data/route/line-routes.js";
import { RouteStop } from "../../../../src/gtfs/data/route/route-stop.js";
import { GtfsStopTime } from "../../../../src/gtfs/data/gtfs-stop-time.js";
import type {
  CalendarCsvRow,
  StopTimesCsvRow,
  TripsCsvRow,
} from "../../../../src/gtfs/retrieval/schedule/csv-schemas.js";

export function calendarRow(
  overrides: Partial<CalendarCsvRow> = {},
): CalendarCsvRow {
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

export function tripRow(overrides: Partial<TripsCsvRow> = {}): TripsCsvRow {
  return {
    route_id: "route-1",
    service_id: "svc",
    trip_id: "trip-1",
    ...overrides,
  };
}

export function stopTime(
  overrides: Partial<StopTimesCsvRow> = {},
): StopTimesCsvRow {
  return {
    trip_id: "trip-1",
    arrival_time: GtfsStopTime.parse("00:00:00"),
    departure_time: GtfsStopTime.parse("00:00:00"),
    stop_id: "A",
    stop_sequence: 1,
    pickup_type: 0,
    drop_off_type: 0,
    ...overrides,
  };
}

function routeStops(stopIds: readonly number[]) {
  return stopIds.map(
    (stopId) => new RouteStop({ stopId, collapseInStoppingPatterns: false }),
  );
}

export function routes() {
  return new LineRoutes(
    new Map([
      [
        1,
        [
          new Route({
            color: "blue",
            stops: routeStops([1, 2]),
            serviceTags: [7],
          }),
        ],
      ],
    ]),
  );
}
