import { env } from "./env.js";
import { LintingContext } from "./linting-context.js";

async function main() {
  console.log("Downloading/parsing GTFS data...");

  const context = await LintingContext.build(env.RELAY_KEY);

  console.log(`That's ${context.stopsCsvTree.nodes.length} stops!`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
