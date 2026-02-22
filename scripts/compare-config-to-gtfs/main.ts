import { env } from "./env.js";
import type { ComparisonOptions } from "./comparison-options.js";
import { compareConfigToGtfs } from "./compare-config-to-gtfs.js";
import * as stop from "../../src/config/stops/stop-ids.js";

const options: ComparisonOptions = {
  stops: {
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
