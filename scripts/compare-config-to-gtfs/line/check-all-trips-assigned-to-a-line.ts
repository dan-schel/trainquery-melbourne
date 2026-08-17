import type { IndexedStopTimes } from "./utils/indexed-stop-times.js";
import type { IssueCollector } from "../issue-collector.js";
import type { StopGtfsIdMapping, LineGtfsIdMapping } from "corequery-gtfs";
import { Trip } from "./utils/trip.js";
import { UniqueStoppingPatternTracker } from "./utils/unique-stopping-pattern-tracker.js";
import type { FullTripsCsv } from "../../../src/gtfs/retrieval/schedule/csv-schemas.js";

export function checkAllTripsAssignedToALine({
  gtfsTrips,
  gtfsStopTimes,
  lineIdMapping,
  stopIdMapping,
  getStopName,
  issues,
  isTripNotAssignedToALineIgnored,
}: {
  gtfsTrips: FullTripsCsv;
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
      category: "Trips not assigned to a line",
      message: `${formattedTripCount} with stopping pattern, ${formattedExampleTripId}: ${formattedStopList}`,
    });
  }
}
