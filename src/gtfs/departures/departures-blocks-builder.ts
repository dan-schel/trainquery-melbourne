import { itsOk } from "@dan-schel/js-utils";
import type { GtfsRealtimeData } from "../data/gtfs-realtime-data.js";
import type { BoundedInstantRange } from "../data/bounded-instant-range.js";
import type { DeparturesBlock } from "./departures-block.js";
import type { GtfsScheduledMovementsIndex } from "./gtfs-scheduled-movements-index.js";
import { RealtimeDeparturesBlock } from "./realtime-departures-block.js";
import type {
  ScheduledDeparturesBlock,
  ScheduledDeparturesBlockEntry,
} from "./scheduled-departures-block.js";

export type TimezoneData = {
  readonly timezone: string;
  readonly minimumViableOffsetSeconds: number;
  readonly maximumViableOffsetSeconds: number;
};

export class DeparturesBlocksBuilder {
  constructor(
    private readonly _scheduledMovements: readonly ScheduledDeparturesBlockEntry[],
    private readonly _realtimeBlock: RealtimeDeparturesBlock | null,
    private readonly _timezoneData: TimezoneData,
  ) {}

  static build(
    stopId: number,
    scheduledMovementsIndex: GtfsScheduledMovementsIndex,
    realtimeData: GtfsRealtimeData,
    timezoneData: TimezoneData,
  ): DeparturesBlocksBuilder {
    const realtime = RealtimeDeparturesBlock.tryBuild(stopId, realtimeData);
    const scheduled = scheduledMovementsIndex.getMovementsForStop(stopId);
    return new DeparturesBlocksBuilder(scheduled, realtime, timezoneData);
  }

  allBlocksWithinTimeRange(range: BoundedInstantRange): DeparturesBlock[] {
    return [
      ...this._allScheduledBlocksWithinTimeRange(range),
      ...this._allRealtimeBlocksWithinTimeRange(range),
    ];
  }

  private _allScheduledBlocksWithinTimeRange(
    range: BoundedInstantRange,
  ): ScheduledDeparturesBlock[] {
    if (this._scheduledMovements.length === 0) return [];

    /* -------------------------------------------------------------------------

    Ok. Let's work this out!

    Suppose we're querying:
    
    Start   =>   12:00am Aug 2 AEST   (14:00 Aug 1 UTC)
    End     =>   12:00am Aug 3 AEST   (14:00 Aug 2 UTC)

    We know our query starts at 14:00 UTC Aug 1. That means it's likely
    the first service day we'll need to check is Aug 1, or possibly one day
    before/after depending on the timezone conversions and earliest/latest
    service times, and likewise for the last service day. What we need to figure
    out is how many days to add/subtract from each to make sure we've definitely
    covered all the scheduled blocks which overlap our query range.

    For this station, the first service of the day is 5:18am, and last is 2:08am 
    the next day. That means:
    
    Local time zone    =>   [05:18 +0d]   to   [02:18 +1d]
    UTC, during AEST   =>   [19:18 -1d]   to   [16:08 +0d]   (-10hrs from local)
    UTC, during AEDT   =>   [18:18 -1d]   to   [15:08 +0d]   (-11hrs from local)

    This means for a given service day, the services occur always occur between
    [18:18 -1d] and [16:08 +0d] in UTC, regardless of whether its AEST or AEDT.
    (For our first pass, we're not gonna check if a certain service day is AEST 
    or AEDT.)
    
    Those day offsets mean for the service day of say, May 4, the first service 
    could be at 18:18 UTC on May 3 (which would translate to 5:18am AEDT on May 
    4, though May 4 uses AEST so this is actually being conservative).

    We're gonna represent our times as seconds since [00:00 +0d]. It can be a
    negative value if the time is earlier than [00:00 +0d].

    ------------------------------------------------------------------------- */

    // [18:18 -1d]
    const earliest = this._secondsSinceMidnightUtcOfEarliestPossibleService();

    // [16:08 +0d]
    const latest = this._secondsSinceMidnightUtcOfLatestPossibleService();

    /* -------------------------------------------------------------------------

    The first service day which is relevant to our query will be the first one
    which ENDS AFTER the start of our query range.

    Our query range starts from Aug 1 in UTC terms, at 14:00 UTC. This is 
    earlier than [16:08 +0d], so the service day for Aug 1 DOES fall within our
    query by just over 2 hours, or 0.089 days.

    That number of days value actually tells us how many days to shift by. Let's 
    say instead that the last service was [16:08 +1d]. That would mean the last 
    service for Aug 1 would be at 16:08 UTC on Aug 2, or 1.089 days. Because 
    it's a full day after our query begins, we therefore must know that the 
    PREVIOUS service day's services (Jul 31) must end 0.089 days after our
    query begins, so the earliest service day we'd need to check is Jul 31 (we
    shift back one day).

    Likewise if the last service was just a few hours earlier at [13:08 +0d],
    because that's before 14:00 UTC (a.k.a. -0.036 days after), we know that all
    of Aug 1's services have departed this stop before our query start time, so 
    we can shift forward one day. We only shift by one day because the last 
    service is still within 24 hours of our query start time.

    In summary:
    - If the service day ends 0.089 days after the query, shift by 0 days.
    - If the service day ends 1.089 days after the query, shift by -1 days.
    - If the service day ends -0.036 days after the query, shift by +1 days.

    i.e. We're shifting by -floor(numOfDays).

    (Floor always moves values toward negative infinity, i.e. -0.05 -> -1) 

    ------------------------------------------------------------------------- */

    // startDate: Aug 1, startSecondOfDayUtc: 50400 (14:00 UTC)
    const { date: startDate, secondOfDayUtc: startSecondOfDayUtc } =
      this._splitDateAndSecondOfDayUtc(range.start);

    // 0.089
    const daysAfterStart = (latest - startSecondOfDayUtc) / (24 * 60 * 60);

    // Aug 1
    const firstServiceDayInRange = startDate.add({
      days: -Math.floor(daysAfterStart),
    });

    /* -------------------------------------------------------------------------

    And now we do the same to find the last service day in range, by looking for
    the last service day which STARTS BEFORE the end of our query range.

    Our query range ends at 14:00 UTC on Aug 2. The first service of the day is
    [18:18 -1d], so 18:18 Aug 1, which is just under 20 hours before our query 
    end time, or 0.821 days.
    
    That means the last service day in range is Aug 2, because it while Aug 2 
    starts before our query ends, it doesn't start over 24 hours before our 
    query ends, and therefore Aug 3 must start AFTER our query ends and if 
    therefore irrelevant.

    If the first service of the day was [18:18 -2d], so 18:18 Jul 31, which is
    1.821 days before 14:00 Aug 2, then at 14:00 Aug 2 we'd have started to
    enter the service day of Aug 3, because it must've began at 18:18 Aug 1. And
    if the first service of the day was [18:18 +0d], so 18:18 Aug 2, which is 
    a few hours after 14:00 Aug (a.k.a. -0.036 days before), then Aug 2's
    services don't start until after the query end time, so we only need to go
    up until Aug 1.

    This means:
    - If the service days starts 0.821 days before the query, shift by 0 days.
    - If the service days starts 1.821 days before the query, shift by +1 days.
    - If the service days starts -0.036 days before the query, shift by -1 days.

    i.e. We're shifting by floor(numOfDays).

    ------------------------------------------------------------------------- */

    // endDate: Aug 2, endSecondOfDayUtc: 50400 (14:00 UTC)
    const { date: endDate, secondOfDayUtc: endSecondOfDayUtc } =
      this._splitDateAndSecondOfDayUtc(range.end);

    // 0.821
    const daysBeforeEnd = (endSecondOfDayUtc - earliest) / (24 * 60 * 60);

    // Aug 2
    const lastServiceDayInRange = endDate.add({
      days: Math.floor(daysBeforeEnd),
    });

    // TODO: Now that we have our date range, we need to construct the blocks,
    // figure out the actual offsets for each, and exclude the blocks which, now
    // that we've checked the actual offset (not just been pessimistic), don't
    // actually intersect the query range.

    return [];
  }

