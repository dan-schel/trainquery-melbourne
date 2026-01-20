import type { ParsedStop } from "../../../stops/extract-stops-from-tree.js";
import { type Patch } from "../../patch.js";

type CreateAddStopUnlessExistsPatchArgs = {
  readonly stop: ParsedStop;

  // Only apply the patch if there's no stop matching this GTFS ID or name.
  readonly expectedGtfsId: string;
  readonly expectedName: string | RegExp;

  readonly throwIfAlreadyExists?: boolean;
};

export function createAddStopUnlessExistsPatch({
  stop,
  expectedGtfsId,
  expectedName,
  throwIfAlreadyExists = true,
}: CreateAddStopUnlessExistsPatchArgs): Patch<ParsedStop[]> {
  return (stops) => {
    // TODO: Add it if it doesn't exist.
    // TODO: If it does exist, throw if throwIfAlreadyExists is true, but
    // otherwise compare the available stop to the one the patch would add to
    // ensure the patch remains up-to-date.

    const existingById = stops.find((s) => s.gtfsId === expectedGtfsId);
    const existingByName = stops.find((s) =>
      typeof expectedName === "string"
        ? s.name === expectedName
        : expectedName.test(s.name),
    );
    const existing = existingById ?? existingByName;

    if (existing == null) {
      return [...stops, stop];
    } else if (throwIfAlreadyExists) {
      const existingStr = `"${existing.name}" (${existing.gtfsId})`;
      throw new Error(`Not patching in ${stop.name}, found ${existingStr}.`);
    } else if (JSON.stringify(existing) !== JSON.stringify(stop)) {
      throw new Error(`Patch for ${stop.name} is outdated.`);
    }

    return stops;
  };
}
