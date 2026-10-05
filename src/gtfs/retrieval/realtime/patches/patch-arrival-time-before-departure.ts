import { type RealtimeFeed } from "../realtime-json-schemas.js";

// For whatever reason, PTV's realtime stop time updates, particularly the
// suburban feed, often have arrival times which are exactly one minute later
// than the departure time.
//
// When taken at the service-level, it makes no sense (and it might actually
// break the GTFS-RT spec, I'm not sure), since a train can't depart before it
// arrives, but my hunch is that they're just trying to pessimistic on both
// ends. The suburban feed seems to round everything to the nearest minute, so I
// guess when a prediction comes in that splits the minute they floor() the
// departure time and ceil() the arrival time (to get ahead of any client-side
// rounding), so that you won't miss your connection.
//
// I could imagine Google Maps doesn't really care if the times within a service
// are logical, and they just consider what they need to know for trip planning
// ("a train departs here at time X, and arrives here at time Y").
export function patchArrivalTimeBeforeDeparture(
  realtimeFeed: RealtimeFeed,
): RealtimeFeed {
  return {
    ...realtimeFeed,
    tripUpdates: realtimeFeed.tripUpdates.map((tripUpdate) => ({
      ...tripUpdate,
      stopTimeUpdate: tripUpdate.stopTimeUpdate?.map((stopTimeUpdate) => {
        const arrival = stopTimeUpdate.arrival;
        const departure = stopTimeUpdate.departure;

        if (
          arrival?.time == null ||
          departure?.time == null ||
          arrival.time <= departure.time
        ) {
          return stopTimeUpdate;
        }

        const timeDifference = arrival.time - departure.time;

        const delay =
          arrival.delay == null
            ? {}
            : { delay: arrival.delay - timeDifference };

        return {
          ...stopTimeUpdate,
          arrival: {
            ...arrival,
            time: departure.time,
            ...delay,
          },
        };
      }),
    })),
  };
}
