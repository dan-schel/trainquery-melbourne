import { parseIntThrow } from "@dan-schel/js-utils";
import type { StopGtfsIds } from "../../../../src/config/third-party-id-mapping-types.js";

export type GtfsIdEntry =
  | ParentGtfsIdEntry
  | ReplacementBusGtfsIdEntry
  | GeneralGtfsIdEntry
  | PositionGtfsIdEntry;

export type ParentGtfsIdEntry = {
  type: "parent";
  gtfsId: string;
};

export type ReplacementBusGtfsIdEntry = {
  type: "replacement-bus";
  gtfsId: string;
};

export type GeneralGtfsIdEntry = {
  type: "general";
  gtfsId: string;
};

export type PositionGtfsIdEntry = {
  type: "platform";
  gtfsId: string;
  positionId: number;
};

export function reverseMapGtfsIds(stopGtfsIds: StopGtfsIds) {
  const result: GtfsIdEntry[] = [];

  result.push({ type: "parent", gtfsId: stopGtfsIds.parent });

  for (const gtfsId of stopGtfsIds.general ?? []) {
    result.push({ type: "general", gtfsId });
  }

  for (const gtfsId of stopGtfsIds.replacementBus ?? []) {
    result.push({ type: "replacement-bus", gtfsId });
  }

  for (const [platformIdStr, gtfsIds] of Object.entries(
    stopGtfsIds.platforms ?? {},
  )) {
    const positionId = parseIntThrow(platformIdStr);
    for (const gtfsId of gtfsIds) {
      result.push({ type: "platform", gtfsId, positionId });
    }
  }

  return result;
}
