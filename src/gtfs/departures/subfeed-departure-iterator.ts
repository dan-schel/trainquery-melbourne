import type { RealtimeDeparturesBlock } from "./realtime-departures-block.js";
import type { ScheduledDeparturesBlockFactory } from "./scheduled-departures-block-factory.js";

export class SubfeedDepartureIterator {
  constructor(
    private readonly _realtimeBlock: RealtimeDeparturesBlock,
    private readonly _scheduledBlockFactory: ScheduledDeparturesBlockFactory,
  ) {}
}
