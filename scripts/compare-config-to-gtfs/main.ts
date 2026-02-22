import { env } from "./env.js";
import { ComparisonContext } from "./comparison-context.js";
import { compareStops } from "./stop/index.js";
import type { ComparisonOptions } from "./comparison-options.js";

const options: ComparisonOptions = {};

async function main() {
  console.log("Downloading/parsing GTFS data...");

  const ctx = await ComparisonContext.build(env.RELAY_KEY, options);

  console.log("Checking for issues...");

  compareStops(
    ctx.issues,
    ctx.lintableConfig.stops,
    ctx.stopsCsvTree,
    ctx.stopGtfsIds,
    ctx.options.stops ?? {},
  );

  console.log();
  const issues = ctx.issues.getIssues();
  if (issues.length === 0) {
    console.log("No issues found!");
  } else {
    console.log(`Found ${issues.length} issue(s):`);
    for (const issue of issues) {
      console.log(`- ${issue.message}`);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
