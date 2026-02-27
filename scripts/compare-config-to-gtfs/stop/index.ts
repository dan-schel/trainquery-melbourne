import type { IssueCollector } from "../issue-collector.js";
import { compareStopNames } from "./compare-names.js";
import { compareStopLocations } from "./compare-locations.js";
import { compareStopGtfsIds } from "./compare-gtfs-ids.js";
import type { StopConfig } from "corequery";
import type { StopGtfsIdMapping } from "../../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import { compareStopItems } from "./compare-items.js";
import type { StopLintOptions } from "../comparison-options.js";
import type { StopGtfsIdCollection } from "../../../src/gtfs/ids/stop-gtfs-id-collection.js";
import type { StopsCsvTreeNode } from "../../utils/gtfs/stops-csv-tree.js";
import type { StopsCsv } from "../../../src/gtfs/schedule/csv-schemas.js";

export function compareStops({
  stops,
  idMapping,
  gtfsStops,
  issues,
  getOptionsForStop,
  isStopMissingFromConfigIgnored,
}: {
  stops: readonly StopConfig[];
  idMapping: StopGtfsIdMapping;
  gtfsStops: StopsCsv;
  issues: IssueCollector;
  getOptionsForStop: (stopId: number) => StopLintOptions;
  isStopMissingFromConfigIgnored: (gtfsNode: StopsCsvTreeNode) => boolean;
}) {
  function compareStop(
    config: StopConfig,
    mappedIds: StopGtfsIdCollection,
    gtfsNode: StopsCsvTreeNode,
  ) {
    const options = getOptionsForStop(config.id);

    compareStopNames({
      config,
      gtfsNode,
      issues,
      isIgnored: options.ignoreNameMismatch ?? false,
    });

    compareStopLocations({
      config,
      gtfsNode,
      issues,
      isIgnored: options.ignoreLocationMismatch ?? false,
    });

    compareStopGtfsIds({
      config,
      mappedIds,
      gtfsNode,
      issues,

      isIdMissingFromConfigIgnored: (id) =>
        (options.ignoredIdsMissingFromConfig?.includes(id.stop_id) ?? false) ||
        (options.ignoreIdMissingFromConfig?.(id) ?? false),

      isIdMissingFromGtfsIgnored: (gtfsId) =>
        (options.ignoredIdsMissingFromGtfs?.includes(gtfsId.id) ?? false) ||
        (options.ignoreIdMissingFromGtfs?.(gtfsId) ?? false),
    });
  }

  compareStopItems({
    stops,
    idMapping,
    gtfsStops,
    issues,
    onMatch: compareStop,

    isStopWithNoConfiguredGtfsIdIgnored: (config) =>
      getOptionsForStop(config.id).ignoreNoConfiguredGtfsId ?? false,

    isStopMissingFromConfigIgnored: isStopMissingFromConfigIgnored,

    isStopMissingFromGtfsIgnored: (config) =>
      getOptionsForStop(config.id).ignoreNotFoundInGtfs ?? false,
  });
}
