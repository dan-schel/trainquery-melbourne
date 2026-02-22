import { buildComparisonContext } from "./comparison-context.js";
import type { ComparisonOptions } from "./comparison-options.js";
import { IssueCollector } from "./issue-collector.js";
import { compareStops } from "./stop/index.js";

export async function compareConfigToGtfs(
  relayKey: string,
  options: ComparisonOptions,
) {
  console.log("Downloading/parsing GTFS data...");

  const issues = new IssueCollector();
  const ctx = await buildComparisonContext(relayKey, options);

  console.log("Checking for issues...");

  compareStops(ctx, issues);

  console.log();
  if (issues.getIssues().length === 0) {
    console.log("No issues found!");
  } else {
    console.log(`Found ${issues.getIssues().length} issue(s):`);
    for (const issue of issues.getIssues()) {
      console.log(`- ${issue.message}`);
    }
    process.exit(1);
  }
}
