import { type ParsedStop } from "../../stops/extract-stops-from-tree.js";
import { type Patch } from "../patch.js";

export const trimStationNamesPatch: Patch<ParsedStop[]> = (stops) => {
  return stops.map((stop) => ({
    ...stop,
    name: stop.name.trim().replace(/( Railway)? Station$/gi, ""),
  }));
};
