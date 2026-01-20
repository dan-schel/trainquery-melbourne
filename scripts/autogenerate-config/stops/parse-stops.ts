import { AutogenerationContext } from "../autogeneration-context";
import { trimStationNamesPatch } from "../patches/parsed-stops/trim-station-names";
import { applyPatches, Patch } from "../patches/patch";
import { buildStopsCsvTree } from "./build-stops-csv-tree";
import { extractStopsFromTree, ParsedStop } from "./extract-stops-from-tree";

const patches: Patch<ParsedStop[]>[] = [trimStationNamesPatch];

export function parseStops(ctx: AutogenerationContext): ParsedStop[] {
  const tree = buildStopsCsvTree(ctx);
  const stops = extractStopsFromTree(tree);
  const patchedStops = applyPatches(stops, patches);

  return patchedStops;
}
