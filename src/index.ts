import { Corequery } from "corequery";
import { buildConfig } from "./config/index.js";

async function main() {
  const trainquery = new Corequery(buildConfig);
  await trainquery.start();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
