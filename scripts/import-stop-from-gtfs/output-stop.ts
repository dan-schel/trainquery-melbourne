import chalk from "chalk";
import type { StopsCsvTreeNode } from "../../src/gtfs/schedule/higher-order/stops-csv-tree.js";
import { isPresent, numberWiseSort } from "@dan-schel/js-utils";
import { stops } from "../../src/config/stops/index.js";
import { pressAnyKeyToContinue } from "./input.js";

export async function outputStopData(stop: StopsCsvTreeNode) {
  const name = stop.stop_name.replace(/( Railway)? Station$/g, "");
  const id = Math.max(...stops.map((x) => x.id)) + 1;
  const urlPath = name.toLowerCase().replace(/\s+/g, "");
  const constName = constify(name);

  const stopIdsTsOutput = `export const ${constName} = ${id};`;

  const stopsTsOutput = `export const ${constName}: StopConfig = {
  id: stop.${constName},
  name: ${JSON.stringify(name)},
  tags: [],
  urlPath: ${JSON.stringify(urlPath)},
  location: { latitude: ${stop.stop_lat}, longitude: ${stop.stop_lon} },
  positions: [
${formatPositions(stop).join("\n")}
  ],
};`;

  await outputForFile("src/config/stops/stop-ids.ts", stopIdsTsOutput);
  await outputForFile("src/config/stops/stops.ts", stopsTsOutput);

  // TODO: GTFS ID mappings, and PTV API ID mappings.
}

async function outputForFile(filePath: string, output: string) {
  const header = chalk.bgMagenta.bold(` ${filePath} `);
  const instruction = "Add the following:";
  const bar = chalk.gray("─".repeat(80));
  const code = chalk.cyan.bold(output);
  console.log(`\n${header}\n\n${instruction}\n\n${bar}\n${code}\n${bar}`);

  await pressAnyKeyToContinue();
}

// TODO: Move to js-utils like kebabify?
function constify(input: string) {
  return input
    .toUpperCase()
    .replace(/\s+/g, "_")
    .replace(/[^A-Z0-9_]/g, "");
}

function formatPositions(stop: StopsCsvTreeNode) {
  type HasPlatformCode = StopsCsvTreeNode & { platform_code: string };

  return stop.children
    .filter((c): c is HasPlatformCode => isPresent(c.platform_code))
    .filter((c) => c.platform_code !== "Replacement bus")
    .sort((a, b) => numberWiseSort(a.platform_code, b.platform_code))
    .map((c) => {
      return `    { stopPositionId: position.PLATFORM_${constify(c.platform_code)}, name: ${JSON.stringify(c.platform_code)} },`;
    });
}
