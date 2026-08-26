import "temporal-polyfill/global";
import { Corequery } from "corequery";
import {
  createConfigBuilder,
  type CustomContext,
} from "./config/corequery/index.js";
import { env } from "./env.js";

export type Trainquery = Corequery<CustomContext>;

async function main() {
  const buildConfig = createConfigBuilder({
    envPort: env.PORT,
    envCommitHash: env.COMMIT_HASH,
    envRelayKey: env.RELAY_KEY,
  });

  // TODO: Need to investigate why frontend version is changing on every
  // `npm run start`/`npm run dev`. It should remain constant as long as the
  // corequery version isn't changing and the assets aren't changing.
  const trainquery: Trainquery = new Corequery(buildConfig);

  await trainquery.custom.relayManager.init();
  await trainquery.start();

  trainquery.custom.relayManager.start();
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
