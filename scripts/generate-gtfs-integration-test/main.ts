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
import { stops } from "../../src/config/corequery/stops/index.js";
import { getSubfeedsWithStop } from "../../src/gtfs/utils/get-subfeeds-with.js";
import type { Subfeed } from "../../src/gtfs/subfeed.js";

const outputDir = "./tests/gtfs/corequery-gtfs/integration";
const today = Temporal.Now.plainDateISO("Australia/Melbourne").toString();
const now = Temporal.Now.plainDateTimeISO("Australia/Melbourne")
  .round({ smallestUnit: "minute", roundingMode: "floor" })
  .toString();
const suburbanOutputDir = path.join(outputDir, `${today}-suburban`);
const regionalOutputDir = path.join(outputDir, `${today}-regional`);

const testCode = `import { describe, it } from "vitest";

describe("[TESTNAME]", async () => {
  const system = await createGtfsSystemForIntegrationTest(import.meta.dirname);
  const stopNameMapping = await createStopNameMapping(import.meta.dirname);

  it("parses with expected errors only", () => {
    expectParsingErrorsToMatchSnapshot(system);
  });

  describe("Flinders Street, ${now}, forwards", () => {
    it("gives correct departures", () => {
      expectDeparturesToMatchSnapshot(
        system,
        stopNameMapping,
        "Flinders Street",
        "${now}",
        "forwards",
      );
    });
  });
});
`;

async function main() {
  console.log("Preparing test folders...");

  await fsp.rm(suburbanOutputDir, { recursive: true, force: true });
  await fsp.rm(regionalOutputDir, { recursive: true, force: true });
  await fsp.mkdir(suburbanOutputDir, { recursive: true });
  await fsp.mkdir(regionalOutputDir, { recursive: true });

  console.log("Downloading/extracting GTFS schedule data...");

  // TODO: withGtfsCsvs should probably only download one subfeed's CSVs at a
  // time, but of course, that requires the relay to serve them as separate zip
  // files. The benefit is resilience in case one subfeed has a mistake in it!
  // Once done, this whole function can be refactored to only do one feed at a
  // time, and reduce a whole lot of duplication.
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

  console.log("Writing stop name mapping files...");

  const sbbnSnmPath = path.join(suburbanOutputDir, "stop-name-mapping.json");
  const rgnlSnmPath = path.join(regionalOutputDir, "stop-name-mapping.json");
  const suburbanMappingJson = createStopNameMappingJson("suburban");
  const regionalMappingJson = createStopNameMappingJson("regional");
  await fsp.writeFile(sbbnSnmPath, suburbanMappingJson);
  await fsp.writeFile(rgnlSnmPath, regionalMappingJson);

  console.log("Writing test files...");

  const suburbanTestPath = path.join(suburbanOutputDir, "index.test.ts");
  const regionalTestPath = path.join(regionalOutputDir, "index.test.ts");
  const suburbanTestCode = testCode.replace("[TESTNAME]", `${today}-suburban`);
  const regionalTestCode = testCode.replace("[TESTNAME]", `${today}-regional`);
  await fsp.writeFile(suburbanTestPath, suburbanTestCode);
  await fsp.writeFile(regionalTestPath, regionalTestCode);

  console.log("✅ Done!");
}

function createStopNameMappingJson(feed: Subfeed) {
  const mapping: Record<number, string> = {};

  for (const stop of stops) {
    if (getSubfeedsWithStop(stop)[feed]) {
      mapping[stop.id] = stop.name;
    }
  }

  return JSON.stringify(mapping, null, 2);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
