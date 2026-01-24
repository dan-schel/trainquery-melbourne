// TODO: This lint rule should go in corequery, along with all the others that
// aren't GTFS/PTV API specific. Even ones like alphabetical ordering. The only
// ones that can't would be those which read source code for the ID files,
// especially comparing against master.
//
// It'd be configured in LintOptions, e.g.:
// const options: LintOptions = {
//   consistentCorridors: [
//     { a: stop.HAWKSBURN, b: stop.DANDENONG },
//   ]
// }

import { itsOk } from "@dan-schel/js-utils";
import * as stop from "../../../../src/config/stops/stop-ids.js";
import type { LintIssueReporter } from "../../lint-issue-reporter.js";
import type { LintingContext } from "../../linting-context.js";
import { requireStopName } from "../../utils/require-stop-name.js";

// If both stops are present in a route, all stops in between them must be
// consistent with the other routes containing those stops.
// TODO: It's probably too meta, but it'd be cool to run a script to check if
// there's any pairs I've missed! Maybe it's something this rule should do, and
// the lint system needs a way to report "info" level messages. It's probably
// gonna be computationally expensive though, and turn up some really trivial
// cases like South Yarra to Richmond.
const corridors = [
  { a: stop.DEER_PARK, b: stop.SOUTHERN_CROSS },
  { a: stop.SUNBURY, b: stop.FOOTSCRAY },
  { a: stop.NEWPORT, b: stop.FLINDERS_STREET },
  { a: stop.FOOTSCRAY, b: stop.SOUTHERN_CROSS },
  { a: stop.CRAIGIEBURN, b: stop.SOUTHERN_CROSS },
  { a: stop.CLIFTON_HILL, b: stop.JOLIMONT },
  { a: stop.RINGWOOD, b: stop.RICHMOND },
  { a: stop.CAMBERWELL, b: stop.RICHMOND },
  { a: stop.BURNLEY, b: stop.RICHMOND },
  { a: stop.EAST_PAKENHAM, b: stop.HAWKSBURN },
  { a: stop.DANDENONG, b: stop.HAWKSBURN },
  { a: stop.CAULFIELD, b: stop.HAWKSBURN },
  { a: stop.CAULFIELD, b: stop.RICHMOND },
  { a: stop.NORTH_MELBOURNE, b: stop.PARLIAMENT },
  { a: stop.RICHMOND, b: stop.FLAGSTAFF },
  { a: stop.CLIFTON_HILL, b: stop.SOUTHERN_CROSS },
];

export function checkCorridorsConsistent(
  ctx: LintingContext,
  reporter: LintIssueReporter,
) {
  const allRoutes = ctx.lintableConfig.lines
    .map((line) =>
      line.routes.map((route) => ({
        lineId: line.id,
        lineName: line.name,
        routeId: route.id,
        routeName: route.name,
        stops: route.stops.map((s) => s.stopId),
      })),
    )
    .flat();

  for (const { a, b } of corridors) {
    const corridorName = `${requireStopName(ctx, a)} to ${requireStopName(ctx, b)}`;

    reporter.scope(corridorName, () => {
      if (a === b) {
        reporter.report("Invalid corridor");
        return;
      }

      const matchingRoutes = allRoutes.filter(
        (r) => r.stops.includes(a) && r.stops.includes(b),
      );

      if (matchingRoutes.length === 0) {
        reporter.report("No matching routes");
        return;
      }

      const trimmedRoutes = matchingRoutes.map((r) => ({
        ...r,
        trimmedStops: r.stops.slice(
          Math.min(r.stops.indexOf(a), r.stops.indexOf(b)),
          Math.max(r.stops.indexOf(a), r.stops.indexOf(b)) + 1,
        ),
      }));

      const refRoute = itsOk(trimmedRoutes[0]);
      const refStops = refRoute.trimmedStops;
      const refReversedStops = [...refStops].reverse();
      const refRouteDesc = `"${refRoute.routeName}" (${refRoute.lineName} line)`;
      const refStopList = refStops
        .map((s) => `  - ${requireStopName(ctx, s)}`)
        .join("\n");

      for (const route of trimmedRoutes) {
        const stops = route.trimmedStops;
        const sameLength = stops.length === refStops.length;
        const matchInOrder = stops.every((s, i) => s === refStops[i]);
        const matchReversed = stops.every((s, i) => s === refReversedStops[i]);
        const isConsistent = sameLength && (matchInOrder || matchReversed);

        if (!isConsistent) {
          const routeDesc = `"${route.routeName}" (${route.lineName} line)`;
          const title = `${refRouteDesc} is inconsistent with ${routeDesc}.`;
          const stopList = stops
            .map((s) => `  - ${requireStopName(ctx, s)}`)
            .join("\n");

          reporter.report(
            title,
            `${refRouteDesc}:\n${refStopList}\n\n${routeDesc}:\n${stopList}`,
          );
          break;
        }
      }
    });
  }
}
