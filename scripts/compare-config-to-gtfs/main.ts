import { env } from "./env.js";
import type { ComparisonOptions } from "./comparison-options.js";
import { compareConfigToGtfs } from "./compare-config-to-gtfs.js";
import * as stop from "../../src/config/stops/stop-ids.js";
import { isPresent } from "@dan-schel/js-utils";
import { NONSENSE_GTFS_STOP_ID_REGEX } from "../utils/gtfs/magic-values.js";

const options: ComparisonOptions = {
  stops: {
    all: {
      ignoreUnmappedChildGtfsId: (node) =>
        !isPresent(node.platform_code) &&
        NONSENSE_GTFS_STOP_ID_REGEX.test(node.stop_id),
    },

    [stop.JOLIMONT]: {
      // Appears as "Jolimont-MCG" in GTFS.
      ignoreNameMismatch: true,
    },

    [stop.ST_ALBANS]: {
      // Appears as "St Albans Railway Station (St Albans)" in GTFS.
      ignoreNameMismatch: true,
    },
  },
};

async function main() {
  await compareConfigToGtfs(env.RELAY_KEY, options);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
