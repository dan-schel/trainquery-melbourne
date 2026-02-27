import type { ComparisonOptions } from "./comparison-options.js";
import { isPresent } from "@dan-schel/js-utils";
import { NONSENSE_GTFS_STOP_ID_REGEX } from "../utils/gtfs/magic-values.js";

export const regionalSubfeedOptions: ComparisonOptions = {
  stops: {
    all: {
      // We're not mapping the "vic:rail:ABC_[...]" codes at the moment. They're
      // the "decision point" type ones that seem to be points in the station
      // complex (for navigation?), not actual stops/platforms served by trains.
      ignoreIdMissingFromConfig: (node) =>
        !isPresent(node.platform_code) &&
        NONSENSE_GTFS_STOP_ID_REGEX.test(node.stop_id),

      // The replacement bus IDs seem to come and go, even in the regional
      // subfeed!
      ignoreIdMissingFromGtfs: (id) => id.type === "replacement-bus",
    },
  },
};
