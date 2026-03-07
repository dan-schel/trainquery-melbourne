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
  suburbanIssues: IssueCollector,
  regionalIssues: IssueCollector,
): Promise<void> {
  const ghIssue = await github.findIssueByTitle(issueTitle);
  if (ghIssue != null) {
    console.log(`Found GitHub issue "${ghIssue.title}" (#${ghIssue.number}).`);
  } else {
    console.log(`No existing GitHub issue with title "${issueTitle}" found.`);
  }

  const issuesCount = suburbanIssues.getCount() + regionalIssues.getCount();

  if (issuesCount === 0) {
    console.log("No issues needing reporting!");

    if (ghIssue != null) {
      console.log(`Closing existing GitHub issue...`);
      await github.closeIssue(ghIssue.number);
    }

    console.log("✅ Done!");
    return;
  }

  const noun = issuesCount === 1 ? "issue" : "issues";
  console.log(`Found ${issuesCount} comparison ${noun} to report.`);

  const ghIssueBody = createIssueBody(github, suburbanIssues, regionalIssues);

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

    console.log("✅ Done!");
    return;
  }

  console.log(`Existing GitHub issue is identical. No action required.`);
  console.log("✅ Done!");
}

function createIssueBody(
  github: GithubClient,
  suburbanIssues: IssueCollector,
  regionalIssues: IssueCollector,
): string {
  const issuesCount = suburbanIssues.getCount() + regionalIssues.getCount();
  const noun = issuesCount === 1 ? "discrepancy" : "discrepancies";
  const header = `@${github.repoOwner} ${issuesCount} ${noun} found between config and the latest GTFS data:`;

  function createBlock(issues: IssueCollector, subfeedName: string): string {
    // Each of the two subfeeds get half the character limit each.
    const maxChars = truncateListAfterChars / 2;

    const issuesStr = issues.asFormattedList();
    const truncatedStr = truncateIfOverLength(issuesStr, maxChars);
    const issuesBlock = "```\n" + truncatedStr + "\n```";

    return `#### Against ${subfeedName} subfeed:\n\n${issuesBlock}`;
  }

  const time = new Date().toLocaleString(dateFormatLocale, dateFormatOptions);
  const commit = `[${github.commitSha.slice(0, 7)}](${github.getCommitUrl()})`;
  const footer = `(Updated ${time}, against commit ${commit})`;

  const surburbanBlock = createBlock(suburbanIssues, "suburban");
  const regionalBlock = createBlock(regionalIssues, "regional");

  return `${header}\n\n${surburbanBlock}\n\n${regionalBlock}\n\n${footer}`;
}

function truncateIfOverLength(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "\n... (truncated)";
}
