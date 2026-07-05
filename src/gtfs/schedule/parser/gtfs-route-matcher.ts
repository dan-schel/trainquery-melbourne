import type { Color } from "corequery";
import type { RouteConfig } from "../../../config/gtfs/types.js";
import {
  InvalidGtfsTimeStringError,
  NoMatchingRouteError,
  StopIdNotMappedError,
  UnexpectedDropOffTypeError,
  UnexpectedPickupTypeError,
  type GtfsRouteMatchingError,
} from "./errors.js";
import type { StopTimesCsv, StopTimesCsvRow } from "../csv/csv-schemas.js";
import type { StopGtfsIdMapping } from "../../ids/stop-gtfs-id-mapping.js";
import type { GtfsTripServicedStop, GtfsTripStop } from "../data/gtfs-trip.js";
import { GtfsStopTime } from "../data/gtfs-stop-time.js";
import { isSubsequence } from "../../../utils/is-subsequence.js";

const STOP_TIME_PICKUP_TYPE_REGULAR = 0;
const STOP_TIME_PICKUP_TYPE_NO_PICKUP = 1;
const STOP_TIME_DROP_OFF_TYPE_REGULAR = 0;
const STOP_TIME_DROP_OFF_TYPE_NO_DROP_OFF = 1;

type MatchedRoute = {
  stops: readonly GtfsTripStop[];
  color: Color;
  serviceTags: readonly number[];
};

export class GtfsRouteMatcher {
  constructor(
    private readonly _onError: (error: GtfsRouteMatchingError) => void,
  ) {}

  match(
    gtfsTripId: string,
    stopTimes: StopTimesCsv,
    routesForLine: readonly RouteConfig[],
    stopGtfsIdMapping: StopGtfsIdMapping,
  ): MatchedRoute | null {
    const stops = this._convertToStops(
      gtfsTripId,
      stopTimes,
      stopGtfsIdMapping,
    );
    if (stops == null) return null;

    const match = this._matchToRoute(stops, routesForLine);
    if (match == null) {
      const stopIds = stops.map((stop) => stop.stopId);

      // TODO: It feels unclear to me at which level I should be logging errors
      // like this, e.g. for _convertToStops it gets logged inside the method,
      // but for _matchToRoute I need to remember to do it here. How can I be
      // consistent/ensure that it's not missed or duplicated?
      this._onError(new NoMatchingRouteError(gtfsTripId, stopIds));
      return null;
    }

    return match;
  }

  private _matchToRoute(
    servedStops: readonly GtfsTripServicedStop[],
    routesForLine: readonly RouteConfig[],
  ): MatchedRoute | null {
    // Step 1: Find the shortest route for this line which contains all the
    // stops listed in the trip as a subsequence.
    const shortestMatch = routesForLine
      .filter((route) => {
        const routeStops = route.stops.map((stop) => stop.stopId);
        const tripStops = servedStops.map((stop) => stop.stopId);
        return isSubsequence(tripStops, routeStops);
      })
      .reduce<RouteConfig | null>((prev, me) => {
        return prev == null || me.stops.length < prev.stops.length ? me : prev;
      }, null);

    if (shortestMatch == null) return null;
    const { color, serviceTags } = shortestMatch;

    // Step 2: Since stop_times.txt in GTFS only lists the stops the service
    // actually serves (i.e. it doesn't have the express stops), use the matched
    // route as a guide for which stops the service skipped, and add those into
    // the list as express stops.
    const stops = this._addExpressStopsFromRoute(servedStops, shortestMatch);

    return { stops, color, serviceTags };
  }

