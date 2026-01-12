import { env } from "./env";
import { withGtfsData } from "./utils/with-gtfs-data";
import { AutogenerationContext } from "./autogeneration-context";
import { autogenerateConfig } from "./autogenerate-config";

async function main() {
  await withGtfsData(env.RELAY_KEY, async ({ suburbanDir, regionalDir }) => {
    const checkMode = process.argv.includes("--check");
    const ctx = new AutogenerationContext(checkMode, suburbanDir, regionalDir);
    await autogenerateConfig(ctx);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
