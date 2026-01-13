import { env } from "./env";
import { withGtfsFiles } from "./gtfs/with-gtfs-files";
import { AutogenerationContext } from "./autogeneration-context";
import { autogenerateConfig } from "./autogenerate-config";
import { GtfsData, readGtfs } from "./gtfs/read-gtfs";
import { stAlbansStationNamePatch } from "./patches/st-albans-station-name";
import { trimStationNamesPatch } from "./patches/trim-station-names";
import { jolimontStationNamePatch } from "./patches/jolimont-station-name";
import { IdList } from "./source-code/id-list";
import fsp from "fs/promises";

const STOP_IDS_PATH = "./src/ids/stop-ids.ts";
const LINE_IDS_PATH = "./src/ids/line-ids.ts";

const patches = [
  trimStationNamesPatch,
  jolimontStationNamePatch,
  stAlbansStationNamePatch,
];

async function main() {
  const ctx = await buildContext();
  await autogenerateConfig(ctx);

  await output(STOP_IDS_PATH, ctx.stopIds.asOutput(), ctx.checkMode);
  await output(LINE_IDS_PATH, ctx.lineIds.asOutput(), ctx.checkMode);
}

async function buildContext(): Promise<AutogenerationContext> {
  const checkMode = process.argv.includes("--check");

  const gtfsData = await withGtfsFiles(env.RELAY_KEY, readGtfs);
  const patchedGtfsData = await patchGtfsData(gtfsData);

  const stopIds = await IdList.parse(STOP_IDS_PATH);
  const lineIds = await IdList.parse(LINE_IDS_PATH);

  return new AutogenerationContext(
    checkMode,
    patchedGtfsData,
    stopIds,
    lineIds,
  );
}

async function output(filePath: string, content: string, checkMode: boolean) {
  if (checkMode) {
    const existingContent = await fsp.readFile(filePath, "utf-8");
    if (existingContent !== content) {
      throw new Error(`Changes found. Apply them with \`npm run confgen\`.`);
    }
  } else {
    await fsp.writeFile(filePath, content, "utf-8");
  }
}

async function patchGtfsData(input: GtfsData): Promise<GtfsData> {
  let gtfsData = input;

  for (const patch of patches) {
    const ensureIsNeeded = patch.ensureIsNeeded ?? true;
    const isNeeded = await patch.isNeeded(gtfsData);

    if (isNeeded) {
      gtfsData = await patch.func(gtfsData);
    } else if (ensureIsNeeded) {
      throw new Error(`Found unnecessary patch.`);
    }
  }

  return gtfsData;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
