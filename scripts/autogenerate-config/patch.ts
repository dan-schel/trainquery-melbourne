import { GtfsData } from "./gtfs/read-gtfs";

export type GtfsDataPatch = {
  readonly type: "gtfs-data";
  readonly ensureIsNeeded?: boolean;
  readonly func: (data: GtfsData) => Promise<GtfsData>;
  readonly isNeeded: (data: GtfsData) => Promise<boolean>;
};
