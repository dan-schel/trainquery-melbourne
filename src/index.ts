import { Corequery } from "corequery";
import { config } from "./config/index.js";

async function main() {
  const trainquery = new Corequery(config);
  await trainquery.start();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
