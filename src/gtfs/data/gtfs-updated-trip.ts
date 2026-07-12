import { assertNever } from "@dan-schel/js-utils";
import type { GtfsStopTime } from "./gtfs-stop-time.js";
import type {
  GtfsTrip,
  GtfsTripExpressStop,
  GtfsTripServicedStop,
  GtfsTripStop,
} from "./gtfs-trip.js";

export type GtfsUpdatedTripStop =
  | GtfsUpdatedTripServicedStop
  | GtfsUpdatedTripExpressStop;

export type GtfsUpdatedTripServicedStop = Omit<
  GtfsTripServicedStop,
  "arrivalTime" | "departureTime"
> & {
  // TODO: This assumes the only thing a GTFS-RT update does is provide updated
  // arrival/departure times. I wonder if PTV ever uses it to provide platform
  // updates (i.e. publishes a stop time update with the stop_sequence not
  // aligning with the same stop_id used in the schedule). If so, we should give
  // the same treatment to `positionId` and `gtfsIdMetadata`.
  //
  // Note: https://opendata.transport.vic.gov.au/dataset/gtfs-realtime states
  // it can provide "changed routes", so that would indicate yes.
  scheduledArrivalTime: GtfsStopTime;
  scheduledDepartureTime: GtfsStopTime;
  realtimeArrivalTime: Temporal.Instant | null;
  realtimeDepartureTime: Temporal.Instant | null;
};

// There's no additional metadata for express stops.
export type GtfsUpdatedTripExpressStop = GtfsTripExpressStop;

export class GtfsUpdatedTrip {
  constructor(
    readonly scheduledTrip: GtfsTrip,

    // An updated trip is not recurring. It only ever applies to a single
    // instance of a trip.
    readonly serviceDay: Temporal.PlainDate,

    readonly stops: readonly GtfsUpdatedTripStop[],
    readonly isCancelled: boolean,
  ) {}

  static createStopsWithNoRealtimeData(
    stops: readonly GtfsTripStop[],
  ): readonly GtfsUpdatedTripStop[] {
    return stops.map<GtfsUpdatedTripStop>((s) => {
      if (s.type === "serviced") {
        return {
          type: s.type,
          stopId: s.stopId,
          positionId: s.positionId,
          picksUp: s.picksUp,
          dropsOff: s.dropsOff,
          gtfsIdMetadata: s.gtfsIdMetadata,
          gtfsStopSequence: s.gtfsStopSequence,

          scheduledArrivalTime: s.arrivalTime,
          scheduledDepartureTime: s.departureTime,
          realtimeArrivalTime: null,
          realtimeDepartureTime: null,
        };
      } else if (s.type === "express") {
        return s;
      } else {
        assertNever(s);
      }
    });
  }
}
