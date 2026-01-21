import { env } from "./env.js";
import { AutogenerationContext } from "./autogeneration-context.js";
import { autogenerateConfig } from "./autogenerate-config.js";
import { IdList } from "./source-code/id-list.js";
import fsp from "fs/promises";
import { parseGtfs } from "./gtfs/parse-gtfs.js";

const STOP_IDS_PATH = "./src/stops/stop-ids.ts";
const STOP_POSITION_IDS_PATH = "./src/stops/stop-position-ids.ts";
const LINE_IDS_PATH = "./src/lines/line-ids.ts";
const ROUTE_IDS_PATH = "./src/lines/route-ids.ts";

const STOPS_PATH = "./src/stops/stops.ts";
const STOP_GTFS_IDS_PATH = "./src/stops/stop-gtfs-ids.ts";
const STOP_PTV_API_IDS_PATH = "./src/stops/stop-ptv-api-ids.ts";

const LINES_PATH = "./src/lines/lines.ts";
const LINE_GTFS_IDS_PATH = "./src/lines/line-gtfs-ids.ts";

async function main() {
  const checkMode = process.argv.includes("--check");

  console.log("Downloading/parsing GTFS data...");

  const gtfsData = await parseGtfs(env.RELAY_KEY);

  console.log("Reading ID files...");

  const ctx = new AutogenerationContext(
    checkMode,
    gtfsData,
    IdList.fromCode(await fsp.readFile(STOP_IDS_PATH, "utf-8")),
    IdList.fromCode(await fsp.readFile(STOP_POSITION_IDS_PATH, "utf-8")),
    IdList.fromCode(await fsp.readFile(LINE_IDS_PATH, "utf-8")),
    IdList.fromCode(await fsp.readFile(ROUTE_IDS_PATH, "utf-8")),
  );

  console.log("Generating config...");

  autogenerateConfig(ctx);

  console.log("Outputting config...");

  await output(STOP_IDS_PATH, ctx.stopIds.toCode(), checkMode);
  await output(STOP_POSITION_IDS_PATH, ctx.positionIds.toCode(), checkMode);
  await output(LINE_IDS_PATH, ctx.lineIds.toCode(), checkMode);
  await output(ROUTE_IDS_PATH, ctx.routeIds.toCode(), checkMode);

  await output(STOPS_PATH, ctx.stops.toCode(ctx), ctx.checkMode);
  await output(STOP_GTFS_IDS_PATH, ctx.stopGtfsIds.toCode(ctx), checkMode);
  await output(STOP_PTV_API_IDS_PATH, ctx.stopPtvApiIds.toCode(ctx), checkMode);

  await output(LINES_PATH, ctx.lines.toCode(ctx), checkMode);
  await output(LINE_GTFS_IDS_PATH, ctx.lineGtfsIds.toCode(ctx), checkMode);

  console.log("✅ Done!");
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
