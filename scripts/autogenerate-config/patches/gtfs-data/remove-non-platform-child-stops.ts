import type { StopsCsvRow } from "../../gtfs/csv-schemas.js";
import type { GtfsData } from "../../gtfs/read-gtfs.js";
import { isPresent } from "../../utils/is-present.js";
import type { Patch } from "../patch.js";

export const removeNonPlatformChildStopsPatch: Patch<GtfsData> = (data) => {
  const newSuburbanStops = data.suburban.stops.filter(
    (stop) => !shouldBeRemoved(stop),
  );

  const madeChanges = newSuburbanStops.length < data.suburban.stops.length;
  if (!madeChanges) throw new Error("No stops were filtered out.");

  return {
    ...data,
    suburban: {
      ...data.suburban,
      stops: newSuburbanStops,
    },
  };
};

function shouldBeRemoved(stop: StopsCsvRow): boolean {
  return (
    isPresent(stop.parent_station) &&
    !isPresent(stop.platform_code) &&
    // Starts with vic:rail:ABC but has more characters after that.
    /^vic:rail:[A-Z]{3}.+/g.test(stop.stop_id)
  );
}
