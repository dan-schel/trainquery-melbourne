import { env } from "./env.js";
import { LintingContext } from "./linting-context.js";

async function main() {
  console.log("Downloading/parsing GTFS data...");

  const ctx = await LintingContext.build(env.RELAY_KEY);

  console.log(ctx.gtfsData.regional.trips.length);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
