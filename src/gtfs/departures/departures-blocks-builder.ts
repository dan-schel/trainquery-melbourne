import { itsOk } from "@dan-schel/js-utils";
import type { GtfsRealtimeData } from "../data/gtfs-realtime-data.js";
import type { BoundedInstantRange } from "../data/bounded-instant-range.js";
import type { DeparturesBlock } from "./departures-block.js";
import type {
  GtfsScheduledMovementsIndex,
  GtfsScheduledMovementsIndexEntry,
} from "./gtfs-scheduled-movements-index.js";
import { RealtimeDeparturesBlock } from "./realtime-departures-block.js";
import { ScheduledDeparturesBlock } from "./scheduled-departures-block.js";
import type { PlainDateRange } from "../data/plain-date-range.js";

export type TimezoneData = {
  readonly timezone: string;
  readonly minimumViableOffsetSeconds: number;
  readonly maximumViableOffsetSeconds: number;
};

export class DeparturesBlocksBuilder {
  constructor(
    private readonly _scheduledMovements: readonly GtfsScheduledMovementsIndexEntry[],
    private readonly _realtimeBlock: RealtimeDeparturesBlock | null,
    private readonly _timezoneData: TimezoneData,
    private readonly _rangeEncompassingAllCalendars: PlainDateRange | null,
  ) {}

  static build(
    stopId: number,
    scheduledMovementsIndex: GtfsScheduledMovementsIndex,
    realtimeData: GtfsRealtimeData,
    timezoneData: TimezoneData,
  ): DeparturesBlocksBuilder {
    return new DeparturesBlocksBuilder(
      scheduledMovementsIndex.getMovementsForStop(stopId),
      RealtimeDeparturesBlock.tryBuild(stopId, realtimeData),
      timezoneData,
      scheduledMovementsIndex.getRangeEncompassingAllCalendarsForStop(stopId),
    );
  }

  allBlocksWithinTimeRange(range: BoundedInstantRange): DeparturesBlock[] {
    return [
      ...this._allRealtimeBlocksWithinTimeRange(range),
      ...this._allScheduledBlocksWithinTimeRange(range),
    ];
  }

  hasBlocksBefore(instant: Temporal.Instant): boolean {
    const realtimeStartsEarlier =
      this._realtimeBlock != null &&
      this._realtimeBlock.instantRange.startsBefore(instant);
    if (realtimeStartsEarlier) return true;

    const scheduledMovementsExist =
      this._scheduledMovements.length > 0 &&
      this._rangeEncompassingAllCalendars != null;
    if (!scheduledMovementsExist) return false;

    if (this._rangeEncompassingAllCalendars.start == null) return true;

    const firstMovement = itsOk(this._scheduledMovements[0]);
    const firstMovementInstant = firstMovement.time.toInstant(
      this._rangeEncompassingAllCalendars.start,
      this._timezoneData.timezone,
    );

    return Temporal.Instant.compare(firstMovementInstant, instant) < 0;
  }

  hasBlocksAfter(instant: Temporal.Instant): boolean {
    const realtimeEndsLater =
      this._realtimeBlock != null &&
      this._realtimeBlock.instantRange.endsAfter(instant);
    if (realtimeEndsLater) return true;

    const scheduledMovementsExist =
      this._scheduledMovements.length > 0 &&
      this._rangeEncompassingAllCalendars != null;
    if (!scheduledMovementsExist) return false;

    if (this._rangeEncompassingAllCalendars.end == null) return true;

    const lastMovement = itsOk(this._scheduledMovements.at(-1));
    const lastMovementInstant = lastMovement.time.toInstant(
      this._rangeEncompassingAllCalendars.end,
      this._timezoneData.timezone,
    );

    return Temporal.Instant.compare(lastMovementInstant, instant) > 0;
  }

