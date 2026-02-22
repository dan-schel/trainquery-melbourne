import type { IssueCollector } from "../issue-collector.js";
import { compareStopNames } from "./compare-names.js";
import { compareStopLocations } from "./compare-locations.js";
import { compareStopGtfsIds } from "./compare-gtfs-ids.js";
import type { ComparisonContext } from "../comparison-context.js";
import type { StopComparisonContext } from "./stop-comparison-context.js";

export function compareStops(ctx: ComparisonContext, issues: IssueCollector) {
  for (const stopConfig of ctx.lintableConfig.stops) {
    const stopOptions = {
      ...ctx.options.stops?.all,
      ...ctx.options.stops?.[stopConfig.id],
    };
    const stopGtfsIds = ctx.stopGtfsIds[stopConfig.id];

    if (stopGtfsIds == null) {
      const ignore = stopOptions.ignoreMissingGtfsId ?? false;
      if (!ignore) {
        issues.add({
          message: `No GTFS IDs for stop ${stopConfig.name} (#${stopConfig.id}).`,
        });
      }
      continue;
    }

    const stopGtfs = ctx.stopsCsvTree.nodes.find(
      (stop) => stop.stop_id === stopGtfsIds.parent,
    );

    if (stopGtfs == null) {
      const ignore = stopOptions.ignoreMissingFromGtfs ?? false;
      if (!ignore) {
        issues.add({
          message: `No stop in the GTFS data with ID "${stopGtfsIds.parent}".`,
        });
      }
      continue;
    }

    const stopCtx: StopComparisonContext = {
      ...ctx,
      currentStop: {
        config: stopConfig,
        gtfs: stopGtfs,
        gtfsIds: stopGtfsIds,
        options: stopOptions,
      },
    };
    compareStop(stopCtx, issues);
  }

  for (const stopGtfs of ctx.stopsCsvTree.nodes) {
    const stopConfig = ctx.lintableConfig.stops.find(
      (stop) => ctx.stopGtfsIds[stop.id]?.parent === stopGtfs.stop_id,
    );

    const ignore = (
      ctx.options?.ignoredUnmappedParentStopGtfsIds ?? []
    ).includes(stopGtfs.stop_id);

    if (stopConfig == null && !ignore) {
      issues.add({
        message: `GTFS stop "${stopGtfs.stop_name}" (${stopGtfs.stop_id}) is not mapped.`,
      });
    }
  }
}

function compareStop(stopCtx: StopComparisonContext, issues: IssueCollector) {
  compareStopNames(stopCtx, issues);
  compareStopLocations(stopCtx, issues);
  compareStopGtfsIds(stopCtx, issues);
}
