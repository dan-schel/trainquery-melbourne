import { describe, expect, it } from "vitest";
import { GtfsScheduleParser } from "../../../src/gtfs/parser/gtfs-schedule-parser.js";
import {
  calendarRow,
  lineMapping,
  routes,
  stopMapping,
  stopTime,
  tripRow,
} from "./factories.js";
import { GtfsStopTime } from "../../../src/gtfs/data/gtfs-stop-time.js";

describe("GtfsScheduleParser", () => {
  it("builds a schedule from parsed calendars and trips", () => {
    const parser = new GtfsScheduleParser(routes(), () => {});

    const schedule = parser.parse(
      {
        calendar: [calendarRow()],
        calendarDates: [],
        routes: [],
        stops: [],
        trips: [tripRow()],
        stopTimes: [
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
