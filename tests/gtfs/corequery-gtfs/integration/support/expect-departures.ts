import type { DeparturesSearchDirection } from "../../../../../src/gtfs/corequery-gtfs/departures/departures-iterator.js";
import type { GtfsSystem } from "../../../../../src/gtfs/corequery-gtfs/gtfs-system.js";

export function expectDeparturesToMatchSnapshot(
  system: GtfsSystem,
  stopNameMapping: unknown,
  stopName: string,
  instant: string,
  direction: DeparturesSearchDirection,
) {}
