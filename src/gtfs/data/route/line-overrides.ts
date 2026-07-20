import type {
  LineOverridesConfig,
  LineOverrideConfig,
} from "../../config/routes.js";

export class LineOverrides {
  constructor(private readonly _map: Map<number, LineOverride>) {}

  static build(config: LineOverridesConfig) {
    return new LineOverrides(
      new Map(
        Object.entries(config).map(([lineId, override]) => [
          Number(lineId),
          LineOverride.build(override),
        ]),
      ),
    );
  }

  // `require` doesn't make sense here. Not all lines are expected to have
  // overrides, e.g. the Gippsland line.
  forLine(lineId: number): LineOverride | null {
    return this._map.get(lineId) ?? null;
  }
}

export type LineOverrideFields = {
  readonly mode: "add" | "replace";
  readonly lines: readonly number[];
};

export class LineOverride {
  readonly mode: "add" | "replace";
  readonly lines: readonly number[];

  constructor(fields: LineOverrideFields) {
    this.mode = fields.mode;
    this.lines = fields.lines;
  }

  static build(config: LineOverrideConfig) {
    return new LineOverride(config);
  }
}
