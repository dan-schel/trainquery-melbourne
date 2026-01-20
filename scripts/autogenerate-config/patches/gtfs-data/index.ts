import type { GtfsData } from "../../gtfs/read-gtfs.js";
import type { Patch } from "../patch.js";
import { jolimontStationNamePatch } from "./jolimont-station-name.js";
import { removeNonPlatformChildStopsPatch } from "./remove-non-platform-child-stops.js";
import { springhurstStationNamePatch } from "./springhurst-station-name.js";
import { stAlbansStationNamePatch } from "./st-albans-station-name.js";

export const gtfsDataPatches: Patch<GtfsData>[] = [
  jolimontStationNamePatch,
  stAlbansStationNamePatch,
  springhurstStationNamePatch,
  removeNonPlatformChildStopsPatch,
];
