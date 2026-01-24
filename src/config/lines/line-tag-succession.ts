import type { TagSuccessionConfig } from "corequery";
import * as tag from "./line-tags.js";

export const lineTagSuccession: TagSuccessionConfig = {
  [tag.SUBURBAN_FULL_TIME]: [tag.SUBURBAN],
};
