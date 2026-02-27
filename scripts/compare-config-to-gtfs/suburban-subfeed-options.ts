import type { ComparisonOptions } from "./comparison-options.js";
import * as stop from "../../src/config/stops/stop-ids.js";
import { isPresent } from "@dan-schel/js-utils";
import { NONSENSE_GTFS_STOP_ID_REGEX } from "../utils/gtfs/magic-values.js";

export const suburbanSubfeedOptions: ComparisonOptions = {
  stops: {
    all: {
      // We're not mapping the "vic:rail:ABC_[...]" codes at the moment. They're
      // the "decision point" type ones that seem to be points in the station
      // complex (for navigation?), not actual stops/platforms served by trains.
      ignoreIdMissingFromConfig: (node) =>
        !isPresent(node.platform_code) &&
        NONSENSE_GTFS_STOP_ID_REGEX.test(node.stop_id),

      // The replacement bus IDs seem to come and go. As services actually serve
      // these IDs (and we might want to display replacement bus stuff someday),
      // I'm choosing to map them instead of ignoring them.
      ignoreIdMissingFromGtfs: (id) => id.type === "replacement-bus",
    },

    [stop.JOLIMONT]: {
      // Appears as "Jolimont-MCG" in GTFS.
      ignoreNameMismatch: true,
    },

    [stop.ST_ALBANS]: {
      // Appears as "St Albans Railway Station (St Albans)" in GTFS.
      ignoreNameMismatch: true,
    },

    [stop.FLEMINGTON_RACECOURSE]: {
      // Sometimes Flemington Racecourse disappears from the GTFS data entirely,
      // and sometimes just the platforms do.
      ignoredIdsMissingFromGtfs: ["15524", "15525"],
    },

    [stop.SOUTHERN_CROSS]: {
      // This is platform 8, which disappears with the Flemington Racecourse
      // line sometimes. I guess that makes sense.
      ignoredIdsMissingFromGtfs: ["22187"],
    },
  },
};
