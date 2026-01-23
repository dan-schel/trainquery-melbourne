import type { StopsCsv, StopsCsvRow } from "../../gtfs/csv-schemas.js";
import { isPresent } from "../../utils/is-present.js";
import type { GtfsPatch } from "../patch.js";

export const removeUselessChildStopsPatch: GtfsPatch = (data) => {
  return {
    ...data,
    suburban: {
      ...data.suburban,
      stops: removeStopsFromSubfeed(data.suburban.stops),
    },
    regional: {
      ...data.regional,
      stops: removeStopsFromSubfeed(data.regional.stops),
    },
  };
};

function removeStopsFromSubfeed(stops: StopsCsv) {
  const newStops = stops.filter((stop) => !shouldBeRemoved(stop));

  const madeChanges = newStops.length < stops.length;
  if (!madeChanges) throw new Error("No stops were filtered out.");

  return newStops;
}

function shouldBeRemoved(stop: StopsCsvRow): boolean {
  return (
    isPresent(stop.parent_station) &&
    !isPresent(stop.platform_code) &&
    // Starts with vic:rail:ABC but has more characters after that.
    /^vic:rail:[A-Z]{3}.+/g.test(stop.stop_id)
  );
}
