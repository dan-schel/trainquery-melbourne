import { describe, expect, it } from "vitest";
import { StopGtfsIdCollection } from "../../../../src/gtfs/data/ids/stop-gtfs-id-collection.js";
import { StopGtfsIdMapping } from "../../../../src/gtfs/data/ids/stop-gtfs-id-mapping.js";
import {
  GtfsTripUpdateParser,
  MultipleStopTimeUpdateEntriesForSameStopIndexError,
  NecessaryFieldNotInStopTimeUpdateEntryError,
  NeitherArrivalNorDepartureGivenError,
  NeitherTimeNorDelayGivenError,
  NoStopTimeUpdateFieldGivenError,
  StopTimeUpdateEntryChangesStopError,
  StopTimeUpdateEntryReferencesUnmappedStopIdError,
  StopTimeUpdateEntryReferencesNonExistentStopSequenceError,
  TimeAndDelayDisagreeWithEachOtherError,
  UnsupportedStopTimeUpdateEntryScheduleRelationshipError,
  UnsupportedTripUpdateScheduleRelationshipError,
  type GtfsTripUpdateParsingError,
} from "../../../../src/gtfs/parser/realtime/gtfs-trip-update-parser.js";
import {
  scheduleWithTrip,
  serviceDay,
  stopMapping,
  stopTimeUpdate,
  tripDescriptor,
  tripUpdate,
} from "./factories.js";

