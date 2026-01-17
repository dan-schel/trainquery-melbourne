import { StopConfig } from "corequery";
import { IdList } from "./id-list";

type StopListEntry = {
  readonly id: number;
  readonly name: string;
  readonly sourceCode: string;
};

export class StopList {
  private _entries: StopListEntry[];

  constructor(entries: StopListEntry[]) {
    this._entries = [...entries];
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

  add(config: StopConfig) {
    const existing = this.get(config.name);
    if (existing != null) throw new Error(`Already has "${config.name}".`);

    const entry: StopListEntry = {
      id: config.id,
      name: config.name,
      sourceCode: StopList.generateSourceCode(config),
    };
    this._entries.push(entry);
    return entry;
  }

  toCode() {
    return this._entries.map((e) => e.sourceCode).join("\n\n");
  }

  static fromCode(text: string) {
    const entries: StopListEntry[] = [];

    // TODO: Everything.

    return new StopList(entries);
  }

  static generateSourceCode(config: StopConfig): string {
    const constantName = IdList.constantize(config.name);

    function stringifyLocation(): string {
      if (config.location == null) return "null";

      return (
        `{\n` +
        `    latitude: ${config.location.latitude},\n` +
        `    longitude: ${config.location.longitude} }\n` +
        `  }`
      );
    }

    function stringifyPositions(): string {
      const x = config.positions.map((p) => {
        return (
          `{\n` +
          `      name: ${JSON.stringify(p.name)},\n` +
          `      stopPositionId: ${p.stopPositionId}\n` + // TODO: Use const.
          `    }`
        );
      });

      return `[\n  ${x.join(",\n  ")}\n]`;
    }

    return (
      `export const ${constantName}: StopConfig = {\n` +
      `  id: ${config.id},\n` + // TODO: Use const.
      `  name: ${JSON.stringify(config.name)},\n` +
      `  tags: ${JSON.stringify(config.tags)},\n` +
      `  urlPath: ${JSON.stringify(config.urlPath)},\n` +
      `  location: ${stringifyLocation()},\n` +
      `  positions: ${stringifyPositions()}\n` +
      `};`
    );
  }
}
