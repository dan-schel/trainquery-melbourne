type ComparisonIssue = {
  readonly message: string;
};

export class IssueCollector {
  private readonly _issues: ComparisonIssue[];
  private readonly _unmappedGtfsStopIdsInUse: Set<string>;

  constructor() {
    this._issues = [];
    this._unmappedGtfsStopIdsInUse = new Set<string>();
  }

  add(issue: ComparisonIssue): void {
    this._issues.push(issue);
  }

  addUnmappedGtfsStopIdInUse(stopId: string): void {
    // Tracked separately from other issues for automatic deduplication.
    this._unmappedGtfsStopIdsInUse.add(stopId);
  }

  getIssues(): ComparisonIssue[] {
    return [...this._issues, ...this._getUnmappedStopIdsInUseIssues()];
  }

  private _getUnmappedStopIdsInUseIssues() {
    return Array.from(this._unmappedGtfsStopIdsInUse).map((stopId) => ({
      message: `GTFS stop ID "${stopId}" is present in stopping patterns, but not mapped.`,
    }));
  }
}
