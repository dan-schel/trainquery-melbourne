import { itsOk } from "@dan-schel/js-utils";
import type { ParsedLine } from "../../lines/extract-lines-from-subfeed.js";
import type { LinePatch } from "../patch.js";
import {
  consolidateStoppingPatterns,
  namePatterns,
  type ParsedRoute,
} from "../../lines/find-routes-for-line.js";
import type { AutogenerationContext } from "../../autogeneration-context.js";

type Merge = {
  readonly primaryGtfsId: string;
  readonly suburbanSections: readonly SuburbanSection[];
  readonly otherGtfsIds: readonly string[];
  readonly branchGtfsIds: readonly string[];
};

type SuburbanSection = {
  readonly gtfsId: string;

  // "string" to use the stop names. Using stopID doesn't feel right, because
  // while stop IDs are settled by the time this patch runs, they might be
  // different to the ones which existed in the "src" folder when this code
  // was loaded, leading to unexpected behaviour.
  readonly from: string;
  readonly to: string;
};

// TODO: Should consider splitting this up into multiple patches, e.g.:
// - Merge suburban sections into regional lines
// - Merge lines together to form one line
// - Merge branch lines as new routes on main lines
//
// Or even:
// - Merge suburban section into Gippsland line.
// - Merge suburban section into Seymour line.
// - Merge Seymour branches into Seymour line.
// - etc.

const merges: readonly Merge[] = [
  // Gippsland Line
  {
    primaryGtfsId: "aus:vic:vic-01-TRN:",
    suburbanSections: [
      {
        gtfsId: "aus:vic:vic-02-PKM:",
        from: "East Pakenham",
        to: "Caulfield",
      },
      {
        gtfsId: "aus:vic:vic-02-FKN:",
        from: "Caulfield",
        to: "Richmond",
      },
    ],
    otherGtfsIds: ["aus:vic:vic-01-BDE:"],
    branchGtfsIds: [],
  },

  // Seymour Line
  {
    primaryGtfsId: "aus:vic:vic-01-SER:",
    suburbanSections: [
      {
        gtfsId: "aus:vic:vic-02-CGB:",
        from: "Craigieburn",
        to: "North Melbourne",
      },
    ],
    otherGtfsIds: [],
    branchGtfsIds: ["aus:vic:vic-01-ABY:", "aus:vic:vic-01-SNH:"],
  },

  // Bendigo Line
  {
    primaryGtfsId: "aus:vic:vic-01-BGO:",
    suburbanSections: [
      {
        gtfsId: "aus:vic:vic-02-SUY:",
        from: "Sunbury",
        to: "Footscray",
      },
      {
        gtfsId: "aus:vic:vic-02-WIL:",
        from: "Footscray",
        to: "North Melbourne",
      },
    ],
    otherGtfsIds: [],
    branchGtfsIds: ["aus:vic:vic-01-ECH:", "aus:vic:vic-01-SWL:"],
  },

  // Ballarat Line
  {
    primaryGtfsId: "aus:vic:vic-01-BAT:",
    suburbanSections: [
      {
        gtfsId: "aus:vic:vic-02-SUY:",
        from: "Sunshine",
        to: "Footscray",
      },
      {
        gtfsId: "aus:vic:vic-02-WIL:",
        from: "Footscray",
        to: "North Melbourne",
      },
    ],
    otherGtfsIds: [],
    branchGtfsIds: ["aus:vic:vic-01-ART:", "aus:vic:vic-01-MBY:"],
  },

  // Geelong Line
  {
    primaryGtfsId: "aus:vic:vic-01-GEL:",
    suburbanSections: [
      {
        gtfsId: "aus:vic:vic-02-SUY:",
        from: "Sunshine",
        to: "Footscray",
      },
      {
        gtfsId: "aus:vic:vic-02-WIL:",
        from: "Footscray",
        to: "North Melbourne",
      },
    ],
    otherGtfsIds: ["aus:vic:vic-01-WBL:"],
    branchGtfsIds: [],
  },
];

export const mergeRegionalLinesPatch: LinePatch = (ctx, lines) => {
  let result = lines;
  for (const merge of merges) {
    result = applyMerge(ctx, result, merge);
  }
  return result;
};

