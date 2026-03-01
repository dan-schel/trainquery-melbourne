import { env } from "./env.js";
import { withGtfsFiles } from "../../src/gtfs/schedule/with-gtfs-files.js";
import { readGtfs } from "../../src/gtfs/schedule/read-gtfs.js";
import { IssueCollector } from "./issue-collector.js";
import { extractConfigForSubfeed } from "./extract-config-for-subfeed.js";
import { compareSubfeed } from "./compare-subfeed.js";
import { suburbanSubfeedOptions } from "./suburban-subfeed-options.js";
import { regionalSubfeedOptions } from "./regional-subfeed-options.js";
import { reportToGithub } from "./output-to-github/report-to-github.js";
import { GithubClient } from "./output-to-github/github-client.js";
import { createGithubIssueFlag } from "./output-to-github/constants.js";

async function main() {
  const args = process.argv.slice(2);
  const outputToGithub = args.includes(createGithubIssueFlag);

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

  if (outputToGithub) {
    const githubClient = GithubClient.fromEnv(env);
    await reportToGithub(githubClient, issues);

    // We DON'T want an ❌ against the action maintaining the github issue,
    // unless the action itself fails.
    process.exit(0);
  } else {
    issues.outputToConsole();

    // For CI however, we DO want an ❌ against any PR making an incompatible
    // config change.
    process.exit(issues.isEmpty() ? 0 : 1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
