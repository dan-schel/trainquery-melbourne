import { checkCorridorsConsistent } from "./checks/check-corridors-consistent/index.js";
import { env } from "./env.js";
import { LintIssueReporter } from "./lint-issue-reporter.js";
import { LintingContext } from "./linting-context.js";

async function main() {
  console.log("Downloading/parsing GTFS data...");

  const ctx = await LintingContext.build(env.RELAY_KEY);
  const reporter = new LintIssueReporter();

  reporter.scope("Corridors consistent", () => {
    checkCorridorsConsistent(ctx, reporter);
  });

  reporter.printSummary();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
