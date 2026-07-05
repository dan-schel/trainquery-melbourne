import type { StopTimesCsv } from "../csv/csv-schemas.js";
import type { GtfsStopTimeNormalisationError } from "./errors.js";

/**
 * Responsible for checking that in a list of stop times, the stop_sequence
 * values start from 1 and increment by 1 each time. Where stop_sequence values
 * are duplicated, this classes uses the earlier stop time for that stop. Any
 * deviation from the incrementing pattern is reported and then rectified as
 * best as possible.
 */
export class GtfsStopTimeNormaliser {
  constructor(
    private readonly _onError: (error: GtfsStopTimeNormalisationError) => void,
  ) {}

  normalise(stopTimes: StopTimesCsv): StopTimesCsv {
    // Note that stop times are already sorted by stop_sequence upon reaching
    // this class.

    // TODO: Implement as per comment above!

    return stopTimes;
  }
}
