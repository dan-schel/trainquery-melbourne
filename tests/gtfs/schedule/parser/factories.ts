import { PlainDateRange } from "../../../../src/gtfs/departures/plain-date-range.js";
import { LineGtfsIdCollection } from "../../../../src/gtfs/ids/line-gtfs-id-collection.js";
import { LineGtfsIdMapping } from "../../../../src/gtfs/ids/line-gtfs-id-mapping.js";
import { StopGtfsIdCollection } from "../../../../src/gtfs/ids/stop-gtfs-id-collection.js";
import { StopGtfsIdMapping } from "../../../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import { Route } from "../../../../src/gtfs/route/route.js";
import { LineRoutes } from "../../../../src/gtfs/route/line-routes.js";
import { RouteStop } from "../../../../src/gtfs/route/route-stop.js";
import { GtfsCalendar } from "../../../../src/gtfs/schedule/data/gtfs-calendar.js";
import { GtfsStopTime } from "../../../../src/gtfs/schedule/data/gtfs-stop-time.js";
import { GtfsTrip } from "../../../../src/gtfs/schedule/data/gtfs-trip.js";
import type {
  CalendarCsvRow,
  StopTimesCsvRow,
  TransfersCsvRow,
  TripsCsvRow,
} from "../../../../src/gtfs/schedule/csv/csv-schemas.js";

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
    shape_id: "shape-1",
    trip_headsign: "",
    direction_id: "0",
    block_id: "",
    wheelchair_accessible: 0,
    bikes_allowed: 0,
    ...overrides,
  };
}

export function stopTime(
  overrides: Partial<StopTimesCsvRow> = {},
): StopTimesCsvRow {
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

export function routeStops(stopIds: readonly number[]) {
  return stopIds.map(
    (stopId) => new RouteStop({ stopId, collapseInStoppingPatterns: false }),
  );
}

export function routes(
  options: {
    lineId?: number;
    color?: "red" | "blue";
    stopIds?: readonly number[];
    serviceTags?: readonly number[];
  } = {},
) {
  const {
    lineId = 1,
    color = "blue",
    stopIds = [1, 2],
    serviceTags = [7],
  } = options;

  return new LineRoutes(
    new Map([
      [
        lineId,
        [
          new Route({
            color,
            stops: routeStops(stopIds),
            serviceTags: [...serviceTags],
          }),
        ],
      ],
    ]),
  );
}

export function lineMapping(
  options: { lineId?: number; routeId?: string } = {},
) {
  const { lineId = 1, routeId = "route-1" } = options;
  return new LineGtfsIdMapping(
    new Map([[lineId, new LineGtfsIdCollection(lineId, routeId, [], [])]]),
  );
}

export function stopMapping(gtfsStopIds: readonly string[] = ["A", "B"]) {
  const mapping = new Map<number, StopGtfsIdCollection>();

  gtfsStopIds.forEach((gtfsId, index) => {
    const stopId = index + 1;
    mapping.set(
      stopId,
      new StopGtfsIdCollection(stopId, gtfsId, [], new Map(), []),
    );
  });

  return new StopGtfsIdMapping(mapping);
}

export function calendar() {
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

export function makeTrip(id: string, originId: string, terminusId: string) {
  return new GtfsTrip({
    gtfsTripId: id,
    gtfsRouteId: "route-1",
    calendar: calendar(),
    stops: [servicedStop(originId, 1), servicedStop(terminusId, 2)],
    lineId: 1,
    color: "red",
    serviceTags: [],
    previousTrip: null,
    nextTrip: null,
  });
}

export function servicedStop(stopGtfsId: string, positionId: number) {
  return {
    type: "serviced" as const,
    stopId: positionId,
    positionId,
    arrivalTime: GtfsStopTime.fromSecondsSinceMidnight(0),
    departureTime: GtfsStopTime.fromSecondsSinceMidnight(60),
    picksUp: true,
    dropsOff: true,
    gtfsIdMetadata: {
      type: "platform" as const,
      id: stopGtfsId,
      stopId: positionId,
      positionId,
    },
  };
}

export function transfer(
  overrides: Partial<TransfersCsvRow> = {},
): TransfersCsvRow {
  return {
    from_stop_id: "B",
    to_stop_id: "B",
    from_route_id: "route-1",
    to_route_id: "route-1",
    from_trip_id: "from",
    to_trip_id: "to",
    transfer_type: 4,
    min_transfer_time: "0",
    ...overrides,
  };
}
