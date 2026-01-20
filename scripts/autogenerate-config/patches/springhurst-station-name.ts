import { GtfsDataPatch } from "../patch";

export const springhurstStationNamePatch: GtfsDataPatch = {
  type: "gtfs-data",

  isNeeded: async (input) => {
    const stop = input.regional.stops.find((stop) => stop.stop_id === "1620");
    if (stop == null) return false;
    return stop.stop_name === "";
  },

  func: async (input) => ({
    ...input,
    regional: {
      ...input.regional,
      stops: input.regional.stops.map((stop) =>
        stop.stop_id === "1620" ? { ...stop, stop_name: "Springhurst" } : stop,
      ),
    },
  }),
};
