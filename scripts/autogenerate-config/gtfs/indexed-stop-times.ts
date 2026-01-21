import type { StopTimesCsv, StopTimesCsvRow } from "./csv-schemas.js";

export class IndexedStopTimes {
  constructor(private _stopTimesByTripId: Map<string, StopTimesCsv>) {}

  forTrip(tripId: string): StopTimesCsv {
    const stopTimes = this._stopTimesByTripId.get(tripId);
    if (stopTimes == null) throw new Error(`Nothing found for trip: ${tripId}`);
    return stopTimes;
  }

  static build(stopTimes: StopTimesCsv): IndexedStopTimes {
    const result = new Map<string, StopTimesCsvRow[]>();

    for (const stopTime of stopTimes) {
      const existing = result.get(stopTime.trip_id) ?? [];
      existing.push(stopTime);
      result.set(stopTime.trip_id, existing);
    }

    for (const [tripId, stopTimesForTrip] of result) {
      stopTimesForTrip.sort((a, b) => a.stop_sequence - b.stop_sequence);
      result.set(tripId, stopTimesForTrip);
    }

    return new IndexedStopTimes(result);
  }
}
