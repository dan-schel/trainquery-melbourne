import type { GtfsScheduledTripServicingMovement } from "../data/gtfs-scheduled-trip-movements.js";
import type { GtfsScheduledTrip } from "../data/gtfs-scheduled-trip.js";
import type { GtfsUpdatedTripServicingMovement } from "../data/gtfs-updated-trip-movements.js";
import type { GtfsUpdatedTrip } from "../data/gtfs-updated-trip.js";

type GtfsTripServicingMovement =
  | GtfsScheduledTripServicingMovement
  | GtfsUpdatedTripServicingMovement;

export type DeparturesSearchDirection = "forwards" | "backwards";

export class DeparturesIteratorResult {
  constructor(
    readonly trip: GtfsScheduledTrip | GtfsUpdatedTrip,
    readonly serviceDay: Temporal.PlainDate,
    readonly instant: Temporal.Instant,
    readonly movement: GtfsTripServicingMovement,
  ) {}
}
