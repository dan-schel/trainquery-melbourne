import type { StopsCsvTreeNode } from "../utils/gtfs/stops-csv-tree.js";
import type { GtfsIdEntry } from "./stop/utils/reverse-map-gtfs-ids.js";

export type ComparisonOptions = {
  readonly stops?: {
    readonly all?: StopLintOptions;
    readonly [stopId: number]: StopLintOptions;
  };

  readonly lines?: {
    readonly all?: LineLintOptions;
    readonly [lineId: number]: LineLintOptions;
  };

  readonly ignoredUnmappedParentStopGtfsIds?: string[];
  readonly ignoredUnmappedGtfsRouteIds?: string[];
};

export type StopLintOptions = {
  readonly ignoreMissingGtfsId?: boolean;
  readonly ignoreMissingFromGtfs?: boolean;
  readonly ignoreNameMismatch?: boolean;
  readonly ignoreLocationMismatch?: boolean;

  readonly ignoredAdditionalChildGtfsIds?: string[];
  readonly ignoreAdditionalChildGtfsId?: (id: GtfsIdEntry) => boolean;

  readonly ignoredUnmappedChildGtfsIds?: string[];
  readonly ignoreUnmappedChildGtfsId?: (node: StopsCsvTreeNode) => boolean;
};

export type LineLintOptions = {
  readonly ignoreMissingGtfsId?: boolean;
};
