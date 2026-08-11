export function fake<T extends object>(
  attributes: Partial<Record<keyof T, unknown>>,
): T {
  return attributes as T;
}
