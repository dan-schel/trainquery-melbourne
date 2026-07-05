import type { DepartureSearchDirection } from "./corequery-departure-iterator.js";
import { DeparturesBlock } from "./departures-block.js";
import type { ServiceDay } from "./service-day.js";

export class ScheduledDeparturesBlock extends DeparturesBlock {
  constructor(protected readonly _serviceDay: ServiceDay) {
    super(_serviceDay.earliestServiceInstant, _serviceDay.latestServiceInstant);
  }
  override take(): void {
    // TODO: Obviously for this to work, this class needs to contain the list of
    // departures for the stop for which it is created.
    throw new Error("Method not implemented.");
  }

  override peek(): void {
    throw new Error("Method not implemented.");
  }

  override setAtTime(
    time: Temporal.Instant,
    direction: DepartureSearchDirection,
  ): void {
    // TODO: Find the index of the first departure in the list which occurs at
    // or after the given time if in "forwards" mode, or at or before the given
    // time if in "backwards" mode.

    throw new Error("Method not implemented.");
  }

  override setToStart(direction: DepartureSearchDirection): void {
    // TODO: Set the index to 0 if in "forwards" mode, or to the last index if
    // in "backwards" mode.

    throw new Error("Method not implemented.");
  }
}
