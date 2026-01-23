import type { GtfsPatch } from "../patch.js";
import { jolimontStationNamePatch } from "./jolimont-station-name.js";
import { removeUselessChildStopsPatch } from "./remove-useless-child-stops.js";
import { springhurstStationNamePatch } from "./springhurst-station-name.js";
import { stAlbansStationNamePatch } from "./st-albans-station-name.js";

export const gtfsDataPatches: GtfsPatch[] = [
  jolimontStationNamePatch,
  stAlbansStationNamePatch,
  springhurstStationNamePatch,
  removeUselessChildStopsPatch,
];
