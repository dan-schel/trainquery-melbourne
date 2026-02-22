import type { StopConfig } from "corequery";
import type { StopsCsvTreeNode } from "../../utils/gtfs/stops-csv-tree.js";
import type { StopLintOptions } from "../comparison-options.js";
import type { IssueCollector } from "../issue-collector.js";

export function compareStopNames(
  issues: IssueCollector,
  stopConfig: StopConfig,
  stopGtfs: StopsCsvTreeNode,
  stopOptions: StopLintOptions,
) {
  const sanitizedGtfsName = stopGtfs.stop_name
    .trim()
    .replace(/( Railway)? Station$/g, "");

  if (stopConfig.name !== sanitizedGtfsName) {
    const ignored = stopOptions.ignoreNameMismatch ?? false;
    if (!ignored) {
      issues.add({
        message: `Stop ${stopConfig.name} (#${stopConfig.id}) expected to be named "${sanitizedGtfsName}".`,
      });
    }
  }
}
