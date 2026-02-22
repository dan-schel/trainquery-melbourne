import chalk from "chalk";
import type { StopsCsvTreeNode } from "../utils/gtfs/stops-csv-tree.js";
import {
  constify,
  isPresent,
  itsOk,
  numberWiseSort,
} from "@dan-schel/js-utils";
import { stops } from "../../src/config/stops/index.js";
import { pressAnyKeyToContinue } from "./input.js";
import { GTFS_REPLACEMENT_BUS_PLATFORM_CODE } from "../../src/gtfs/schedule/utils/magic-values.js";

export async function printStopData(stop: StopsCsvTreeNode) {
  const name = stop.stop_name.trim().replace(/( Railway)? Station$/g, "");
  const id = Math.max(...stops.map((x) => x.id)) + 1;
  const urlPath = name.toLowerCase().replace(/\s+/g, "");
  const constName = constify(name);
  const ptvApiId = findPtvApiIds(stop);

  const stopIdsOutput = `export const ${constName} = ${id};`;

  const stopsOutput = `export const ${constName}: StopConfig = {
  id: stop.${constName},
  name: ${JSON.stringify(name)},
  tags: [],
  urlPath: ${JSON.stringify(urlPath)},
  location: { latitude: ${stop.stop_lat}, longitude: ${stop.stop_lon} },
  positions: [
${formatPositions(stop).join("\n")}
  ],
};`;

  const gtfsIdsOutput = formatChildGtfsIds(stop, constName);

  const ptvApiIdsOutput = `[stop.${constName}]: ${JSON.stringify(ptvApiId)},`;

  await printUpdate("src/config/stops/stop-ids.ts", stopIdsOutput);
  await printUpdate("src/config/stops/stops.ts", stopsOutput);
  await printUpdate("src/config/stops/stop-gtfs-ids.ts", gtfsIdsOutput);
  await printUpdate("src/config/stops/stop-ptv-api-ids.ts", ptvApiIdsOutput);
}

async function printUpdate(filePath: string, output: string) {
  const header = chalk.bgMagenta.bold(` ${filePath} `);
  const instruction = "Add the following:";
  const bar = chalk.gray("─".repeat(80));
  const code = chalk.cyan.bold(output);
  console.log(`\n${header}\n\n${instruction}\n\n${bar}\n${code}\n${bar}`);

  await pressAnyKeyToContinue();
}

function formatPositions(stop: StopsCsvTreeNode) {
  type HasPlatformCode = StopsCsvTreeNode & { platform_code: string };

  return stop.children
    .filter((c): c is HasPlatformCode => isPresent(c.platform_code))
    .filter((c) => c.platform_code !== GTFS_REPLACEMENT_BUS_PLATFORM_CODE)
    .sort((a, b) => numberWiseSort(a.platform_code, b.platform_code))
    .map((c) => {
      return `    { stopPositionId: position.PLATFORM_${constify(c.platform_code)}, name: ${JSON.stringify(c.platform_code)} },`;
    });
}

function formatChildGtfsIds(stop: StopsCsvTreeNode, constName: string) {
  const platforms: Map<string, string[]> = new Map();
  const replacementBuses: string[] = [];
  const general: string[] = [];

  for (const c of stop.children) {
    if (c.platform_code === GTFS_REPLACEMENT_BUS_PLATFORM_CODE) {
      replacementBuses.push(c.stop_id);
    } else if (isPresent(c.platform_code)) {
      platforms.set(c.platform_code, [
        ...(platforms.get(c.platform_code) ?? []),
        c.stop_id,
      ]);
    } else if (!/^vic:rail:[A-Z]{3}.+/g.test(stop.stop_id)) {
      general.push(c.stop_id);
    }
  }

  let result = `[stop.${constName}]: {\n  parent: ${JSON.stringify(stop.stop_id)},\n`;

  if (general.length > 0) {
    result += `  general: [${general.map((id) => JSON.stringify(id)).join(", ")}],\n`;
  }

  if (platforms.size > 0) {
    result += `  platforms: {\n`;
    for (const [platformCode, ids] of platforms) {
      result += `    [position.PLATFORM_${constify(platformCode)}]: ${JSON.stringify(ids)},\n`;
    }
    result += `  },\n`;
  }

  if (replacementBuses.length > 0) {
    result += `  replacementBus: ${JSON.stringify(replacementBuses)},\n`;
  }

  return result + `},`;
}

function findPtvApiIds(stop: StopsCsvTreeNode): string[] {
  const url = stop.children.find((x) =>
    x.stop_url.startsWith("https://transport.vic.gov.au/stop/"),
  )?.stop_url;
  if (url == null) return [];

  const pattern = /https:\/\/transport\.vic\.gov\.au\/stop\/([0-9]+)($|\/)/g;
  const match = pattern.exec(url);
  if (match == null) return [];

  return [itsOk(match[1])];
}
