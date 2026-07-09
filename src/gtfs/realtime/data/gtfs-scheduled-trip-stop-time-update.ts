import type {
  GtfsTrip,
  GtfsTripServicedStop,
} from "../../schedule/data/gtfs-trip.js";

export class GtfsScheduledTripStopTimeUpdate {
  constructor(
    // Is having this reference useful? Or, if it turns out we normally want to
    // find this update object after already having found the trip, should we
    // just store the tripId here and have a
    // Map<GtfsTripId, GtfsScheduledTripStopTimeUpdate> somewhere?
    readonly trip: GtfsTrip,

    // All fields marked mandatory here because PTV seem to reliably provide
    // them so far. Until I find otherwise, I will rely on them, and ignore (but
    // log errors for) any stop time updates that don't have them. I expect to
    // have to modify this one day as PTV starts making use of more features in
    // their feeds, but for now, let's work with what PTV gives us (just as we
    // do with the GTFS schedule parsing).

    // My best guess is that this `startDate` is the service day, and therefore
    // the `startTime` isn't useful, and we'd use the `trip.gtfsTripId` and
    // `startDate` to uniquely identify which instance of the trip this update
    // is for. (I'm basing that assumption on that the GTFS-RT spec says
    // `startTime` can have hours greater than 24, so surely you'd use that in
    // combination with the service day and not the calendar date, right?)
    readonly startDate: Temporal.PlainDate,
    // readonly startTime: GtfsStopTime,

    readonly stopTimeUpdate: GtfsScheduledTripStopTimeUpdateStop[],
  ) {}
}

export class GtfsScheduledTripStopTimeUpdateStop {
  constructor(
    // Because trips can legally have the some stop ID twice (and probably
    // regularly do for City Circle services), the stop ID can't be used to
    // associate this update with the stop in the trip. We need to use the
    // index instead. That doesn't mean ALSO storing the stop ID here is
    // useless, but I'm not doing it right now to avoid making the mistake of
    // using it as the key. (I can fetch it via `scheduledStop.stopId` if we end
    // up keeping that.)
    readonly tripStopIndex: number,

    readonly gtfsStopSequence: number,

    // Is having this reference useful?
    readonly scheduledStop: GtfsTripServicedStop,

    // What format makes these easiest to work with? Temporal.Instant?
    // GtfsStopTime? Delay in seconds?
    readonly arrivalTime: Temporal.Instant | null,
    readonly departureTime: Temporal.Instant | null,
  ) {}
}
