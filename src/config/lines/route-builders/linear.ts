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

export function linear(options: Options): RouteBuilderOutput {
  return {
    routes: [
      {
        id: route.UP,
        name: "Up",
        tags: [tag.UP],
        stops: toRouteStops(options.stops),
        color: options.color,
      },
      {
        id: route.DOWN,
        name: "Down",
        tags: [tag.DOWN],
        stops: toRouteStops([...options.stops].reverse()),
        color: options.color,
      },
    ],
    diagram: {
      entries: [
        {
          name: null,
          color: options.color,
          stops: toDiagramStops([...options.stops].reverse()),
        },
      ],
    },
  };
}
