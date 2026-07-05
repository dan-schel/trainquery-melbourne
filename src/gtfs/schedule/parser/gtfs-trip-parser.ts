import type { LineCollection } from "corequery";
import type { LineGtfsIdMapping } from "../../ids/line-gtfs-id-mapping.js";
import type { StopGtfsIdMapping } from "../../ids/stop-gtfs-id-mapping.js";
import type {
  StopTimesCsv,
  StopTimesCsvRow,
  TransfersCsv,
  TripsCsv,
  TripsCsvRow,
} from "../csv/csv-schemas.js";
import type { GtfsCalendar } from "../data/gtfs-calendar.js";
import { GtfsTrip } from "../data/gtfs-trip.js";
import {
  CalendarNotFoundForTripError,
  DuplicateTripIdError,
  RouteIdNotMappedError,
  StopTimeWithoutTripError,
  type GtfsTripParsingError,
} from "./errors.js";
import type { LineRoutesConfig } from "../../../config/gtfs/types.js";
import { GtfsStopTimeNormaliser } from "./gtfs-stop-time-normaliser.js";
import { GtfsRouteMatcher } from "./gtfs-route-matcher.js";

export class GtfsTripParser {
  private readonly _stopTimeNormaliser: GtfsStopTimeNormaliser;
  private readonly _routeMatcher: GtfsRouteMatcher;

  constructor(
    // Unlike csvs, lineGtfsIdMapping, and stopGtfsIdMapping, these are not
    // subfeed-dependent, so I'm opting to make them constructor args.
    private readonly _lines: LineCollection,
    private readonly _lineRoutes: LineRoutesConfig,

    private readonly _onError: (error: GtfsTripParsingError) => void,
  ) {
    this._stopTimeNormaliser = new GtfsStopTimeNormaliser(this._onError);
    this._routeMatcher = new GtfsRouteMatcher(
      this._lines,
      this._lineRoutes,
      this._onError,
    );
  }

  parse(
    trips: TripsCsv,
    stopTimes: StopTimesCsv,
    transfers: TransfersCsv,
    calendars: readonly GtfsCalendar[],
    lineGtfsIdMapping: LineGtfsIdMapping,
    stopGtfsIdMapping: StopGtfsIdMapping,
  ): readonly GtfsTrip[] {
    const calendarMap = this._buildCalendarMap(calendars);
    const rowsByTrip = this._organiseStopTimesIntoTrips(trips, stopTimes);

    const result: GtfsTrip[] = [];

    for (const { trip, stopTimes } of rowsByTrip) {
      const calendar = calendarMap.get(trip.service_id);
      if (calendar == null) {
        const { trip_id, service_id } = trip;
        this._onError(new CalendarNotFoundForTripError(trip_id, service_id));
        continue;
      }

      const lineIdMatch = lineGtfsIdMapping.tryResolve(trip.route_id);
      if (lineIdMatch == null) {
        this._onError(new RouteIdNotMappedError(trip.route_id));
        continue;
      }

      const normalizedStopTimes = this._stopTimeNormaliser.normalise(stopTimes);

      // TODO: Instead of using the line routes config object, we should be
      // using a domain model sort of class which handles this default value
      // logic for us. Follows the general principle of `...Config` class is
      // nice for configuration (i.e. is informal, allows optional values), and
      // domain model class is nice for actual usage.
      const routesForLine = this._lineRoutes[lineIdMatch.lineId] ?? [];

      const routeMatchResult = this._routeMatcher.match(
        trip.trip_id,
        normalizedStopTimes,
        routesForLine,
        stopGtfsIdMapping,
      );
      // Route matcher reports its own errors.
      if (routeMatchResult == null) continue;

      // It can't actually work like this, just popped this here so I don't
      // forget. Once all trips constructed in a mutable sense, use the
      // transfers.txt to link them together.
      const previousTrip = null;
      const nextTrip = null;

      result.push(
        new GtfsTrip(
          trip.trip_id,
          trip.route_id,
          calendar,
          routeMatchResult.stops,
          lineIdMatch.lineId,
          routeMatchResult.color,
          routeMatchResult.serviceTags,
          null,
          null,
        ),
      );
    }

    return result;
  }

  private _organiseStopTimesIntoTrips(
    trips: TripsCsv,
    stopTimes: StopTimesCsv,
  ) {
    type MutableGroups = { trip: TripsCsvRow; stopTimes: StopTimesCsvRow[] };
    const result = new Map<string, MutableGroups>();

    // Step 1: Build a map from everything in trips.txt.
    for (const trip of trips) {
      if (result.has(trip.trip_id)) {
        this._onError(new DuplicateTripIdError(trip.trip_id));
        continue;
      }

      result.set(trip.trip_id, { trip, stopTimes: [] });
    }

    // Step 2: Iterate through stop_times.txt and add each row to the
    // appropriate trip.
    for (const stopTime of stopTimes) {
      const trip = result.get(stopTime.trip_id);

      if (trip == null) {
        // It's likely if something's missing from trips.txt that multiple
        // stop_times.txt rows will reference it. However, I consider it out of
        // scope for the parser to group those errors. Something which listens
        // for the errors (i.e. to build some report) is responsible for that.
        this._onError(new StopTimeWithoutTripError(stopTime.trip_id));
        continue;
      }

      trip.stopTimes.push(stopTime);
    }

    // Step 3: Convert to an array and sort the stop times by stop_sequence.
    return Array.from(result.values()).map((group) => ({
      ...group,
      stopTimes: group.stopTimes.sort(
        (a, b) => a.stop_sequence - b.stop_sequence,
      ),
    }));
  }

  private _buildCalendarMap(calendars: readonly GtfsCalendar[]) {
    return new Map<string, GtfsCalendar>(calendars.map((c) => [c.id, c]));
  }
}
