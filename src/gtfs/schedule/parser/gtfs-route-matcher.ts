import type { Color, LineCollection } from "corequery";
import type {
  LineRoutesConfig,
  RouteConfig,
} from "../../../config/gtfs/types.js";
import { NoMatchingRouteError, type GtfsRouteMatchingError } from "./errors.js";
import type { StopTimesCsv } from "../csv/csv-schemas.js";
import type { StopGtfsIdMapping } from "../../ids/stop-gtfs-id-mapping.js";
import type { GtfsTripStop } from "../data/gtfs-trip.js";

type MatchedRoute = {
  stops: readonly GtfsTripStop[];
  color: Color;
  serviceTags: readonly number[];
};

export class GtfsRouteMatcher {
  constructor(
    private readonly _lines: LineCollection,
    private readonly _lineRoutes: LineRoutesConfig,
    private readonly _onError: (error: GtfsRouteMatchingError) => void,
  ) {}

  match(
    gtfsTripId: string,
    stopTimes: StopTimesCsv,
    routesForLine: readonly RouteConfig[],
    stopGtfsIdMapping: StopGtfsIdMapping,
  ): MatchedRoute | null {
    // TODO: Implement!

    this._onError(new NoMatchingRouteError(gtfsTripId, []));
    return null;
  }
}
