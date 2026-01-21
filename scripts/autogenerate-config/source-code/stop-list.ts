import { type StopConfig } from "corequery";
import type { AutogenerationContext } from "../autogeneration-context.js";

export class StopList {
  private _entries: StopConfig[];

  constructor() {
    this._entries = [];
  }

  get entries() {
    return [...this._entries];
  }

  get(name: string) {
    return this._entries.find((e) => e.name === name) ?? null;
  }

  require(name: string) {
    const existing = this.get(name);
    if (existing == null) throw new Error(`No entry for "${name}".`);
    return existing;
  }

  requireById(id: number) {
    const existing = this._entries.find((e) => e.id === id);
    if (existing == null) throw new Error(`No entry for ID ${id}.`);
    return existing;
  }

  add(config: StopConfig) {
    const existing = this.get(config.name);
    if (existing != null) throw new Error(`Already has "${config.name}".`);

    this._entries.push(config);
  }

  toCode(ctx: AutogenerationContext) {
    const entries = this._entries
      .sort((a, b) => a.id - b.id)
      .map((e) => StopList._generateSourceCode(ctx, e))
      .join("\n\n");

    return (
      `import { type StopConfig } from "corequery";\n` +
      `import * as stop from "./stop-ids.js";\n` +
      `import * as position from "./stop-position-ids.js";\n` +
      `\n` +
      `${entries}\n`
    );
  }

  private static _generateSourceCode(
    ctx: AutogenerationContext,
    config: StopConfig,
  ): string {
    const stopId = ctx.stopIds.requireById(config.id);

    function stringifyLocation(): string {
      if (config.location == null) return "null";
      return `{ latitude: ${config.location.latitude}, longitude: ${config.location.longitude} }`;
    }

    function stringifyPositions(): string {
      const x = config.positions.map((p) => {
        const positionId = ctx.positionIds.requireById(p.stopPositionId);
        return `{ stopPositionId: position.${positionId.constantName}, name: ${JSON.stringify(p.name)} }`;
      });

      if (x.length > 1) {
        return `[\n${x.map((y) => `    ${y},\n`).join("")}  ]`;
      } else {
        return `[${x.map((y) => `${y}`).join(", ")}]`;
      }
    }

    return (
      `export const ${stopId.constantName}: StopConfig = {\n` +
      `  id: stop.${stopId.constantName},\n` +
      `  name: ${JSON.stringify(config.name)},\n` +
      `  tags: ${JSON.stringify(config.tags)},\n` +
      `  urlPath: ${JSON.stringify(config.urlPath)},\n` +
      `  location: ${stringifyLocation()},\n` +
      `  positions: ${stringifyPositions()},\n` +
      `};`
    );
  }
}
