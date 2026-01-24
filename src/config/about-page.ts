import type { AboutPageConfig } from "corequery";
import { readMarkdownSync } from "./markdown/read-markdown.js";

export const aboutPage: AboutPageConfig = {
  primaryMarkdown: readMarkdownSync("src/config/markdown/about-page.md"),
  dataSources: [],
};
