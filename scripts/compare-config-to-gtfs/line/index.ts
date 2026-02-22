import { nonNull } from "@dan-schel/js-utils";
import type { ComparisonContext } from "../comparison-context.js";
import type { IssueCollector } from "../issue-collector.js";
import type { LineComparisonContext } from "./line-comparison-context.js";
import { reverseMapGtfsIds } from "./utils/reverse-map-gtfs-ids.js";
import { checkLineTripCompatibility } from "./check-trip-compatibility.js";

export function compareLines(ctx: ComparisonContext, issues: IssueCollector) {
  const allGtfsRoutes = [
    ...ctx.gtfsData.suburban.routes,
    ...ctx.gtfsData.regional.routes,
  ];

  for (const lineConfig of ctx.lintableConfig.lines) {
    const lineOptions = {
      ...ctx.options.lines?.all,
      ...ctx.options.lines?.[lineConfig.id],
    };
    const lineGtfsIds = ctx.lineGtfsIds[lineConfig.id];

    if (lineGtfsIds == null) {
      const ignore = lineOptions.ignoreMissingGtfsId ?? false;
      if (!ignore) {
        issues.add({
          message: `No GTFS IDs for line ${lineConfig.name} (#${lineConfig.id}).`,
        });
      }
      continue;
    }

    const lineGtfsIdList = reverseMapGtfsIds(lineGtfsIds);
    const routesGtfs = lineGtfsIdList.map(
      (gtfsId) =>
        allGtfsRoutes.find((route) => route.route_id === gtfsId.gtfsId) ?? null,
    );

    for (const [index, gtfsId] of lineGtfsIdList.entries()) {
      if (routesGtfs[index] == null) {
        issues.add({
          message: `No route in the GTFS data with ID "${gtfsId.gtfsId}".`,
        });
      }
    }

    const lineCtx: LineComparisonContext = {
      ...ctx,
      currentLine: {
        config: lineConfig,
        routesGtfs: routesGtfs.filter(nonNull),
        gtfsIds: lineGtfsIds,
        options: lineOptions,
      },
    };
    compareLine(lineCtx, issues);
  }

  for (const routeGtfs of allGtfsRoutes) {
    const lineConfig = ctx.lintableConfig.lines.find((line) => {
      const gtfsIds = ctx.lineGtfsIds[line.id];
      if (gtfsIds == null) return false;

      const gtfsIdList = reverseMapGtfsIds(gtfsIds);
      return gtfsIdList.some((entry) => entry.gtfsId === routeGtfs.route_id);
    });

    const ignore = (ctx.options?.ignoredUnmappedGtfsRouteIds ?? []).includes(
      routeGtfs.route_id,
    );

    if (lineConfig == null && !ignore) {
      issues.add({
        message: `GTFS route "${routeGtfs.route_id}" ("${routeGtfs.route_long_name}") is not mapped.`,
      });
    }
  }
}

function compareLine(ctx: LineComparisonContext, issues: IssueCollector) {
  checkLineTripCompatibility(ctx, issues);
}
