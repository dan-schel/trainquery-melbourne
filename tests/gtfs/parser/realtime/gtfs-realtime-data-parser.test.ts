import { describe, expect, it } from "vitest";
import { GtfsRealtimeDataParser } from "../../../../src/gtfs/parser/realtime/gtfs-realtime-data-parser.js";
import {
  UnsupportedTripUpdateScheduleRelationshipError,
  type GtfsTripUpdateParsingError,
} from "../../../../src/gtfs/parser/realtime/gtfs-trip-update-parser.js";
import {
  GtfsScheduledTripOriginatingMovement,
  GtfsScheduledTripTerminatingMovement,
} from "../../../../src/gtfs/data/gtfs-scheduled-trip-movements.js";
import { GtfsStopTime } from "../../../../src/gtfs/data/gtfs-stop-time.js";
import { GtfsScheduledTrip } from "../../../../src/gtfs/data/gtfs-scheduled-trip.js";
import { GtfsCalendar } from "../../../../src/gtfs/data/gtfs-calendar.js";
import { GtfsSchedule } from "../../../../src/gtfs/data/gtfs-schedule.js";
import { itsOk } from "@dan-schel/js-utils";
import { StopGtfsIdCollection } from "../../../../src/gtfs/data/ids/stop-gtfs-id-collection.js";
import { StopGtfsIdMapping } from "../../../../src/gtfs/data/ids/stop-gtfs-id-mapping.js";

const TIMEZONE = "Australia/Melbourne";

const TRIP_ORIGIN = new GtfsScheduledTripOriginatingMovement({
  stopId: 1,
  positionId: null,
  departureTime: GtfsStopTime.parse("00:01:00"),
  gtfsIdMetadata: {
    type: "parent",
    id: "1",
    stopId: 1,
  },
  gtfsStopSequence: 1,
});

const TRIP_TERMINUS = new GtfsScheduledTripTerminatingMovement({
  stopId: 2,
  positionId: null,
  arrivalTime: GtfsStopTime.parse("00:02:00"),
  gtfsIdMetadata: {
    type: "parent",
    id: "2",
    stopId: 2,
  },
  gtfsStopSequence: 2,
});

const TRIP = new GtfsScheduledTrip({
  gtfsTripId: "trip-1",
  gtfsRouteId: "route-1",
  calendar: GtfsCalendar.everyday("cal"),
  movements: [TRIP_ORIGIN, TRIP_TERMINUS],
  lineIds: [1],
  color: "red",
  serviceTags: [],
  previousTrip: null,
  nextTrip: null,
});

const SCHEDULE = new GtfsSchedule([TRIP]);

const TRIP_DESCRIPTOR = {
  tripId: TRIP.gtfsTripId,
  routeId: TRIP.gtfsRouteId,
  startTime: TRIP_ORIGIN.departureTime,
  startDate: Temporal.PlainDate.from("2026-07-14"),
  scheduleRelationship: "SCHEDULED",
};

const STOP_MAPPING = new StopGtfsIdMapping(
  new Map([
    [1, StopGtfsIdCollection.withParentOnly(1, "1")],
    [2, StopGtfsIdCollection.withParentOnly(2, "2")],
  ]),
);

describe("GtfsRealtimeDataParser", () => {
  it("parses realtime feed into updated trips and drops invalid updates", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsRealtimeDataParser(TIMEZONE, (e) => errors.push(e));

    const realtimeFeed = {
      tripUpdates: [
        // Valid update.
        {
          trip: TRIP_DESCRIPTOR,
          stopTimeUpdate: [
            {
              stopSequence: TRIP.origination.gtfsStopSequence,
              stopId: "1",
              arrival: { delay: 120 },
              departure: { delay: 120 },
              scheduleRelationship: "SCHEDULED",
            },
          ],
        },

        // Invalid update.
        {
          trip: {
            scheduleRelationship: "ADDED",
          },
        },
      ],
    };

    const parsed = parser.parse(realtimeFeed, SCHEDULE, STOP_MAPPING);

    expect(parsed.updatedTrips).toHaveLength(1);
    const updatedTrip = itsOk(parsed.updatedTrips[0]);

    expect(updatedTrip.scheduledTrip.gtfsTripId).toBe(TRIP.gtfsTripId);
    const parsedDepartureTime = updatedTrip.origination.realtimeDepartureTime;
    const expectedDepartureTime = TRIP.origination.departureTime
      .toInstant(TRIP_DESCRIPTOR.startDate, TIMEZONE)
      .add({ seconds: 120 });
    expect(parsedDepartureTime?.equals(expectedDepartureTime)).toBe(true);

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      UnsupportedTripUpdateScheduleRelationshipError,
    );
  });
});
