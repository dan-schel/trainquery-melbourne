import "temporal-polyfill/global";
import { Corequery } from "corequery";
import { buildConfig } from "./config/corequery/index.js";
import { runGtfsTempScript } from "./gtfs/temp-script.js";
import { regionalGtfsConfig, suburbanGtfsConfig } from "./config/gtfs/index.js";

async function main() {
  // TODO: Need to investigate why frontend version is changing on every
  // `npm run start`/`npm run dev`. It should remain constant as long as the
  // corequery version isn't changing and the assets aren't changing.
  const trainquery = new Corequery(buildConfig);

  // TEMPORARILY COMMENTED OUT FOR TEMP SCRIPT BELOW.
  // await trainquery.start();

  await runGtfsTempScript(trainquery, suburbanGtfsConfig, regionalGtfsConfig);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
