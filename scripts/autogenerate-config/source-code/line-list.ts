import { type LineConfig } from "corequery";
import type { AutogenerationContext } from "../autogeneration-context.js";

type LineListEntry = {
  readonly id: number;
  readonly name: string;
  readonly sourceCode: string;
};

export class LineList {
  private _entries: LineListEntry[];

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

  add(ctx: AutogenerationContext, config: LineConfig) {
    const existing = this.get(config.name);
    if (existing != null) throw new Error(`Already has "${config.name}".`);

    const entry: LineListEntry = {
      id: config.id,
      name: config.name,
      sourceCode: LineList._generateSourceCode(ctx, config),
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
      `import { type LineConfig } from "corequery";\n` +
      `import * as line from "./line-ids.js";\n` +
      `import * as route from "./route-ids.js";\n` +
      `import * as stop from "../stops/stop-ids.js";\n` +
      `\n` +
      `${entries}\n`
    );
  }

  private static _generateSourceCode(
    ctx: AutogenerationContext,
    config: LineConfig,
  ): string {
    const lineId = ctx.lineIds.requireById(config.id);

    type StopEntry = readonly {
      readonly stopId: number;
      readonly type: string;
    }[];

    function stringifyStops(stops: StopEntry, prefix: string): string {
      if (stops.length === 0) return "[]";

      const stopEntries = stops.map((stop) => {
        const stopId = ctx.stopIds.requireById(stop.stopId);

        return (
          `${prefix}  {\n` +
          `${prefix}    stopId: stop.${stopId.constantName},\n` +
          `${prefix}    type: ${JSON.stringify(stop.type)},\n` +
          `${prefix}  }`
        );
      });

      return `[\n${stopEntries.join(",\n")}\n${prefix}]`;
    }

    function stringifyRoutes(): string {
      if (config.routes.length === 0) return "[]";

      const routeEntries = config.routes.map((route) => {
        const routeId = ctx.routeIds.requireById(route.id);

        return (
          `    {\n` +
          `      id: route.${routeId.constantName},\n` +
          `      name: ${JSON.stringify(route.name)},\n` +
          `      tags: ${JSON.stringify(route.tags)},\n` +
          `      stops: ${stringifyStops(route.stops, "      ")},\n` +
          `      color: ${JSON.stringify(route.color)},\n` +
          `    }`
        );
      });

      return `[\n${routeEntries.join(",\n")}\n  ]`;
    }

    function stringifyDiagram(): string {
      if (config.diagram.entries.length === 0) return "{ entries: [] }";

      const diagramEntries = config.diagram.entries.map((diagram) => {
        return (
          `      {\n` +
          `        name: ${JSON.stringify(diagram.name)},\n` +
          `        color: ${JSON.stringify(diagram.color)},\n` +
          `        stops: ${stringifyStops(diagram.stops, "        ")},\n` +
          `      }`
        );
      });

      return `{\n    entries: [\n${diagramEntries.join(",\n")}\n    ],\n  }`;
    }

    return (
      `export const ${lineId.constantName}: LineConfig = {\n` +
      `  id: line.${lineId.constantName},\n` +
      `  name: ${JSON.stringify(config.name)},\n` +
      `  code: ${JSON.stringify(config.code)},\n` +
      `  tags: ${JSON.stringify(config.tags)},\n` +
      `  urlPath: ${JSON.stringify(config.urlPath)},\n` +
      `  routes: ${stringifyRoutes()},\n` +
      `  diagram: ${stringifyDiagram()},\n` +
      `};`
    );
  }
}
