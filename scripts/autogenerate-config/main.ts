import { env } from "./env.js";
import { AutogenerationContext } from "./autogeneration-context.js";
import { autogenerateConfig } from "./autogenerate-config.js";
import { IdList } from "./source-code/id-list.js";
import fsp from "fs/promises";
import { parseGtfs } from "./gtfs/parse-gtfs.js";

const STOP_IDS_PATH = "./src/ids/stop-ids.ts";
const LINE_IDS_PATH = "./src/ids/line-ids.ts";
const ROUTE_IDS_PATH = "./src/ids/route-ids.ts";
const STOP_POSITION_IDS_PATH = "./src/ids/stop-position-ids.ts";
const STOPS_PATH = "./src/data/stops.ts";

async function main() {
  const ctx = new AutogenerationContext(
    process.argv.includes("--check"),
    await parseGtfs(env.RELAY_KEY),
    IdList.fromCode(await fsp.readFile(STOP_IDS_PATH, "utf-8")),
    IdList.fromCode(await fsp.readFile(LINE_IDS_PATH, "utf-8")),
    IdList.fromCode(await fsp.readFile(ROUTE_IDS_PATH, "utf-8")),
    IdList.fromCode(await fsp.readFile(STOP_POSITION_IDS_PATH, "utf-8")),
  );

  autogenerateConfig(ctx);

  await output(STOP_IDS_PATH, ctx.stopIds.toCode(), ctx.checkMode);
  await output(LINE_IDS_PATH, ctx.lineIds.toCode(), ctx.checkMode);
  await output(ROUTE_IDS_PATH, ctx.routeIds.toCode(), ctx.checkMode);
  await output(STOP_POSITION_IDS_PATH, ctx.positionIds.toCode(), ctx.checkMode);
  await output(STOPS_PATH, ctx.stops.toCode(), ctx.checkMode);
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
