import { type StopPatch } from "../patch.js";

export const trimStationNamesPatch: StopPatch = (_ctx, stops) => {
  return stops.map((stop) => ({
    ...stop,
    name: stop.name.trim().replace(/( Railway)? Station$/gi, ""),
  }));
};