  private _allRealtimeBlocksWithinTimeRange(
    range: BoundedInstantRange,
  ): RealtimeDeparturesBlock[] {
    if (
      this._realtimeBlock !== null &&
      this._realtimeBlock.instantRange.intersects(range)
    ) {
      return [this._realtimeBlock];
    } else {
      return [];
    }
  }

  private _secondsSinceMidnightUtcOfEarliestPossibleService() {
    // Use the maximum viable offset (+11 for Melbourne) because we're
    // interested to know about the earliest possible time in UTC that a service
    // could run, as if it can run 5:18am AEST and 5:18am AEDT, AEDT (+11) makes
    // it earlier in UTC time (19:18 vs 18:18).
    //
    // Subtract the offset because we're converting a local (+10/+11) time BACK
    // to UTC.
    return (
      itsOk(this._scheduledMovements[0]).time.secondsSinceMidnight -
      this._timezoneData.maximumViableOffsetSeconds
    );
  }

  private _secondsSinceMidnightUtcOfLatestPossibleService() {
    // Use the minimum viable offset (+10 for Melbourne) because we're
    // interested to know about the latest possible time in UTC that a service
    // could run, as if it can run 2:08am AEST and 2:08am AEDT, AEST (+10) makes
    // it later in UTC time (16:08 vs 15:08).
    //
    // Subtract the offset because we're converting a local (+10/+11) time BACK
    // to UTC.
    return (
      itsOk(this._scheduledMovements.at(-1)).time.secondsSinceMidnight -
      this._timezoneData.minimumViableOffsetSeconds
    );
  }

  private _splitDateAndSecondOfDayUtc(instant: Temporal.Instant) {
    const startOfDayUtc = instant.toZonedDateTimeISO("UTC").startOfDay();
    return {
      date: startOfDayUtc.toPlainDate(),
      secondOfDayUtc: instant.since(startOfDayUtc.toInstant()).total("seconds"),
    };
  }
}
