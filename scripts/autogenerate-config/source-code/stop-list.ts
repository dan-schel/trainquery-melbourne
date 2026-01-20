import { type StopConfig } from "corequery";
import type { AutogenerationContext } from "../autogeneration-context.js";

type StopListEntry = {
  readonly id: number;
  readonly name: string;
  readonly sourceCode: string;
};

export class StopList {
  private _entries: StopListEntry[];

  constructor(entries: StopListEntry[]) {
    this._entries = [...entries];
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

  add(ctx: AutogenerationContext, config: StopConfig) {
    const existing = this.get(config.name);
    if (existing != null) throw new Error(`Already has "${config.name}".`);

    const entry: StopListEntry = {
      id: config.id,
      name: config.name,
      sourceCode: StopList._generateSourceCode(ctx, config),
    };
    this._entries.push(entry);
    return entry;
  }

  toCode() {
    const entries = this._entries
      .sort((a, b) => a.id - b.id)
      .map((e) => e.sourceCode)
      .join("\n\n");

    return (
      `import { type StopConfig } from "corequery";\n` +
      `import * as stop from "../ids/stop-ids.js";\n` +
      `import * as position from "../ids/stop-position-ids.js";\n` +
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
