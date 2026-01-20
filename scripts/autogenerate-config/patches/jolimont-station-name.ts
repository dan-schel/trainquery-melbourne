import { GtfsDataPatch } from "../patch";

export const jolimontStationNamePatch: GtfsDataPatch = {
  type: "gtfs-data",

  isNeeded: async (input) =>
    input.suburban.stops.some((stop) => /Jolimont-MCG/g.test(stop.stop_name)),

  func: async (input) => ({
    ...input,
    suburban: {
      ...input.suburban,
      stops: input.suburban.stops.map((stop) =>
        /Jolimont-MCG/g.test(stop.stop_name)
          ? { ...stop, stop_name: "Jolimont" }
          : stop,
      ),
    },
  }),
};
