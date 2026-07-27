import { itsOk } from "@dan-schel/js-utils";
import type { GtfsRealtimeData } from "../data/gtfs-realtime-data.js";
import type { InstantRange } from "../data/instant-range.js";
import type { DeparturesBlock } from "./departures-block.js";
import type { GtfsScheduledMovementsIndex } from "./gtfs-scheduled-movements-index.js";
import { RealtimeDeparturesBlock } from "./realtime-departures-block.js";
import type {
  ScheduledDeparturesBlock,
  ScheduledDeparturesBlockEntry,
} from "./scheduled-departures-block.js";

export class DeparturesBlocksBuilder {
  constructor(
    private readonly _scheduledMovements: readonly ScheduledDeparturesBlockEntry[],
    private readonly _realtimeBlock: RealtimeDeparturesBlock | null,
    private readonly _timezone: string,
  ) {}

  static build(
    stopId: number,
    scheduledMovementsIndex: GtfsScheduledMovementsIndex,
    realtimeData: GtfsRealtimeData,
    timezone: string,
  ): DeparturesBlocksBuilder {
    const realtime = RealtimeDeparturesBlock.tryBuild(stopId, realtimeData);
    const scheduled = scheduledMovementsIndex.getMovementsForStop(stopId);
    return new DeparturesBlocksBuilder(scheduled, realtime, timezone);
  }

  allBlocksWithinTimeRange(range: InstantRange): DeparturesBlock[] {
    return [
      ...this._allScheduledBlocksWithinTimeRange(range),
      ...this._allRealtimeBlocksWithinTimeRange(range),
    ];
  }

  private _allScheduledBlocksWithinTimeRange(
    range: InstantRange,
  ): ScheduledDeparturesBlock[] {
    if (this._scheduledMovements.length === 0) return [];

    const earliest = itsOk(this._scheduledMovements[0]).time;
    const latest = itsOk(this._scheduledMovements.at(-1)).time;

    // TODO: Implement it!

    return [];
  }

  private _allRealtimeBlocksWithinTimeRange(
    range: InstantRange,
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
}
