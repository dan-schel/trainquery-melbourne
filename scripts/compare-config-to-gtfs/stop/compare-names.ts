import { cleanupStopName } from "../../utils/gtfs/cleanup-stop-name.js";
import type { IssueCollector } from "../issue-collector.js";
import type { StopComparisonContext } from "./stop-comparison-context.js";

export function compareStopNames(
  ctx: StopComparisonContext,
  issues: IssueCollector,
) {
  const { config, gtfs, options } = ctx.currentStop;

  const sanitizedGtfsName = cleanupStopName(gtfs.stop_name);

  if (config.name !== sanitizedGtfsName) {
    const ignored = options.ignoreNameMismatch ?? false;
    if (!ignored) {
      issues.add({
        message: `Stop ${config.name} (#${config.id}) expected to be named "${sanitizedGtfsName}".`,
      });
    }
  }
}
