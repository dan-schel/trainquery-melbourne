import { assertNever, itsOk } from "@dan-schel/js-utils";
import type {
  DeparturesSearchDirection,
  IDeparturesIterator,
} from "./departures-iterators.js";
import type {
  RealtimeDeparturesBlock,
  RealtimeDeparturesBlockEntry,
} from "./realtime-departures-block.js";
import type { GtfsRealtimeData } from "../data/gtfs-realtime-data.js";

export class RealtimeDeparturesBlockIterator implements IDeparturesIterator<RealtimeDeparturesBlockEntry> {
  private _index: number;
  private _direction: DeparturesSearchDirection;

  constructor(
    readonly block: RealtimeDeparturesBlock,
    private readonly _realtimeData: GtfsRealtimeData,
  ) {
    this._index = -1;
    this._direction = "forwards";
  }

  set(instant: Temporal.Instant, direction: DeparturesSearchDirection): void {
    this._direction = direction;

    if (direction === "forwards") {
      const index = this.block.getIterationIndexOfNextFrom(instant);
      this._setIndexAndSkipUntilValidEntry(index);
    } else if (direction === "backwards") {
      const index = this.block.getIterationIndexOfPreviousFrom(instant);
      this._setIndexAndSkipUntilValidEntry(index);
    } else {
      assertNever(direction);
    }
  }

  getNextValueInstant(): Temporal.Instant | null {
    return this.peek()?.instant ?? null;
  }

  peek(): RealtimeDeparturesBlockEntry | null {
    return this.block.entries[this._index] ?? null;
  }

  take(): RealtimeDeparturesBlockEntry {
    const value = this.peek();
    if (value == null) throw new Error("Nothing to take.");

    const nextIndex = RealtimeDeparturesBlockIterator._nextIndexValueFor(
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

      index = RealtimeDeparturesBlockIterator._nextIndexValueFor(
        index,
        this._direction,
      );
    }

    this._index = index;
  }

  private _shouldSkipEntry(entry: RealtimeDeparturesBlockEntry): boolean {
    const { movement, trip } = entry;

    // Even users not filtering arrivals won't be interested to see the same
    // trip listed twice at stations like Flinders Street or Town Hall, once for
    // the arrival and then again for the departure of the continuing trip. We
    // just need to be sure the continuing trip is actually running!
    const isArrivalWhichContinues =
      movement.type === "terminating" &&
      trip.scheduledTrip.nextTrip != null &&
      trip.scheduledTrip.nextTrip.calendar.occursOn(trip.serviceDay) &&
      !this._isTripCancelled(trip.scheduledTrip.nextTrip.gtfsTripId);
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
