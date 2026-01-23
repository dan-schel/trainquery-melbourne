import type { LinePatch } from "../patch.js";

// TODO: Fix line names, e.g. replace "Alamein - City" with just "Alamein".
// This patch should probably run after the merge regional lines patch.

export const fixLineNamesPatch: LinePatch = (_ctx, lines) => {
  return lines;
};
