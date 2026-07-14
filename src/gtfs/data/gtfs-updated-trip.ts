import { assertNever } from "@dan-schel/js-utils";
import type { GtfsStopTime } from "./gtfs-stop-time.js";
import type {
  GtfsTrip,
  GtfsTripExpressStop,
  GtfsTripServicedStop,
  GtfsTripStop,
} from "./gtfs-trip.js";
import type { StopGtfsIdMetadata } from "./ids/stop-gtfs-id-metadata.js";

export type GtfsUpdatedTripStop =
  | GtfsUpdatedTripServicedStop
  | GtfsUpdatedTripExpressStop;

type GtfsUpdatedTripServicedStop = Omit<
  GtfsTripServicedStop,
  "arrivalTime" | "departureTime" | "positionId" | "gtfsIdMetadata"
> & {
  scheduledArrivalTime: GtfsStopTime;
  scheduledDepartureTime: GtfsStopTime;
  realtimeArrivalTime: Temporal.Instant | null;
  realtimeDepartureTime: Temporal.Instant | null;

  // To support platform changes.
  originalPositionId: number | null;
  updatedPositionId: number | null;
  originalGtfsIdMetadata: StopGtfsIdMetadata;
  updatedGtfsIdMetadata: StopGtfsIdMetadata;

  // Note: This isn't really set up to support route changes, because surely in
  // that situation you'd provide a whole new stops array. If you didn't, there
  // wouldn't be anything reasonable to put in the scheduled/original fields, as
  // the stops list might not even be the same length, and even if it was, there
  // wouldn't really be any relationship between the original stops and new ones
  // if it's a different route. Come to think of it, the line and service tags
  // might change too (East Pakenham train diverted to Cranbourne or terminating
  // early at Dandenong), so lots of additional fields required
};

// There's no additional metadata for express stops.
type GtfsUpdatedTripExpressStop = GtfsTripExpressStop;

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
          picksUp: s.picksUp,
          dropsOff: s.dropsOff,
          gtfsStopSequence: s.gtfsStopSequence,

          scheduledArrivalTime: s.arrivalTime,
          scheduledDepartureTime: s.departureTime,
          realtimeArrivalTime: null,
          realtimeDepartureTime: null,

          originalPositionId: s.positionId,
          updatedPositionId: s.positionId,
          originalGtfsIdMetadata: s.gtfsIdMetadata,
          updatedGtfsIdMetadata: s.gtfsIdMetadata,
        };
      } else if (s.type === "express") {
        return s;
      } else {
        assertNever(s);
      }
    });
  }
}
