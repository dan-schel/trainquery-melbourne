import type { StopTimesCsv } from "../retrieval/schedule/csv-schemas.js";

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

  normalise(stopTimes: StopTimesCsv): StopTimesCsv | null {
    const sortedStopTimes = [...stopTimes].sort(
      (a, b) => a.stop_sequence - b.stop_sequence,
    );

    if (this._isRegular(sortedStopTimes)) return sortedStopTimes;

    // Sometimes we've seen trips in the regional feed where the rows are
    // duplicated (sometimes with different arrival/departure times). In these
    // cases, it seems like Google Maps just uses whichever sequence comes
    // first, so that's what this code is doing.
    //
    // In an ideal future world, if we detect that both trips contain the same
    // stops, we should use the earliest departure times for each stop to be
    // pessimistic (and still show the other sequence of stopping times as a
    // disruption about having ambiguous stopping times).
    if (this._isMultipleRegularSequences(stopTimes)) {
      this._onError(new MultipleStopSequencesError(stopTimes));

      return this._extractFirstRegularSequence(stopTimes);
    }

    // Are there any other cases we can handle gracefully? I expect we might see
    // some other cases pop up in the future, but this is all I know for now!
    //
    // ⚠️ IMPORTANT: This class is meant to output the stop times in the order
    // they should be interpreted as for TrainQuery. It should NOT modify the
    // stop_sequence values themselves (i.e. if there's gaps, leave them in)
    // because we may need to use those when matching updates in the GTFS-RT
    // feed to certain stops on the trip.
    this._onError(new InvalidStopSequenceError(stopTimes));
    return null;
  }

  /**
   * Returns true if the stop times make a perfect sequence starting from 1, and
   * is at least of length 2.
   */
  private _isRegular(stopTimes: StopTimesCsv): boolean {
    // TODO: Check every stop time arrival/departure time occurs in sequence.

    // stopTimes is guaranteed to be sorted by stop_sequence by this stage in
    // the parsing process.
    return (
      stopTimes.length >= 2 &&
      stopTimes.every((x, i) => x.stop_sequence === i + 1)
    );
  }

  /**
   * Returns true if the stop times (unsorted, so in the order given in
   * stop_times.csv) form one or more regular sequences restarting at 1 each
   * time. The only caveat is that all sequences must be at least of length 2.
   *
   * Valid:
   * - `1, 2, 3, 4, 1, 2, 3`
   *
   * Invalid:
   * - `1, 2, 3, 2, 3, 4`
   * - `1, 2, 4, 5, 6, 1, 2`
   * - `1, 2, 3, 1, 1, 2, 3`
   * - `1`
   * - `1, 1, 1`
   */
  private _isMultipleRegularSequences(stopTimes: StopTimesCsv): boolean {
    let expectedStopSequence = 1;
    for (const stopTime of stopTimes) {
      if (stopTime.stop_sequence === expectedStopSequence) {
        expectedStopSequence++;
      } else if (stopTime.stop_sequence === 1 || expectedStopSequence > 2) {
        expectedStopSequence = 2;
      } else {
        return false;
      }
    }
    return expectedStopSequence > 2;
  }

  private _extractFirstRegularSequence(stopTimes: StopTimesCsv): StopTimesCsv {
    return stopTimes.filter((x, i) => x.stop_sequence === i + 1);
  }
}

export type GtfsStopTimeNormalisationError =
  | InvalidStopSequenceError
  | MultipleStopSequencesError;

export class InvalidStopSequenceError extends Error {
  readonly type = "stop-sequence-duplicated";
  constructor(readonly stopTimes: StopTimesCsv) {
    super();
  }
  // The trip_id is accessible, e.g.:
  // get tripId() {
  //   return this.stopTimes[0]?.trip_id ?? null;
  // }
}

export class MultipleStopSequencesError extends Error {
  readonly type = "multiple-stop-sequences";
  constructor(readonly stopTimes: StopTimesCsv) {
    super();
  }
}
