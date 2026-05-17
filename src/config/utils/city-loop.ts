import type { LoopLineDiagramShapeConfig } from "corequery";
import type { RouteConfig } from "../gtfs/types.js";
import {
  formalizeDiagramStops,
  formalizeRouteStops,
  type InformalLineDiagramStopConfig,
  type InformalRouteStopConfig,
} from "./formalize-stops.js";
import { withReversedRoutes } from "./with-reversed-routes.js";
import * as stop from "../corequery/stops/stop-ids.js";
import * as tag from "../corequery/lines/service-tags.js";

export function createCityLoopRoutes(
  stops: readonly InformalRouteStopConfig[],
): readonly RouteConfig[] {
  const formalStops = formalizeRouteStops(stops);

  const portalStop = formalStops[0]?.stopId;
  if (portalStop == null) throw new Error("No stops provided.");

  return withReversedRoutes([
    {
      stops: [
        ...formalizeRouteStops(getCityStops(portalStop, "via-city-loop")),
        ...formalStops,
      ],
      serviceTags: [
        tag.OUTBOUND,
        tag.VIA_CITY_LOOP,
        getLoopDirectionTag(portalStop, "via-city-loop"),
      ],
    },
    {
      stops: [
        ...formalizeRouteStops(getCityStops(portalStop, "direct")),
        ...formalStops,
      ],
      serviceTags: [tag.OUTBOUND, getLoopDirectionTag(portalStop, "direct")],
    },
  ]);
}

export function createCityLoopDiagramShape(
  stops: readonly InformalLineDiagramStopConfig[],
): LoopLineDiagramShapeConfig {
  const formalStops = formalizeDiagramStops(stops);

  const portalStop = formalStops[0]?.stopId;
  if (portalStop == null) throw new Error("No stops provided.");

  return {
    type: "loop",
    mainStops: formalStops,
    ...getDiagramStops(portalStop),
  };
}

function getCityStops(
  portalStopId: number,
  route: "via-city-loop" | "direct",
): readonly number[] {
  if (portalStopId === stop.RICHMOND || portalStopId === stop.JOLIMONT) {
    return route === "via-city-loop"
      ? [
          stop.FLINDERS_STREET,
          stop.SOUTHERN_CROSS,
          stop.FLAGSTAFF,
          stop.MELBOURNE_CENTRAL,
          stop.PARLIAMENT,
        ]
      : [stop.FLINDERS_STREET];
  } else if (portalStopId === stop.NORTH_MELBOURNE) {
    return route === "via-city-loop"
      ? [
          stop.FLINDERS_STREET,
          stop.PARLIAMENT,
          stop.MELBOURNE_CENTRAL,
          stop.FLAGSTAFF,
        ]
      : [stop.FLINDERS_STREET, stop.SOUTHERN_CROSS];
  } else {
    throw new Error("Invalid portal stop for city loop route.");
  }
}

function getLoopDirectionTag(
  portalStopId: number,
  route: "via-city-loop" | "direct",
): number {
  if (portalStopId === stop.RICHMOND || portalStopId === stop.JOLIMONT) {
    return route === "via-city-loop"
      ? tag.CITY_LOOP_CLOCKWISE
      : tag.CITY_LOOP_ANTICLOCKWISE;
  } else if (portalStopId === stop.NORTH_MELBOURNE) {
    return route === "via-city-loop"
      ? tag.CITY_LOOP_ANTICLOCKWISE
      : tag.CITY_LOOP_CLOCKWISE;
  } else {
    throw new Error("Invalid portal stop for city loop route.");
  }
}

function getDiagramStops(
  portalStopId: number,
): Pick<LoopLineDiagramShapeConfig, "loopLeftStops" | "loopRightStops"> {
  if (portalStopId === stop.RICHMOND || portalStopId === stop.JOLIMONT) {
    return {
      loopLeftStops: formalizeDiagramStops([
        stop.SOUTHERN_CROSS,
        stop.FLINDERS_STREET,
      ]),
      loopRightStops: formalizeDiagramStops([
        stop.FLAGSTAFF,
        stop.MELBOURNE_CENTRAL,
        stop.PARLIAMENT,
      ]),
    };
  } else if (portalStopId === stop.NORTH_MELBOURNE) {
    return {
      loopLeftStops: formalizeDiagramStops([
        stop.PARLIAMENT,
        stop.MELBOURNE_CENTRAL,
        stop.FLAGSTAFF,
      ]),
      loopRightStops: formalizeDiagramStops([
        stop.FLINDERS_STREET,
        stop.SOUTHERN_CROSS,
      ]),
    };
  } else {
    throw new Error("Invalid portal stop for city loop route.");
  }
}
