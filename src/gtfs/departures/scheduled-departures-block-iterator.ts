import type { ScheduledDeparturesBlock } from "./scheduled-departures-block.js";
import { DeparturesIteratorResult } from "./departures-iterator.js";
import type { GtfsRealtimeData } from "../data/gtfs-realtime-data.js";
import { DeparturesBlockIterator } from "./departures-block-iterator.js";
import type { GtfsScheduledMovementsIndexEntry } from "./gtfs-scheduled-movements-index.js";

export class ScheduledDeparturesBlockIterator extends DeparturesBlockIterator<
  ScheduledDeparturesBlock,
  GtfsScheduledMovementsIndexEntry
> {
  constructor(
    block: ScheduledDeparturesBlock,
    private readonly _realtimeData: GtfsRealtimeData,
  ) {
    super(block, block.allMovementsAtStop);
  }

  protected override _convertEntryToResult(
    entry: GtfsScheduledMovementsIndexEntry,
  ): DeparturesIteratorResult {
    return new DeparturesIteratorResult(
      entry.trip,
      this.block.serviceDay,
      entry.time.toInstant(this.block.serviceDay, this.block.timezone),
      entry.movement,
    );
  }

  protected override _shouldSkipEntry(
    entry: GtfsScheduledMovementsIndexEntry,
  ): boolean {
    // A scheduled departures block has all movements for a given stop, not just
    // the ones that occur today!
    //
    // TODO: Add a unit test for this since I forgot it initially!
    const doesntRunToday = !entry.trip.calendar.occursOn(this.block.serviceDay);
    if (doesntRunToday) return true;

    // Trips with realtime data will be supplied by the realtime departures
    // block, so we don't want to show duplicate entries by also showing them
    // from the scheduled departures block (at the outdated departure time/order
    // too!).
    const tripId = entry.trip.gtfsTripId;
    const realtimeTrip = this._realtimeData.getForScheduledTrip(tripId);
    const isOverriddenByRealtimeTrip = realtimeTrip != null;
    if (isOverriddenByRealtimeTrip) return true;

    // Even users not filtering arrivals won't be interested to see the same
    // trip listed twice at stations like Flinders Street or Town Hall, once for
    // the arrival and then again for the departure of the continuing trip. We
    // just need to be sure the continuing trip is actually running!
    //
    // TODO: Might be worth checking that the next trip actually still
    // originates from this stop, since in the realtime data (when we start
    // handling it) stops can be skipped. I guess for that case we'd more need
    // something to disconnect transfers. That's a bit ugly isn't it? Note that
    // the same applies to the RealtimeDeparturesBlockIterator.
    const isArrivalWhichContinues =
      entry.movement.type === "terminating" &&
      entry.trip.nextTrip != null &&
      entry.trip.nextTrip.calendar.occursOn(this.block.serviceDay) &&
      !this._isTripCancelled(entry.trip.nextTrip.gtfsTripId);
    if (isArrivalWhichContinues) return true;

    return false;
  }

  private _isTripCancelled(tripId: string): boolean {
    const realtimeTrip = this._realtimeData.getForScheduledTrip(tripId);
    return realtimeTrip?.isCancelled ?? false;
  }
}
