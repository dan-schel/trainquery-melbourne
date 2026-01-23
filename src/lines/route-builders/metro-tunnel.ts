import type { Color } from "corequery";
import * as route from "../route-ids.js";
import * as tag from "../route-tags.js";
import {
  toDiagramStops,
  toRouteStops,
  type RouteBuilderOutput,
  type RouteBuilderStop,
} from "./utils.js";

type Options = {
  color: Color;
  stops: readonly RouteBuilderStop[];
};

export function metroTunnel(options: Options): RouteBuilderOutput {
  return {
    routes: [
      {
        id: route.UP_VIA_METRO_TUNNEL,
        name: "Up",
        tags: [tag.UP_VIA_METRO_TUNNEL],
        stops: toRouteStops(options.stops),
        color: options.color,
      },
      {
        id: route.DOWN_VIA_METRO_TUNNEL,
        name: "Down via Metro Tunnel",
        tags: [tag.DOWN_VIA_METRO_TUNNEL],
        stops: toRouteStops([...options.stops].reverse()),
        color: options.color,
      },
    ],
    diagram: {
      entries: [
        {
          name: "Via Metro Tunnel",
          color: options.color,
          stops: toDiagramStops([...options.stops].reverse()),
        },
      ],
    },
  };
}
