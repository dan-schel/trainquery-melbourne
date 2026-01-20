import { numberWiseSort } from "../utils/number-wise-sort.js";

export abstract class ThirdPartyIdMapping<T> {
  private readonly _mapping: Map<string, T>;

  constructor() {
    this._mapping = new Map<string, T>();
  }

  add(id: string, value: T) {
    if (this._mapping.has(id)) throw new Error(`"${id}" already added.`);
    this._mapping.set(id, value);
  }

  protected abstract formatValue(value: T): string;
  protected abstract getImportCode(): string;
  protected abstract getConstantName(): string;

  toCode() {
    const constantName = this.getConstantName();
    const importCode = this.getImportCode();

    const entries = Array.from(this._mapping.entries())
      .sort(([idA], [idB]) => numberWiseSort(idA, idB))
      .map((e) => `  ${JSON.stringify(e[0])}: ${this.formatValue(e[1])},`)
      .join("\n");

    return `${importCode}\n\nexport const ${constantName}: StopGtfsIdMapping = {\n${entries}\n};`;
  }
}
