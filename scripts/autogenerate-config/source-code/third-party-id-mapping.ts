import { groupBy } from "@dan-schel/js-utils";

type MappingEntry<T> = {
  value: T;
  group: string;
  comment: string | null;
};
type IdAndValue<T> = [string, MappingEntry<T>];

export abstract class ThirdPartyIdMapping<T> {
  private readonly _mapping: Map<string, MappingEntry<T>>;
  private readonly _groupSortOrder: Map<string, number>;

  constructor() {
    this._mapping = new Map<string, MappingEntry<T>>();
    this._groupSortOrder = new Map<string, number>();
  }

  add(
    id: string,
    value: T,
    group: string,
    groupSortOrder: number,
    comment: string | null,
  ) {
    if (this._mapping.has(id)) throw new Error(`"${id}" already added.`);

    this._mapping.set(id, { value, group, comment });
    this._groupSortOrder.set(group, groupSortOrder);
  }

  protected abstract formatValue(value: T): string;
  protected abstract getDataTypeName(): string;
  protected abstract getConstantName(): string;

  private _getSortOrder(group: string): number {
    const order = this._groupSortOrder.get(group);
    if (order == null) throw new Error(`No sort order for "${group}" found.`);
    return order;
  }

  toCode() {
    const constantName = this.getConstantName();
    const dataTypeName = this.getDataTypeName();
    const entriesArray = Array.from(this._mapping.entries());

    const formatGroup = (group: string, items: IdAndValue<T>[]) => {
      const itemsStr = items
        .map(([id, entry]) => {
          const formattedId = JSON.stringify(id);
          const formattedValue = this.formatValue(entry.value);
          const suffix = entry.comment == null ? "" : ` // ${entry.comment}`;
          return `  ${formattedId}: ${formattedValue},${suffix}`;
        })
        .join("\n");
      return `  // ${group}\n${itemsStr}`;
    };

    const entriesStr = groupBy(entriesArray, ([, entry]) => entry.group)
      .sort((a, b) => this._getSortOrder(a.group) - this._getSortOrder(b.group))
      .map(({ group, items }) => formatGroup(group, items))
      .join("\n\n");

    return (
      `import type { ${dataTypeName} } from "../third-party-id-mapping-types.js";\n` +
      `\n` +
      `export const ${constantName}: ${dataTypeName} = {\n` +
      `${entriesStr}\n` +
      `};\n`
    );
  }
}
