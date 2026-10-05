import {
  Departure,
  EntireVehicleFormsServiceConnection,
  GenericConnection,
  Service,
  ServiceOriginatingMovement,
  ServicePassingMovement,
  ServiceRegularMovement,
  ServiceTerminatingMovement,
  Tags,
  type ServiceSource,
  type ServiceSourcesConfig,
} from "corequery";
import { GtfsServiceSource, GtfsSystem } from "corequery-gtfs";
import type { RelayManager } from "../../relay/relay-manager.js";

export function createServiceSources(
  relayManager: RelayManager,
): ServiceSourcesConfig {
  return [
    createServiceSource("gtfs-suburban", relayManager.suburbanGtfs),
    createServiceSource("gtfs-regional", relayManager.regionalGtfs),
  ];
}

function createServiceSource(
  sourceId: string,
  gtfsSystem: GtfsSystem,
): ServiceSource {
  return new GtfsServiceSource<
    Departure,
    Service,
    Tags,
    ServiceOriginatingMovement,
    ServiceRegularMovement,
    ServiceTerminatingMovement,
    ServicePassingMovement,
    EntireVehicleFormsServiceConnection,
    GenericConnection
  >({
    sourceId,
    gtfsSystem,
    departureIterationLimitHours: 14 * 24, // 14 days

    buildDeparture: (x) => new Departure(x),
    buildService: (x) => new Service(x),
    buildTags: (x) => new Tags(x),
    buildServiceOriginatingMovement: (x) => new ServiceOriginatingMovement(x),
    buildServiceRegularMovement: (x) => new ServiceRegularMovement(x),
    buildServiceTerminatingMovement: (x) => new ServiceTerminatingMovement(x),
    buildServicePassingMovement: (x) => new ServicePassingMovement(x),
    buildServiceEntireVehicleFormsConnection: (x) =>
      new EntireVehicleFormsServiceConnection(x),
    buildServiceGenericConnection: (x) => new GenericConnection(x),
  });
}
