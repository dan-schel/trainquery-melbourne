export function extractAllStringValues(stopGtfsIds: unknown): Set<string> {
  const result = new Set<string>();
  addAllValuesInside(stopGtfsIds, result);
  return result;
}

function addAllValuesInside(value: unknown, set: Set<string>) {
  if (typeof value === "string") {
    set.add(value);
  } else if (Array.isArray(value)) {
    for (const item of value) {
      addAllValuesInside(item, set);
    }
  } else if (value != null && typeof value === "object") {
    for (const v of Object.values(value)) {
      addAllValuesInside(v, set);
    }
  }
}
