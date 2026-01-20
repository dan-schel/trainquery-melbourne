import type { ParsedStop } from "../../stops/extract-stops-from-tree.js";
import type { Patch } from "../patch.js";
import { addFlemingtonRacecourseStationPatch } from "./add-flemington-racecourse-station.js";
import { addRegionalPlatformsPatch } from "./add-regional-platforms.js";
import { addShowgroundsStationPatch } from "./add-showgrounds-station.js";
import { trimStationNamesPatch } from "./trim-station-names.js";

export const parsedStopsPatches: Patch<ParsedStop[]>[] = [
  trimStationNamesPatch,
  addFlemingtonRacecourseStationPatch,
  addShowgroundsStationPatch,
  addRegionalPlatformsPatch,
];
