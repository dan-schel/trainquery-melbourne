// TODO: Remove this.
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IssueCollector } from "../issue-collector.js";
import { checkLineTripCompatibility } from "./check-trip-compatibility.js";
import type { LineConfig } from "corequery";
import type { LineGtfsIdMapping } from "../../../src/gtfs/ids/line-gtfs-id-mapping.js";
import type {
  RoutesCsv,
  RoutesCsvRow,
  StopTimesCsv,
  TripsCsv,
} from "../../../src/gtfs/schedule/csv-schemas.js";
import type { LineLintOptions } from "../comparison-options.js";
import { compareLineItems } from "./compare-items.js";
import type { LineGtfsIdCollection } from "../../../src/gtfs/ids/line-gtfs-id-collection.js";
import { IndexedStopTimes } from "../../../src/gtfs/schedule/higher-order/indexed-stop-times.js";

export function compareLines({
  lines,
  idMapping,
  gtfsRoutes,
  gtfsTrips,
  gtfsStopTimes,
  issues,
  getOptionsForLine,
  isLineMissingFromConfigIgnored,
}: {
  lines: readonly LineConfig[];
  idMapping: LineGtfsIdMapping;
  gtfsRoutes: RoutesCsv;
  gtfsTrips: TripsCsv;
  gtfsStopTimes: StopTimesCsv;
  issues: IssueCollector;
  getOptionsForLine: (lineId: number) => LineLintOptions;
  isLineMissingFromConfigIgnored: (gtfsRow: RoutesCsvRow) => boolean;
}) {
  // Somewhat expensive, so do it once and share it between lines.
  const indexedStopTimes = IndexedStopTimes.build(gtfsStopTimes);

  function compareLine(
    config: LineConfig,
    mappedIds: LineGtfsIdCollection,
    gtfsRow: RoutesCsvRow,
  ) {
    const options = getOptionsForLine(config.id);

    checkLineTripCompatibility({
      config,
      mappedIds,
      gtfsTrips,
      gtfsStopTimes: indexedStopTimes,
      issues,
    });
  }

  compareLineItems({
    lines,
    idMapping,
    gtfsRoutes,
    issues,
    onMatch: compareLine,

    isLineWithNoConfiguredGtfsIdIgnored: (config) =>
      getOptionsForLine(config.id).ignoreNoConfiguredGtfsId ?? false,

    isLineMissingFromConfigIgnored: isLineMissingFromConfigIgnored,

    isLineMissingFromGtfsIgnored: (config) =>
      getOptionsForLine(config.id).ignoreNotFoundInGtfs ?? false,
  });
}
