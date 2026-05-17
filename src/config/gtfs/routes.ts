import type { LineRoutesConfig } from "./types.js";
import * as line from "../corequery/lines/line-ids.js";
import * as stop from "../corequery/stops/stop-ids.js";
import * as tag from "../corequery/lines/service-tags.js";

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

  [line.CITY_CIRCLE]: [
    {
      stops: [
        { stopId: stop.FLINDERS_STREET },
        { stopId: stop.SOUTHERN_CROSS },
        { stopId: stop.FLAGSTAFF },
        { stopId: stop.MELBOURNE_CENTRAL },
        { stopId: stop.PARLIAMENT },
        { stopId: stop.FLINDERS_STREET },
      ],
      serviceTags: [tag.CLOCKWISE, tag.VIA_CITY_LOOP],
    },
    {
      stops: [
        { stopId: stop.FLINDERS_STREET },
        { stopId: stop.PARLIAMENT },
        { stopId: stop.MELBOURNE_CENTRAL },
        { stopId: stop.FLAGSTAFF },
        { stopId: stop.SOUTHERN_CROSS },
        { stopId: stop.FLINDERS_STREET },
      ],
      serviceTags: [tag.ANTICLOCKWISE, tag.VIA_CITY_LOOP],
    },
  ],
};
