import { Route } from "../../../../src/gtfs/data/route/route.js";
import { LineRoutes } from "../../../../src/gtfs/data/route/line-routes.js";
import { RouteStop } from "../../../../src/gtfs/data/route/route-stop.js";
import { GtfsStopTime } from "../../../../src/gtfs/data/gtfs-stop-time.js";
import type {
  CalendarCsvRow,
  StopTimesCsvRow,
  TransfersCsvRow,
  TripsCsvRow,
} from "../../../../src/gtfs/retrieval/schedule/csv-schemas.js";
import { LineOverrides } from "../../../../src/gtfs/data/route/line-overrides.js";

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

export function routeStops(stopIds: readonly number[]) {
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

export function overrides() {
  return new LineOverrides(new Map());
}

export function transfer(
  overrides: Partial<TransfersCsvRow> = {},
): TransfersCsvRow {
  return {
    from_stop_id: "B",
    to_stop_id: "B",
    from_trip_id: "from",
    to_trip_id: "to",
    transfer_type: 4,
    min_transfer_time: "0",
    ...overrides,
  };
}
