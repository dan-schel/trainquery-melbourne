import type { LineDiagramStopConfig } from "corequery";
import type { RouteStopConfig } from "../gtfs/types.js";

export type InformalLineDiagramStopConfig = number | LineDiagramStopConfig;
export type InformalRouteStopConfig = number | RouteStopConfig;

export function formalizeDiagramStops(
  stops: readonly InformalLineDiagramStopConfig[],
): LineDiagramStopConfig[] {
  return stops.map((stop) =>
    typeof stop === "number" ? { stopId: stop, type: "regular" } : stop,
  );
}

export function formalizeRouteStops(
  stops: readonly InformalRouteStopConfig[],
): RouteStopConfig[] {
  return stops.map((stop) =>
    typeof stop === "number"
      ? { stopId: stop, collapseInStoppingPatterns: false }
      : stop,
  );
}
