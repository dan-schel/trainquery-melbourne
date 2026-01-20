import { type GtfsData } from "./gtfs/read-gtfs.js";
import { IdList } from "./source-code/id-list.js";
import { StopList } from "./source-code/stop-list.js";

export class AutogenerationContext {
  readonly stops: StopList;

  constructor(
    readonly checkMode: boolean,
    readonly gtfsData: GtfsData,
    readonly stopIds: IdList,
    readonly lineIds: IdList,
    readonly routeIds: IdList,
    readonly positionIds: IdList,
  ) {
    this.stops = new StopList([]);
  }
}
