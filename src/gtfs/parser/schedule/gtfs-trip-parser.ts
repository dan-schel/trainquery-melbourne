import type { LineGtfsIdMapping } from "../../data/ids/line-gtfs-id-mapping.js";
import type { StopGtfsIdMapping } from "../../data/ids/stop-gtfs-id-mapping.js";
import type {
  StopTimesCsv,
  StopTimesCsvRow,
  TransfersCsv,
  TripsCsv,
  TripsCsvRow,
} from "../../retrieval/schedule/csv-schemas.js";
import type { GtfsCalendar } from "../../data/gtfs-calendar.js";
import { GtfsScheduledTrip } from "../../data/gtfs-scheduled-trip.js";
import {
  GtfsStopTimeNormaliser,
  type GtfsStopTimeNormalisationError,
} from "./gtfs-stop-time-normaliser.js";
import {
  GtfsRouteMatcher,
  type GtfsRouteMatchingError,
  type MatchedRoute,
} from "./gtfs-route-matcher.js";
import {
  type GtfsTransferConnectionError,
  GtfsTransferConnector,
} from "./gtfs-transfer-connector.js";
import type { LineRoutes } from "../../data/route/line-routes.js";
import type { LineOverrides } from "../../data/route/line-overrides.js";
import { unique } from "@dan-schel/js-utils";

export class GtfsTripParser {
  private readonly _stopTimeNormaliser: GtfsStopTimeNormaliser;
  private readonly _routeMatcher: GtfsRouteMatcher;
  private readonly _transferConnector: GtfsTransferConnector;

  constructor(
    // Unlike csvs, lineGtfsIdMapping, and stopGtfsIdMapping, these are not
    // subfeed-dependent, so I'm opting to make them constructor args.
    private readonly _lineRoutes: LineRoutes,
    private readonly _lineOverrides: LineOverrides,

    private readonly _onError: (error: GtfsTripParsingError) => void,
  ) {
    this._stopTimeNormaliser = new GtfsStopTimeNormaliser(this._onError);
    this._routeMatcher = new GtfsRouteMatcher(this._onError);
    this._transferConnector = new GtfsTransferConnector(this._onError);
  }

  parse(
    trips: TripsCsv,
    stopTimes: StopTimesCsv,
    transfers: TransfersCsv,
    calendars: readonly GtfsCalendar[],
    lineGtfsIdMapping: LineGtfsIdMapping,
    stopGtfsIdMapping: StopGtfsIdMapping,
  ): readonly GtfsScheduledTrip[] {
    const calendarMap = this._buildCalendarMap(calendars);
    const rowsByTrip = this._organiseStopTimesIntoTrips(trips, stopTimes);

    const unconnectedTrips: GtfsScheduledTrip[] = [];

    for (const { trip, stopTimes } of rowsByTrip) {
      const calendar = calendarMap.get(trip.service_id);
      if (calendar == null) {
        this._onError(new TripReferencesNonExistentCalendarError(trip));
        continue;
      }

      const lineIdMatch = lineGtfsIdMapping.tryResolve(trip.route_id);
      if (lineIdMatch == null) {
        this._onError(new TripReferencesUnmappedRouteIdError(trip));
        continue;
      }

      if (lineIdMatch.type === "replacement-bus") continue;

      const normalizedStopTimes = this._stopTimeNormaliser.normalise(stopTimes);
      // Stop time normaliser reports its own errors.
      if (normalizedStopTimes == null) continue;

      const routesForLine = this._lineRoutes.forLine(lineIdMatch.lineId);

      const routeMatchResult = this._routeMatcher.match(
        normalizedStopTimes,
        routesForLine,
        stopGtfsIdMapping,
      );
      // Route matcher reports its own errors.
      if (routeMatchResult == null) continue;

      // TODO: Split the below into new function.
      const overrideForLine = this._lineOverrides.forLine(lineIdMatch.lineId);
      if (overrideForLine != null) {
        const additionalMatches = overrideForLine.lines
          .map((l) => ({
            result: this._routeMatcher.match(
              normalizedStopTimes,
              this._lineRoutes.forLine(l),
              stopGtfsIdMapping,
            ),
            lineId: l,
          }))
          .filter(
            (r): r is { result: MatchedRoute; lineId: number } =>
              r.result != null,
          );

        const replaceMode = overrideForLine.mode === "replace";

        const lineIds = unique([
          ...(replaceMode ? [] : [lineIdMatch.lineId]),
          ...additionalMatches.map((match) => match.lineId),
        ]);
        const serviceTags = unique([
          ...(replaceMode ? [] : routeMatchResult.serviceTags),
          ...additionalMatches.flatMap((match) => match.result.serviceTags),
        ]);

        unconnectedTrips.push(
          new GtfsScheduledTrip({
            gtfsTripId: trip.trip_id,
            gtfsRouteId: trip.route_id,
            calendar,
            movements: routeMatchResult.movements,
            lineIds: lineIds,
            color: routeMatchResult.color,
            serviceTags: serviceTags,
            previousTrip: null,
            nextTrip: null,
          }),
        );
      } else {
        unconnectedTrips.push(
          new GtfsScheduledTrip({
            gtfsTripId: trip.trip_id,
            gtfsRouteId: trip.route_id,
            calendar,
            movements: routeMatchResult.movements,
            lineIds: [lineIdMatch.lineId],
            color: routeMatchResult.color,
            serviceTags: routeMatchResult.serviceTags,
            previousTrip: null,
            nextTrip: null,
          }),
        );
      }
    }

    return this._transferConnector.connect(unconnectedTrips, transfers);
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
        // We only keep the first trip we see for a given trip_id, I guess.
        this._onError(new DuplicateTripIdError(trip));
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
        this._onError(new StopTimeReferencesNonExistentTripError(stopTime));
        continue;
      }

      trip.stopTimes.push(stopTime);
    }

    // Step 3: Convert to an array. Do NOT sort by stop_sequence, as the stop
    // time normaliser is interested in the original order of the rows in
    // stop_times.txt for some special case handling (i.e. PTV has published
    // invalid data, but we can still interpret it).
    return Array.from(result.values()).map((group) => ({
      ...group,
      stopTimes: group.stopTimes,
    }));
  }

  private _buildCalendarMap(calendars: readonly GtfsCalendar[]) {
    return new Map<string, GtfsCalendar>(
      calendars.map((c) => [c.gtfsCalendarId, c]),
    );
  }
}

export type GtfsTripParsingError =
  | StopTimeReferencesNonExistentTripError
  | DuplicateTripIdError
  | TripReferencesNonExistentCalendarError
  | TripReferencesUnmappedRouteIdError
  | GtfsStopTimeNormalisationError
  | GtfsRouteMatchingError
  | GtfsTransferConnectionError;

export class StopTimeReferencesNonExistentTripError extends Error {
  readonly type = "stop-time-references-non-existent-trip";
  constructor(readonly stopTime: StopTimesCsvRow) {
    super();
  }
}

export class DuplicateTripIdError extends Error {
  readonly type = "duplicate-trip-id";
  constructor(readonly subsequentRowWithDuplicateId: TripsCsvRow) {
    super();
  }
}

export class TripReferencesNonExistentCalendarError extends Error {
  readonly type = "trip-references-non-existent-calendar";
  constructor(readonly trip: TripsCsvRow) {
    super();
  }
}

export class TripReferencesUnmappedRouteIdError extends Error {
  readonly type = "trip-references-unmapped-route-id";
  constructor(readonly trip: TripsCsvRow) {
    super();
  }
}
