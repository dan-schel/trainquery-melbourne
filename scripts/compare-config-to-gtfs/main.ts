import { env } from "./env.js";
import { withGtfsFiles } from "../../src/gtfs/schedule/with-gtfs-files.js";
import { readGtfs } from "../../src/gtfs/schedule/read-gtfs.js";
import { IssueCollector } from "./issue-collector.js";
import { extractConfigForSubfeed } from "./extract-config-for-subfeed.js";
import { compareSubfeed } from "./compare-subfeed.js";
import { suburbanSubfeedOptions } from "./suburban-subfeed-options.js";
import { regionalSubfeedOptions } from "./regional-subfeed-options.js";

async function main() {
  const issues = new IssueCollector();

  console.log("Downloading/parsing GTFS data...");
  const gtfsData = await withGtfsFiles(env.RELAY_KEY, readGtfs);

  console.log("Checking for issues (suburban)...");

  compareSubfeed({
    ...extractConfigForSubfeed("suburban"),
    gtfsFeed: gtfsData.suburban,
    issues,
    options: suburbanSubfeedOptions,
  });

  console.log("Checking for issues (regional)...");

  compareSubfeed({
    ...extractConfigForSubfeed("regional"),
    gtfsFeed: gtfsData.regional,
    issues,
    options: regionalSubfeedOptions,
  });

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

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
