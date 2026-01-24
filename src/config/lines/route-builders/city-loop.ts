import type { Color } from "corequery";
import * as route from "../route-ids.js";
import * as tag from "../route-tags.js";
import * as stop from "../../stops/stop-ids.js";
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

export function cityLoop(options: Options): RouteBuilderOutput {
  const portalStop = options.stops.at(-1)?.stopId;
  if (portalStop == null) throw new Error("No stops provided.");

  const upViaCityLoopStops = [
    ...options.stops,
    ...getCityStops(portalStop, "via-city-loop"),
  ];
  const viaDirectStops = [
    ...options.stops,
    ...getCityStops(portalStop, "direct"),
  ];

  return {
    routes: [
      {
        id: route.UP_VIA_CITY_LOOP,
        name: "Up via City Loop",
        tags: [tag.UP_VIA_CITY_LOOP],
        stops: toRouteStops(upViaCityLoopStops),
        color: options.color,
      },
      {
        id: route.DOWN_VIA_CITY_LOOP,
        name: "Down via City Loop",
        tags: [tag.DOWN_VIA_CITY_LOOP],
        stops: toRouteStops([...upViaCityLoopStops].reverse()),
        color: options.color,
      },
      {
        id: route.UP_DIRECT,
        name: "Up Direct",
        tags: [tag.UP_DIRECT],
        stops: toRouteStops(viaDirectStops),
        color: options.color,
      },
      {
        id: route.DOWN_DIRECT,
        name: "Down Direct",
        tags: [tag.DOWN_DIRECT],
        stops: toRouteStops([...viaDirectStops].reverse()),
        color: options.color,
      },
    ],
    diagram: {
      entries: [
        {
          name: "Via City Loop",
          color: options.color,
          stops: toDiagramStops([...upViaCityLoopStops].reverse()),
        },
        {
          name: "Direct",
          color: options.color,
          stops: toDiagramStops([...viaDirectStops].reverse()),
        },
      ],
    },
  };
}

function getCityStops(
  portalStopId: number,
  route: "via-city-loop" | "direct",
): readonly RouteBuilderStop[] {
  if (portalStopId === stop.RICHMOND || portalStopId === stop.JOLIMONT) {
    return route === "via-city-loop"
      ? [
          { stopId: stop.PARLIAMENT },
          { stopId: stop.MELBOURNE_CENTRAL },
          { stopId: stop.FLAGSTAFF },
          { stopId: stop.SOUTHERN_CROSS },
          { stopId: stop.FLINDERS_STREET },
        ]
      : [{ stopId: stop.FLINDERS_STREET }];
  } else if (portalStopId === stop.NORTH_MELBOURNE) {
    return route === "via-city-loop"
      ? [
          { stopId: stop.FLAGSTAFF },
          { stopId: stop.MELBOURNE_CENTRAL },
          { stopId: stop.PARLIAMENT },
          { stopId: stop.FLINDERS_STREET },
        ]
      : [{ stopId: stop.SOUTHERN_CROSS }, { stopId: stop.FLINDERS_STREET }];
  } else {
    throw new Error("Invalid portal stop for city loop route.");
  }
}
