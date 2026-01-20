export type Patch<T> = (data: T) => T;

export function applyPatches<T>(input: T, patches: Patch<T>[]): T {
  let result = input;

  for (const patch of patches) {
    result = patch(result);
  }

  return result;
}
