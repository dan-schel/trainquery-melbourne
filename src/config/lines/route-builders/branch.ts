import type { Color } from "corequery";
import * as route from "../route-ids.js";
import * as tag from "../route-tags.js";
import {
  toDiagramStops,
  toRouteStops,
  type RouteBuilderOutput,
  type RouteBuilderStop,
} from "./utils.js";

type Options = {
  readonly commonName: string;
  readonly branchAName: string;
  readonly branchBName: string;
  readonly color: Color;
  readonly commonStops: readonly RouteBuilderStop[];
  readonly branchAStops: readonly RouteBuilderStop[];
  readonly branchBStops: readonly RouteBuilderStop[];
};

export function branch(options: Options): RouteBuilderOutput {
  const branchAStops = [...options.branchAStops, ...options.commonStops];
  const branchBStops = [...options.branchBStops, ...options.commonStops];

  const branchAConstName = options.branchAName.toUpperCase().replace(/ /g, "_");
  const branchBConstName = options.branchBName.toUpperCase().replace(/ /g, "_");

  return {
    routes: [
      {
        id: route.COMMON_UP,
        name: `${options.commonName} Up`,
        tags: [tag.COMMON_UP],
        stops: toRouteStops(options.commonStops),
        color: options.color,
      },
      {
        id: route.COMMON_DOWN,
        name: `${options.commonName} Down`,
        tags: [tag.COMMON_DOWN],
        stops: toRouteStops([...options.commonStops].reverse()),
        color: options.color,
      },
      {
        id: requireRouteId(`${branchAConstName}_BRANCH_UP`),
        name: `${options.branchAName} Up`,
        tags: [requireTag(`${branchAConstName}_BRANCH_UP`)],
        stops: toRouteStops(branchAStops),
        color: options.color,
      },
      {
        id: requireRouteId(`${branchAConstName}_BRANCH_DOWN`),
        name: `${options.branchAName} Down`,
        tags: [requireTag(`${branchAConstName}_BRANCH_DOWN`)],
        stops: toRouteStops([...branchAStops].reverse()),
        color: options.color,
      },
      {
        id: requireRouteId(`${branchBConstName}_BRANCH_UP`),
        name: `${options.branchBName} Up`,
        tags: [requireTag(`${branchBConstName}_BRANCH_UP`)],
        stops: toRouteStops(branchBStops),
        color: options.color,
      },
      {
        id: requireRouteId(`${branchBConstName}_BRANCH_DOWN`),
        name: `${options.branchBName} Down`,
        tags: [requireTag(`${branchBConstName}_BRANCH_DOWN`)],
        stops: toRouteStops([...branchBStops].reverse()),
        color: options.color,
      },
    ],
    diagram: {
      entries: [
        {
          name: null,
          color: options.color,
          shape: {
            type: "branch",
            commonStops: toDiagramStops([...options.commonStops].reverse()),
            branchAStops: toDiagramStops([...options.branchAStops].reverse()),
            branchBStops: toDiagramStops([...options.branchBStops].reverse()),
          },
        },
      ],
    },
  };
}

function requireRouteId(name: string): number {
  const result = (route as Record<string, number>)[name];
  if (result == null) throw new Error(`Route ID not found: ${name}`);
  return result;
}

function requireTag(name: string): number {
  const result = (tag as Record<string, number>)[name];
  if (result == null) throw new Error(`Route tag not found: ${name}`);
  return result;
}