  private _allRealtimeBlocksWithinTimeRange(
    range: BoundedInstantRange,
  ): RealtimeDeparturesBlock[] {
    if (
      this._realtimeBlock !== null &&
      this._realtimeBlock.instantRange.touches(range)
    ) {
      return [this._realtimeBlock];
    } else {
      return [];
    }
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
    movement times, and likewise for the last service day. What we need to 
    figure out is how many days to add/subtract from each to make sure we've
    definitely found all the scheduled blocks which overlap our query range.

    For this station, the first movement of the day is 5:18am, and last is 
    2:08am the next day. That means:
    
    Local time zone    =>   [05:18 +0d]   to   [02:18 +1d]
    UTC, during AEST   =>   [19:18 -1d]   to   [16:08 +0d]   (-10hrs from local)
    UTC, during AEDT   =>   [18:18 -1d]   to   [15:08 +0d]   (-11hrs from local)

    This means for a given service day, the movements occur always occur between
    [18:18 -1d] and [16:08 +0d] in UTC, regardless of whether its AEST or AEDT.
    (For our first pass, we're not gonna check if a certain service day is AEST 
    or AEDT.)
    
    Those day offsets mean for the service day of say, May 4, the first movement 
    could be at 18:18 UTC on May 3 at the earliest (which would translate to 
    5:18am AEDT on May 4, though May 4 uses AEST so this is actually being 
    conservative).

    We're gonna represent our times as seconds since [00:00 +0d]. It can be a
    negative value if the time is earlier than [00:00 +0d].

    ------------------------------------------------------------------------- */

    const maxViableOffsetSecs = this._timezoneData.maximumViableOffsetSeconds;
    const minViableOffsetSecs = this._timezoneData.minimumViableOffsetSeconds;

    const firstMvmt = itsOk(this._scheduledMovements[0]);
    const lastMvmt = itsOk(this._scheduledMovements.at(-1));
    const firstMvmtSecondsSinceMidnight = firstMvmt.time.secondsSinceMidnight;
    const lastMvmtSecondsSinceMidnight = lastMvmt.time.secondsSinceMidnight;

    // -20520 (represents [18:18 -1d] in seconds since [00:00 +0d])
    const e = firstMvmtSecondsSinceMidnight - maxViableOffsetSecs;

    // 58080 (represents [16:08 +0d] in seconds since [00:00 +0d])
    const l = lastMvmtSecondsSinceMidnight - minViableOffsetSecs;

    /* -------------------------------------------------------------------------

    The first service day which is relevant to our query will be the first one
    which ENDS AFTER the start of our query range.

    Our query range starts from Aug 1 in UTC terms, at 14:00 UTC. This is 
    earlier than [16:08 +0d], so the service day for Aug 1 DOES fall within our
    query by just over 2 hours, or 0.089 days.

    That number of days value actually tells us how many days to shift by. Let's 
    say instead that the last movement was [16:08 +1d]. That would mean the last 
    movement for Aug 1 would be at 16:08 UTC on Aug 2, or 1.089 days after the 
    beginning of our query. Because it's a full day after our query begins, we 
    therefore must know that the PREVIOUS service day's movements (Jul 31) must 
    end 0.089 days after our query begins (because we're accounting for the full
    range of offsets possible for a service day already in our calculations 
    above, we can confidently say 0.089, not worrying about different days 
    having different offsets, we account for that at the very end), so the 
    earliest service day we'd need to check is Jul 31 (we shift back one day).

    Likewise if the last movement was just a few hours earlier at [13:08 +0d],
    because that's before 14:00 UTC (a.k.a. -0.036 days after), we know that all
    of Aug 1's movements have occured from this stop before our query start 
    time, so we can shift forward one day. We only shift by one day because the
    last service is still within 24 hours of our query start time.

    In summary:
    - If the service day ends 0.089 days after the query, shift by 0 days.
    - If the service day ends 1.089 days after the query, shift by -1 days.
    - If the service day ends -0.036 days after the query, shift by +1 days.

    i.e. We're shifting by `-floor(numOfDays)`.

    (Floor always moves values toward negative infinity, i.e. -0.05 -> -1) 

    ------------------------------------------------------------------------- */

    const startSplit = this._splitDateAndSecondOfDayUtc(range.start);
    const startDate = startSplit.date; // Aug 1
    const startSecondOfDayUtc = startSplit.secondOfDayUtc; // 50400 (14:00 UTC)

    const daysAfterStart = (l - startSecondOfDayUtc) / (24 * 60 * 60); // 0.089
    const daysToShiftStart = -Math.floor(daysAfterStart); // 0
    const firstServiceDay = startDate.add({ days: daysToShiftStart }); // Aug 1

    /* -------------------------------------------------------------------------

    And now we do the same to find the last service day in range, by looking for
    the last service day which STARTS BEFORE the end of our query range.

    Our query range ends at 14:00 UTC on Aug 2. The first movement of the day is
    [18:18 -1d], so 18:18 Aug 1, which is just under 20 hours before our query 
    end time, or 0.821 days.
    
    That means the last service day in range is Aug 2, because while Aug 2 
    starts before our query ends, it doesn't start OVER 24 HOURS before our 
    query ends, and therefore Aug 3 must start AFTER our query ends and is 
    therefore irrelevant.

    If the first movement of the day was [18:18 -2d], so 18:18 Jul 31, which is
    1.821 days before 14:00 Aug 2, then at 14:00 Aug 2 we'd have started to
    enter the service day of Aug 3, because it must've began at 18:18 Aug 1. 
    
    And if the first movement of the day was [18:18 +0d], so 18:18 Aug 2, which 
    is a few hours after 14:00 Aug 2 (a.k.a. -0.036 days before), then Aug 2's
    movements don't start until after the query end time, so we only need to go
    up until Aug 1.

    This means:
    - If the service days starts 0.821 days before the query, shift by 0 days.
    - If the service days starts 1.821 days before the query, shift by +1 days.
    - If the service days starts -0.036 days before the query, shift by -1 days.

    i.e. We're shifting by `floor(numOfDays)`.

    ------------------------------------------------------------------------- */

    const endSplit = this._splitDateAndSecondOfDayUtc(range.end);
    const endDate = endSplit.date; // Aug 2
    const endSecondOfDayUtc = endSplit.secondOfDayUtc; // 50400 (14:00 UTC)

    const daysBeforeEnd = (endSecondOfDayUtc - e) / (24 * 60 * 60); // 0.821
    const daysToShiftEnd = Math.floor(daysBeforeEnd); // 0
    const lastServiceDay = endDate.add({ days: daysToShiftEnd }); // Aug 2

    /* -------------------------------------------------------------------------

    Now that we have our date range, we just need to construct the blocks. 
    
    When the blocks are constructed, they will determine the Temporal.Instant of
    the first and last movement in the block using the ACTUAL offset for that
    service day (the offset at 12pm noon as per the GTFS spec). 
    
    So far, we've been calculating everything assuming the worst case scenario 
    of minimum/maximum offsets, so there's a possibility now that when we 
    construct the block we were being conservative and the block doesn't
    actually intersect our query range, hence the check before adding it to the
    final result.

    (Because realtime trips are filtered out of the scheduled blocks, this can
    be another contributing factor to reducing the block's time range.)

    ------------------------------------------------------------------------- */

    const blocks: ScheduledDeparturesBlock[] = [];

    for (
      let date = firstServiceDay;
      Temporal.PlainDate.compare(date, lastServiceDay) <= 0;
      date = date.add({ days: 1 })
    ) {
      const block = this._buildScheduledBlockForServiceDay(date);

      // Use `touches`, not `intersects`, so that the first and last movements
      // of a block are included if the query range starts or ends exactly at
      // the same time as them.
      if (block != null && block.instantRange.touches(range)) {
        blocks.push(block);
      }
    }

    return blocks;
  }

