import { env } from "./env.js";
import { withGtfsFiles } from "../../src/gtfs/schedule/with-gtfs-files.js";
import { readGtfs } from "../../src/gtfs/schedule/read-gtfs.js";
import { IssueCollector } from "./issue-collector.js";
import { extractConfigForSubfeed } from "./extract-config-for-subfeed.js";
import { compareSubfeed } from "./compare-subfeed.js";
import { suburbanSubfeedOptions } from "./suburban-subfeed-options.js";
import { regionalSubfeedOptions } from "./regional-subfeed-options.js";
import { reportToGithub } from "./github-actions.js";

async function main() {
  const args = process.argv.slice(2);
  const outputToGithub = args.includes("--output-to-github");

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
  const issueMessages = issues.getIssues().map((i) => i.message);

  if (outputToGithub) {
    await reportToGithub(issueMessages);
    // In GitHub CI mode, always exit with code 0 unless the script itself
    // fails.
  } else {
    if (issueMessages.length === 0) {
      console.log("No issues found!");
    } else {
      console.log(`Found ${issueMessages.length} issue(s):`);
      for (const msg of issueMessages) {
        console.log(`- ${msg}`);
      }
      process.exit(1);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
