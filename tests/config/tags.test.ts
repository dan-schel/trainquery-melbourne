import { describe, expect, it } from "vitest";
import { Tags } from "corequery";
import { lines } from "../../src/config/lines/index.js";
import { stops } from "../../src/config/stops/index.js";
import { lineTagSuccession } from "../../src/config/lines/line-tag-succession.js";
import { routeTagSuccession } from "../../src/config/lines/route-tag-succession.js";
import { stopTagSuccession } from "../../src/config/stops/stop-tag-succession.js";
import * as lineTag from "../../src/config/lines/line-tags.js";
import * as routeTag from "../../src/config/lines/route-tags.js";
import * as stopTag from "../../src/config/stops/stop-tags.js";

const lineTagNames = reverseMap(lineTag);
const routeTagNames = reverseMap(routeTag);
const stopTagNames = reverseMap(stopTag);

describe("tags", () => {
  it("line and route tags", () => {
    let output = "";

    for (const line of sortedByName(lines)) {
      const lineTags = Tags.build(line.tags, lineTagSuccession);
      output += `${line.name} (#${line.id}): ${getSortedNames(lineTags, lineTagNames).join(", ")}\n\n`;

      for (const route of sortedByName(line.routes)) {
        const routeTags = Tags.build(route.tags, routeTagSuccession);
        output += `  - ${route.name} (#${route.id}): ${getSortedNames(routeTags, routeTagNames).join(", ")}\n`;
      }

      output += "\n\n";
    }

    expect(`\n${output}`).toMatchSnapshot();
  });

  it("stop tags", () => {
    let output = "";

    for (const stop of sortedByName(stops)) {
      const tags = Tags.build(stop.tags, stopTagSuccession);
      const names = getSortedNames(tags, stopTagNames);
      if (names.length > 0) {
        output += `${stop.name} (#${stop.id}): ${names.join(", ")}\n`;
      }
    }

    expect(`\n${output}`).toMatchSnapshot();
  });
});

function reverseMap(module: Record<string, number>): Map<number, string> {
  const map = new Map<number, string>();
  for (const [name, value] of Object.entries(module)) {
    map.set(value, name);
  }
  return map;
}

function getSortedNames(tags: Tags, reverseMap: Map<number, string>): string[] {
  const names: string[] = [];
  for (const [id, name] of reverseMap) {
    if (tags.has(id)) {
      names.push(name);
    }
  }
  return names.sort();
}

function sortedByName<T extends { name: string }>(items: Iterable<T>): T[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}
