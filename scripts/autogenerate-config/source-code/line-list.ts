import { type LineConfig } from "corequery";
import type { AutogenerationContext } from "../autogeneration-context.js";

export class LineList {
  private _entries: LineConfig[];

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

  add(config: LineConfig) {
    const existing = this.get(config.name);
    if (existing != null) throw new Error(`Already has "${config.name}".`);

    this._entries.push(config);
  }

  toCode(ctx: AutogenerationContext) {
    const entries = this._entries
      .sort((a, b) => a.id - b.id)
      .map((e) => LineList._generateSourceCode(ctx, e))
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

        return `${prefix}  { stopId: stop.${stopId.constantName}, type: ${JSON.stringify(stop.type)} },\n`;
      });

      return `[\n${stopEntries.join("")}${prefix}]`;
    }

    function stringifyRoutes(): string {
      if (config.routes.length === 0) return "[]";

      const routeEntries = config.routes.map((route) => {
        const routeId = ctx.routeIds.requireById(route.id);

        return (
          `    {\n` +
          `      id: route.${routeId.constantName}, // TODO: This is wrong!\n` +
          `      name: ${JSON.stringify(route.name)},\n` +
          `      tags: ${JSON.stringify(route.tags)},\n` +
          `      stops: ${stringifyStops(route.stops, "      ")},\n` +
          `      color: ${JSON.stringify(route.color)},\n` +
          `    },\n`
        );
      });

      return `[\n${routeEntries.join("")}  ]`;
    }

    function stringifyDiagram(): string {
      if (config.diagram.entries.length === 0) return "{ entries: [] }";

      const diagramEntries = config.diagram.entries.map((diagram) => {
        return (
          `      {\n` +
          `        name: ${JSON.stringify(diagram.name)},\n` +
          `        color: ${JSON.stringify(diagram.color)},\n` +
          `        stops: ${stringifyStops(diagram.stops, "        ")},\n` +
          `      },\n`
        );
      });

      return `{\n    entries: [\n${diagramEntries.join("")}    ],\n  }`;
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
