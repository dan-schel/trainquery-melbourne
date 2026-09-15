import { parseIntThrow } from "@dan-schel/js-utils";
import { extractAllStringValues } from "./extract-all-string-values.js";

export function reverseGtfsIdMapping(
  // Designed to be used with MultifeedStopGtfsIdsConfig,
  // MultifeedLineGtfsIdsConfig, StopGtfsIdsConfig, or LineGtfsIdsConfig.
  config: Record<number, object>,
): Map<string, number> {
  const result = new Map<string, number>();
  for (const [idStr, value] of Object.entries(config)) {
    const id = parseIntThrow(idStr);
    const gtfsIds = extractAllStringValues(value);

    for (const gtfsId of gtfsIds) {
      const current = result.get(gtfsId);
      if (current != null && current !== id) {
        throw new Error(`GTFS ID ${gtfsId} maps to #${current} and #${id}.`);
      }
      result.set(gtfsId, id);
    }
  }
  return result;
}
