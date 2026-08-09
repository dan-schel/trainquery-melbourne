import { assertNever, itsOk } from "@dan-schel/js-utils";
import type {
  ScheduledDeparturesBlock,
  ScheduledDeparturesBlockEntry,
} from "./scheduled-departures-block.js";
import type {
  DeparturesSearchDirection,
  IDeparturesIterator,
} from "./departures-iterators.js";
import type { GtfsRealtimeData } from "../data/gtfs-realtime-data.js";

export class ScheduledDeparturesBlockIterator implements IDeparturesIterator<ScheduledDeparturesBlockEntry> {
  private _index: number;
  private _direction: DeparturesSearchDirection;
  private _nextValueInstant: Temporal.Instant | null;

  constructor(
    readonly block: ScheduledDeparturesBlock,
    private readonly _realtimeData: GtfsRealtimeData,
  ) {
    this._index = -1;
    this._direction = "forwards";
    this._nextValueInstant = null;
  }

  set(instant: Temporal.Instant, direction: DeparturesSearchDirection): void {
    const time = this.block.toGtfsStopTime(instant);

    this._direction = direction;

    if (direction === "forwards") {
      const index = this.block.getIterationIndexOfNextFrom(time);
      this._setIndexAndSkipUntilValidEntry(index);
    } else if (direction === "backwards") {
      const index = this.block.getIterationIndexOfPreviousFrom(time);
      this._setIndexAndSkipUntilValidEntry(index);
    } else {
      assertNever(direction);
    }
  }

  getNextValueInstant(): Temporal.Instant | null {
    return this._nextValueInstant;
  }

  peek(): ScheduledDeparturesBlockEntry | null {
    return this.block.entries[this._index] ?? null;
  }

  take(): ScheduledDeparturesBlockEntry {
    const value = this.peek();
    if (value == null) throw new Error("Nothing to take.");

    const nextIndex = ScheduledDeparturesBlockIterator._nextIndexValueFor(
      this._index,
      this._direction,
    );
    this._setIndexAndSkipUntilValidEntry(nextIndex);

    return value;
  }

  private _setIndexAndSkipUntilValidEntry(newIndex: number) {
    let index = newIndex;
    while (index >= 0 && index < this.block.entries.length) {
      // Ok due to while loop condition. Once we've exceed the bounds of the
      // array (in either direction), we'll have stopped.
      const entry = itsOk(this.block.entries[index]);
      if (!this._shouldSkipEntry(entry)) break;

      index = ScheduledDeparturesBlockIterator._nextIndexValueFor(
        index,
        this._direction,
      );
    }

    this._setIndex(index);
  }

  private _setIndex(newIndex: number) {
    this._index = newIndex;
    this._nextValueInstant = this._calculateNextValueInstant();
  }

  private _calculateNextValueInstant(): Temporal.Instant | null {
    const nextValue = this.peek();
    if (nextValue == null) return null;

    return nextValue.time.toInstant(this.block.serviceDay, this.block.timezone);
  }

  private _shouldSkipEntry(entry: ScheduledDeparturesBlockEntry): boolean {
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

  private static _nextIndexValueFor(
    index: number,
    direction: DeparturesSearchDirection,
  ) {
    if (direction === "forwards") {
      return index + 1;
    } else if (direction === "backwards") {
      return index - 1;
    } else {
      assertNever(direction);
    }
  }
}
