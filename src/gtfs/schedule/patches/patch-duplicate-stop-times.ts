import { itsOk, parseIntNull, parseIntThrow } from "@dan-schel/js-utils";
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
        //
        // Update: It spread :/
        //
        // if (!t.trip_id.startsWith("01-ECH-")) return true;

        // When I said it was the "exact same row"... that wasn't quite true.
        // The arrival and departure times for one stop was different by
        // one minute. (EUGH!)
        const isDuplicate =
          t.trip_id === priorEntry.trip_id &&
          t.stop_id === priorEntry.stop_id &&
          t.stop_sequence === priorEntry.stop_sequence;

        // Attempt 2: Apply the smallest necessary patch. Let's only remove the
        // duplicate if the arrival & departure times between the two entries
        // are no more than 1 minute different.
        const timesWithinOneMinute =
          isWithinOneMinute(t.arrival_time, priorEntry.arrival_time) &&
          isWithinOneMinute(t.departure_time, priorEntry.departure_time);

        // Update 2: This revealed that some duplicate entries are WAY off, like
        // 20 minutes off :/
        //
        // That one I looked into was an Echuca service, and at the time the
        // Bendigo line (including Echuca) was on a temporary timetable. The
        // temporary timetable times were the duplicated entries. However, there
        // was also a Ballarat service which had a big discrepancy (9 mins off),
        // and from what I can tell there's no temporary timetable for the
        // Ballarat line at the time (it was some weird "UK" calendar though,
        // not the usual "T0", "T0_1", etc. type ones).
        //
        // In these two cases, there's two entries in trips.txt with the same
        // trip_id. That seems like it's probably a violation of the GTFS spec.
        // Checking Google Maps, it was only showing the earlier Echuca service
        // times, i.e. the non-temporary-timetable times, which is presumably
        // incorrect. I guess it just picks the first one it sees?
        //
        // I'm disabling the patch. Needs to go back to the drawing board.
        //
        // I think I should probably take the Google Maps approach, but if it
        // this continues to be a thing, I'd like to make sure TrainQuery is
        // able to handle it as best it can. This would involve:
        //
        // - Always using the earlier of the two times.
        //
        // - Marking a disruption against the service, noting that the departure
        //   times are ambiguous. This would involve trainquery-melbourne
        //   building a list of these duplicated trips during parsing, and
        //   corequery exposing some way for trainquery-melbourne to add adhoc
        //   disruptions like this (i.e., probably skipping the usual DB
        //   persistence for disruptions - although, come to think of it, DB
        //   persistence for disruptions AT ALL could maybe be a consumer
        //   package responsibility).
        //
        // - CoreQuery supporting this disruption type, and having a UI to show
        //   the user both sets of departure times in the disruption details
        //   page.
        //
        // - The GTFS parsing process eliminates the second version of the trip
        //   entirely by always using the first time for each trip. The
        //   compare-config-to-gtfs script inherits this same logic, and so
        //   doesn't report incompatible stopping patterns.
        //
        // It's unclear to me what the role of finding the duplicated trip_id
        // in trips.txt is. I suppose I need to check for it, because if it gave
        // two route_id or calendar_id values, that would be a whole other level
        // of mess to deal with. But in the end, for this situation, am I just
        // grabbing every stop time for a given trip_id, and taking the earliest
        // time for each stop_sequence, regardless of whether or not the trip_id
        // is duplicated in trips.txt?

        const removeCurrentEntry = isDuplicate && timesWithinOneMinute;

        return !removeCurrentEntry;
      }),
    },
  };
}

function isWithinOneMinute(time1: string, time2: string): boolean {
  function secondsOf(time: string) {
    const [h, m, s] = time.split(":").map(parseIntNull);
    if (h == null || m == null || s == null) {
      throw new Error(`Unknown time "${time}".`);
    }
    return h * 3600 + m * 60 + s;
  }

  return Math.abs(secondsOf(time1) - secondsOf(time2)) <= 60;
}
