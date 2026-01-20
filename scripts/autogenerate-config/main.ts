import { env } from "./env.js";
import { AutogenerationContext } from "./autogeneration-context.js";
import { autogenerateConfig } from "./autogenerate-config.js";
import { IdList } from "./source-code/id-list.js";
import fsp from "fs/promises";
import { parseGtfs } from "./gtfs/parse-gtfs.js";

const STOP_IDS_PATH = "./src/ids/stop-ids.ts";
const LINE_IDS_PATH = "./src/ids/line-ids.ts";
const STOPS_PATH = "./src/data/stops.ts";

async function main() {
  const ctx = await buildContext();

  autogenerateConfig(ctx);

  await output(STOP_IDS_PATH, ctx.stopIds.toCode(), ctx.checkMode);
  await output(LINE_IDS_PATH, ctx.lineIds.toCode(), ctx.checkMode);
  await output(STOPS_PATH, ctx.stops.toCode(), ctx.checkMode);
}

async function buildContext(): Promise<AutogenerationContext> {
  const checkMode = process.argv.includes("--check");

  const gtfsData = await parseGtfs(env.RELAY_KEY);

  const stopIds = IdList.fromCode(await fsp.readFile(STOP_IDS_PATH, "utf-8"));
  const lineIds = IdList.fromCode(await fsp.readFile(LINE_IDS_PATH, "utf-8"));

  return new AutogenerationContext(checkMode, gtfsData, stopIds, lineIds);
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

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
