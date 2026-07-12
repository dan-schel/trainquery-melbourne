import { parseIntThrow } from "@dan-schel/js-utils";
import { type CorequeryConfigBuilder, ConsoleLogger } from "corequery";
import { env } from "../../env.js";
import { assets } from "./assets.js";
import { getCanonicalLinesServingStop } from "./get-canonical-lines-serving-stop.js";
import { lintableConfig } from "./lintable-config.js";

export const buildConfig: CorequeryConfigBuilder = () => ({
  port: parseIntThrow(env.PORT ?? "3000"),
  version: env.COMMIT_HASH ?? "dev",
  assets: assets,
  logger: new ConsoleLogger(),
  getCanonicalLinesServingStop,
  ...lintableConfig,
});
