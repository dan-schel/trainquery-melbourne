import { env } from "./env";
import { withGtfsData } from "./utils/with-gtfs-data";
import { readStops } from "./read-stops";

async function main() {
  const checkMode = process.argv.includes("--check");

  await withGtfsData(env.RELAY_KEY, async ({ regionalDir, suburbanDir }) => {
    const stops = await readStops(regionalDir, suburbanDir);

    console.log(stops);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
