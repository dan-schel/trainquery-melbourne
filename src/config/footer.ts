import type { FooterConfig } from "corequery";
import { readMarkdownSync } from "./markdown/read-markdown.js";

export const footer: FooterConfig = {
  primaryMarkdown: readMarkdownSync("src/config/markdown/footer-message.md"),
};
