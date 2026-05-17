import { assert, describe, it } from "vitest";
import { lines } from "../../../src/config/corequery/lines/index.js";
import { stops } from "../../../src/config/corequery/stops/index.js";
import { lineRoutes } from "../../../src/config/gtfs/routes.js";
import { unique } from "@dan-schel/js-utils";
import { extractStopsFromLineDiagramShape, LineConfig } from "corequery";
import { getStopName } from "../../../src/utils/get-stop-name.js";
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

  it("each stop in the line's diagram(s) is also in a route", () => {
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

  it("each stop in a line's routes are also in the diagram(s)", () => {
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

  it("all routes have at least two stops", () => {
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

  it("no routes are duplicated", () => {
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
