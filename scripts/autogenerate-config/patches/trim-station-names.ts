import { GtfsDataPatch } from "../patch";

export const trimStationNamesPatch: GtfsDataPatch = {
  type: "gtfs-data",

  isNeeded: async (_input) => true,

  func: async (input) => ({
    ...input,
    suburban: {
      ...input.suburban,
      stops: input.suburban.stops.map((stop) => ({
        ...stop,
        stop_name: stop.stop_name.trim(),
      })),
    },
    regional: {
      ...input.regional,
      stops: input.regional.stops.map((stop) => ({
        ...stop,
        stop_name: stop.stop_name.trim(),
      })),
    },
  }),
};
