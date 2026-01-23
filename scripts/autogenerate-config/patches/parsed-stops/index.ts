import type { StopPatch } from "../patch.js";
import { addFlemingtonRacecourseStationPatch } from "./add-flemington-racecourse-station.js";
import { addRegionalPlatformsPatch } from "./add-regional-platforms.js";
import { addShowgroundsStationPatch } from "./add-showgrounds-station.js";
import { trimStationNamesPatch } from "./trim-station-names.js";

export const parsedStopsPatches: StopPatch[] = [
  trimStationNamesPatch,
  addFlemingtonRacecourseStationPatch,
  addShowgroundsStationPatch,
  addRegionalPlatformsPatch,
];
