import { unique } from "@dan-schel/js-utils";
import type { AutogenerationContext } from "../autogeneration-context.js";
import { syncIds } from "../utils/sync-ids.js";
import type { ParsedLine } from "./extract-lines-from-subfeed.js";

export function syncRouteIds<T extends ParsedLine>(
  ctx: AutogenerationContext,
  lines: T[],
) {
  const routes = unique(
    lines.flatMap((line) => line.routes.map((r) => ({ name: r.name }))),
    (a, b) => a.name === b.name,
  );

  const routesWithIds = syncIds(ctx.routeIds, routes);

  return lines.map((line) => ({
    ...line,
    routes: line.routes.map((route) => {
      const id = routesWithIds.find((r) => r.name === route.name);
      if (id == null) throw new Error("Route ID not found.");

      return { ...route, ...id };
    }),
  }));
}
