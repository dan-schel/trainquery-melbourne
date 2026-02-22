export type ComparisonOptions = {
  readonly stops?: Record<number, StopLintOptions>;
  readonly lines?: Record<number, LineLintOptions>;
  readonly ignoredUnmappedGtfsStops?: string[];
};

export type StopLintOptions = {
  readonly ignoreMissingGtfsId?: boolean;
  readonly ignoreMissingFromGtfs?: boolean;
  readonly ignoreNameMismatch?: boolean;
};

export type LineLintOptions = {
  readonly ignoreMissingGtfsId?: boolean;
};
