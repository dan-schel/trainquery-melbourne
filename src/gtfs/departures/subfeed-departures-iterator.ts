import { assertNever, itsOk, removeIf } from "@dan-schel/js-utils";
import {
  DeparturesBlocksBuilder,
  type TimezoneData,
} from "./departures-blocks-builder.js";
import type {
  DeparturesIteratorResult,
  DeparturesSearchDirection,
} from "./departures-iterators.js";
import { BoundedInstantRange } from "../data/bounded-instant-range.js";
import { ScheduledDeparturesBlockIterator } from "./scheduled-departures-block-iterator.js";
import { RealtimeDeparturesBlockIterator } from "./realtime-departures-block-iterator.js";
import { ScheduledDeparturesBlock } from "./scheduled-departures-block.js";
import { RealtimeDeparturesBlock } from "./realtime-departures-block.js";
import type { GtfsScheduledMovementsIndex } from "./gtfs-scheduled-movements-index.js";
import type { GtfsRealtimeData } from "../data/gtfs-realtime-data.js";

const BLOCK_SCAN_HOURS = 48;

type InnerDeparturesBlockIterator =
  | ScheduledDeparturesBlockIterator
  | RealtimeDeparturesBlockIterator;

export class SubfeedDeparturesIterator {
  private _searchRange: BoundedInstantRange | null;
  private _iterators: InnerDeparturesBlockIterator[];
  private _nextValue: DeparturesIteratorResult | null;
  private _nextValueIterator: InnerDeparturesBlockIterator | null;
  private _direction: DeparturesSearchDirection;

  constructor(
    private readonly _blocksBuilder: DeparturesBlocksBuilder,
    private readonly _realtimeData: GtfsRealtimeData,
  ) {
    this._searchRange = null;
    this._iterators = [];
    this._nextValue = null;
    this._nextValueIterator = null;
    this._direction = "forwards";
  }

  static build(
    stopId: number,
    scheduledMovementsIndex: GtfsScheduledMovementsIndex,
    realtimeData: GtfsRealtimeData,
    timezoneData: TimezoneData,
  ) {
    const blockBuilder = DeparturesBlocksBuilder.build(
      stopId,
      scheduledMovementsIndex,
      realtimeData,
      timezoneData,
    );

    return new SubfeedDeparturesIterator(blockBuilder, realtimeData);
  }

  set(instant: Temporal.Instant, direction: DeparturesSearchDirection): void {
    this._searchRange = this._createSearchRange(instant, direction);
    this._iterators = [];
    this._nextValue = null;
    this._nextValueIterator = null;
    this._direction = direction;

    this._addBlocksForSearchRange();
    this._calculateNextValue();
  }

  peek(): DeparturesIteratorResult | null {
    return this._nextValue;
  }

  take(): DeparturesIteratorResult {
    const value = this._nextValue;
    const iterator = this._nextValueIterator;

    if (value == null || iterator == null) {
      throw new Error("Nothing to take.");
    }

    iterator.take();
    this._calculateNextValue();

    return value;
  }

  private _addBlocksForSearchRange() {
    const searchRange = this._searchRange;
    if (searchRange == null) throw new Error("Search range not set.");

    const blocks = this._blocksBuilder.allBlocksWithinTimeRange(searchRange);

    for (const block of blocks) {
      const alreadyIteratingThisBlock = this._iterators.some((i) =>
        DeparturesBlocksBuilder.isSameBlock(i.block, block),
      );

      if (!alreadyIteratingThisBlock) {
        const iterator = this._createIteratorFor(block);
        iterator.set(this._getFrontOfSearchRange(), this._direction);
        this._iterators.push(iterator);
      }
    }

    // Might as well cleanup spent iterators while we're adding new ones, so
    // that list doesn't just keep growing forever until the search completes.
    removeIf(this._iterators, (i) => i.peek() == null);
  }

  private _createSearchRange(
    time: Temporal.Instant,
    direction: DeparturesSearchDirection,
  ): BoundedInstantRange {
    if (direction === "forwards") {
      const end = time.add({ hours: BLOCK_SCAN_HOURS });
      return new BoundedInstantRange(time, end);
    } else if (direction === "backwards") {
      const start = time.subtract({ hours: BLOCK_SCAN_HOURS });
      return new BoundedInstantRange(start, time);
    } else {
      assertNever(direction);
    }
  }

  private _getFrontOfSearchRange(): Temporal.Instant {
    if (this._direction === "forwards") {
      return itsOk(this._searchRange).start;
    } else if (this._direction === "backwards") {
      return itsOk(this._searchRange).end;
    } else {
      assertNever(this._direction);
    }
  }

  private _getBackOfSearchRange(): Temporal.Instant {
    if (this._direction === "forwards") {
      return itsOk(this._searchRange).end;
    } else if (this._direction === "backwards") {
      return itsOk(this._searchRange).start;
    } else {
      assertNever(this._direction);
    }
  }

  private _isWorthSearchingForMore(): boolean {
    if (this._direction === "forwards") {
      return this._blocksBuilder.hasBlocksAfter(this._getBackOfSearchRange());
    } else if (this._direction === "backwards") {
      return this._blocksBuilder.hasBlocksBefore(this._getBackOfSearchRange());
    } else {
      assertNever(this._direction);
    }
  }

  private _calculateNextValue() {
    let best: DeparturesIteratorResult | null = null;
    let bestIterator: InnerDeparturesBlockIterator | null = null;

    for (const iterator of this._iterators) {
      const nextValue = iterator.peek();
      if (nextValue == null) continue;

      if (best == null || this._isBetter(best.instant, nextValue.instant)) {
        best = nextValue;
        bestIterator = iterator;
      }
    }

    const loadedRange = itsOk(this._searchRange);

    if (best != null && loadedRange.includes(best.instant)) {
      this._nextValue = best;
      this._nextValueIterator = bestIterator;
    } else if (this._isWorthSearchingForMore()) {
      const currentEnd = this._getBackOfSearchRange();
      this._searchRange = this._createSearchRange(currentEnd, this._direction);
      this._addBlocksForSearchRange();

      // TODO: I'd prefer this wasn't a recursive algorithm. I find we should
      // rewrite it using a loop instead.
      this._calculateNextValue();
    } else {
      this._nextValue = null;
      this._nextValueIterator = null;
    }
  }

  private _isBetter(
    currentBest: Temporal.Instant,
    candidate: Temporal.Instant,
  ): boolean {
    if (this._direction === "forwards") {
      return Temporal.Instant.compare(candidate, currentBest) < 0;
    } else if (this._direction === "backwards") {
      return Temporal.Instant.compare(candidate, currentBest) > 0;
    } else {
      assertNever(this._direction);
    }
  }

  private _createIteratorFor(
    block: ScheduledDeparturesBlock | RealtimeDeparturesBlock,
  ): InnerDeparturesBlockIterator {
    if (block instanceof RealtimeDeparturesBlock) {
      return new RealtimeDeparturesBlockIterator(block, this._realtimeData);
    } else if (block instanceof ScheduledDeparturesBlock) {
      return new ScheduledDeparturesBlockIterator(block, this._realtimeData);
    } else {
      assertNever(block);
    }
  }
}
