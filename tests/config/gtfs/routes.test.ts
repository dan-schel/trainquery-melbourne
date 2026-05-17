import { assert, describe, it } from "vitest";
import { lines } from "../../../src/config/corequery/lines/index.js";
import { stops } from "../../../src/config/corequery/stops/index.js";
import { lineRoutes } from "../../../src/config/gtfs/routes.js";
import { assertNever, unique } from "@dan-schel/js-utils";
import {
  extractStopsFromLineDiagramShape,
  LineConfig,
  LineDiagramShapeConfig,
} from "corequery";
import { getStopName } from "../../../src/utils/get-stop-name.js";
import { isSubsequence } from "../../../src/utils/is-subsequence.js";
import * as line from "../../../src/config/corequery/lines/line-ids.js";
import * as stop from "../../../src/config/corequery/stops/stop-ids.js";

const linesExemptedFromHavingRoutes: number[] = [];

const diagramStopsExemptedFromBeingInRoutes: Record<number, number[]> = {};

const routeStopsExemptedFromBeingInDiagrams: Record<number, number[]> = {
  [line.CRANBOURNE]: [
    stop.FLINDERS_STREET,
    stop.SOUTHERN_CROSS,
    stop.FLAGSTAFF,
    stop.MELBOURNE_CENTRAL,
    stop.PARLIAMENT,
    stop.RICHMOND,
    stop.SOUTH_YARRA,
  ],

  [line.PAKENHAM]: [
    stop.FLINDERS_STREET,
    stop.SOUTHERN_CROSS,
    stop.FLAGSTAFF,
    stop.MELBOURNE_CENTRAL,
    stop.PARLIAMENT,
    stop.RICHMOND,
    stop.SOUTH_YARRA,
  ],

  [line.SUNBURY]: [
    stop.FLINDERS_STREET,
    stop.SOUTHERN_CROSS,
    stop.FLAGSTAFF,
    stop.MELBOURNE_CENTRAL,
    stop.PARLIAMENT,
    stop.NORTH_MELBOURNE,
    stop.SOUTH_KENSINGTON,
  ],

  [line.FLEMINGTON_RACECOURSE]: [
    stop.FLAGSTAFF,
    stop.MELBOURNE_CENTRAL,
    stop.PARLIAMENT,
  ],
};

const linesExemptedFromHavingCompatibleDiagrams: number[] = [];

describe("lineRoutes", () => {
  it("has an entry for each line", () => {
    for (const line of lines) {
      if (linesExemptedFromHavingRoutes.includes(line.id)) continue;

      const routes = lineRoutes[line.id] ?? [];
      assert(
        routes.length !== 0,
        `No routes found for ${line.name} line (#${line.id}).`,
      );
    }
  });

  it("has all the stops present that in line's diagram(s)", () => {
    for (const line of lines) {
      const stopsInDiagrams = getStopsInDiagrams(line);

      const stopsInRoutes = getStopsInRoutes(line.id, {
        includeCollasped: true,
      });
      const exemptions = diagramStopsExemptedFromBeingInRoutes[line.id] ?? [];

      for (const stopId of stopsInDiagrams) {
        if (exemptions.includes(stopId)) continue;

        assert(
          stopsInRoutes.includes(stopId),
          `Stop "${getStopName(stopId, stops)}" (#${stopId}) used in ${line.name} line (#${line.id}) diagram, but isn't in any routes.`,
        );
      }
    }
  });

  it("has no stops which aren't also in that line's diagram(s)", () => {
    for (const line of lines) {
      const stopsInRoutes = getStopsInRoutes(line.id);

      const stopsInDiagrams = getStopsInDiagrams(line);
      const exemptions = routeStopsExemptedFromBeingInDiagrams[line.id] ?? [];

      for (const stopId of stopsInRoutes) {
        if (exemptions.includes(stopId)) continue;

        assert(
          stopsInDiagrams.includes(stopId),
          `Stop "${getStopName(stopId, stops)}" (#${stopId}) used in ${line.name} line (#${line.id}) route, but isn't in any diagrams.`,
        );
      }
    }
  });

  it("has no routes with less than two stops", () => {
    for (const line of lines) {
      const routes = lineRoutes[line.id] ?? [];

      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        assert(
          route.stops.length >= 2,
          `Routes (index = ${i}) on ${line.name} line (#${line.id}) have less than two stops.`,
        );
      }
    }
  });

  it("has no duplicate routes", () => {
    for (const line of lines) {
      const routes = lineRoutes[line.id] ?? [];
      const seenRoutes = new Set<string>();

      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const routeSignature = route.stops
          .map((s) => s.stopId.toFixed())
          .join("|");

        assert(
          !seenRoutes.has(routeSignature),
          `Route (index = ${i}) on ${line.name} line (#${line.id}) is a duplicate.`,
        );

        seenRoutes.add(routeSignature);
      }
    }
  });

  it("has routes such that each line's diagram(s) are compatible", () => {
    for (const line of lines) {
      if (linesExemptedFromHavingCompatibleDiagrams.includes(line.id)) continue;

      const routes = lineRoutes[line.id] ?? [];
      const routeStopLists = routes.map((r) => r.stops.map((s) => s.stopId));

      for (const diagram of line.diagram.entries) {
        const stopLists = toLinearStopLists(diagram.shape);

        for (const stopList of stopLists) {
          const stopNames = stopList
            .map((s) => getStopName(s, stops))
            .join(", ");

          assert(
            routeStopLists.some((r) => isSubsequence(stopList, r)),
            `No routes on ${line.name} line (#${line.id}) are compatible with stopping pattern from diagram: ${stopNames}.`,
          );
        }
      }
    }
  });
});

function getStopsInRoutes(
  lineId: number,
  { includeCollasped = false } = {},
): number[] {
  const routes = lineRoutes[lineId] ?? [];
  return unique(
    routes.flatMap((r) =>
      r.stops
        .filter((s) => includeCollasped || !s.collapseInStoppingPatterns)
        .map((s) => s.stopId),
    ),
  );
}

function getStopsInDiagrams(line: LineConfig): number[] {
  const diagrams = line.diagram.entries;
  const stops = diagrams.flatMap((d) =>
    extractStopsFromLineDiagramShape(d.shape).map((s) => s.stopId),
  );
  return unique(stops);
}

function toLinearStopLists(shape: LineDiagramShapeConfig): number[][] {
  if (shape.type === "linear") {
    return [shape.stops.map((s) => s.stopId)];
  } else if (shape.type === "branch") {
    const common = shape.commonStops.map((s) => s.stopId);
    const branchA = shape.branchAStops.map((s) => s.stopId);
    const branchB = shape.branchBStops.map((s) => s.stopId);
    return [
      [...common, ...branchA],
      [...common, ...branchB],
    ];
  } else if (shape.type === "loop") {
    // There isn't really a neat way to convert the loop into a linear pattern,
    // and also split it correctly at Flinders Street, so let's just check the
    // main trunk of the loop line is correct and not worry about the loop
    // itself. Good enough!
    return [shape.mainStops.map((s) => s.stopId)];
  } else {
    assertNever(shape);
  }
}
