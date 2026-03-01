import z from "zod";
import type { Env } from "../env.js";
import {
  createGithubIssueFlag,
  githubActionsBotUsername,
} from "./constants.js";

const githubIssueSchema = z
  .object({
    number: z.number(),
    title: z.string(),
    body: z.string(),
  })
  .readonly();

export class GithubClient {
  constructor(
    private _apiUrl: string,
    private _token: string,
    readonly repo: string,
    readonly repoOwner: string,
    readonly commitSha: string,
  ) {}

  static fromEnv(env: Env): GithubClient {
    function unset(varName: string): never {
      throw new Error(`Set ${varName} to use ${createGithubIssueFlag}.`);
    }

    if (env.GITHUB_API_URL == null) unset("GITHUB_API_URL");
    if (env.GITHUB_TOKEN == null) unset("GITHUB_TOKEN");
    if (env.GITHUB_REPOSITORY == null) unset("GITHUB_REPOSITORY");
    if (env.GITHUB_REPOSITORY_OWNER == null) unset("GITHUB_REPOSITORY_OWNER");
    if (env.COMMIT_SHA == null) unset("COMMIT_SHA");

    return new GithubClient(
      env.GITHUB_API_URL,
      env.GITHUB_TOKEN,
      env.GITHUB_REPOSITORY,
      env.GITHUB_REPOSITORY_OWNER,
      env.COMMIT_SHA,
    );
  }

  async findIssueByTitle(title: string) {
    const params = new URLSearchParams({
      state: "open",
      creator: githubActionsBotUsername,
      per_page: "100",
    });

    const response = await this._githubFetch(
      `/repos/${this.repo}/issues?${params.toString()}`,
    );
    const issues = githubIssueSchema.array().parse(await response.json());
    return issues.find((i) => i.title === title) ?? null;
  }

  async createIssue({
    title,
    body,
    assignees,
  }: {
    title: string;
    body: string;
    assignees: string[];
  }) {
    await this._githubFetch(`/repos/${this.repo}/issues`, {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        assignees,
      }),
    });
  }

  async updateIssueBody(number: number, newBody: string): Promise<void> {
    await this._githubFetch(`/repos/${this.repo}/issues/${number}`, {
      method: "PATCH",
      body: JSON.stringify({ body: newBody }),
    });
  }

  async closeIssue(number: number): Promise<void> {
    await this._githubFetch(`/repos/${this.repo}/issues/${number}`, {
      method: "PATCH",
      body: JSON.stringify({ state: "closed" }),
    });
  }

  getCommitUrl() {
    return `https://github.com/${this.repo}/commit/${this.commitSha}`;
  }

  private async _githubFetch(
    path: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const response = await fetch(`${this._apiUrl}${path}`, {
      ...options,
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `Bearer ${this._token}`,
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
}
