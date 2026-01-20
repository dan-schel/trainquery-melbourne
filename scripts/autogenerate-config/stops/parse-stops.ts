import { AutogenerationContext } from "../autogeneration-context.js";
import { parsedStopsPatches } from "../patches/parsed-stops/index.js";
import { applyPatches } from "../patches/patch.js";
import { buildStopsCsvTree } from "./build-stops-csv-tree.js";
import {
  extractStopsFromTree,
  type ParsedStop,
} from "./extract-stops-from-tree.js";

export function parseStops(ctx: AutogenerationContext): ParsedStop[] {
  const tree = buildStopsCsvTree(ctx);
  const stops = extractStopsFromTree(tree);
  const patchedStops = applyPatches(stops, parsedStopsPatches);

  return patchedStops;
}
