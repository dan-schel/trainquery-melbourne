export type ComparisonOptions = {
  readonly stops?: Record<number, StopLintOptions>;
  readonly lines?: Record<number, LineLintOptions>;
};

export type StopLintOptions = {
  readonly ignoreMissingGtfsId?: boolean;
  readonly ignoreMissingFromGtfs?: boolean;
};

export type LineLintOptions = {
  readonly ignoreMissingGtfsId?: boolean;
};
