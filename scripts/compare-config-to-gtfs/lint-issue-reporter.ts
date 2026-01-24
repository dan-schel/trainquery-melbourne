import chalk from "chalk";

export class LintIssueReporter {
  private readonly _currentScope: string[];
  private _issueCount;

  constructor() {
    this._currentScope = [];
    this._issueCount = 0;
  }

  scope(name: string, fn: () => void) {
    this._currentScope.push(name);
    try {
      fn();
    } finally {
      this._currentScope.pop();
    }
  }

  report(title: string, body?: string) {
    this._issueCount += 1;
    const header = chalk.bgRed.bold(` Issue #${this._issueCount} `);
    const scope = chalk.gray(`[${this._currentScope.join(" -> ")}]`);
    let message = `\n${header} ${scope}\n\n${chalk.white.bold(title)}`;
    if (body != null) {
      message += `\n\n${body}`;
    }
    console.log(message);
  }

  printSummary() {
    if (this._issueCount === 0) return;

    const header = chalk.bgWhite.bold(` Summary `);
    const summary = `❌ Found ${this._issueCount} ${this._issueCount === 1 ? "issue" : "issues"}.`;

    console.log(`\n${header}\n\n${summary}\n`);
  }
}
