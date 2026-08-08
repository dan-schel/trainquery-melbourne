import { assertNever, itsOk } from "@dan-schel/js-utils";
import type { DeparturesBlocksBuilder } from "./departures-blocks-builder.js";
import type {
  DeparturesSearchDirection,
  IDeparturesIterator,
} from "./departures-iterators.js";
import { BoundedInstantRange } from "../data/bounded-instant-range.js";
import { ScheduledDeparturesBlockIterator } from "./scheduled-departures-block-iterator.js";
import { RealtimeDeparturesBlockIterator } from "./realtime-departures-block-iterator.js";
import type { ScheduledDeparturesBlockEntry } from "./scheduled-departures-block.js";
import type { RealtimeDeparturesBlockEntry } from "./realtime-departures-block.js";

const BLOCK_SCAN_HOURS = 48;

type InnerDeparturesBlockIterator =
  | ScheduledDeparturesBlockIterator
  | RealtimeDeparturesBlockIterator;

type EnhancedScheduledDeparturesBlockEntry = ScheduledDeparturesBlockEntry & {
  readonly instant: Temporal.Instant;
  readonly serviceDay: Temporal.PlainDate;
  readonly timezone: string;
};

type Result =
  | RealtimeDeparturesBlockEntry
  | EnhancedScheduledDeparturesBlockEntry;

export class SubfeedDeparturesIterator implements IDeparturesIterator<Result> {
  private _loadedRange: BoundedInstantRange | null;
  private _iterators: InnerDeparturesBlockIterator[];
  private _nextValue: Result | null;
  private _nextValueIterator: InnerDeparturesBlockIterator | null;
  private _direction: DeparturesSearchDirection;

  constructor(private readonly _blockBuilders: DeparturesBlocksBuilder) {
    this._loadedRange = null;
    this._iterators = [];
    this._nextValue = null;
    this._nextValueIterator = null;
    this._direction = "forwards";
  }

  set(instant: Temporal.Instant, direction: DeparturesSearchDirection): void {
    this._direction = direction;
    this._applySearchRange(instant);
    this._calculateNextValue();
  }

  getNextValueInstant(): Temporal.Instant | null {
    return this.peek()?.instant ?? null;
  }

  peek(): Result | null {
    return this._nextValue;
  }

  take(): Result {
    const value = this._nextValue;
    const iterator = this._nextValueIterator;

    if (value == null || iterator == null) {
      throw new Error("Nothing to take.");
    }

    iterator.take();
    this._calculateNextValue();

    return value;
  }

  private _applySearchRange(instant: Temporal.Instant) {
    const searchRange = this._getSearchRange(instant, this._direction);
    const blocks = this._blockBuilders.allBlocksWithinTimeRange(searchRange);
    const iterators = blocks.map((b) => b.createIterator());

    for (const iterator of iterators) {
      iterator.set(instant, this._direction);
    }

    this._loadedRange = searchRange;
    this._iterators = iterators;
  }

  private _getSearchRange(
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

  private _getNextSearchRangeStart(): Temporal.Instant {
    if (this._direction === "forwards") {
      return itsOk(this._loadedRange).end;
    } else if (this._direction === "backwards") {
      return itsOk(this._loadedRange).start;
    } else {
      assertNever(this._direction);
    }
  }

  private _calculateNextValue() {
    // TODO: Need to take exhaustion into account (i.e. all calendars ending).
    //
    // Probably the `GtfsScheduledMovementsIndex` could keep track of all unique
    // calendars for the stop, and then we can call a new method on the
    // `DepartureBlocksBuilder` which can tell us for a given instant if all
    // future scheduled departure blocks would be for service days beyond all
    // calendars AND we're beyond all realtime departure blocks.
    //
    // Or, maybe when constructing a `DepartureBlocksBuilder`, we determine the
    // last service day for all calendars for that stop (oh, and earliest, for
    // `direction = "backwards"`), and then use that to know when there's no
    // scheduled departure blocks it can build. I guess we still need the second
    // method, because `allBlocksWithinTimeRange` returning an empty array
    // doesn't necessarily mean there are no more blocks in the future.

    let best: Result | null = null;
    let bestIterator: InnerDeparturesBlockIterator | null = null;

    for (const iterator of this._iterators) {
      const nextValue = iterator.peek();
      const nextValueInstant = iterator.getNextValueInstant();
      if (nextValue == null || nextValueInstant == null) continue;

      // TODO: We need to skip over departures from scheduled blocks for which
      // realtime data exists. I think we should probably make it the
      // DeparturesBlockBuilders's job to filter out scheduled departures for
      // which realtime data exists, before passing it to
      // ScheduledDeparturesBlock.build.

      if (best == null || this._isSooner(best.instant, nextValueInstant)) {
        best = this._enhance(nextValue, iterator);
        bestIterator = iterator;
      }
    }

    const loadedRange = itsOk(this._loadedRange);

    if (best != null && loadedRange.includes(best.instant)) {
      this._nextValue = best;
      this._nextValueIterator = bestIterator;
    } else {
      this._applySearchRange(this._getNextSearchRangeStart());

      // TODO: I'd prefer this wasn't a recursive algorithm. I find we should
      // rewrite it using a loop instead.
      this._calculateNextValue();
    }
  }

  private _isSooner(
    currentInstant: Temporal.Instant,
    candidateInstant: Temporal.Instant,
  ): boolean {
    if (this._direction === "forwards") {
      return Temporal.Instant.compare(candidateInstant, currentInstant) < 0;
    } else if (this._direction === "backwards") {
      return Temporal.Instant.compare(candidateInstant, currentInstant) > 0;
    } else {
      assertNever(this._direction);
    }
  }

  private _enhance(
    entry: RealtimeDeparturesBlockEntry | ScheduledDeparturesBlockEntry,
    iterator: InnerDeparturesBlockIterator,
  ): Result {
    if ("instant" in entry) {
      return entry;
    } else if ("time" in entry) {
      const rightType = iterator instanceof ScheduledDeparturesBlockIterator;
      if (!rightType) throw new Error("Wrong iterator type.");

      return {
        ...entry,
        instant: entry.time.toInstant(
          iterator.block.serviceDay,
          iterator.block.timezone,
        ),
        serviceDay: iterator.block.serviceDay,
        timezone: iterator.block.timezone,
      };
    } else {
      assertNever(entry);
    }
  }
}
