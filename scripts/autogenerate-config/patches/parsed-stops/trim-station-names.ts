import { ParsedStop } from "../../stops/extract-stops-from-tree";
import { Patch } from "../patch";

export const trimStationNamesPatch: Patch<ParsedStop[]> = (stops) => {
  return stops.map((stop) => ({
    ...stop,
    name: stop.name.trim().replace(/( Railway)? Station$/gi, ""),
  }));
};
