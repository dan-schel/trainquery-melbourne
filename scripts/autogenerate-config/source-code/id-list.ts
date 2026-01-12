import { parseIntThrow } from "@dan-schel/js-utils";
import fsp from "fs/promises";

export class IdList {
  private readonly _ids: Map<
    string,
    { readonly value: number; readonly isActive: boolean }
  >;
  private _highestSeenId: number;

  constructor() {
    this._ids = new Map();
    this._highestSeenId = 0;
  }

  private _addExisting(name: string, value: number, isActive: boolean) {
    if (this._ids.has(name)) throw new Error(`Duplicate ID name: ${name}`);
    this._ids.set(name, { value, isActive });

    if (value > this._highestSeenId) {
      this._highestSeenId = value;
    }
  }

  add(name: string) {
    this._highestSeenId += 1;

    if (this._ids.has(name)) throw new Error(`Duplicate ID name: ${name}`);
    this._ids.set(name, { value: this._highestSeenId, isActive: true });
  }

  deactivate(name: string) {
    const entry = this._ids.get(name);
    if (entry == null) throw new Error(`Cannot deactivate unknown ID: ${name}`);
    if (!entry.isActive) throw new Error(`Already deactivated ID: ${name}`);

    this._ids.set(name, { value: entry.value, isActive: false });
  }

  has(name: string): boolean {
    return this._ids.has(name);
  }

  entries() {
    return Array.from(this._ids.entries());
  }

  asOutput(): string {
    const entries = Array.from(this._ids.entries());
    const lines = entries.map(([name, { value, isActive }]) => {
      const prefix = isActive ? "" : "// ";
      const suffix = isActive ? "" : " <<REMOVED>>";
      return `${prefix}export const ${name} = ${value};${suffix}`;
    });
    return lines.join("\n") + "\n";
  }

  static async parse(filePath: string) {
    const text = await fsp.readFile(filePath, "utf-8");

    const lines = text
      .split("\n")
      .map((x) => x.trim())
      .filter((x) => x.length > 0);

    const list = new IdList();

    for (const line of lines) {
      const match = line.match(/^(\/\/ )?export const ([A-Z_]+) = ([0-9]+);/);
      if (match == null) throw new Error(`Invalid line in ID list: ${line}`);

      const isActive = match[1] == null;
      const name = match[2];
      const value = parseIntThrow(match[3]);

      list._addExisting(name, value, isActive);
    }

    return list;
  }

  static constantize(name: string): string {
    return name
      .toUpperCase()
      .replace(/[\s+]/g, "_")
      .replace(/[^A-Z0-9_]/g, "");
  }
}
