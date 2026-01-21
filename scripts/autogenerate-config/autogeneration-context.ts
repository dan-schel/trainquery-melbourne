import { type GtfsData } from "./gtfs/read-gtfs.js";
import { IdList } from "./source-code/id-list.js";
import { StopGtfsIdsMapping } from "./source-code/stop-gtfs-ids-mapping.js";
import { StopList } from "./source-code/stop-list.js";
import { StopPtvApiIdsMapping } from "./source-code/stop-ptv-api-ids-mapping.js";

export class AutogenerationContext {
  readonly stops: StopList;
  readonly stopGtfsIds: StopGtfsIdsMapping;
  readonly stopPtvApiIds: StopPtvApiIdsMapping;

  constructor(
    readonly checkMode: boolean,
    readonly gtfsData: GtfsData,
    readonly stopIds: IdList,
    readonly lineIds: IdList,
    readonly routeIds: IdList,
    readonly positionIds: IdList,
  ) {
    this.stops = new StopList();
    this.stopGtfsIds = new StopGtfsIdsMapping();
    this.stopPtvApiIds = new StopPtvApiIdsMapping();
  }
}
