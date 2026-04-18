import type { TagSuccessionConfig } from "corequery";
import * as tag from "./line-tags.js";

export const lineTagSuccession: TagSuccessionConfig = {
  [tag.SUBURBAN_FULL_TIME]: [tag.SUBURBAN, tag.FULL_TIME],
  [tag.REGIONAL]: [tag.FULL_TIME],
  [tag.DISRUPTIONS_ONLY]: [tag.PART_TIME],
  [tag.SPECIAL_EVENTS_ONLY]: [tag.PART_TIME],
};
