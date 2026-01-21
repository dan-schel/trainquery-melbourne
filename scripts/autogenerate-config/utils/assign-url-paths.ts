type WithName = {
  readonly name: string;
};

export type WithUrlPath<T> = T & {
  readonly urlPath: string;
};

export function assignUrlPaths<T extends WithName>(
  items: T[],
): WithUrlPath<T>[] {
  return items.map((item) => ({
    ...item,
    urlPath: generateUrlPath(item.name),
  }));
}

function generateUrlPath(name: string): string {
  const processed = name.toLowerCase().replaceAll(/[\s-&/,]/gi, "");

  if (!/^[a-z]+$/g.test(processed)) throw new Error(`Tricky name: ${name}`);

  return processed;
}
