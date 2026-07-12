import { type LintableConfig } from "corequery";
import { linesPage } from "./lines-page.js";
import { stops } from "./stops/index.js";
import { lines } from "./lines/index.js";
import { tags } from "./tags.js";
import { terminology } from "./terminology.js";
import { landingPage } from "./landing-page.js";
import { footer } from "./footer.js";
import { aboutPage } from "./about-page.js";

// Required to be in a separate file from buildConfig so that it can be imported
// by the unit tests without triggering .env to the read.
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
