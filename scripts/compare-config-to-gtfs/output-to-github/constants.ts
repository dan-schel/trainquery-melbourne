export const createGithubIssueFlag = "--create-github-issue";
export const githubActionsBotUsername = "app/github-actions";
export const issueTitle = "Discrepancies detected between config and GTFS data";

// Prevent overruning GitHub's ~65k character limit for issues.
export const truncateListAfterChars = 60000;

export const dateFormatLocale = "en-AU";
export const dateFormatOptions: Intl.DateTimeFormatOptions = {
  timeZone: "Australia/Melbourne",
  dateStyle: "long",
  timeStyle: "short",
};
