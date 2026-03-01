import type { StopGtfsIdMetadata } from "../../src/gtfs/ids/stop-gtfs-id-metadata.js";
import type { StopsCsvTreeNode } from "../utils/gtfs/stops-csv-tree.js";
import type { Trip } from "./line/utils/trip.js";
import type { UniqueStoppingPattern } from "./line/utils/unique-stopping-pattern-tracker.js";

export type ComparisonOptions = {
  readonly stops?: {
    readonly all?: StopLintOptions;
    readonly [stopId: number]: StopLintOptions;
  };

  readonly lines?: {
    readonly all?: LineLintOptions;
    readonly [lineId: number]: LineLintOptions;
  };

  readonly ignoredParentGtfsStopIdsMissingFromConfig?: string[];
  readonly ignoredGtfsRouteIdsMissingFromConfig?: string[];
  readonly ignoreTripNotAssignedToALine?: (trip: Trip) => boolean;
};

export type StopLintOptions = {
  readonly ignoreNotFoundInGtfs?: boolean;
  readonly ignoreNameMismatch?: boolean;
  readonly ignoreLocationMismatch?: boolean;

  readonly ignoredIdsMissingFromConfig?: string[];
  readonly ignoreIdMissingFromConfig?: (id: StopsCsvTreeNode) => boolean;

  readonly ignoredIdsMissingFromGtfs?: string[];
  readonly ignoreIdMissingFromGtfs?: (node: StopGtfsIdMetadata) => boolean;
};

export type LineLintOptions = {
  readonly ignoreNotFoundInGtfs?: boolean;

  readonly ignoredIncompatibleStoppingPatternsKeys?: string[];

  readonly ignoreIncompatibleStoppingPattern?: (
    p: UniqueStoppingPattern,
  ) => boolean;
};
