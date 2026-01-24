import type { LinesPageConfig } from "corequery";
import * as tag from "./lines/line-tags.js";

export const linesPage: LinesPageConfig = {
  sections: [
    { tag: tag.SUBURBAN, name: "Suburban lines" },
    { tag: tag.REGIONAL, name: "Regional lines" },
    { tag: tag.SPECIAL_EVENTS_ONLY, name: "Special events only" },
  ],
};
