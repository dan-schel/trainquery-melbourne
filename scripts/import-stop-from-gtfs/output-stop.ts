import chalk from "chalk";
import type { StopsCsvTreeNode } from "../../src/gtfs/schedule/higher-order/stops-csv-tree.js";
import { isPresent, numberWiseSort } from "@dan-schel/js-utils";

export function outputStopData(stop: StopsCsvTreeNode) {
  const name = stop.stop_name.replace(/( Railway)? Station$/g, "");
  const urlPath = name.toLowerCase().replace(/\s+/g, "");
  const constName = constify(name);

  type HasPlatformCode = StopsCsvTreeNode & { platform_code: string };
  const positions = stop.children
    .filter((c): c is HasPlatformCode => isPresent(c.platform_code))
    .filter((c) => c.platform_code !== "Replacement bus")
    .sort((a, b) => numberWiseSort(a.platform_code, b.platform_code))
    .map((c) => {
      return `    { stopPositionId: position.PLATFORM_${constify(c.platform_code)}, name: ${JSON.stringify(c.platform_code)} },`;
    });

  const output = `export const ${constName}: StopConfig = {
  id: stop.${constName},
  name: ${JSON.stringify(name)},
  tags: [],
  urlPath: ${JSON.stringify(urlPath)},
  location: { latitude: ${stop.stop_lat}, longitude: ${stop.stop_lon} },
  positions: [
${positions.join("\n")}
  ],
};`;

  outputForFile("src/config/stops/stops.ts", output);

  // TODO: Output stop ID, GTFS ID mappings, and PTV API ID mappings.
}

function outputForFile(filePath: string, output: string) {
  console.log(`\n${chalk.bgMagenta.bold(` ${filePath} `)}\n\n${output}`);
}

// TODO: Move to js-utils like kebabify?
function constify(input: string) {
  return input
    .toUpperCase()
    .replace(/\s+/g, "_")
    .replace(/[^A-Z0-9_]/g, "");
}
