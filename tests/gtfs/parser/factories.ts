import { PlainDateRange } from "../../../src/gtfs/data/plain-date-range.js";
import { GtfsCalendar } from "../../../src/gtfs/data/gtfs-calendar.js";
import { GtfsStopTime } from "../../../src/gtfs/data/gtfs-stop-time.js";
import { GtfsScheduledTrip } from "../../../src/gtfs/data/gtfs-scheduled-trip.js";
import { LineGtfsIdCollection } from "../../../src/gtfs/data/ids/line-gtfs-id-collection.js";
import { LineGtfsIdMapping } from "../../../src/gtfs/data/ids/line-gtfs-id-mapping.js";
import { StopGtfsIdCollection } from "../../../src/gtfs/data/ids/stop-gtfs-id-collection.js";
import { StopGtfsIdMapping } from "../../../src/gtfs/data/ids/stop-gtfs-id-mapping.js";
import {
  GtfsScheduledTripOriginatingMovement,
  GtfsScheduledTripTerminatingMovement,
} from "../../../src/gtfs/data/gtfs-scheduled-trip-movements.js";

// TODO: All the tests using these factories are really hard to change because
// of all the shared stuff. Need a better solution.

export const CALENDAR_EVERYDAY = new GtfsCalendar(
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

export function makeTrip(id: string, originId: string, terminusId: string) {
  return new GtfsScheduledTrip({
    gtfsTripId: id,
    gtfsRouteId: "route-1",
    calendar: CALENDAR_EVERYDAY,
    movements: [
      originatingMovement(originId, 1, 1),
      terminatingMovement(terminusId, 2, 2),
    ],
    lineId: 1,
    color: "red",
    serviceTags: [],
    previousTrip: null,
    nextTrip: null,
  });
}

function originatingMovement(
  gtfsStopId: string,
  positionId: number,
  gtfsStopSequence: number,
): GtfsScheduledTripOriginatingMovement {
  return new GtfsScheduledTripOriginatingMovement({
    stopId: positionId,
    positionId,
    departureTime: GtfsStopTime.fromSecondsSinceMidnight(60),
    gtfsIdMetadata: {
      type: "platform" as const,
      id: gtfsStopId,
      stopId: positionId,
      positionId,
    },
    gtfsStopSequence: gtfsStopSequence,
  });
}

function terminatingMovement(
  gtfsStopId: string,
  positionId: number,
  gtfsStopSequence: number,
): GtfsScheduledTripTerminatingMovement {
  return new GtfsScheduledTripTerminatingMovement({
    stopId: positionId,
    positionId,
    arrivalTime: GtfsStopTime.fromSecondsSinceMidnight(0),
    gtfsIdMetadata: {
      type: "platform" as const,
      id: gtfsStopId,
      stopId: positionId,
      positionId,
    },
    gtfsStopSequence: gtfsStopSequence,
  });
}
