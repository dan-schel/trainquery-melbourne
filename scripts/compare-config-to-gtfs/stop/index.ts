import type { StopConfig } from "corequery";
import type { IssueCollector } from "../issue-collector.js";
import type { StopLintOptions } from "../comparison-options.js";
import type {
  StopsCsvTree,
  StopsCsvTreeNode,
} from "../../utils/gtfs/stops-csv-tree.js";
import type {
  StopGtfsIdMapping,
  StopGtfsIds,
} from "../../../src/config/third-party-id-mapping-types.js";
import { compareStopNames } from "./compare-names.js";

export function compareStops(
  issues: IssueCollector,
  stopsConfigs: readonly StopConfig[],
  stopsCsvTree: StopsCsvTree,
  stopsGtfsIds: StopGtfsIdMapping,
  stopsOptions: Record<number, StopLintOptions>,
  ignoredUnmappedGtfsStops: string[],
) {
  for (const stopConfig of stopsConfigs) {
    const stopOptions = stopsOptions[stopConfig.id] ?? {};
    const stopGtfsIds = stopsGtfsIds[stopConfig.id];

    if (stopGtfsIds == null) {
      const ignore = stopOptions.ignoreMissingGtfsId ?? false;
      if (!ignore) {
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
      const ignore = stopOptions.ignoreMissingFromGtfs ?? false;
      if (!ignore) {
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

    const ignore = ignoredUnmappedGtfsStops.includes(stopGtfs.stop_id);
    if (stopConfig == null && !ignore) {
      issues.add({
        message: `GTFS stop "${stopGtfs.stop_name}" (${stopGtfs.stop_id}) is not mapped.`,
      });
    }
  }
}

function compareStop(
  issues: IssueCollector,
  stopConfig: StopConfig,
  stopGtfs: StopsCsvTreeNode,
  stopGtfsIds: StopGtfsIds,
  stopOptions: StopLintOptions,
) {
  compareStopNames(issues, stopConfig, stopGtfs, stopOptions);
}
