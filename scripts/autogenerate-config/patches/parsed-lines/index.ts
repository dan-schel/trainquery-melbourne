import type { LinePatch } from "../patch.js";
import { fixLineNamesPatch } from "./fix-line-names.js";
// import { mergeRegionalLinesPatch } from "./merge-regional-lines.js";

export const parsedLinesPatches: LinePatch[] = [
  // mergeRegionalLinesPatch,
  fixLineNamesPatch,
];
