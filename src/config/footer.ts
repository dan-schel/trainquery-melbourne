import type { FooterConfig } from "corequery";
import { readMarkdownSync } from "./markdown/read-markdown.js";

export const footer: FooterConfig = {
  footerMessageMarkdown: readMarkdownSync(
    "src/config/markdown/footer-message.md",
  ),
};
