import type { LineConfig, RouteConfig } from "corequery";
import type { TripsCsv } from "../../../src/gtfs/schedule/csv-schemas.js";
import type { IndexedStopTimes } from "../../../src/gtfs/schedule/higher-order/indexed-stop-times.js";
import type { IssueCollector } from "../issue-collector.js";
import type { LineGtfsIdCollection } from "../../../src/gtfs/ids/line-gtfs-id-collection.js";
import type { StopGtfsIdMapping } from "../../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import { nonNull } from "@dan-schel/js-utils";

export function checkLineTripCompatibility({
  config,
  mappedLineIds,
  gtfsTrips,
  gtfsStopTimes,
  stopIdMapping,
  getStopName,
  issues,
}: {
  config: LineConfig;
  mappedLineIds: LineGtfsIdCollection;
  gtfsTrips: TripsCsv;
  gtfsStopTimes: IndexedStopTimes;
  stopIdMapping: StopGtfsIdMapping;
  getStopName: (stopId: number) => string | null;
  issues: IssueCollector;
}) {
  // Find the trips which belong to this line. (Ignore replacement bus trips.
  // Right now TrainQuery is only attempting to model actual train trips.)
  const relevantTrips = gtfsTrips.filter((t) =>
    mappedLineIds.includes(t.route_id, { ignoreReplacementBusIds: true }),
  );

  const uniqueStoppingPatterns = findUniqueStoppingPatterns({
    trips: relevantTrips,
    gtfsStopTimes,
    stopIdMapping,
    onUnmappedGtfsStopIdInUse: (stopId) =>
      issues.addUnmappedGtfsStopIdInUse(stopId),
  });

  for (const stoppingPattern of uniqueStoppingPatterns) {
    if (config.routes.every((r) => !isCompatible(stoppingPattern.stops, r))) {
      const formattedStopList = stoppingPattern.stops
        .map((s) => `${getStopName(s) ?? "???"} (#${s})`)
        .join(" → ");

      issues.add({
        message: `Unsupported stopping pattern for ${config.name} (#${config.id}) line, e.g. in trip "${stoppingPattern.exampleTripId}" on route "${stoppingPattern.exampleRouteId}": ${formattedStopList}`,
      });
    }
  }
}

function findUniqueStoppingPatterns({
  trips,
  gtfsStopTimes,
  stopIdMapping,
  onUnmappedGtfsStopIdInUse,
}: {
  trips: TripsCsv;
  gtfsStopTimes: IndexedStopTimes;
  stopIdMapping: StopGtfsIdMapping;
  onUnmappedGtfsStopIdInUse: (gtfsId: string) => void;
}) {
  type StoppingPattern = {
    readonly stops: number[];
    readonly exampleTripId: string;
    readonly exampleRouteId: string;
  };

  const stoppingPatterns = new Map<string, StoppingPattern>();

  for (const trip of trips) {
    const tripStopTimes = gtfsStopTimes.forTrip(trip.trip_id);

    const stops = tripStopTimes
      .map((x) => {
        const stopId = stopIdMapping.tryResolve(x.stop_id)?.stopId ?? null;
        if (stopId != null) return stopId;

        onUnmappedGtfsStopIdInUse(x.stop_id);
        return null;
      })
      .filter(nonNull);

    const hashKey = stops.map((x) => x.toFixed()).join(",");

    if (!stoppingPatterns.has(hashKey)) {
      stoppingPatterns.set(hashKey, {
        stops: stops,
        exampleTripId: trip.trip_id,
        exampleRouteId: trip.route_id,
      });
    }
  }

  return Array.from(stoppingPatterns.values());
}

function isCompatible(stoppingPattern: number[], route: RouteConfig): boolean {
  const routeStops = route.stops.map((s) => s.stopId);
  return isSubsequence(stoppingPattern, routeStops);
}

function isSubsequence(subseq: number[], seq: number[]): boolean {
  let subseqIndex = 0;

  for (const item of seq) {
    if (item === subseq[subseqIndex]) {
      subseqIndex++;
      if (subseqIndex === subseq.length) {
        return true;
      }
    }
  }

  return false;
}
