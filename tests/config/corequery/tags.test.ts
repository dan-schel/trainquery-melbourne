import { describe, expect, it } from "vitest";
import { Tags } from "corequery";
import { lines } from "../../../src/config/corequery/lines/index.js";
import { stops } from "../../../src/config/corequery/stops/index.js";
import { lineTagSuccession } from "../../../src/config/corequery/lines/line-tag-succession.js";
import { stopTagSuccession } from "../../../src/config/corequery/stops/stop-tag-succession.js";
import { requireTagName, TagType } from "../../../src/utils/get-tag-name.js";

describe("tags", () => {
  it("line and route tags", () => {
    let output = "";

    for (const line of sortedByName(lines)) {
      const lineTags = Tags.build(line.tags, lineTagSuccession);
      const names = getSortedNames(lineTags, "line");
      output += `${line.name} (#${line.id}): ${names.join(", ")}\n\n`;
    }

    expect(`\n${output}`).toMatchSnapshot();
  });

  it("stop tags", () => {
    let output = "";

    for (const stop of sortedByName(stops)) {
      const tags = Tags.build(stop.tags, stopTagSuccession);
      const names = getSortedNames(tags, "stop");
      output += `${stop.name} (#${stop.id}): ${names.join(", ")}\n`;
    }

    expect(`\n${output}`).toMatchSnapshot();
  });
});

function getSortedNames(tags: Tags, tagType: TagType): string[] {
  return tags
    .all()
    .map((tag) => requireTagName(tag, tagType))
    .sort();
}

function sortedByName<T extends { name: string }>(items: Iterable<T>): T[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}
