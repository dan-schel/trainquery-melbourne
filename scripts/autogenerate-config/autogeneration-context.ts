import { GtfsData } from "./gtfs/read-gtfs";
import { IdList } from "./source-code/id-list";

export class AutogenerationContext {
  constructor(
    readonly checkMode: boolean,
    readonly gtfsData: GtfsData,
    readonly stopIds: IdList,
    readonly lineIds: IdList,
  ) {}
}
