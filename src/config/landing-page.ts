import type { LandingPageConfig } from "corequery";
import { readMarkdownSync } from "./markdown/read-markdown.js";

export const landingPage: LandingPageConfig = {
  primaryMarkdown: readMarkdownSync("src/config/markdown/landing-page.md"),
};
