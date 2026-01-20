import { type ParsedStop } from "./extract-stops-from-tree.js";

export type WithUrlPath<T> = T & {
  readonly urlPath: string;
};

export function assignUrlPaths<T extends ParsedStop>(
  stops: T[],
): WithUrlPath<T>[] {
  return stops.map((stop) => ({
    ...stop,
    urlPath: generateUrlPath(stop.name),
  }));
}

function generateUrlPath(name: string): string {
  const processed = name.toLowerCase().replaceAll(" ", "");

  if (!/^[a-z]+$/g.test(processed)) throw new Error(`Tricky name: ${name}`);

  return processed;
}
