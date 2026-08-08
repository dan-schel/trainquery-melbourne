import { assertNever } from "@dan-schel/js-utils";
import type {
  DeparturesSearchDirection,
  IDeparturesIterator,
} from "./departures-iterators.js";
import type {
  RealtimeDeparturesBlock,
  RealtimeDeparturesBlockEntry,
} from "./realtime-departures-block.js";

export class RealtimeDeparturesBlockIterator implements IDeparturesIterator<RealtimeDeparturesBlockEntry> {
  private _index: number;
  private _direction: DeparturesSearchDirection;

  constructor(readonly block: RealtimeDeparturesBlock) {
    this._index = -1;
    this._direction = "forwards";
  }

  set(instant: Temporal.Instant, direction: DeparturesSearchDirection): void {
    if (direction === "forwards") {
      this._index = this.block.getIterationIndexOfNextFrom(instant);
    } else if (direction === "backwards") {
      this._index = this.block.getInterationIndexOfPreviousFrom(instant);
    } else {
      assertNever(direction);
    }

    this._direction = direction;
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

    if (this._direction === "forwards") {
      this._index++;
    } else if (this._direction === "backwards") {
      this._index--;
    } else {
      assertNever(this._direction);
    }

    return value;
  }
}
