import fsp from "fs/promises";
import { GtfsData } from "./gtfs/read-gtfs";
import { GtfsDataPatch } from "./patch";

export class AutogenerationContext {
  constructor(
    readonly checkMode: boolean,
    private _gtfsData: GtfsData,
  ) {}

  get gtfsData(): GtfsData {
    return this._gtfsData;
  }

  async applyPatch(patch: GtfsDataPatch) {
    const ensureIsNeeded = patch.ensureIsNeeded ?? true;

    const isNeeded = await patch.isNeeded(this._gtfsData);

    if (isNeeded) {
      this._gtfsData = await patch.func(this._gtfsData);
    } else if (ensureIsNeeded) {
      throw new Error(`Found unnecessary patch.`);
    }
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
