import { GtfsData } from "./gtfs/read-gtfs";
import { IdList } from "./source-code/id-list";
import { StopList } from "./source-code/stop-list";

export class AutogenerationContext {
  constructor(
    readonly checkMode: boolean,
    readonly gtfsData: GtfsData,
    readonly stopIds: IdList,
    readonly lineIds: IdList,
    readonly stops: StopList,
  ) {}
}
