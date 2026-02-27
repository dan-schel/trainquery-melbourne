import { assert } from "vitest";

export function expectUniqueIds(idsObj: unknown, idName: string) {
  const seen = new Set<string>();

  for (const gtfsId of extractNestedIds(idsObj)) {
    assert(!seen.has(gtfsId), `${idName} "${gtfsId}" is present twice.`);
    seen.add(gtfsId);
  }
}

function extractNestedIds(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  } else if (Array.isArray(value)) {
    return value.flatMap(extractNestedIds);
  } else if (typeof value === "object" && value != null) {
    return Object.values(value).flatMap(extractNestedIds);
  } else {
    return [];
  }
}
