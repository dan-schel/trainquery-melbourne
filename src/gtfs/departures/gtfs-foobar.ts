import type { GtfsSchedule } from "../data/gtfs-schedule.js";
import type { GtfsStopTime } from "../data/gtfs-stop-time.js";
import type { GtfsTrip, GtfsTripServicingMovement } from "../data/gtfs-trip.js";

export type GtfsFoobarEntry = {
  readonly trip: GtfsTrip;
  readonly movement: GtfsTripServicingMovement;
};

export class GtfsFoobar {
  private constructor(
    private readonly _movementsByStop: Map<number, readonly GtfsFoobarEntry[]>,
    private readonly _earliestServicingMovementByStop: Map<
      number,
      GtfsStopTime
    >,
    private readonly _latestServicingMovementByStop: Map<number, GtfsStopTime>,
  ) {}

  static build(_schedule: GtfsSchedule) {}
}
