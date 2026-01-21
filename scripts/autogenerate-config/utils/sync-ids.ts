import type { IdList } from "../source-code/id-list.js";

export type WithName = {
  readonly name: string;
};

export type WithId<T> = T & {
  readonly id: number;
  readonly constantName: string;
};

export function syncIds<T extends WithName>(
  idList: IdList,
  items: T[],
): WithId<T>[] {
  const itemsWithIdsAssigned = assignIds(idList, items);
  deactivateMissingIds(idList, items);

  return itemsWithIdsAssigned;
}

function assignIds<T extends WithName>(
  idList: IdList,
  items: T[],
): WithId<T>[] {
  const result: WithId<T>[] = [];

  for (const item of items) {
    const entry = idList.get(item.name) ?? idList.add(item.name);

    if (!entry.isActive) idList.reactivate(item.name);

    result.push({
      ...item,
      id: entry.id,
      constantName: entry.constantName,
    });
  }

  return result;
}

function deactivateMissingIds(idList: IdList, items: WithName[]) {
  const activeEntries = idList.entries.filter((x) => x.isActive);

  for (const entry of activeEntries) {
    const matchingItem = items.find((s) => s.name === entry.name);

    if (matchingItem == null) {
      idList.deactivate(entry.name);
    }
  }
}
