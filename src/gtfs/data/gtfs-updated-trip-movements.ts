import type { GtfsStopTime } from "./gtfs-stop-time.js";
import type { StopGtfsIdMetadata } from "./ids/stop-gtfs-id-metadata.js";

export type GtfsUpdatedTripMovement =
  | GtfsUpdatedTripOriginatingMovement
  | GtfsUpdatedTripRegularMovement
  | GtfsUpdatedTripTerminatingMovement
  | GtfsUpdatedTripPassingMovement;

// I don't normally use interfaces, but here they're just acting as a way to
// force the classes to conform to a particular consistent set of properties,
// while stilll allowing them to further narrow the type, e.g. the `type`
// property isn't generically typed as `string` as it would be if I used an
// abstract class.
interface IGtfsUpdatedTripMovement {
  readonly stopId: number;

  get type(): string;
  get isNonPassing(): boolean;
  get isInBetween(): boolean;
}
interface IGtfsUpdatedTripNonPassingMovement extends IGtfsUpdatedTripMovement {
  // Original & updated to support platform changes. Can be removed in favour of
  // just having `positionId` and `gtfsIdMetadata` like the scheduled movements
  // have if it turns out PTV don't actually do platform changes like this (e.g.
  // they just remove this trip and create a new "ADDED" one instead, idk).
  readonly originalPositionId: number | null;
  readonly updatedPositionId: number | null;
  readonly originalGtfsIdMetadata: StopGtfsIdMetadata;
  readonly updatedGtfsIdMetadata: StopGtfsIdMetadata;

  readonly gtfsStopSequence: number;

  // Note: This isn't really set up to support route changes, because surely in
  // that situation you'd provide a whole new movements array. If you didn't,
  // there wouldn't be anything reasonable to put in the scheduled/original
  // fields, as the movements list might not even be the same length, and even
  // if it was, there wouldn't really be any relationship between the original
  // movements and new ones if it's a different route. Come to think of it, the
  // line and service tags might change too (East Pakenham train diverted to
  // Cranbourne or terminating early at Dandenong), so lots of additional fields
  // required. Would we modify GtfsUpdatedTrip to support it, or create a new
  // GtfsReroutedTrip, so you could have movements without any
  // scheduled/original fields. (By the same argument, maybe we should have
  // GtfsCancelledTrip, instead of the `isCancelled` field.)

  get isNonPassing(): true;
}

type GtfsUpdatedTripOriginatingMovementFields = {
  readonly stopId: number;
  readonly originalPositionId: number | null;
  readonly updatedPositionId: number | null;
  readonly scheduledDepartureTime: GtfsStopTime;
  readonly realtimeDepartureTime: Temporal.Instant | null;
  readonly originalGtfsIdMetadata: StopGtfsIdMetadata;
  readonly updatedGtfsIdMetadata: StopGtfsIdMetadata;
  readonly gtfsStopSequence: number;
};

type GtfsUpdatedTripRegularMovementFields = {
  readonly stopId: number;
  readonly originalPositionId: number | null;
  readonly updatedPositionId: number | null;
  readonly scheduledArrivalTime: GtfsStopTime;
  readonly realtimeArrivalTime: Temporal.Instant | null;
  readonly scheduledDepartureTime: GtfsStopTime;
  readonly realtimeDepartureTime: Temporal.Instant | null;
  readonly picksUp: boolean;
  readonly dropsOff: boolean;
  readonly originalGtfsIdMetadata: StopGtfsIdMetadata;
  readonly updatedGtfsIdMetadata: StopGtfsIdMetadata;
  readonly gtfsStopSequence: number;
};

type GtfsUpdatedTripTerminatingMovementFields = {
  readonly stopId: number;
  readonly originalPositionId: number | null;
  readonly updatedPositionId: number | null;
  readonly scheduledArrivalTime: GtfsStopTime;
  readonly realtimeArrivalTime: Temporal.Instant | null;
  readonly originalGtfsIdMetadata: StopGtfsIdMetadata;
  readonly updatedGtfsIdMetadata: StopGtfsIdMetadata;
  readonly gtfsStopSequence: number;
};

type GtfsUpdatedTripPassingMovementFields = {
  readonly stopId: number;
};

export class GtfsUpdatedTripOriginatingMovement implements IGtfsUpdatedTripNonPassingMovement {
  readonly stopId: number;
  readonly originalPositionId: number | null;
  readonly updatedPositionId: number | null;
  readonly scheduledDepartureTime: GtfsStopTime;
  readonly realtimeDepartureTime: Temporal.Instant | null;
  readonly originalGtfsIdMetadata: StopGtfsIdMetadata;
  readonly updatedGtfsIdMetadata: StopGtfsIdMetadata;
  readonly gtfsStopSequence: number;

