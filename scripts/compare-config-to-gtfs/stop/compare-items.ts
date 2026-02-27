import type { StopConfig } from "corequery";
import {
  StopsCsvTree,
  type StopsCsvTreeNode,
} from "../../utils/gtfs/stops-csv-tree.js";
import { compareArrays, nonNull } from "@dan-schel/js-utils";
import type { IssueCollector } from "../issue-collector.js";
import type { GtfsFeed } from "../../../src/gtfs/schedule/read-gtfs.js";
import type { StopGtfsIdMapping } from "../../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import type { StopGtfsIdCollection } from "../../../src/gtfs/ids/stop-gtfs-id-collection.js";

type OnMatchCallback = (
  config: StopConfig,
  mappedIds: StopGtfsIdCollection,
  gtfsNode: StopsCsvTreeNode,
) => void;

export function compareStopItems({
  stops,
  idMapping,
  gtfs,
  issues,
  onMatch,
  isStopMissingFromConfigIgnored,
  isStopMissingFromGtfsIgnored,
  isStopWithNoConfiguredGtfsIdIgnored,
}: {
  stops: readonly StopConfig[];
  idMapping: StopGtfsIdMapping;
  gtfs: GtfsFeed;
  issues: IssueCollector;
  onMatch: OnMatchCallback;
  isStopWithNoConfiguredGtfsIdIgnored: (config: StopConfig) => boolean;
  isStopMissingFromConfigIgnored: (gtfsId: string) => boolean;
  isStopMissingFromGtfsIgnored: (config: StopConfig) => boolean;
}) {
  function reportUnmappedStop(config: StopConfig) {
    if (isStopWithNoConfiguredGtfsIdIgnored(config)) return;
    issues.add({
      message: `No GTFS ID mapped for ${config.name} (#${config.id}).`,
    });
  }

  function reportStopMissingFromGtfs(
    config: StopConfig,
    mappedIds: StopGtfsIdCollection,
  ) {
    if (isStopMissingFromGtfsIgnored(config)) return;
    issues.add({
      message: `GTFS ID "${mappedIds.parent}" belonging to ${config.name} (#${config.id}) not found in GTFS.`,
    });
  }

  function reportStopMissingFromConfig(stop: StopsCsvTreeNode) {
    if (isStopMissingFromConfigIgnored(stop.stop_id)) return;
    issues.add({
      message: `Additional stop "${stop.stop_name}" ("${stop.stop_id}") found in GTFS.`,
    });
  }

  const stopTree = StopsCsvTree.build(gtfs.stops);
  const stopsWithGtfsIds = mapToGtfsIds(stops, idMapping, reportUnmappedStop);

  compareArrays({
    a: stopsWithGtfsIds,
    b: stopTree.nodes,
    aKeyFunc: (s) => s.gtfsId.parent,
    bKeyFunc: (s) => s.stop_id,
    onMatch: (a, b) => onMatch(a.stop, a.gtfsId, b),
    onMissingFromA: (b) => reportStopMissingFromConfig(b),
    onMissingFromB: (a) => reportStopMissingFromGtfs(a.stop, a.gtfsId),
  });
}

function mapToGtfsIds(
  stops: readonly StopConfig[],
  idMapping: StopGtfsIdMapping,
  onUnmappedStop: (config: StopConfig) => void,
) {
  return stops
    .map((stop) => {
      const gtfsId = idMapping.getForStop(stop.id);
      if (gtfsId != null) return { stop, gtfsId };

      onUnmappedStop(stop);
      return null;
    })
    .filter(nonNull);
}
