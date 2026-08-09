import { assertNever, itsOk } from "@dan-schel/js-utils";
import type {
  DeparturesIteratorResult,
  DeparturesSearchDirection,
} from "./departures-iterators.js";
import type { DeparturesBlock } from "./departures-block.js";

export abstract class DeparturesBlockIterator<
  BlockType extends DeparturesBlock,
  EntryType,
> {
  private _index: number;
  private _direction: DeparturesSearchDirection;

  constructor(
    readonly block: BlockType,
    readonly _entries: readonly EntryType[],
  ) {
    this._index = -1;
    this._direction = "forwards";
  }

  set(instant: Temporal.Instant, direction: DeparturesSearchDirection): void {
    if (direction === "forwards") {
      const index = this.block.getIterationIndexOfNextFrom(instant);
      this._setIndexAndSkipUntilValidEntry(index, direction);
    } else if (direction === "backwards") {
      const index = this.block.getIterationIndexOfPreviousFrom(instant);
      this._setIndexAndSkipUntilValidEntry(index, direction);
    } else {
      assertNever(direction);
    }
  }

  peek(): DeparturesIteratorResult | null {
    const value = this._entries[this._index] ?? null;
    if (value == null) return null;

    // Could consider memoizing this everytime the index changes.
    return this._convertEntryToResult(value);
  }

  take(): DeparturesIteratorResult {
    const value = this.peek();
    if (value == null) throw new Error("Nothing to take.");

    const index = this._index;
    const direction = this._direction;
    const next = DeparturesBlockIterator._nextIndexValueFor(index, direction);
    this._setIndexAndSkipUntilValidEntry(next, direction);

    return value;
  }

  protected abstract _convertEntryToResult(
    entry: EntryType,
  ): DeparturesIteratorResult;

  protected abstract _shouldSkipEntry(entry: EntryType): boolean;

  // TODO: Rename this to indicate that it also sets direction.
  private _setIndexAndSkipUntilValidEntry(
    newIndex: number,
    direction: DeparturesSearchDirection,
  ) {
    let index = newIndex;
    while (index >= 0 && index < this._entries.length) {
      // Ok due to while loop condition. Once we've exceed the bounds of the
      // array (in either direction), we'll have stopped.
      const entry = itsOk(this._entries[index]);
      if (!this._shouldSkipEntry(entry)) break;

      index = DeparturesBlockIterator._nextIndexValueFor(index, direction);
    }

    this._index = index;
    this._direction = direction;
  }

  private static _nextIndexValueFor(
    index: number,
    direction: DeparturesSearchDirection,
  ): number {
    if (direction === "forwards") {
      return index + 1;
    } else if (direction === "backwards") {
      return index - 1;
    } else {
      assertNever(direction);
    }
  }
}
