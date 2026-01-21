import type { AutogenerationContext } from "../autogeneration-context.js";
import type { Subfeed } from "../utils/subfeed.js";

export type ParsedLine = {
  readonly name: string;
  readonly shortName: string;
  readonly gtfsIds: readonly string[];
};

export function extractLinesFromSubfeed(
  ctx: AutogenerationContext,
  subfeed: Subfeed,
): ParsedLine[] {
  const routesCsv = ctx.gtfsData[subfeed].routes;

  const lines: ParsedLine[] = routesCsv.map((route) => ({
    name: route.route_long_name,
    shortName: route.route_short_name,
    gtfsIds: [route.route_id],
  }));

  return lines;
}
