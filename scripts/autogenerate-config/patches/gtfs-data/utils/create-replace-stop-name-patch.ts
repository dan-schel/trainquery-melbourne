import { type GtfsData } from "../../../gtfs/read-gtfs.js";
import { type Patch } from "../../patch.js";

type CreateReplaceStopNamePatchArgs = {
  readonly id: string;
  readonly subfeed: "suburban" | "regional";
  readonly correctName: string;

  // Only apply the patch if the current name matches this string or regex.
  readonly expectedName: string | RegExp;
};

export function createReplaceStopNamePatch({
  id,
  subfeed,
  correctName,
  expectedName,
}: CreateReplaceStopNamePatchArgs): Patch<GtfsData> {
  return (data) => {
    const stop = data[subfeed].stops.find((s) => s.stop_id === id);
    if (stop == null) throw new Error(`No stop with ID ${id}.`);

    const matchesExpectedName =
      typeof expectedName === "string"
        ? stop.stop_name === expectedName
        : expectedName.test(stop.stop_name);

    if (!matchesExpectedName) {
      const formattedExpectedName =
        typeof expectedName === "string"
          ? `"${expectedName}"`
          : expectedName.toString();

      throw new Error(`Stop ${id} does not match ${formattedExpectedName}.`);
    }

    return {
      ...data,
      [subfeed]: {
        ...data[subfeed],
        stops: data[subfeed].stops.map((s) =>
          s.stop_id === id ? { ...s, stop_name: correctName } : s,
        ),
      },
    };
  };
}
