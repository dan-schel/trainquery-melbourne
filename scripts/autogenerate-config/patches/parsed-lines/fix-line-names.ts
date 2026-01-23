import { areUnique } from "@dan-schel/js-utils";
import type { LinePatch } from "../patch.js";

// TODO: Fix line names, e.g. replace "Alamein - City" with just "Alamein".
// This patch should probably run after the merge regional lines patch.

const replacements: Record<string, string> = {
  "Alamein - City": "Alamein",
  "Belgrave - City": "Belgrave",
  "Cranbourne - City": "Cranbourne",
  "Craigieburn - City": "Craigieburn",
  "Frankston - City": "Frankston",
  "Glen Waverley - City": "Glen Waverley",
  "Hurstbridge - City": "Hurstbridge",
  "Lilydale - City": "Lilydale",
  "Mernda - City": "Mernda",
  "Pakenham - City": "Pakenham",
  "Flemington Racecourse - City": "Flemington Racecourse",
  "Sandringham - City": "Sandringham",
  "Stony Point - Frankston": "Stony Point",
  "Sunbury - City": "Sunbury",
  "Upfield - City": "Upfield",
  "Werribee - City": "Werribee",
  "Williamstown - City": "Williamstown",

  "Albury - Melbourne Via Seymour": "Albury",
  "Ararat - Melbourne Via Ballarat": "Ararat",
  "Ballarat - Melbourne Via Melton": "Ballarat",
  "Bairnsdale - Melbourne Via Traralgon & Sale": "Bairnsdale",
  "Bendigo - Melbourne Via Sunbury": "Bendigo",
  "Echuca/Moama - Melbourne Via Bendigo or Heathcote": "Echuca",
  "Geelong - Melbourne Via Geelong": "Geelong",
  "Maryborough - Melbourne Via Ballarat": "Maryborough",
  "Seymour - Melbourne Via Broadmeadows": "Seymour",
  "Shepparton - Melbourne Via Seymour": "Shepparton",
  "Swan Hill - Melbourne Via Bendigo": "Swan Hill",
  "Traralgon - Melbourne Via Pakenham, Moe & Morwell": "Gippsland",
  "Warrnambool - Melbourne Via Geelong & Colac": "Warrnambool",
};

export const fixLineNamesPatch: LinePatch = (_ctx, lines) => {
  const newNamesAreUnique = areUnique(Object.values(replacements));
  if (!newNamesAreUnique) throw new Error("New names aren't unique.");

  const keys = Object.keys(replacements);
  const missingLine = keys.find((k) => !lines.some((line) => line.name === k));
  if (missingLine != null) throw new Error(`Line not found: ${missingLine}`);

  return lines.map((line) => {
    const newName = replacements[line.name];
    if (newName == null) return line;

    return { ...line, name: newName };
  });
};
