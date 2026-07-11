import type { GtfsCsvData } from "../../../retrieval/schedule/read-gtfs-csvs.js";
// import { patchDuplicateStopTimes } from "./patch-duplicate-stop-times.js";

type Patch = (gtfsData: GtfsCsvData) => GtfsCsvData;

// This "patch" mechanism is to be used SPARINGLY, and only for issues that
// actually affect TrainQuery at runtime. Things which are purely linting/config
// comparison issues should be handled with ignores.
//
// e.g. Jolimont station's name not matching does NOT get a patch, because at
// runtime TrainQuery uses the name from config, not the GTFS name. Instead, the
// rule checking for the mismatch should be configurable to ignore the check for
// Jolimont station.
//
// e.g. a stop time being given in an invalid format SHOULD get a patch, because
// PTV would be violating the GTFS spec and TrainQuery wouldn't be able to parse
// the data at all.
const activePatches: Patch[] = [];

export function applyPatches(gtfsData: GtfsCsvData): GtfsCsvData {
  return activePatches.reduce((data, patch) => patch(data), gtfsData);
}
