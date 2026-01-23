import type { ParsedStop } from "../../../stops/extract-stops-from-tree.js";
import { type StopPatch } from "../../patch.js";

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
}: CreateAddStopUnlessExistsPatchArgs): StopPatch {
  return (_ctx, stops) => {
    const existingById = stops.find((s) =>
      s.gtfsIds.some((g) => g.id === expectedGtfsId),
    );

    const existingByName = stops.find((s) =>
      typeof expectedName === "string"
        ? s.name === expectedName
        : expectedName.test(s.name),
    );

    const existing = existingById ?? existingByName;

    if (existing == null) {
      return [...stops, stop];
    } else if (throwIfAlreadyExists) {
      const idsStr = existing.gtfsIds.map((g) => `"${g.id}"`).join(", ");
      const existingStr = `"${existing.name}" (${idsStr})`;
      throw new Error(`Not patching in ${stop.name}, found ${existingStr}.`);
    } else if (JSON.stringify(existing) !== JSON.stringify(stop)) {
      const existingStr = JSON.stringify(existing, null, 2);
      const actualStr = JSON.stringify(stop, null, 2);
      const diff = `Patch:\n${existingStr}\n\nActual:\n${actualStr}`;
      throw new Error(`Patch for ${stop.name} is outdated.\n\n${diff}`);
    }

    return stops;
  };
}
