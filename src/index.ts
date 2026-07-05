import { Corequery } from "corequery";
import { buildConfig } from "./config/corequery/index.js";
import { runGtfsTempScript } from "./gtfs/temp-script.js";

// TODO: Can remove once NodeJS v26 becomes LTS (expected in October 2026).
import "temporal-polyfill/global";
import { lineGtfsIds } from "./config/gtfs/line-gtfs-ids.js";
import { stopGtfsIds } from "./config/gtfs/stop-gtfs-ids.js";
import { lineRoutes } from "./config/gtfs/routes.js";

async function main() {
  // TODO: Need to investigate why frontend version is changing on every
  // `npm run start`/`npm run dev`. It should remain constant as long as the
  // corequery version isn't changing and the assets aren't changing.
  const trainquery = new Corequery(buildConfig);

  // TEMPORARILY COMMENTED OUT FOR TEMP SCRIPT BELOW.
  // await trainquery.start();

  await runGtfsTempScript(trainquery, { lineGtfsIds, stopGtfsIds, lineRoutes });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
