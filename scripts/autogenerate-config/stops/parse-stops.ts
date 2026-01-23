import { AutogenerationContext } from "../autogeneration-context.js";
import { parsedStopsPatches } from "../patches/parsed-stops/index.js";
import { applyContextAwarePatches } from "../patches/patch.js";
import { buildStopsCsvTree } from "./build-stops-csv-tree.js";
import {
  extractStopsFromTree,
  type ParsedStop,
} from "./extract-stops-from-tree.js";
import { mergeRootsOfAllSubfeeds } from "./merge-roots-of-all-subfeeds.js";

export function parseStops(ctx: AutogenerationContext): ParsedStop[] {
  const suburban = buildStopsCsvTree(ctx.gtfsData.suburban.stops, "suburban");
  const regional = buildStopsCsvTree(ctx.gtfsData.regional.stops, "regional");
  const unifiedTree = mergeRootsOfAllSubfeeds([suburban, regional]);

  const stops = extractStopsFromTree(unifiedTree);

  const patchedStops = applyContextAwarePatches(ctx, stops, parsedStopsPatches);
  return patchedStops;
}
