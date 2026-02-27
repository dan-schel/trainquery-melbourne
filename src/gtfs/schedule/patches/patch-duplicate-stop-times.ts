import type { GtfsData } from "../read-gtfs.js";

export function patchDuplicateStopTimes(gtfsData: GtfsData): GtfsData {
  // I've noticed the regional feed containing duplicate stop times entries,
  // i.e. the exact same row is present twice, one after the other. This causes
  // us to assume the service stops twice at each stop!
  return {
    ...gtfsData,
    regional: {
      ...gtfsData.regional,
      stopTimes: gtfsData.regional.stopTimes.filter((t, i) => {
        const priorEntry = gtfsData.regional.stopTimes[i - 1];
        if (priorEntry == null) return true;

        // Apply the smallest necessary patch. Let's just restrict this to the
        // broken Echuca services I've seen so far, and hope it doesn't spread!
        if (!t.trip_id.startsWith("01-ECH-")) return true;

        // When I said it was the "exact same row"... that wasn't quite true.
        // The arrival and departure times for one stop was different by
        // one minute. (EUGH!)
        const isDuplicate =
          t.trip_id === priorEntry.trip_id &&
          t.stop_id === priorEntry.stop_id &&
          t.stop_sequence === priorEntry.stop_sequence;

        return !isDuplicate;
      }),
    },
  };
}
