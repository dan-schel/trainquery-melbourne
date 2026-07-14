import { PlainDateRange } from "../../../src/gtfs/departures/plain-date-range.js";
import { GtfsCalendar } from "../../../src/gtfs/data/gtfs-calendar.js";
import { GtfsStopTime } from "../../../src/gtfs/data/gtfs-stop-time.js";
import { GtfsTrip } from "../../../src/gtfs/data/gtfs-trip.js";
import { LineGtfsIdCollection } from "../../../src/gtfs/data/ids/line-gtfs-id-collection.js";
import { LineGtfsIdMapping } from "../../../src/gtfs/data/ids/line-gtfs-id-mapping.js";
import { StopGtfsIdCollection } from "../../../src/gtfs/data/ids/stop-gtfs-id-collection.js";
import { StopGtfsIdMapping } from "../../../src/gtfs/data/ids/stop-gtfs-id-mapping.js";

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
    stops: [servicedStop(originId, 1, 1), servicedStop(terminusId, 2, 2)],
    lineId: 1,
    color: "red",
    serviceTags: [],
    previousTrip: null,
    nextTrip: null,
  });
}

function servicedStop(
  gtfsStopId: string,
  positionId: number,
  gtfsStopSequence: number,
) {
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
      id: gtfsStopId,
      stopId: positionId,
      positionId,
    },
    gtfsStopSequence: gtfsStopSequence,
  };
}
