import type { GithubClient } from "./github-client.js";
import type { IssueCollector } from "../issue-collector.js";

const issueTitle = "Automated GTFS Config Check Failed";

// GitHub issues are limited to ~65k chars.
const issuesListMaxLength = 60000;

export async function reportToGithub(
  github: GithubClient,
  issues: IssueCollector,
): Promise<void> {
  const ghIssue = await github.findIssueByTitle(issueTitle);
  if (ghIssue != null) {
    console.log(`Found GitHub issue "${ghIssue.title}" (#${ghIssue.number}).`);
  } else {
    console.log(`No existing GitHub issue with title "${issueTitle}" found.`);
  }

  if (issues.isEmpty()) {
    console.log("No issues needing reporting!");

    if (ghIssue != null) {
      console.log(`Closing existing GitHub issue...`);
      await github.closeIssue(ghIssue.number);
    }

    console.log("✅ Done!");
    return;
  }

  const noun = issues.getCount() === 1 ? "issue" : "issues";
  console.log(`Found ${issues.getCount()} comparison ${noun} to report.`);

  const ghIssueBody = createIssueBody(github, issues);

  if (ghIssue == null) {
    console.log(`Opening GitHub issue...`);

    await github.createIssue({
      title: issueTitle,
      body: ghIssueBody,
      assignees: [github.repoOwner],
    });

    console.log("✅ Done!");
    return;
  }

  if (ghIssue.body !== ghIssueBody) {
    console.log(`Updating GitHub issue, as content is outdated...`);
    await github.updateIssueBody(ghIssue.number, ghIssueBody);
  }

  console.log(`Existing GitHub issue is identical. No action required.`);
  console.log("✅ Done!");
  return;
}

function createIssueBody(github: GithubClient, issues: IssueCollector): string {
  // TODO: Move logic to IssueCollector.
  const formattedIssues = issues
    .getIssues()
    .map((i) => `- ${i.message}`)
    .join("\n");

  // TODO: truncateIfOverLength() function.
  const requiresTruncation = formattedIssues.length > issuesListMaxLength;
  const truncatedIssues = requiresTruncation
    ? formattedIssues.slice(0, issuesListMaxLength) + "\n... (truncated)"
    : formattedIssues;
  const issuesBlock = "```\n" + truncatedIssues + "\n```";

  const noun = issues.getCount() === 1 ? "issue" : "issues";
  const header = `@${github.repoOwner} Comparing current config to the latest published GTFS reveals ${noun}:`;
  const footer = `(Generated against commit ${github.commitSha.slice(0, 7)})`;

  return `${header}\n\n${issuesBlock}\n\n${footer}`;
}
