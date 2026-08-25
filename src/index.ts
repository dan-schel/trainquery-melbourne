import "temporal-polyfill/global";
import { Corequery } from "corequery";
import { createConfigBuilder } from "./config/corequery/index.js";
import { GtfsSystem } from "corequery-gtfs";
import { suburbanGtfsConfig, regionalGtfsConfig } from "./config/gtfs/index.js";
import { RelayManager } from "./relay/relay-manager.js";
import { env } from "./env.js";

async function main() {
  const relayManager = new RelayManager({
    relayKey: env.RELAY_KEY,
    suburbanGtfs: GtfsSystem.build("gtfs-suburban", suburbanGtfsConfig),
    regionalGtfs: GtfsSystem.build("gtfs-regional", regionalGtfsConfig),
  });

  const buildConfig = createConfigBuilder({
    envPort: env.PORT,
    envCommitHash: env.COMMIT_HASH,
    relayManager: relayManager,
  });

  // TODO: Need to investigate why frontend version is changing on every
  // `npm run start`/`npm run dev`. It should remain constant as long as the
  // corequery version isn't changing and the assets aren't changing.
  const trainquery = new Corequery(buildConfig);

  await relayManager.init();
  await trainquery.start();

  relayManager.start();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
