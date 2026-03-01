import type { TripsCsv } from "../../../src/gtfs/schedule/csv-schemas.js";
import type { IndexedStopTimes } from "../../../src/gtfs/schedule/higher-order/indexed-stop-times.js";
import type { IssueCollector } from "../issue-collector.js";
import type { StopGtfsIdMapping } from "../../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import type { LineGtfsIdMapping } from "../../../src/gtfs/ids/line-gtfs-id-mapping.js";
import { Trip } from "./utils/trip.js";
import { UniqueStoppingPatternTracker } from "./utils/unique-stopping-pattern-tracker.js";

export function checkAllTripsAssignedToALine({
  gtfsTrips,
  gtfsStopTimes,
  lineIdMapping,
  stopIdMapping,
  getStopName,
  issues,
  isTripNotAssignedToALineIgnored,
}: {
  gtfsTrips: TripsCsv;
  gtfsStopTimes: IndexedStopTimes;
  lineIdMapping: LineGtfsIdMapping;
  stopIdMapping: StopGtfsIdMapping;
  getStopName: (stopId: number) => string | null;
  issues: IssueCollector;
  isTripNotAssignedToALineIgnored: (trip: Trip) => boolean;
}) {
  const trips = gtfsTrips
    .filter((t) => lineIdMapping.tryResolve(t.route_id) == null)
    .map((t) =>
      Trip.fromCsv({
        tripCsvRow: t,
        stopTimes: gtfsStopTimes.forTrip(t.trip_id),
        stopIdMapping,
        onUnmappedGtfsStopIdInUse: (stopId) =>
          issues.addUnmappedGtfsStopIdInUse(stopId),
      }),
    )
    .filter((t) => !isTripNotAssignedToALineIgnored(t));

  const instances = UniqueStoppingPatternTracker.process(trips);

  for (const instance of instances) {
    const formattedTripCount = `${instance.tripCount} ${instance.tripCount === 1 ? "trip" : "trips"}`;
    const formattedExampleTripId = `e.g. in trip "${instance.exampleTripId}" on route "${instance.exampleRouteId}"`;
    const formattedStopList = instance.pattern.format(getStopName);

    issues.add({
      message: `${formattedTripCount} with stopping pattern, ${formattedExampleTripId}: ${formattedStopList}`,
    });
  }
}
