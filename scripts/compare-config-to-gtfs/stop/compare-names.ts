import type { StopConfig } from "corequery";
import { cleanupStopName } from "../../utils/gtfs/cleanup-stop-name.js";
import type { StopsCsvTreeNode } from "../../utils/gtfs/stops-csv-tree.js";
import type { IssueCollector } from "../issue-collector.js";

export function compareStopNames({
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

  const sanitizedGtfsName = cleanupStopName(gtfsNode.stop_name);

  if (config.name !== sanitizedGtfsName) {
    issues.add({
      message: `Stop ${config.name} (#${config.id}) expected to be named "${sanitizedGtfsName}".`,
    });
  }
}
