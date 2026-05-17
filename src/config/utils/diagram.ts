import type { Color, LineDiagramConfig } from "corequery";
import {
  formalizeDiagramStops,
  type InformalLineDiagramStopConfig,
} from "./formalize-stops.js";
import { createCityLoopDiagramShape } from "./city-loop.js";

export function createLinearDiagram(
  color: Color,
  stops: readonly InformalLineDiagramStopConfig[],
): LineDiagramConfig {
  return {
    entries: [
      {
        name: null,
        color: color,
        shape: {
          type: "linear",
          stops: formalizeDiagramStops(stops),
        },
      },
    ],
  };
}

export function createCityLoopDiagram(
  color: Color,
  stops: readonly InformalLineDiagramStopConfig[],
): LineDiagramConfig {
  return {
    entries: [
      {
        name: null,
        color: color,
        shape: createCityLoopDiagramShape(stops),
      },
    ],
  };
}
