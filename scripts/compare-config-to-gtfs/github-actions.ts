import { isPresent } from "@dan-schel/js-utils";
import { env } from "./env.js";

const REPO = "dan-schel/trainquery-melbourne";
const ISSUE_TITLE = "Automated GTFS Config Check Failed";
const ASSIGNEE = "dan-schel";
const GITHUB_ACTIONS_BOT = "app/github-actions";

// GitHub issues are limited to ~65k chars.
const MAX_LEN = 60000;

type GithubIssue = {
  number: number;
  title: string;
  body: string;
};

export async function reportToGithub(issues: string[]): Promise<void> {
  const token = env.GITHUB_TOKEN;

  if (!isPresent(token)) {
    throw new Error("GITHUB_TOKEN is required for --output-to-github");
  }

  const existingIssue = await findExistingIssue(token);

  if (issues.length === 0) {
    if (existingIssue !== undefined) {
      console.log(`Closing issue #${existingIssue.number} as resolved.`);
      await closeIssue(token, existingIssue.number);
    } else {
      console.log("No issues found and no existing GitHub issue to close.");
    }
    return;
  }

  const body = createIssueBody(issues);

  if (existingIssue !== undefined) {
    if (existingIssue.body === body) {
      console.log(`Issue #${existingIssue.number} is up to date.`);
    } else {
      console.log(`Updating issue #${existingIssue.number}...`);
      await updateIssue(token, existingIssue.number, body);
    }
  } else {
    console.log("Creating new GitHub issue...");
    await createIssue(token, body);
  }
}

function createIssueBody(issues: string[]): string {
  const list = issues.map((i) => `- ${i}`).join("\n");

  const content =
    list.length > MAX_LEN ? list.slice(0, MAX_LEN) + "\n... (truncated)" : list;

  return `@${ASSIGNEE} The automated GTFS config check found the following issues:\n\n\`\`\`${content}\n\`\`\``;
}

async function findExistingIssue(
  token: string,
): Promise<GithubIssue | undefined> {
  const params = new URLSearchParams({
    state: "open",
    creator: GITHUB_ACTIONS_BOT,
    per_page: "100",
  });

  const response = await githubFetch(
    token,
    `/repos/${REPO}/issues?${params.toString()}`,
  );
  const issues = (await response.json()) as GithubIssue[];

  // Filter by title as well to be sure
  return issues.find((i) => i.title === ISSUE_TITLE);
}

async function createIssue(token: string, body: string): Promise<void> {
  await githubFetch(token, `/repos/${REPO}/issues`, {
    method: "POST",
    body: JSON.stringify({
      title: ISSUE_TITLE,
      body,
      assignees: [ASSIGNEE],
    }),
  });
}

async function updateIssue(
  token: string,
  number: number,
  body: string,
): Promise<void> {
  await githubFetch(token, `/repos/${REPO}/issues/${number}`, {
    method: "PATCH",
    body: JSON.stringify({ body }),
  });
}

async function closeIssue(token: string, number: number): Promise<void> {
  await githubFetch(token, `/repos/${REPO}/issues/${number}`, {
    method: "PATCH",
    body: JSON.stringify({ state: "closed" }),
  });
}

async function githubFetch(
  token: string,
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      "Accept": "application/vnd.github.v3+json",
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API error (${response.status}): ${text}`);
  }

  return response;
}
