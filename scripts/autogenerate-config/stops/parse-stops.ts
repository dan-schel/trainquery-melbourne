import { AutogenerationContext } from "../autogeneration-context.js";
import { parsedStopsPatches } from "../patches/parsed-stops/index.js";
import { applyPatches } from "../patches/patch.js";
import { buildStopsCsvTree } from "./build-stops-csv-tree.js";
import {
  extractStopsFromTree,
  type ParsedStop,
} from "./extract-stops-from-tree.js";
import { mergeRootsOfAllSubfeeds } from "./merge-roots-of-all-subfeeds.js";

export function parseStops(ctx: AutogenerationContext): ParsedStop[] {
  const suburbanTree = buildStopsCsvTree(ctx.gtfsData.suburban.stops);
  const regionalTree = buildStopsCsvTree(ctx.gtfsData.regional.stops);
  const unifiedTree = mergeRootsOfAllSubfeeds([suburbanTree, regionalTree]);
  const stops = extractStopsFromTree(unifiedTree);
  const patchedStops = applyPatches(stops, parsedStopsPatches);

  return patchedStops;
}
