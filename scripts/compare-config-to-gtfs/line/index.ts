import type { IssueCollector } from "../issue-collector.js";
import { checkLineTripCompatibility } from "./check-trip-compatibility.js";
import type { LineConfig } from "corequery";
import type { LineLintOptions } from "../comparison-options.js";
import { compareLineItems } from "./compare-items.js";
import { IndexedStopTimes } from "./utils/indexed-stop-times.js";
import { checkAllTripsAssignedToALine } from "./check-all-trips-assigned-to-a-line.js";
import type { Trip } from "./utils/trip.js";
import type { LineRoutesMappingConfig } from "corequery-gtfs";
import type {
  FullRoutesCsv,
  FullRoutesCsvRow,
  FullStopTimesCsv,
  FullTripsCsv,
} from "../../../src/gtfs/retrieval/schedule/csv-schemas.js";
import { reverseGtfsIdMapping } from "../../utils/gtfs/reverse-gtfs-id-mapping.js";
import type {
  TrainqueryLineGtfsIdCollectionConfig,
  TrainqueryLineGtfsIdsConfig,
  TrainqueryStopGtfsIdsConfig,
} from "../../../src/gtfs/ids.js";

export function compareLines({
  lines,
  lineGtfsIdsConfig,
  routes,
  gtfsRoutes,
  gtfsTrips,
  gtfsStopTimes,
  stopGtfsIdsConfig,
  getStopName,
  issues,
  getOptionsForLine,
  isLineMissingFromConfigIgnored,
  isTripNotAssignedToALineIgnored,
}: {
  lines: readonly LineConfig[];
  lineGtfsIdsConfig: TrainqueryLineGtfsIdsConfig;
  routes: LineRoutesMappingConfig;
  gtfsRoutes: FullRoutesCsv;
  gtfsTrips: FullTripsCsv;
  gtfsStopTimes: FullStopTimesCsv;
  stopGtfsIdsConfig: TrainqueryStopGtfsIdsConfig;
  getStopName: (stopId: number) => string | null;
  issues: IssueCollector;
  getOptionsForLine: (lineId: number) => LineLintOptions;
  isLineMissingFromConfigIgnored: (gtfsRow: FullRoutesCsvRow) => boolean;
  isTripNotAssignedToALineIgnored: (trip: Trip) => boolean;
}) {
  // Somewhat expensive, so do it once and share it between lines.
  const indexedStopTimes = IndexedStopTimes.build(gtfsStopTimes);
  const reversedStopIdMapping = reverseGtfsIdMapping(stopGtfsIdsConfig);

  function compareLine(
    config: LineConfig,
    mappedIds: TrainqueryLineGtfsIdCollectionConfig,
    _gtfsRow: FullRoutesCsvRow,
  ) {
    const options = getOptionsForLine(config.id);
    checkLineTripCompatibility({
      config,
      routes: routes[config.id] ?? [],
      mappedLineIds: mappedIds,
      gtfsTrips,
      gtfsStopTimes: indexedStopTimes,
      stopIdMapping: reversedStopIdMapping,
      getStopName,
      issues,
      isIncompatibleStoppingPatternIgnored: (pattern) => {
        const ignoreList = options.ignoredIncompatibleStoppingPatternsKeys;
        const ignoreFunc = options.ignoreIncompatibleStoppingPattern;

        return (
          (ignoreList?.includes(pattern.pattern.getKey()) ?? false) ||
          (ignoreFunc?.(pattern) ?? false)
        );
      },
    });
  }

  compareLineItems({
    lines,
    lineGtfsIdsConfig,
    gtfsRoutes,
    issues,
    onMatch: compareLine,

    isLineMissingFromConfigIgnored: isLineMissingFromConfigIgnored,

    isLineMissingFromGtfsIgnored: (config) =>
      getOptionsForLine(config.id).ignoreNotFoundInGtfs ?? false,
  });

  checkAllTripsAssignedToALine({
    gtfsTrips,
    gtfsStopTimes: indexedStopTimes,
    lineGtfsIdsConfig,
    stopIdMapping: reversedStopIdMapping,
    getStopName,
    issues,
    isTripNotAssignedToALineIgnored,
  });

  // TODO: Check for unused routes?
}
