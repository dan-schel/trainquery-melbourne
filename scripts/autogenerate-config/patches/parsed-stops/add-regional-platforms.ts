import { type ParsedStop } from "../../stops/extract-stops-from-tree.js";
import { type Patch } from "../patch.js";

export const addRegionalPlatformsPatch: Patch<ParsedStop[]> = (stops) => {
  // TODO: Everything.
  return stops;
};
