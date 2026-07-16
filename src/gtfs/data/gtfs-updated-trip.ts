import { assertNever } from "@dan-schel/js-utils";
import type { GtfsStopTime } from "./gtfs-stop-time.js";
import type {
  GtfsTrip,
  GtfsTripPassingMovement,
  GtfsTripServicingMovement,
  GtfsTripMovement,
} from "./gtfs-trip.js";
import type { StopGtfsIdMetadata } from "./ids/stop-gtfs-id-metadata.js";

export type GtfsUpdatedTripMovement =
  | GtfsUpdatedTripServicingMovement
  | GtfsUpdatedTripPassingMovement;

type GtfsUpdatedTripServicingMovement = Omit<
  GtfsTripServicingMovement,
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
  // that situation you'd provide a whole new movements array. If you didn't,
  // there wouldn't be anything reasonable to put in the scheduled/original
  // fields, as the movements list might not even be the same length, and even
  // if it was, there wouldn't really be any relationship between the original
  // movements and new ones if it's a different route. Come to think of it, the
  // line and service tags might change too (East Pakenham train diverted to
  // Cranbourne or terminating early at Dandenong), so lots of additional fields
  // required.
};

// There's no additional metadata for passing movements.
type GtfsUpdatedTripPassingMovement = GtfsTripPassingMovement;

export class GtfsUpdatedTrip {
  constructor(
    readonly scheduledTrip: GtfsTrip,

    // An updated trip is not recurring. It only ever applies to a single
    // instance of a trip.
    readonly serviceDay: Temporal.PlainDate,

    readonly movements: readonly GtfsUpdatedTripMovement[],
    readonly isCancelled: boolean,
  ) {}

  static createMovementsWithNoRealtimeData(
    movements: readonly GtfsTripMovement[],
  ): readonly GtfsUpdatedTripMovement[] {
    return movements.map<GtfsUpdatedTripMovement>((m) => {
      if (m.type === "servicing") {
        return {
          type: m.type,
          stopId: m.stopId,
          picksUp: m.picksUp,
          dropsOff: m.dropsOff,
          gtfsStopSequence: m.gtfsStopSequence,

          scheduledArrivalTime: m.arrivalTime,
          scheduledDepartureTime: m.departureTime,
          realtimeArrivalTime: null,
          realtimeDepartureTime: null,

          originalPositionId: m.positionId,
          updatedPositionId: m.positionId,
          originalGtfsIdMetadata: m.gtfsIdMetadata,
          updatedGtfsIdMetadata: m.gtfsIdMetadata,
        };
      } else if (m.type === "passing") {
        return m;
      } else {
        assertNever(m);
      }
    });
  }
}
