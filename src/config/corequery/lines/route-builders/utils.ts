import type {
  LineDiagramConfig,
  LineDiagramStopConfig,
  RouteConfig,
} from "corequery";

export type RouteBuilderStop = {
  readonly stopId: number;
  readonly express?: boolean;
  readonly hidden?: boolean;
};

export type RouteBuilderOutput = {
  readonly routes: readonly RouteConfig[];
  readonly diagram: LineDiagramConfig;
};

type RouteStops = RouteConfig["stops"];

export function toRouteStops(stops: readonly RouteBuilderStop[]): RouteStops {
  return stops.map((stop) => ({
    stopId: stop.stopId,
    type: (stop.hidden ?? false) ? "hidden-unless-stopped-at" : "regular",
  }));
}

export function toDiagramStops(
  stops: readonly RouteBuilderStop[],
): LineDiagramStopConfig[] {
  return stops
    .filter((stop) => !(stop.hidden ?? false))
    .map((stop) => ({
      stopId: stop.stopId,
      type: (stop.express ?? false) ? "always-express" : "regular",
    }));
}
