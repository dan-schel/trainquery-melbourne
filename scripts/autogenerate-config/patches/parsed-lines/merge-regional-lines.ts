// TODO: Merge regional lines like Echuca/Swan Hill/Bendigo together into a
// single line. Also merge in the suburban lines they share track with, but
// mark those stops as the "hidden-unless-stopped-at" type.
//
// This should have the side effect of fixing the bendigo line not realising
// patterns which stop at Watergardens and not Sunbury and vice-versa can be
// merged.
//
// I imagine this will make use of the consolidateStoppingPatterns and
// namePatterns functions of find-routes-for-line.ts. They'll need to be
// exported & maybe moved to their own files.

import { itsOk } from "@dan-schel/js-utils";
import type { ParsedLine } from "../../lines/extract-lines-from-subfeed.js";
import type { LinePatch } from "../patch.js";

type Merge = {
  readonly primaryGtfsId: string;
  readonly suburbanLineGtfsId: string;

  // "string" to use the stop name. Using stopID doesn't feel right, because
  // while stop IDs are settled by the time this patch runs, they might be
  // different to the ones which existed in the "src" folder when this code was
  // loaded, leading to unexpected behaviour.
  readonly followsSuburbanLineUntil: string;

  readonly otherGtfsIds: readonly string[];
  readonly branchGtfsIds: readonly string[];
};

const merges: readonly Merge[] = [
  // Gippsland Line
  {
    primaryGtfsId: "aus:vic:vic-01-TRN:",
    suburbanLineGtfsId: "aus:vic:vic-02-PKM:",
    followsSuburbanLineUntil: "East Pakenham",
    otherGtfsIds: ["aus:vic:vic-01-BDE:"],
    branchGtfsIds: [],
  },

  // Seymour Line
  {
    primaryGtfsId: "aus:vic:vic-01-SER:",
    suburbanLineGtfsId: "aus:vic:vic-02-CGB:",
    followsSuburbanLineUntil: "Craigieburn",
    otherGtfsIds: [],
    branchGtfsIds: ["aus:vic:vic-01-ABY:", "aus:vic:vic-01-SNH:"],
  },

  // Bendigo Line
  {
    primaryGtfsId: "aus:vic:vic-01-BGO:",
    suburbanLineGtfsId: "aus:vic:vic-02-SUY:",
    followsSuburbanLineUntil: "Sunbury",
    otherGtfsIds: [],
    branchGtfsIds: ["aus:vic:vic-01-ECH:", "aus:vic:vic-01-SWL:"],
  },

  // Ballarat Line
  {
    primaryGtfsId: "aus:vic:vic-01-BAT:",
    suburbanLineGtfsId: "aus:vic:vic-02-SUY:",
    followsSuburbanLineUntil: "Sunshine",
    otherGtfsIds: [],
    branchGtfsIds: ["aus:vic:vic-01-ART:", "aus:vic:vic-01-MBY:"],
  },

  // Geelong Line
  {
    primaryGtfsId: "aus:vic:vic-01-GEL:",
    suburbanLineGtfsId: "aus:vic:vic-02-SUY:",
    followsSuburbanLineUntil: "Sunshine",
    otherGtfsIds: ["aus:vic:vic-01-WBL:"],
    branchGtfsIds: [],
  },
];

export const mergeRegionalLinesPatch: LinePatch = (_ctx, lines) => {
  let result = lines;
  for (const merge of merges) {
    result = applyMerge(result, merge);
  }
  return result;
};

function applyMerge(lines: readonly ParsedLine[], merge: Merge): ParsedLine[] {
  // This array will be modified by removeLine.
  const newLines = [...lines];

  const primaryLine = removeLine(newLines, merge.primaryGtfsId);
  const suburbanLine = removeLine(newLines, merge.suburbanLineGtfsId);
  const followsUntil = merge.followsSuburbanLineUntil;
  const otherLines = merge.otherGtfsIds.map((id) => removeLine(newLines, id));
  const branchLines = merge.branchGtfsIds.map((id) => removeLine(newLines, id));

  let mergedLine = primaryLine;
  mergedLine = mergeSuburbanLine(mergedLine, suburbanLine, followsUntil);
  for (const otherLine of otherLines) {
    mergedLine = mergeLine(mergedLine, otherLine);
  }

  newLines.push(mergedLine);
  return newLines;
}

function removeLine(lines: ParsedLine[], gtfsId: string): ParsedLine {
  const index = lines.findIndex((l) => l.gtfsIds.some((i) => i.id === gtfsId));
  if (index === -1) throw new Error(`Line with GTFS ID ${gtfsId} not found.`);

  const result = lines.splice(index, 1);
  if (result.length !== 1) throw new Error("Unexpected splice result.");

  return itsOk(result[0]);
}

function mergeSuburbanLine(
  primaryLine: ParsedLine,
  suburbanLine: ParsedLine,
  followsUntil: string,
): ParsedLine {}

function mergeLine(
  primaryLine: ParsedLine,
  otherLine: ParsedLine,
): ParsedLine {}
