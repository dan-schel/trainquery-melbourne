import type { IssueCollector } from "../issue-collector.js";
import type { StopComparisonContext } from "./stop-comparison-context.js";

export function compareStopLocations(
  ctx: StopComparisonContext,
  issues: IssueCollector,
) {
  const { config, gtfs, options } = ctx.currentStop;

  const match =
    config.location?.latitude === gtfs.stop_lat &&
    config.location?.longitude === gtfs.stop_lon;

  const ignored = options.ignoreLocationMismatch ?? false;
  if (!match && !ignored) {
    issues.add({
      message: `Stop ${config.name} (#${config.id}) location expected to be ${gtfs.stop_lat}, ${gtfs.stop_lon}.`,
    });
  }
}
