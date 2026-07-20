import type { Color } from "corequery";

export type LineRoutesConfig = Record<number, readonly RouteConfig[]>;

export type RouteConfig = {
  readonly color: Color;
  readonly stops: readonly RouteStopConfig[];
  readonly serviceTags: readonly number[];
};

export type RouteStopConfig = {
  readonly stopId: number;
  readonly collapseInStoppingPatterns: boolean;
};

export type LineOverridesConfig = Record<number, LineOverrideConfig>;

export type LineOverrideConfig = {
  readonly mode: "add" | "replace";
  readonly lines: readonly number[];
};
