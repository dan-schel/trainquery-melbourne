import type { StopConfig } from "corequery";
import {
  StopsCsvTree,
  type StopsCsvTreeNode,
} from "../../utils/gtfs/stops-csv-tree.js";
import { compareArrays, nonNull } from "@dan-schel/js-utils";
import type { IssueCollector } from "../issue-collector.js";
import type { FullStopsCsv } from "../../../src/gtfs/retrieval/schedule/csv-schemas.js";
import type {
  TrainqueryStopGtfsIdCollectionConfig,
  TrainqueryStopGtfsIdsConfig,
} from "../../../src/gtfs/ids.js";

type OnMatchCallback = (
  config: StopConfig,
  mappedIds: TrainqueryStopGtfsIdCollectionConfig,
  gtfsNode: StopsCsvTreeNode,
) => void;

export function compareStopItems({
  stops,
  stopGtfsIdsConfig,
  gtfsStops,
  issues,
  onMatch,
  isStopMissingFromConfigIgnored,
  isStopMissingFromGtfsIgnored,
}: {
  stops: readonly StopConfig[];
  stopGtfsIdsConfig: TrainqueryStopGtfsIdsConfig;
  gtfsStops: FullStopsCsv;
  issues: IssueCollector;
  onMatch: OnMatchCallback;
  isStopMissingFromConfigIgnored: (gtfsNode: StopsCsvTreeNode) => boolean;
  isStopMissingFromGtfsIgnored: (config: StopConfig) => boolean;
}) {
  function reportStopMissingFromGtfs(
    config: StopConfig,
    mappedIds: TrainqueryStopGtfsIdCollectionConfig,
  ) {
    if (isStopMissingFromGtfsIgnored(config)) return;
    issues.add({
      category: "Stops not found in GTFS",
      message: `GTFS ID "${mappedIds.parent}" belonging to ${config.name} (#${config.id}) not found in GTFS.`,
    });
  }

  function reportStopMissingFromConfig(stop: StopsCsvTreeNode) {
    if (isStopMissingFromConfigIgnored(stop)) return;
    issues.add({
      category: "Additional stops found in GTFS",
      message: `Additional stop "${stop.stop_name}" ("${stop.stop_id}") found in GTFS.`,
    });
  }

  const stopTree = StopsCsvTree.build(gtfsStops);
  const stopsWithGtfsIds = mapToGtfsIds(stops, stopGtfsIdsConfig);

  compareArrays({
    a: stopsWithGtfsIds,
    b: stopTree.nodes,
    aKeyFunc: (s) => s.gtfsIds.parent,
    bKeyFunc: (s) => s.stop_id,
    onMatch: (a, b) => onMatch(a.stop, a.gtfsIds, b),
    onMissingFromA: (b) => reportStopMissingFromConfig(b),
    onMissingFromB: (a) => reportStopMissingFromGtfs(a.stop, a.gtfsIds),
  });
}

function mapToGtfsIds(
  stops: readonly StopConfig[],
  stopGtfsIdsConfig: TrainqueryStopGtfsIdsConfig,
) {
  return stops
    .map((stop) => {
      const gtfsIds = stopGtfsIdsConfig[stop.id] ?? null;
      if (gtfsIds == null) return null;
      return { stop, gtfsIds };
    })
    .filter(nonNull);
}
