import type { StopConfig } from "corequery";
import type { StopsCsvTreeNode } from "../../utils/gtfs/stops-csv-tree.js";
import type { StopGtfsIds } from "../../../src/config/third-party-id-mapping-types.js";
import type { StopLintOptions } from "../comparison-options.js";
import type { IssueCollector } from "../issue-collector.js";

export function compareStop(
  issues: IssueCollector,
  stopConfig: StopConfig,
  stopGtfs: StopsCsvTreeNode,
  stopGtfsIds: StopGtfsIds,
  stopOptions: StopLintOptions,
) {}
