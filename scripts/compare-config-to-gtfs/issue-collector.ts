export type ComparisonIssue = {
  readonly message: string;
};

export class IssueCollector {
  private _issues: ComparisonIssue[];

  constructor() {
    this._issues = [];
  }

  add(issue: ComparisonIssue): void {
    this._issues.push(issue);
  }

  getIssues(): ComparisonIssue[] {
    return this._issues;
  }
}
