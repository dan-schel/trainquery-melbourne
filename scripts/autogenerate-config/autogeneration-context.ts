import fsp from "fs/promises";
import z from "zod";
import { GtfsFile } from "./utils/gtfs-file";
import { readCsv } from "./utils/read-csv";
import path from "path";

export class AutogenerationContext {
  constructor(
    readonly checkMode: boolean,
    private readonly _suburbanGtfsDir: string,
    private readonly _regionalGtfsDir: string,
  ) {}

  async readGtfsFile<T extends z.ZodType>(
    subfeed: "suburban" | "regional",
    file: GtfsFile<T>,
  ): Promise<z.infer<T>[]> {
    const dir = {
      suburban: this._suburbanGtfsDir,
      regional: this._regionalGtfsDir,
    }[subfeed];

    return await readCsv(path.join(dir, file.filePath), file.schema);
  }

  async output(filePath: string, content: string) {
    if (this.checkMode) {
      const existingContent = await fsp.readFile(filePath, "utf-8");
      if (existingContent !== content) {
        throw new Error(`Changes found. Apply them with \`npm run confgen\`.`);
      }
    } else {
      await fsp.writeFile(filePath, content, "utf-8");
    }
  }
}
