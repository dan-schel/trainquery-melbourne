import type { GtfsData } from "../read-gtfs.js";
import { patchDuplicateStopTimes } from "./patch-duplicate-stop-times.js";

type Patch = (gtfsData: GtfsData) => GtfsData;

// This "patch" mechanism is to be used SPARINGLY, and only for issues that
// actually affect TrainQuery at runtime. Things which are purely linting/config
// comparison issues should be handled with ignores.
//
// e.g. Jolimont station's name not matching does NOT get a patch, because at
// runtime TrainQuery uses the name from config, not the GTFS name. Instead, the
// rule checking for the mismatch should be configurable to ignore the check for
// Jolimont station.
//
// e.g. duplicate stop times appearing in stop_times.txt DOES get a patch,
// because it runtime TrainQuery will fail to match the trip to any route, and
// would presumably show double stops even if it could.
const activePatches: Patch[] = [patchDuplicateStopTimes];

export function applyPatches(gtfsData: GtfsData): GtfsData {
  return activePatches.reduce((data, patch) => patch(data), gtfsData);
}
