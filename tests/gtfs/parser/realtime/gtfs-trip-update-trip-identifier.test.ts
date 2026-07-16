import { describe, expect, it } from "vitest";
import {
  GtfsTripUpdateTripIdentifier,
  NecessaryFieldNotInTripDescriptorError,
  TripDescriptorStartTimeDoesNotMatchTripOriginStopTimeError,
  TripDescriptorReferencesNonExistentTripIdError,
  TripDoesNotOccurOnStartDateError,
  type GtfsTripUpdateTripIdentificationError,
} from "../../../../src/gtfs/parser/realtime/gtfs-trip-update-trip-identifier.js";
import { GtfsCalendar } from "../../../../src/gtfs/data/gtfs-calendar.js";
import { GtfsSchedule } from "../../../../src/gtfs/data/gtfs-schedule.js";
import { GtfsStopTime } from "../../../../src/gtfs/data/gtfs-stop-time.js";
import { PlainDateRange } from "../../../../src/gtfs/data/plain-date-range.js";
import { tripDescriptor, scheduleWithTrip } from "./factories.js";

describe("GtfsTripUpdateTripIdentifier", () => {
  it("identifies a trip and service day from trip descriptor fields", () => {
    const errors: GtfsTripUpdateTripIdentificationError[] = [];
    const identifier = new GtfsTripUpdateTripIdentifier((e) => errors.push(e));
    const { schedule, trip } = scheduleWithTrip();

    const result = identifier.identify(
      tripDescriptor({
        tripId: trip.gtfsTripId,
      }),
      schedule,
    );

    expect(errors).toEqual([]);
    expect(result).not.toBeNull();

    if (result == null) throw new Error("Expected matching trip.");
    const expectedServiceDay = tripDescriptor().startDate;
    if (expectedServiceDay == null) throw new Error("Expected startDate.");

    expect(result.trip.gtfsTripId).toBe(trip.gtfsTripId);
    expect(result.serviceDay.equals(expectedServiceDay)).toBe(true);
  });

  it("reports missing tripId fields", () => {
    const errors: GtfsTripUpdateTripIdentificationError[] = [];
    const identifier = new GtfsTripUpdateTripIdentifier((e) => errors.push(e));
    const { schedule } = scheduleWithTrip();

    const result = identifier.identify(
      tripDescriptor({ tripId: undefined }),
      schedule,
    );

    expect(result).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(NecessaryFieldNotInTripDescriptorError);
  });

  it("reports trip IDs that do not exist in the schedule", () => {
    const errors: GtfsTripUpdateTripIdentificationError[] = [];
    const identifier = new GtfsTripUpdateTripIdentifier((e) => errors.push(e));
    const { schedule } = scheduleWithTrip();

    const result = identifier.identify(
      tripDescriptor({ tripId: "missing-trip" }),
      schedule,
    );

    expect(result).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      TripDescriptorReferencesNonExistentTripIdError,
    );
  });

  it("reports start dates where the trip does not occur", () => {
    const errors: GtfsTripUpdateTripIdentificationError[] = [];
    const identifier = new GtfsTripUpdateTripIdentifier((e) => errors.push(e));
    const { trip } = scheduleWithTrip();

    const neverOccurs = Temporal.PlainDate.from({
      year: 2026,
      month: 7,
      day: 14,
    });
    const tripOutsideDate = trip.with({
      calendar: new GtfsCalendar(
        "svc",
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        new PlainDateRange(
          Temporal.PlainDate.from({ year: 2026, month: 7, day: 15 }),
          Temporal.PlainDate.from({ year: 2026, month: 7, day: 15 }),
        ),
        [],
        [],
      ),
    });
    const schedule = new GtfsSchedule([tripOutsideDate]);

    const result = identifier.identify(
      tripDescriptor({
        tripId: trip.gtfsTripId,
        startDate: neverOccurs,
      }),
      schedule,
    );

    expect(result).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TripDoesNotOccurOnStartDateError);
  });

  it("identifies overnight trips where startTime is over 24:00:00", () => {
    const errors: GtfsTripUpdateTripIdentificationError[] = [];
    const identifier = new GtfsTripUpdateTripIdentifier((e) => errors.push(e));
    const { trip } = scheduleWithTrip();

    const originStop = trip.stops[0];
    const terminusStop = trip.stops[1];
    if (originStop?.type !== "serviced")
      throw new Error("Expected origin stop.");
    if (terminusStop?.type !== "serviced")
      throw new Error("Expected terminus stop.");

    const overnightTrip = trip.with({
      stops: [
        {
          ...originStop,
          arrivalTime: GtfsStopTime.parse("25:05:00"),
          departureTime: GtfsStopTime.parse("25:05:00"),
        },
        {
          ...terminusStop,
          arrivalTime: GtfsStopTime.parse("25:15:00"),
          departureTime: GtfsStopTime.parse("25:16:00"),
        },
      ],
    });
    const schedule = new GtfsSchedule([overnightTrip]);

    const startDate = Temporal.PlainDate.from({
      year: 2026,
      month: 7,
      day: 13,
    });

    const result = identifier.identify(
      tripDescriptor({
        tripId: overnightTrip.gtfsTripId,
        startDate,
        startTime: GtfsStopTime.parse("25:05:00"),
      }),
      schedule,
    );

    expect(errors).toEqual([]);
    expect(result).not.toBeNull();

    if (result == null) throw new Error("Expected matching trip.");
    expect(result.trip.gtfsTripId).toBe(overnightTrip.gtfsTripId);
    expect(result.serviceDay.equals(startDate)).toBe(true);
  });

  it("reports mismatching startTime values but still identifies the trip", () => {
    const errors: GtfsTripUpdateTripIdentificationError[] = [];
    const identifier = new GtfsTripUpdateTripIdentifier((e) => errors.push(e));
    const { schedule, trip } = scheduleWithTrip();

    const result = identifier.identify(
      tripDescriptor({
        tripId: trip.gtfsTripId,
        startTime: GtfsStopTime.parse("00:00:00"),
      }),
      schedule,
    );

    expect(result).not.toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      TripDescriptorStartTimeDoesNotMatchTripOriginStopTimeError,
    );
  });
});
