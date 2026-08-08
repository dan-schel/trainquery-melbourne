import { assertNever } from "@dan-schel/js-utils";
import type {
  ScheduledDeparturesBlock,
  ScheduledDeparturesBlockEntry,
} from "./scheduled-departures-block.js";
import type {
  DeparturesSearchDirection,
  IDeparturesIterator,
} from "./departures-iterators.js";

export class ScheduledDeparturesBlockIterator implements IDeparturesIterator<ScheduledDeparturesBlockEntry> {
  private _index: number;
  private _direction: DeparturesSearchDirection;
  private _nextValueInstant: Temporal.Instant | null;

  constructor(readonly block: ScheduledDeparturesBlock) {
    this._index = -1;
    this._direction = "forwards";
    this._nextValueInstant = null;
  }

  set(instant: Temporal.Instant, direction: DeparturesSearchDirection): void {
    const time = this.block.toGtfsStopTime(instant);

    if (direction === "forwards") {
      this._setIndex(this.block.getIterationIndexOfNextFrom(time));
    } else if (direction === "backwards") {
      this._setIndex(this.block.getInterationIndexOfPreviousFrom(time));
    } else {
      assertNever(direction);
    }

    this._direction = direction;
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

    if (this._direction === "forwards") {
      this._setIndex(this._index + 1);
    } else if (this._direction === "backwards") {
      this._setIndex(this._index - 1);
    } else {
      assertNever(this._direction);
    }

    return value;
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
}