  private _splitDateAndSecondOfDayUtc(instant: Temporal.Instant) {
    const startOfDayUtc = instant.toZonedDateTimeISO("UTC").startOfDay();
    return {
      date: startOfDayUtc.toPlainDate(),
      secondOfDayUtc: instant.since(startOfDayUtc.toInstant()).total("seconds"),
    };
  }

  private _buildScheduledBlockForServiceDay(serviceDay: Temporal.PlainDate) {
    const entries = this._getScheduledMovementsWithoutRealtimeData(serviceDay);
    if (entries.length === 0) return null;

    return ScheduledDeparturesBlock.build(
      entries,
      serviceDay,
      this._timezoneData.timezone,
    );
  }

  private _getScheduledMovementsWithoutRealtimeData(
    serviceDay: Temporal.PlainDate,
  ): readonly GtfsScheduledMovementsIndexEntry[] {
    return this._scheduledMovements.filter(
      (m) => !this._hasRealtimeDataFor(m.trip.gtfsTripId, serviceDay),
    );
  }

  private _hasRealtimeDataFor(
    gtfsTripId: string,
    serviceDay: Temporal.PlainDate,
  ): boolean {
    if (this._realtimeBlock === null) return false;

    return this._realtimeBlock.entries.some(
      (e) =>
        e.trip.scheduledTrip.gtfsTripId === gtfsTripId &&
        e.trip.serviceDay.equals(serviceDay),
    );
  }

  /**
   * Returns true if two blocks are equivalent. This function assumes both given
   * blocks were built by the same `DeparturesBlocksBuilder`, and as such, only
   * checks if either (a) both are realtime blocks, or (b) both are scheduled
   * blocks for the same service day.
   */
  static isSameBlock(a: DeparturesBlock, b: DeparturesBlock): boolean {
    if (
      a instanceof RealtimeDeparturesBlock &&
      b instanceof RealtimeDeparturesBlock
    ) {
      return true;
    } else if (
      a instanceof ScheduledDeparturesBlock &&
      b instanceof ScheduledDeparturesBlock
    ) {
      return a.serviceDay.equals(b.serviceDay);
    } else {
      return false;
    }
  }
}
