import "temporal-polyfill/global";
import fsp from "fs/promises";
import path from "path";
import { withGtfsCsvs } from "../../src/gtfs/retrieval/schedule/with-gtfs-csvs.js";
import { env } from "./env.js";
import { fetchGtfsRealtimeRaw } from "../../src/gtfs/retrieval/realtime/fetch-gtfs-realtime.js";
import {
  regionalGtfsConfig,
  suburbanGtfsConfig,
} from "../../src/config/gtfs/index.js";

const outputDir = "./tests/gtfs/corequery-gtfs/integration";
const today = Temporal.Now.plainDateISO("Australia/Melbourne").toString();
const suburbanOutputDir = path.join(outputDir, `${today}-suburban`);
const regionalOutputDir = path.join(outputDir, `${today}-regional`);

// I don't want to make a search and think there's unfinished code in here ;)
const wordThatShallNotBeNamed = "T*DO".replace("*", "O");
const testCode = `import { describe, it, expect } from "vitest";

describe("[TESTNAME]", () => {
  const system = createGtfsSystemForIntegrationTest(import.meta.dirname);

  // ${wordThatShallNotBeNamed}: Implement.
});
`;

async function main() {
  console.log("Preparing test folders...");

  await fsp.rm(suburbanOutputDir, { recursive: true, force: true });
  await fsp.rm(regionalOutputDir, { recursive: true, force: true });
  await fsp.mkdir(suburbanOutputDir, { recursive: true });
  await fsp.mkdir(regionalOutputDir, { recursive: true });

  console.log("Downloading/extracting GTFS schedule data...");

  await withGtfsCsvs(env.RELAY_KEY, async ({ suburban, regional }) => {
    const suburbanGtfsDir = path.join(suburbanOutputDir, "gtfs");
    console.log(`Copying files into "${suburbanGtfsDir}" folder...`);
    await fsp.mkdir(suburbanGtfsDir, { recursive: true });
    await fsp.cp(suburban, suburbanGtfsDir, { recursive: true });

    const regionalGtfsDir = path.join(regionalOutputDir, "gtfs");
    console.log(`Copying files into "${regionalGtfsDir}" folder...`);
    await fsp.mkdir(regionalGtfsDir, { recursive: true });
    await fsp.cp(regional, regionalGtfsDir, { recursive: true });

    console.log("Cleaning up temp files...");
  });

  console.log("Fetching GTFS Realtime data...");

  const suburbanRealtimePath = path.join(
    suburbanOutputDir,
    "gtfs",
    "realtime.json",
  );
  const regionalRealtimePath = path.join(
    regionalOutputDir,
    "gtfs",
    "realtime.json",
  );
  const suburbanRtData = await fetchGtfsRealtimeRaw(env.RELAY_KEY, "suburban");
  const regionalRtData = await fetchGtfsRealtimeRaw(env.RELAY_KEY, "regional");
  const suburbanRealtimeJson = JSON.stringify(suburbanRtData, null, 2);
  const regionalRealtimeJson = JSON.stringify(regionalRtData, null, 2);
  await fsp.writeFile(suburbanRealtimePath, suburbanRealtimeJson);
  await fsp.writeFile(regionalRealtimePath, regionalRealtimeJson);

  console.log("Writing config files...");

  const suburbanConfigPath = path.join(suburbanOutputDir, "config.json");
  const suburbanConfigJson = JSON.stringify(suburbanGtfsConfig, null, 2);
  const regionalConfigPath = path.join(regionalOutputDir, "config.json");
  const regionalConfigJson = JSON.stringify(regionalGtfsConfig, null, 2);
  await fsp.writeFile(suburbanConfigPath, suburbanConfigJson);
  await fsp.writeFile(regionalConfigPath, regionalConfigJson);

  console.log("Writing test files...");

  const suburbanTestPath = path.join(suburbanOutputDir, "index.test.ts");
  const regionalTestPath = path.join(regionalOutputDir, "index.test.ts");
  const suburbanTestCode = testCode.replace("[TESTNAME]", `${today}-suburban`);
  const regionalTestCode = testCode.replace("[TESTNAME]", `${today}-regional`);
  await fsp.writeFile(suburbanTestPath, suburbanTestCode);
  await fsp.writeFile(regionalTestPath, regionalTestCode);

  console.log("✅ Done!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