  private _addExpressStopsFromRoute(
    stops: readonly GtfsTripServicedStop[],
    matchingRoute: RouteConfig,
  ) {
    const result: GtfsTripStop[] = [];

    let nextServicedStopIndex = 0;

    // Broadly: Iterate through the route's stops, and step through the trip
    // stops simultaneously when they match. Add all route stops between first
    // and last trip stops as serviced stops where found or express stops
    // otherwise.
    for (const routeStop of matchingRoute.stops) {
      const nextServicedStop = stops[nextServicedStopIndex];

      // If there's no next serviced stop, then nextServicedStopIndex must be
      // off the end of the array, so we're done (the service has terminated).
      if (nextServicedStop == null) break;

      if (routeStop.stopId === nextServicedStop.stopId) {
        // When the next stop from the trip matches the one in the route we're
        // up to, add a `type: "serviced"` stop.
        result.push(nextServicedStop);
        nextServicedStopIndex++;
      } else if (
        nextServicedStopIndex > 0 &&
        !routeStop.collapseInStoppingPatterns
      ) {
        // Otherwise the stop from the route is an `type: "express"` stop.
        // `nextServicedStopIndex > 0` stops us adding express stops from the
        // route before the service originates.
        //
        // For now, I'm skipping adding `collapseInStoppingPatterns` stops as
        // express stops. This flag means we don't want this stop to show up in
        // stopping patterns normally, unless it's serviced (e.g. East Pakenham
        // on the Gippsland line is one of these). I'm assuming there's nothing
        // downstream that'll need to consider these collapsed stops.
        //
        // (If I need to reconsider this decision for some reason, maybe instead
        // of adding those stops back in to this array with some sort of flag, I
        // could consider adding the matched route itself as metadata to the
        // trip? Probably having the index of the route stop in this array will
        // be useful to reconcile the two.)
        result.push({
          type: "express",
          stopId: routeStop.stopId,
        });
      }
    }

    return result;
  }

  /**
   * Take the rows from stop_times.txt and form GtfsTripServicedStop for each.
   * Note that express stops are not added at this stage. They're sprinkled in
   * later once we've matched the trip to a route.
   */
  private _convertToStops(
    gtfsTripId: string,
    stopTimes: StopTimesCsv,
    stopGtfsIdMapping: StopGtfsIdMapping,
  ): readonly GtfsTripServicedStop[] | null {
    const result: GtfsTripServicedStop[] = [];

    for (const stopTime of stopTimes) {
      const gtfsStopId = stopTime.stop_id;

      const gtfsIdMetadata = stopGtfsIdMapping.tryResolve(gtfsStopId);
      if (gtfsIdMetadata == null) {
        this._onError(new StopIdNotMappedError(gtfsTripId, gtfsStopId));
        return null;
      }

      const positionId =
        gtfsIdMetadata.type === "platform" ? gtfsIdMetadata.positionId : null;

      const arrivalTime = GtfsStopTime.tryParse(stopTime.arrival_time);
      if (arrivalTime == null) {
        this._onError(
          new InvalidGtfsTimeStringError(
            gtfsTripId,
            gtfsStopId,
            stopTime.arrival_time,
            "arrival_time",
          ),
        );
        return null;
      }

      const departureTime = GtfsStopTime.tryParse(stopTime.departure_time);
      if (departureTime == null) {
        this._onError(
          new InvalidGtfsTimeStringError(
            gtfsTripId,
            gtfsStopId,
            stopTime.departure_time,
            "departure_time",
          ),
        );
        return null;
      }

      result.push({
        type: "serviced",
        stopId: gtfsIdMetadata.stopId,
        positionId,
        arrivalTime,
        departureTime,
        picksUp: this._doesPickUp(stopTime),
        dropsOff: this._doesDropOff(stopTime),
        gtfsIdMetadata,
      });
    }

    return result;
  }

  private _doesPickUp(stopTime: StopTimesCsvRow): boolean {
    if (stopTime.pickup_type === STOP_TIME_PICKUP_TYPE_REGULAR) {
      return true;
    } else if (stopTime.pickup_type === STOP_TIME_PICKUP_TYPE_NO_PICKUP) {
      return false;
    } else {
      this._onError(
        new UnexpectedPickupTypeError(
          stopTime.trip_id,
          stopTime.stop_id,
          stopTime.pickup_type,
        ),
      );

      // If pickup_type is unexpected, let's just treat it like a normal stop. I
      // don't think we need to exclude the whole trip for something as minor as
      // mislabelling pick up only stops.
      return true;
    }
  }

  private _doesDropOff(stopTime: StopTimesCsvRow): boolean {
    if (stopTime.drop_off_type === STOP_TIME_DROP_OFF_TYPE_REGULAR) {
      return true;
    } else if (stopTime.drop_off_type === STOP_TIME_DROP_OFF_TYPE_NO_DROP_OFF) {
      return false;
    } else {
      this._onError(
        new UnexpectedDropOffTypeError(
          stopTime.trip_id,
          stopTime.stop_id,
          stopTime.drop_off_type,
        ),
      );

      // If drop_off_type is unexpected, let's just treat it like a normal stop.
      // I don't think we need to exclude the whole trip for something as minor
      // as mislabelling drop off only stops.
      return true;
    }
  }
}
