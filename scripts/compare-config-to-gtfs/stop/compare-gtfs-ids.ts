import type { IssueCollector } from "../issue-collector.js";
import { flattenStopsCsvTree } from "./utils/flatten-stops-csv-tree.js";
import { reverseMapGtfsIds } from "./utils/reverse-map-gtfs-ids.js";
import type { StopComparisonContext } from "./stop-comparison-context.js";

export function compareStopGtfsIds(
  ctx: StopComparisonContext,
  issues: IssueCollector,
) {
  const { config, gtfs, gtfsIds, options } = ctx.currentStop;

  const gtfsIdList = flattenStopsCsvTree(gtfs);
  const configGtfsIdList = reverseMapGtfsIds(gtfsIds);

  for (const gtfsIdEntry of configGtfsIdList) {
    const match = gtfsIdList.find(
      (gtfsNode) => gtfsNode.stop_id === gtfsIdEntry.gtfsId,
    );

    if (match == null) {
      issues.add({
        message: `GTFS ID "${gtfsIdEntry.gtfsId}" mapped to ${config.name} (#${config.id}) no longer exists or isn't a child of "${gtfs.stop_id}".`,
      });
      continue;
    }
  }

  for (const gtfsNode of gtfsIdList) {
    const ignored = options.ignoreUnmappedChildGtfsId?.(gtfsNode) ?? false;

    const match = configGtfsIdList.find(
      (configEntry) => configEntry.gtfsId === gtfsNode.stop_id,
    );

    if (match == null && !ignored) {
      issues.add({
        message: `GTFS ID "${gtfsNode.stop_id}" is not mapped to ${config.name} (#${config.id}) despite being a child of "${gtfs.stop_id}".`,
      });
    }
  }
}