function applyMerge(
  ctx: AutogenerationContext,
  lines: readonly ParsedLine[],
  merge: Merge,
): ParsedLine[] {
  // This array will be modified by removeLine.
  const newLines = [...lines];

  let mergedLine = removeLine(newLines, merge.primaryGtfsId);

  for (const suburbanSection of merge.suburbanSections) {
    mergedLine = fillSuburbanSection(ctx, mergedLine, lines, suburbanSection);
  }

  const otherLines = merge.otherGtfsIds.map((id) => removeLine(newLines, id));
  for (const otherLine of otherLines) {
    mergedLine = mergeLine(mergedLine, otherLine);
  }

  const branchLines = merge.branchGtfsIds.map((id) => removeLine(newLines, id));
  for (const branchLine of branchLines) {
    // TODO: Not quite. We just want to ADD the routes from the branch line,
    // after merging THEM with the pre-existing primary route (but still keep
    // the primary route too, unmodified). We want want to name the route using
    // the branch line's terminal station.
    mergedLine = mergeLine(mergedLine, branchLine);
  }

  newLines.push(mergedLine);
  return newLines;
}

function fillSuburbanSection(
  ctx: AutogenerationContext,
  primaryLine: ParsedLine,
  lines: readonly ParsedLine[],
  section: SuburbanSection,
): ParsedLine {
  const existingPatterns = extractStoppingPatterns(primaryLine);

  const suburbanLine = requireLine(lines, section.gtfsId);
  const suburbanStoppingPatterns = extractStoppingPatterns(suburbanLine).map(
    (p) => trimStoppingPattern(ctx, p, section.from, section.to),
  );

  const allPatterns = [...existingPatterns, ...suburbanStoppingPatterns];

  // TODO: Right now it refuses to merge in East Pakenham because it conflicts
  // with Nar Nar Goon. We need a different algorithm which finds the portion
  // of regional stops which are a subset of the suburban ones and merges there.
  const consolidatedPatterns = consolidateStoppingPatterns(allPatterns);

  const namedPatterns = namePatterns(ctx, consolidatedPatterns);

  const newRoutes: ParsedRoute[] = namedPatterns.map((x) => ({
    name: x.name,
    stops: x.pattern.map((stopId) => {
      const type = primaryLine.routes.some((r) =>
        r.stops.some((s) => s.stopId === stopId && s.type === "regular"),
      )
        ? "regular"
        : "hidden-unless-stopped-at";

      return { stopId, type };
    }),
  }));

  return { ...primaryLine, routes: newRoutes };
}

function mergeLine(primaryLine: ParsedLine, otherLine: ParsedLine): ParsedLine {
  return primaryLine;
}

function removeLine(lines: ParsedLine[], gtfsId: string): ParsedLine {
  const index = lines.findIndex((l) => l.gtfsIds.some((i) => i.id === gtfsId));
  if (index === -1) throw new Error(`Line with GTFS ID ${gtfsId} not found.`);

  const result = lines.splice(index, 1);
  if (result.length !== 1) throw new Error("Unexpected splice result.");

  return itsOk(result[0]);
}

function requireLine(lines: readonly ParsedLine[], gtfsId: string): ParsedLine {
  const line = lines.find((l) => l.gtfsIds.some((i) => i.id === gtfsId));
  if (line == null) throw new Error(`Line with GTFS ID ${gtfsId} not found.`);
  return line;
}

function extractStoppingPatterns(line: ParsedLine): number[][] {
  return line.routes.map((r) => r.stops.map((s) => s.stopId));
}

function trimStoppingPattern(
  ctx: AutogenerationContext,
  pattern: number[],
  from: string,
  to: string,
): number[] {
  const fromStopId = ctx.stops.require(from).id;
  const fromIndex = pattern.indexOf(fromStopId);
  if (fromIndex === -1) throw new Error(`Stop "${from}" not found in pattern.`);

  const toStopId = ctx.stops.require(to).id;
  const toIndex = pattern.indexOf(toStopId);
  if (toIndex === -1) throw new Error(`Stop "${to}" not found in pattern.`);

  const lowerIndex = Math.min(fromIndex, toIndex);
  const higherIndex = Math.max(fromIndex, toIndex);
  return pattern.slice(lowerIndex, higherIndex + 1);
}
