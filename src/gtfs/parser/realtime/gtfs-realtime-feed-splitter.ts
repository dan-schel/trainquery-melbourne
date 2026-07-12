import type { LineGtfsIdMapping } from "../../data/ids/line-gtfs-id-mapping.js";
import type {
  RealtimeFeedJson,
  TripDescriptorJson,
  TripUpdateJson,
} from "../../retrieval/realtime/realtime-feed-schema.js";

// TODO: Right now, VTAR combines all the GTFS realtime data for the regional
// and suburban subfeeds into one output. We're very intentional in this repo
// to process and suburban and regional GTFS feeds independently (as there's a
// possibility of ID collisions/other conflicts).
//
// VTAR needs to be altered to stop combining the feeds and supply them as
// separate JSON endpoints instead. It even looks like TrainQuery v3 supports
// it, so there's nothing stopping it.
//
// Once that's done, this whole file can be deleted.

export class GtfsRealtimeFeedSplitter {
  constructor(
    private readonly _suburbanLineGtfsIdMapping: LineGtfsIdMapping,
    private readonly _regionalLineGtfsIdMapping: LineGtfsIdMapping,
    private readonly _onError: (error: GtfsRealtimeFeedSplittingError) => void,
  ) {}

  split(realtimeData: RealtimeFeedJson) {
    const suburbanTripUpdates: TripUpdateJson[] = [];
    const regionalTripUpdates: TripUpdateJson[] = [];

    for (const tripUpdate of realtimeData.tripUpdates) {
      this._sortIntoSubfeedArray(
        tripUpdate,
        suburbanTripUpdates,
        regionalTripUpdates,
      );
    }

    return {
      suburban: { tripUpdates: suburbanTripUpdates },
      regional: { tripUpdates: regionalTripUpdates },
    };
  }

  private _sortIntoSubfeedArray(
    tripUpdate: TripUpdateJson,
    suburbanTripUpdates: TripUpdateJson[],
    regionalTripUpdates: TripUpdateJson[],
  ) {
    const routeId = tripUpdate.trip.routeId;

    if (routeId == null) {
      this._onError(new RouteIdNotInTripDescriptorError(tripUpdate.trip));
    } else if (this._suburbanLineGtfsIdMapping.tryResolve(routeId) != null) {
      suburbanTripUpdates.push(tripUpdate);
    } else if (this._regionalLineGtfsIdMapping.tryResolve(routeId) != null) {
      regionalTripUpdates.push(tripUpdate);
    } else {
      this._onError(
        new TripDescriptorReferencesUnmappedRouteIdError(tripUpdate.trip),
      );
    }
  }
}

export type GtfsRealtimeFeedSplittingError =
  | RouteIdNotInTripDescriptorError
  | TripDescriptorReferencesUnmappedRouteIdError;

export class RouteIdNotInTripDescriptorError extends Error {
  readonly type = "route-id-not-in-trip-descriptor";
  constructor(readonly tripDescriptor: TripDescriptorJson) {
    super();
  }
}

export class TripDescriptorReferencesUnmappedRouteIdError extends Error {
  readonly type = "trip-descriptor-references-unmapped-route-id";
  constructor(readonly tripDescriptor: TripDescriptorJson) {
    super();
  }
}
