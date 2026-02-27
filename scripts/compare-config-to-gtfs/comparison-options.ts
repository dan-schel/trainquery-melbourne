import type { StopGtfsIdMetadata } from "../../src/gtfs/ids/stop-gtfs-id-metadata.js";
import type { StopsCsvTreeNode } from "../utils/gtfs/stops-csv-tree.js";

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
  readonly ignoreNoConfiguredGtfsId?: boolean;
  readonly ignoreNotFoundInGtfs?: boolean;
  readonly ignoreNameMismatch?: boolean;
  readonly ignoreLocationMismatch?: boolean;

  readonly ignoredIdsMissingFromConfig?: string[];
  readonly ignoreIdMissingFromConfig?: (id: StopsCsvTreeNode) => boolean;

  readonly ignoredIdsMissingFromGtfs?: string[];
  readonly ignoreIdMissingFromGtfs?: (node: StopGtfsIdMetadata) => boolean;
};

export type LineLintOptions = {
  readonly ignoreNoConfiguredGtfsId?: boolean;
  readonly ignoreNotFoundInGtfs?: boolean;
};
