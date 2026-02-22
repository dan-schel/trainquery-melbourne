import type { StopsCsvTreeNode } from "../utils/gtfs/stops-csv-tree.js";

export type ComparisonOptions = {
  readonly stops?: {
    readonly all?: StopLintOptions;
    readonly [stopId: number]: StopLintOptions;
  };

  readonly lines?: Record<number, LineLintOptions>;
  readonly ignoredUnmappedParentStopGtfsIds?: string[];
};

export type StopLintOptions = {
  readonly ignoreMissingGtfsId?: boolean;
  readonly ignoreMissingFromGtfs?: boolean;
  readonly ignoreNameMismatch?: boolean;
  readonly ignoreLocationMismatch?: boolean;
  readonly ignoreUnmappedChildGtfsId?: (node: StopsCsvTreeNode) => boolean;
};

export type LineLintOptions = {
  readonly ignoreMissingGtfsId?: boolean;
};