describe("GtfsTripUpdateParser", () => {
  it("parses a scheduled trip update and applies realtime stop times", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsTripUpdateParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const day = serviceDay();
    const { schedule, trip } = scheduleWithTrip();

    const firstStop = trip.stops[0];
    if (firstStop?.type !== "serviced") throw new Error();

    const realtimeArrival = firstStop.arrivalTime
      .toInstant(day, "Australia/Melbourne")
      .add({ seconds: 120 });
    const realtimeDeparture = firstStop.departureTime
      .toInstant(day, "Australia/Melbourne")
      .add({ seconds: 120 });

    const parsed = parser.parse(
      tripUpdate({
        trip: tripDescriptor({ tripId: trip.gtfsTripId, startDate: day }),
        stopTimeUpdate: [
          stopTimeUpdate({
            stopSequence: firstStop.gtfsStopSequence,
            stopId: "A",
            arrival: { time: realtimeArrival.epochMilliseconds / 1000 },
            departure: { delay: 120 },
          }),
        ],
      }),
      schedule,
      stopMapping(["A", "B"]),
    );

    expect(errors).toEqual([]);
    if (parsed == null) throw new Error("Expected updated trip.");
    expect(parsed.isCancelled).toBe(false);

    const updatedFirstStop = parsed.stops[0];
    if (updatedFirstStop?.type !== "serviced")
      throw new Error("Expected serviced stop.");

    expect(updatedFirstStop.realtimeArrivalTime?.equals(realtimeArrival)).toBe(
      true,
    );
    expect(
      updatedFirstStop.realtimeDepartureTime?.equals(realtimeDeparture),
    ).toBe(true);
  });

  it("parses cancelled trip updates", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsTripUpdateParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const { schedule, trip } = scheduleWithTrip();

    const parsed = parser.parse(
      tripUpdate({
        trip: tripDescriptor({
          tripId: trip.gtfsTripId,
          scheduleRelationship: "CANCELED",
        }),
      }),
      schedule,
      stopMapping(["A", "B"]),
    );

    expect(errors).toEqual([]);
    expect(parsed).not.toBeNull();
    expect(parsed?.isCancelled).toBe(true);
  });

  it("reports unsupported trip schedule relationships", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsTripUpdateParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const { schedule, trip } = scheduleWithTrip();

    const parsed = parser.parse(
      tripUpdate({
        trip: tripDescriptor({
          tripId: trip.gtfsTripId,
          scheduleRelationship: "ADDED",
        }),
      }),
      schedule,
      stopMapping(["A", "B"]),
    );

    expect(parsed).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      UnsupportedTripUpdateScheduleRelationshipError,
    );
  });

  it("reports scheduled updates without stopTimeUpdate fields", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsTripUpdateParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const { schedule, trip } = scheduleWithTrip();

    const parsed = parser.parse(
      tripUpdate({
        trip: tripDescriptor({ tripId: trip.gtfsTripId }),
        stopTimeUpdate: undefined,
      }),
      schedule,
      stopMapping(["A", "B"]),
    );

    expect(parsed).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(NoStopTimeUpdateFieldGivenError);
  });

  it("reports unsupported stop time entry schedule relationships", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsTripUpdateParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const { schedule, trip } = scheduleWithTrip();

    const parsed = parser.parse(
      tripUpdate({
        trip: tripDescriptor({ tripId: trip.gtfsTripId }),
        stopTimeUpdate: [stopTimeUpdate({ scheduleRelationship: "SKIPPED" })],
      }),
      schedule,
      stopMapping(["A", "B"]),
    );

    expect(parsed).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      UnsupportedStopTimeUpdateEntryScheduleRelationshipError,
    );
  });

  it("reports missing necessary fields in stop time update entries", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsTripUpdateParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const { schedule, trip } = scheduleWithTrip();

    const parsed = parser.parse(
      tripUpdate({
        trip: tripDescriptor({ tripId: trip.gtfsTripId }),
        stopTimeUpdate: [stopTimeUpdate({ stopSequence: undefined })],
      }),
      schedule,
      stopMapping(["A", "B"]),
    );

    expect(parsed).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      NecessaryFieldNotInStopTimeUpdateEntryError,
    );
  });

  it("reports stop sequences that do not exist in the matched trip", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsTripUpdateParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const { schedule, trip } = scheduleWithTrip();

    const parsed = parser.parse(
      tripUpdate({
        trip: tripDescriptor({ tripId: trip.gtfsTripId }),
        stopTimeUpdate: [stopTimeUpdate({ stopSequence: 999 })],
      }),
      schedule,
      stopMapping(["A", "B"]),
    );

    expect(parsed).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      StopTimeUpdateEntryReferencesNonExistentStopSequenceError,
    );
  });

  it("reports duplicate stop updates for the same stop sequence", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsTripUpdateParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const { schedule, trip } = scheduleWithTrip();

    const parsed = parser.parse(
      tripUpdate({
        trip: tripDescriptor({ tripId: trip.gtfsTripId }),
        stopTimeUpdate: [
          stopTimeUpdate({ stopSequence: 1, stopId: "A" }),
          stopTimeUpdate({ stopSequence: 1, stopId: "A" }),
        ],
      }),
      schedule,
      stopMapping(["A", "B"]),
    );

    expect(parsed).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      MultipleStopTimeUpdateEntriesForSameStopIndexError,
    );
  });

  it("reports unmapped stop IDs in stop time updates", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsTripUpdateParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const { schedule, trip } = scheduleWithTrip();

    const parsed = parser.parse(
      tripUpdate({
        trip: tripDescriptor({ tripId: trip.gtfsTripId }),
        stopTimeUpdate: [
          stopTimeUpdate({ stopSequence: 1, stopId: "missing-stop" }),
        ],
      }),
      schedule,
      stopMapping(["A", "B"]),
    );

    expect(parsed).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      StopTimeUpdateEntryReferencesUnmappedStopIdError,
    );
  });

  it("reports stop updates that change the station", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsTripUpdateParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const { schedule, trip } = scheduleWithTrip();

    const parsed = parser.parse(
      tripUpdate({
        trip: tripDescriptor({ tripId: trip.gtfsTripId }),
        stopTimeUpdate: [stopTimeUpdate({ stopSequence: 1, stopId: "B" })],
      }),
      schedule,
      stopMapping(["A", "B"]),
    );

    expect(parsed).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(StopTimeUpdateEntryChangesStopError);
  });

  it("reports updated time objects with neither time nor delay", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsTripUpdateParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const { schedule, trip } = scheduleWithTrip();

    const parsed = parser.parse(
      tripUpdate({
        trip: tripDescriptor({ tripId: trip.gtfsTripId }),
        stopTimeUpdate: [
          stopTimeUpdate({
            stopSequence: 1,
            stopId: "A",
            arrival: {},
            departure: { delay: 0 },
          }),
        ],
      }),
      schedule,
      stopMapping(["A", "B"]),
    );

    expect(parsed).not.toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(NeitherTimeNorDelayGivenError);
  });

  it("reports when time and delay disagree for the same update", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsTripUpdateParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const day = serviceDay();
    const { schedule, trip } = scheduleWithTrip();

    const firstStop = trip.stops[0];
    if (firstStop?.type !== "serviced")
      throw new Error("Expected serviced stop.");

    const scheduledArrivalEpoch =
      firstStop.arrivalTime.toInstant(day, "Australia/Melbourne")
        .epochMilliseconds / 1000;

    const parsed = parser.parse(
      tripUpdate({
        trip: tripDescriptor({ tripId: trip.gtfsTripId, startDate: day }),
        stopTimeUpdate: [
          stopTimeUpdate({
            stopSequence: 1,
            stopId: "A",
            arrival: {
              time: scheduledArrivalEpoch + 60,
              delay: 120,
            },
            departure: { delay: 120 },
          }),
        ],
      }),
      schedule,
      stopMapping(["A", "B"]),
    );

    expect(parsed).not.toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TimeAndDelayDisagreeWithEachOtherError);
  });

  it("reports entries where both arrival and departure updates are missing", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsTripUpdateParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const { schedule, trip } = scheduleWithTrip();

    const parsed = parser.parse(
      tripUpdate({
        trip: tripDescriptor({ tripId: trip.gtfsTripId }),
        stopTimeUpdate: [
          stopTimeUpdate({
            stopSequence: 1,
            stopId: "A",
            arrival: undefined,
            departure: undefined,
          }),
        ],
      }),
      schedule,
      stopMapping(["A", "B"]),
    );

    expect(parsed).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(NeitherArrivalNorDepartureGivenError);
  });

  it("allows platform changes when they still map to the same stop", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsTripUpdateParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const { schedule, trip } = scheduleWithTrip();

    const mapping = new StopGtfsIdMapping(
      new Map([
        [
          1,
          new StopGtfsIdCollection(
            1,
            "A-parent",
            [],
            new Map([
              [1, ["A"]],
              [2, ["A-2"]],
            ]),
            [],
          ),
        ],
        [
          2,
          new StopGtfsIdCollection(
            2,
            "B-parent",
            [],
            new Map([[1, ["B"]]]),
            [],
          ),
        ],
      ]),
    );

    const parsed = parser.parse(
      tripUpdate({
        trip: tripDescriptor({ tripId: trip.gtfsTripId }),
        stopTimeUpdate: [
          stopTimeUpdate({
            stopSequence: 1,
            stopId: "A-2",
            arrival: { delay: 0 },
            departure: { delay: 0 },
          }),
        ],
      }),
      schedule,
      mapping,
    );

    expect(errors).toEqual([]);
    expect(parsed).not.toBeNull();

    const updatedFirstStop = parsed?.stops[0];
    if (updatedFirstStop?.type !== "serviced")
      throw new Error("Expected serviced stop.");

    expect(updatedFirstStop.stopId).toBe(1);
    expect(updatedFirstStop.originalPositionId).toBe(1);
    expect(updatedFirstStop.updatedPositionId).toBe(2);
  });
});
