import { parseIntThrow } from "@dan-schel/js-utils";

type IdListEntry = {
  readonly id: number;
  readonly name: string;
  readonly constantName: string;
  readonly isActive: boolean;
};

export class IdList {
  private _entries: IdListEntry[];
  private _highestId: number;

  constructor(entries: IdListEntry[]) {
    this._entries = [...entries];
    this._highestId = entries.reduce((acc, x) => Math.max(acc, x.id), 0);
  }

  get entries() {
    return [...this._entries];
  }

  get(name: string) {
    return this._entries.find((e) => e.name === name) ?? null;
  }

  require(name: string) {
    const existing = this.get(name);
    if (existing == null) throw new Error(`No entry for "${name}".`);
    return existing;
  }

  add(name: string) {
    const existing = this.get(name);
    if (existing != null) throw new Error(`Already has "${name}".`);

    this._highestId++;

    const entry: IdListEntry = {
      id: this._highestId,
      name,
      constantName: IdList.constantize(name),
      isActive: true,
    };
    this._entries.push(entry);
    return entry;
  }

  reactivate(name: string) {
    const existing = this.require(name);
    if (existing.isActive) throw new Error(`"${name}" already active.`);

    const index = this._entries.indexOf(existing);
    this._entries[index] = {
      ...existing,
      isActive: true,
    };
  }

  deactivate(name: string) {
    const existing = this.require(name);
    if (!existing.isActive) throw new Error(`"${name}" already deactivated.`);

    const index = this._entries.indexOf(existing);
    this._entries[index] = {
      ...existing,
      isActive: false,
    };
  }

  toCode(): string {
    const lines = this._entries.map((e) => {
      const prefix = e.isActive ? "" : "// [REMOVED] ";
      return `${prefix}export const ${e.constantName} = ${e.id}; // ${e.name}`;
    });
    return lines.join("\n") + "\n";
  }

  static fromCode(text: string) {
    const lines = text
      .split("\n")
      .map((x) => x.trim())
      .filter((x) => x.length > 0);

    const entries: IdListEntry[] = [];

    for (const line of lines) {
      const match = line.match(
        /^(\/\/ \[REMOVED\] )?export const ([A-Z_]+) = ([0-9]+); \/\/ (.+)$/,
      );
      if (match == null) throw new Error(`Invalid line in ID list: ${line}`);

      const isActive = match[1] == null;
      const constantName = match[2];
      const id = parseIntThrow(match[3]);
      const name = match[4];

      const existing = entries.find((e) => e.name === name);
      if (existing != null) throw new Error(`Found ${name} twice.`);

      entries.push({ id, name, constantName, isActive });
    }

    return new IdList(entries);
  }

  static constantize(name: string): string {
    return name
      .toUpperCase()
      .replace(/[\s+]/g, "_")
      .replace(/[^A-Z0-9_]/g, "");
  }
}
