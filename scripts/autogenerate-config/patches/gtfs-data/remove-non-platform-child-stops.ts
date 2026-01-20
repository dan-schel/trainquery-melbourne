import type { GtfsData } from "../../gtfs/read-gtfs.js";
import type { Patch } from "../patch.js";

export const removeNonPlatformChildStopsPatch: Patch<GtfsData> = (data) => {
  // TODO: Everything. (Probably best to do it after we're outputting the GTFS
  // ID maps to see the impact!)
  return data;
};
