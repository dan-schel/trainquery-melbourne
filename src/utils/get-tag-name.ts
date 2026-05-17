import * as lineTag from "../config/corequery/lines/line-tags.js";
import * as serviceTag from "../config/corequery/lines/service-tags.js";
import * as stopTag from "../config/corequery/stops/stop-tags.js";

const tagNames = {
  line: reverseMap(lineTag),
  service: reverseMap(serviceTag),
  stop: reverseMap(stopTag),
};

export type TagType = keyof typeof tagNames;

export function getTagName(tag: number, tagType: TagType): string | null {
  return tagNames[tagType].get(tag) ?? null;
}

export function requireTagName(tag: number, tagType: TagType): string {
  const name = getTagName(tag, tagType);
  if (name == null) throw new Error(`No ${tagType} tag with value ${tag}.`);
  return name;
}

function reverseMap(module: Record<string, number>): Map<number, string> {
  const map = new Map<number, string>();
  for (const [name, value] of Object.entries(module)) {
    map.set(value, name);
  }
  return map;
}
