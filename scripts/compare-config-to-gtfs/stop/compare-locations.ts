import type { StopConfig } from "corequery";
import type { IssueCollector } from "../issue-collector.js";
import type { StopsCsvTreeNode } from "../../utils/gtfs/stops-csv-tree.js";

export function compareStopLocations({
  config,
  gtfsNode,
  issues,
  isIgnored,
}: {
  config: StopConfig;
  gtfsNode: StopsCsvTreeNode;
  issues: IssueCollector;
  isIgnored: boolean;
}) {
  if (isIgnored) return;

  const match =
    config.location?.latitude === gtfsNode.stop_lat &&
    config.location?.longitude === gtfsNode.stop_lon;

  if (!match) {
    issues.add({
      message: `Stop ${config.name} (#${config.id}) location expected to be ${gtfsNode.stop_lat}, ${gtfsNode.stop_lon}.`,
    });
  }
}
