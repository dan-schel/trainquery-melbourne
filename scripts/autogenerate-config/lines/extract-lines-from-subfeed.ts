import { groupBy } from "@dan-schel/js-utils";
import type { AutogenerationContext } from "../autogeneration-context.js";
import type { RoutesCsv, RoutesCsvRow } from "../gtfs/csv-schemas.js";
import type { Subfeed } from "../utils/subfeed.js";
import { findRoutesForLine, type ParsedRoute } from "./find-routes-for-line.js";

export type ParsedLineGtfsId = {
  readonly id: string;
  readonly type: "train" | "replacement-bus";
};

export type ParsedLine<RouteType extends ParsedRoute = ParsedRoute> = {
  readonly name: string;
  readonly shortName: string;
  readonly gtfsIds: readonly ParsedLineGtfsId[];
  readonly routes: readonly RouteType[];
};

type GroupedLine = {
  readonly primary: RoutesCsvRow;
  readonly replacementBus: RoutesCsvRow | null;
};

export function extractLinesFromSubfeed(
  ctx: AutogenerationContext,
  subfeed: Subfeed,
): ParsedLine[] {
  const routesCsv = ctx.gtfsData[subfeed].routes;
  const rawLines = groupIntoLines(routesCsv);

  const lines: ParsedLine[] = rawLines.map((line) => {
    const gtfsIds: ParsedLineGtfsId[] = [
      { id: line.primary.route_id, type: "train" },
    ];

    if (line.replacementBus != null) {
      gtfsIds.push({
        id: line.replacementBus.route_id,
        type: "replacement-bus",
      });
    }

    const routes = findRoutesForLine(ctx, subfeed, line.primary.route_id);

    return {
      name: line.primary.route_long_name,
      shortName: line.primary.route_short_name,
      gtfsIds: gtfsIds,
      routes,
    };
  });

  return lines;
}

function groupIntoLines(routesCsv: RoutesCsv): GroupedLine[] {
  const groups = groupBy(routesCsv, (r) => r.route_id.replace(/-R:$/, ":"));

  const result = groups.map(({ items }) => {
    if (items.length > 2) throw new Error("Unexpected group size.");

    const primary = items.find((r) => !r.route_id.endsWith("-R:"));
    const replacementBus = items.find((r) => r.route_id.endsWith("-R:"));

    if (primary == null) throw new Error("Missing primary route.");

    return {
      primary,
      replacementBus: replacementBus ?? null,
    };
  });

  return result;
}
