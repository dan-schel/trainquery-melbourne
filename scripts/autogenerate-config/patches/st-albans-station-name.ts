import { GtfsDataPatch } from "../patch";

export const stAlbansStationNamePatch: GtfsDataPatch = {
  type: "gtfs-data",

  func: async (input) => ({
    ...input,
    suburban: {
      ...input.suburban,
      stops: input.suburban.stops.map((stop) =>
        stop.stop_name === "St Albans Railway Station (St Albans)"
          ? { ...stop, stop_name: "St Albans Railway Station" }
          : stop,
      ),
    },
  }),

  isNeeded: async (input) =>
    input.suburban.stops.some(
      (stop) => stop.stop_name === "St Albans Railway Station (St Albans)",
    ),
};
