import { AutogenerationContext } from "../autogeneration-context.js";
import { trimStationNamesPatch } from "../patches/parsed-stops/trim-station-names.js";
import { applyPatches, type Patch } from "../patches/patch.js";
import { buildStopsCsvTree } from "./build-stops-csv-tree.js";
import {
  extractStopsFromTree,
  type ParsedStop,
} from "./extract-stops-from-tree.js";

const patches: Patch<ParsedStop[]>[] = [trimStationNamesPatch];

export function parseStops(ctx: AutogenerationContext): ParsedStop[] {
  const tree = buildStopsCsvTree(ctx);
  const stops = extractStopsFromTree(tree);
  const patchedStops = applyPatches(stops, patches);

  return patchedStops;
}
