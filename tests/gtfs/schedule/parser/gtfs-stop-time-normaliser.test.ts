import { describe, expect, it } from "vitest";
import {
  GtfsStopTimeNormaliser,
  InvalidStopSequenceError,
  MultipleStopSequencesError,
  type GtfsStopTimeNormalisationError,
} from "../../../../src/gtfs/schedule/parser/gtfs-stop-time-normaliser.js";
import type { StopTimesCsvRow } from "../../../../src/gtfs/schedule/csv/csv-schemas.js";

describe("GtfsStopTimeNormaliser", () => {
  it("returns already regular stop sequences unchanged", () => {
    const errors: GtfsStopTimeNormalisationError[] = [];
    const normaliser = new GtfsStopTimeNormaliser((e) => errors.push(e));

    const stopTimes = [1, 2, 3].map((stop_sequence) =>
      stopTime({ stop_sequence, stop_id: `stop-${stop_sequence}` }),
    );

    expect(normaliser.normalise(stopTimes)).toEqual(stopTimes);
    expect(errors).toEqual([]);
  });

  it("sorts regular stop times by stop sequence number", () => {
    const errors: GtfsStopTimeNormalisationError[] = [];
    const normaliser = new GtfsStopTimeNormaliser((error) =>
      errors.push(error),
    );

    const stopTimes = [
      stopTime({ stop_sequence: 2, stop_id: "b" }),
      stopTime({ stop_sequence: 1, stop_id: "a" }),
      stopTime({ stop_sequence: 3, stop_id: "c" }),
    ];

    expect(
      normaliser.normalise(stopTimes)?.map((stopTime) => stopTime.stop_id),
    ).toEqual(["a", "b", "c"]);
    expect(errors).toEqual([]);
  });

  it("returns null for non-regular stop sequences", () => {
    const errors: GtfsStopTimeNormalisationError[] = [];
    const normaliser = new GtfsStopTimeNormaliser((e) => errors.push(e));

    const stopTimes = [
      stopTime({ stop_sequence: 1, stop_id: "a" }),
      stopTime({ stop_sequence: 3, stop_id: "b" }),
    ];

    expect(normaliser.normalise(stopTimes)).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(InvalidStopSequenceError);
  });

  it("returns the first regular sequence when multiple regular sequences are present", () => {
    const errors: GtfsStopTimeNormalisationError[] = [];
    const normaliser = new GtfsStopTimeNormaliser((e) => errors.push(e));

    const stopTimes = [
      stopTime({ stop_sequence: 1, stop_id: "a1" }),
      stopTime({ stop_sequence: 2, stop_id: "a2" }),
      stopTime({ stop_sequence: 1, stop_id: "b1" }),
      stopTime({ stop_sequence: 2, stop_id: "b2" }),
    ];

    expect(normaliser.normalise(stopTimes)).toEqual([
      stopTimes[0],
      stopTimes[1],
    ]);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(MultipleStopSequencesError);
  });
});

function stopTime(overrides: Partial<StopTimesCsvRow> = {}): StopTimesCsvRow {
  return {
    trip_id: "trip-1",
    arrival_time: "00:00:00",
    departure_time: "00:00:00",
    stop_id: "stop",
    stop_sequence: 1,
    stop_headsign: "",
    pickup_type: 0,
    drop_off_type: 0,
    shape_dist_traveled: 0,
    ...overrides,
  };
}
