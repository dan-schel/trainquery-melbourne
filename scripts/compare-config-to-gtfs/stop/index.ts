import type { StopConfig } from "corequery";
import type { IssueCollector } from "../issue-collector.js";
import { compareStop } from "./compare-stop.js";
import type { StopLintOptions } from "../comparison-options.js";
import type { StopsCsvTree } from "../../utils/gtfs/stops-csv-tree.js";
import type { StopGtfsIdMapping } from "../../../src/config/third-party-id-mapping-types.js";

export function compareStops(
  issues: IssueCollector,
  stopsConfigs: readonly StopConfig[],
  stopsCsvTree: StopsCsvTree,
  stopsGtfsIds: StopGtfsIdMapping,
  stopsOptions: Record<number, StopLintOptions>,
) {
  for (const stopConfig of stopsConfigs) {
    const stopOptions = stopsOptions[stopConfig.id] ?? {};
    const stopGtfsIds = stopsGtfsIds[stopConfig.id];

    if (stopGtfsIds == null) {
      if (stopOptions.ignoreMissingGtfsId ?? false) {
        issues.add({
          message: `No GTFS IDs for stop ${stopConfig.name} (#${stopConfig.id}).`,
        });
      }
      continue;
    }

    const stopGtfs = stopsCsvTree.nodes.find(
      (stop) => stop.stop_id === stopGtfsIds.parent,
    );

    if (stopGtfs == null) {
      if (stopOptions.ignoreMissingFromGtfs ?? false) {
        issues.add({
          message: `No stop in the GTFS with ID "${stopGtfsIds.parent}".`,
        });
      }
      continue;
    }

    compareStop(issues, stopConfig, stopGtfs, stopGtfsIds, stopOptions);
  }

  for (const stopGtfs of stopsCsvTree.nodes) {
    const stopConfig = stopsConfigs.find(
      (stop) => stopsGtfsIds[stop.id]?.parent === stopGtfs.stop_id,
    );

    if (stopConfig == null) {
      issues.add({
        message: `GTFS stop "${stopGtfs.stop_name}" (${stopGtfs.stop_id}) is not mapped.`,
      });
    }
  }
}
