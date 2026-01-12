import { env } from "./env";
import { withGtfsFiles } from "./gtfs/with-gtfs-files";
import { AutogenerationContext } from "./autogeneration-context";
import { autogenerateConfig } from "./autogenerate-config";
import { readGtfs } from "./gtfs/read-gtfs";
import { stAlbansStationNamePatch } from "./patches/st-albans-station-name";
import { trimStationNamesPatch } from "./patches/trim-station-names";

const patches = [trimStationNamesPatch, stAlbansStationNamePatch];

async function main() {
  const checkMode = process.argv.includes("--check");
  const gtfsData = await withGtfsFiles(env.RELAY_KEY, readGtfs);

  const ctx = new AutogenerationContext(checkMode, gtfsData);

  for (const patch of patches) {
    await ctx.applyPatch(patch);
  }

  await autogenerateConfig(ctx);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
