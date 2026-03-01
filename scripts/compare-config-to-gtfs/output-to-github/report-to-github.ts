import type { GithubClient } from "./github-client.js";
import type { IssueCollector } from "../issue-collector.js";
import {
  truncateListAfterChars,
  issueTitle,
  dateFormatOptions,
  dateFormatLocale,
} from "./constants.js";

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
  const noun = issues.getCount() === 1 ? "discrepancy" : "discrepancies";
  const header = `@${github.repoOwner} ${issues.getCount()} ${noun} found between config and the latest GTFS data:`;

  const issuesStr = issues.asFormattedList();
  const truncatedStr = truncateIfOverLength(issuesStr, truncateListAfterChars);
  const issuesBlock = "```\n" + truncatedStr + "\n```";

  const time = new Date().toLocaleString(dateFormatLocale, dateFormatOptions);
  const commit = `[${github.commitSha.slice(0, 7)}](${github.getCommitUrl()})`;
  const footer = `(Updated ${time}, against commit ${commit})`;

  return `${header}\n\n${issuesBlock}\n\n${footer}`;
}

function truncateIfOverLength(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "\n... (truncated)";
}
