// TODO: Remove this.
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { DepartureSearchDirection } from "./corequery-departure-iterator.js";
import { DeparturesBlock } from "./departures-block.js";

export class RealtimeDeparturesBlock extends DeparturesBlock {
  override setAtTime(
    time: Temporal.Instant,
    direction: DepartureSearchDirection,
  ): void {
    throw new Error("Method not implemented.");
  }
  override setToStart(direction: DepartureSearchDirection): void {
    throw new Error("Method not implemented.");
  }

  override take(): void {
    // TODO: Obviously for this to work, this class needs to contain the list of
    // departures for the stop for which it is created.
    throw new Error("Method not implemented.");
  }
  override peek(): void {
    throw new Error("Method not implemented.");
  }
}
