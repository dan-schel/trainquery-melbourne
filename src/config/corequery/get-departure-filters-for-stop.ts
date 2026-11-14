import type { GetDepartureFiltersForStopConfig } from "corequery";

export const getDepartureFiltersForStop: GetDepartureFiltersForStopConfig = (
  _stopId,
) => {
  // TODO: Do this properly!
  return {
    lines: "canonical",
    positions: "off",
    customGroups: [],
  };
};
