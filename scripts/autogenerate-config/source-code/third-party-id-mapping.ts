import { groupBy } from "@dan-schel/js-utils";

type MappingEntry<T> = {
  value: T;
  group: string;
  comment: string | null;
};
type IdAndValue<T> = [string, MappingEntry<T>];

export abstract class ThirdPartyIdMapping<T> {
  private readonly _mapping: Map<string, MappingEntry<T>>;

  constructor() {
    this._mapping = new Map<string, MappingEntry<T>>();
  }

  add(id: string, value: T, group: string, comment: string | null) {
    if (this._mapping.has(id)) throw new Error(`"${id}" already added.`);
    this._mapping.set(id, { value, group, comment });
  }

  protected abstract formatValue(value: T): string;
  protected abstract getImportCode(): string;
  protected abstract getConstantName(): string;

  toCode() {
    const constantName = this.getConstantName();
    const importCode = this.getImportCode();
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
      .sort((a, b) => a.group.localeCompare(b.group))
      .map(({ group, items }) => formatGroup(group, items))
      .join("\n\n");

    return (
      `${importCode}\n` +
      `\n` +
      `export const ${constantName}: StopGtfsIdMapping = {\n` +
      `${entriesStr}\n` +
      `};\n`
    );
  }
}
