import { parseIntThrow } from "@dan-schel/js-utils";
import type { CorequeryConfigBuilder, LintableConfig } from "corequery";
import { env } from "../env.js";
import { assets } from "./assets.js";
import { linesPage } from "./lines-page.js";
import { stops } from "./stops/index.js";
import { lines } from "./lines/index.js";
import { tags } from "./tags.js";
import { terminology } from "./terminology.js";
import { landingPage } from "./landing-page.js";
import { footer } from "./footer.js";
import { aboutPage } from "./about-page.js";

export const buildConfig: CorequeryConfigBuilder = () => ({
  port: parseIntThrow(env.PORT ?? "3000"),
  assets: assets,
  ...lintableConfig,
});

export const lintableConfig: LintableConfig = {
  stops: stops,
  lines: lines,
  terminology: terminology,
  landingPage: landingPage,
  footer: footer,
  aboutPage: aboutPage,
  linesPage: linesPage,
  tags: tags,
};
