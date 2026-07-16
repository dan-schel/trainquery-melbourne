import {
  DepartureIterator,
  type Departure,
} from "./corequery-departure-iterator.js";

export class TrainqueryDepartureIterator extends DepartureIterator {
  override take(): Departure | null {
    throw new Error("Method not implemented.");
  }

  override peek(): Departure | null {
    throw new Error("Method not implemented.");
  }
}