  constructor(fields: GtfsUpdatedTripOriginatingMovementFields) {
    this.stopId = fields.stopId;
    this.originalPositionId = fields.originalPositionId;
    this.updatedPositionId = fields.updatedPositionId;
    this.scheduledDepartureTime = fields.scheduledDepartureTime;
    this.realtimeDepartureTime = fields.realtimeDepartureTime;
    this.originalGtfsIdMetadata = fields.originalGtfsIdMetadata;
    this.updatedGtfsIdMetadata = fields.updatedGtfsIdMetadata;
    this.gtfsStopSequence = fields.gtfsStopSequence;
  }

  get type() {
    return "originating" as const;
  }
  get isNonPassing() {
    return true as const;
  }
  get isInBetween() {
    return false as const;
  }
}

export class GtfsUpdatedTripRegularMovement implements IGtfsUpdatedTripNonPassingMovement {
  readonly stopId: number;
  readonly originalPositionId: number | null;
  readonly updatedPositionId: number | null;
  readonly scheduledArrivalTime: GtfsStopTime;
  readonly realtimeArrivalTime: Temporal.Instant | null;
  readonly scheduledDepartureTime: GtfsStopTime;
  readonly realtimeDepartureTime: Temporal.Instant | null;
  readonly picksUp: boolean;
  readonly dropsOff: boolean;
  readonly originalGtfsIdMetadata: StopGtfsIdMetadata;
  readonly updatedGtfsIdMetadata: StopGtfsIdMetadata;
  readonly gtfsStopSequence: number;

  constructor(fields: GtfsUpdatedTripRegularMovementFields) {
    this.stopId = fields.stopId;
    this.originalPositionId = fields.originalPositionId;
    this.updatedPositionId = fields.updatedPositionId;
    this.scheduledArrivalTime = fields.scheduledArrivalTime;
    this.realtimeArrivalTime = fields.realtimeArrivalTime;
    this.scheduledDepartureTime = fields.scheduledDepartureTime;
    this.realtimeDepartureTime = fields.realtimeDepartureTime;
    this.picksUp = fields.picksUp;
    this.dropsOff = fields.dropsOff;
    this.originalGtfsIdMetadata = fields.originalGtfsIdMetadata;
    this.updatedGtfsIdMetadata = fields.updatedGtfsIdMetadata;
    this.gtfsStopSequence = fields.gtfsStopSequence;
  }

  get type() {
    return "regular" as const;
  }
  get isNonPassing() {
    return true as const;
  }
  get isInBetween() {
    return true as const;
  }
}

export class GtfsUpdatedTripTerminatingMovement implements IGtfsUpdatedTripNonPassingMovement {
  readonly stopId: number;
  readonly originalPositionId: number | null;
  readonly updatedPositionId: number | null;
  readonly scheduledArrivalTime: GtfsStopTime;
  readonly realtimeArrivalTime: Temporal.Instant | null;
  readonly originalGtfsIdMetadata: StopGtfsIdMetadata;
  readonly updatedGtfsIdMetadata: StopGtfsIdMetadata;
  readonly gtfsStopSequence: number;

  constructor(fields: GtfsUpdatedTripTerminatingMovementFields) {
    this.stopId = fields.stopId;
    this.originalPositionId = fields.originalPositionId;
    this.updatedPositionId = fields.updatedPositionId;
    this.scheduledArrivalTime = fields.scheduledArrivalTime;
    this.realtimeArrivalTime = fields.realtimeArrivalTime;
    this.originalGtfsIdMetadata = fields.originalGtfsIdMetadata;
    this.updatedGtfsIdMetadata = fields.updatedGtfsIdMetadata;
    this.gtfsStopSequence = fields.gtfsStopSequence;
  }

  get type() {
    return "terminating" as const;
  }
  get isNonPassing() {
    return true as const;
  }
  get isInBetween() {
    return false as const;
  }
}

export class GtfsUpdatedTripPassingMovement implements IGtfsUpdatedTripMovement {
  readonly stopId: number;

  constructor(fields: GtfsUpdatedTripPassingMovementFields) {
    this.stopId = fields.stopId;
  }

  get type() {
    return "passing" as const;
  }
  get isNonPassing() {
    return false as const;
  }
  get isInBetween() {
    return true as const;
  }
}
