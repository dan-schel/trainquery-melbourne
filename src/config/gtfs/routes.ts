import type { LineRoutesConfig } from "./types.js";
import * as line from "../corequery/lines/line-ids.js";
import * as stop from "../corequery/stops/stop-ids.js";
import * as tag from "../corequery/lines/service-tags.js";
import { withReversedRoute } from "../utils/with-reversed-route.js";
import { formalizeRouteStops } from "../utils/formalize-stops.js";

export const lineRoutes: LineRoutesConfig = {
  // TODO: Fill this out.
  //
  // Then, add tests to ensure:
  // - all lines have at least one route
  // - all stops in a route are in a diagram
  // - all stops in a diagram are in a route
  // - no routes are duplicated
  // - no routes have less than two stops
  // - no routes have duplicate service tags

  [line.CITY_CIRCLE]: withReversedRoute({
    stops: formalizeRouteStops(
      stop.FLINDERS_STREET,
      stop.SOUTHERN_CROSS,
      stop.FLAGSTAFF,
      stop.MELBOURNE_CENTRAL,
      stop.PARLIAMENT,
      stop.FLINDERS_STREET,
    ),
    serviceTags: [tag.CITY_LOOP_CLOCKWISE, tag.VIA_CITY_LOOP],
  }),
};
