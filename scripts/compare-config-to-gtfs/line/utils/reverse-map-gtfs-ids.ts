import type { LineGtfsIds } from "../../../../src/config/third-party-id-mapping-types.js";

export type GtfsIdEntry = {
  type: "primary" | "other" | "replacement-bus";
  gtfsId: string;
};

export function reverseMapGtfsIds(lineGtfsIds: LineGtfsIds) {
  const result: GtfsIdEntry[] = [];

  result.push({ type: "primary", gtfsId: lineGtfsIds.primary });

  for (const gtfsId of lineGtfsIds.other ?? []) {
    result.push({ type: "other", gtfsId });
  }

  for (const gtfsId of lineGtfsIds.replacementBus ?? []) {
    result.push({ type: "replacement-bus", gtfsId });
  }

  return result;
}
