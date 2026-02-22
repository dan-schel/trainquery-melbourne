import type { StopConfig } from "corequery";
import type { StopsCsvTreeNode } from "../../utils/gtfs/stops-csv-tree.js";
import type { StopLintOptions } from "../comparison-options.js";
import type { IssueCollector } from "../issue-collector.js";

export function compareStopLocations(
  issues: IssueCollector,
  stopConfig: StopConfig,
  stopGtfs: StopsCsvTreeNode,
  stopOptions: StopLintOptions,
) {
  const match =
    stopConfig.location?.latitude === stopGtfs.stop_lat &&
    stopConfig.location?.longitude === stopGtfs.stop_lon;

  const ignored = stopOptions.ignoreLocationMismatch ?? false;
  if (!match && !ignored) {
    issues.add({
      message: `Stop ${stopConfig.name} (#${stopConfig.id}) location expected to be ${stopGtfs.stop_lat}, ${stopGtfs.stop_lon}.`,
    });
  }
}
