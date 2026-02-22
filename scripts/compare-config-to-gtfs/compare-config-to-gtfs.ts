import { ComparisonContext } from "./comparison-context.js";
import type { ComparisonOptions } from "./comparison-options.js";
import { compareStops } from "./stop/index.js";

export async function compareConfigToGtfs(
  relayKey: string,
  options: ComparisonOptions,
) {
  console.log("Downloading/parsing GTFS data...");

  const ctx = await ComparisonContext.build(relayKey, options);

  console.log("Checking for issues...");

  compareStops(
    ctx.issues,
    ctx.lintableConfig.stops,
    ctx.stopsCsvTree,
    ctx.stopGtfsIds,
    ctx.options.stops ?? {},
    ctx.options.ignoredUnmappedGtfsStops ?? [],
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
