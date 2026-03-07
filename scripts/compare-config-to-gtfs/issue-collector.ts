import { groupBy } from "@dan-schel/js-utils";

type ComparisonIssue = {
  readonly category: string;
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

  getCount(): number {
    return this.getIssues().length;
  }

  isEmpty(): boolean {
    return this.getCount() === 0;
  }

  outputToConsole(): void {
    console.log();

    const issues = this.getIssues();
    if (issues.length === 0) {
      console.log("No issues found!");
      return;
    }

    const noun = issues.length === 1 ? "issue" : "issues";
    console.log(`Found ${issues.length} ${noun}:\n\n${this.asFormattedList()}`);
  }

  asFormattedList() {
    const groups = groupBy(this.getIssues(), (i) => i.category).map(
      ({ group, items }) => {
        const itemsStr = items
          .map((i) => `- ${i.message}`)
          .sort((a, b) => a.localeCompare(b))
          .join("\n");

        return `[${group}]\n${itemsStr}`;
      },
    );
    return groups.join("\n\n");
  }

  private _getUnmappedStopIdsInUseIssues(): ComparisonIssue[] {
    return Array.from(this._unmappedGtfsStopIdsInUse).map((stopId) => ({
      category: "Unmapped GTFS stop IDs in use",
      message: `GTFS stop ID "${stopId}" is present in stopping patterns, but not mapped.`,
    }));
  }
}
