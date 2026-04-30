import { Corequery } from "corequery";
import { buildConfig } from "./config/index.js";

async function main() {
  // TODO: Need to investigate why frontend version is changing on every
  // `npm run start`/`npm run dev`. It should remain constant as long as the
  // corequery version isn't changing and the assets aren't changing.
  const trainquery = new Corequery(buildConfig);
  await trainquery.start();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
