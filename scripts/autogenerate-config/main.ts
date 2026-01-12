import { env } from "./env";
import { withGtfsFiles } from "./gtfs/with-gtfs-files";
import { AutogenerationContext } from "./autogeneration-context";
import { autogenerateConfig } from "./autogenerate-config";
import { readGtfs } from "./gtfs/read-gtfs";
import { stAlbansStationNamePatch } from "./patches/st-albans-station-name";

const patches = [stAlbansStationNamePatch];

async function main() {
  const checkMode = process.argv.includes("--check");
  const gtfsData = await withGtfsFiles(env.RELAY_KEY, readGtfs);

  const ctx = new AutogenerationContext(checkMode, gtfsData);

  patches.forEach(async (patch) => await ctx.applyPatch(patch));

  await autogenerateConfig(ctx);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
