import type { TagSuccessionConfig } from "corequery";
import * as tag from "./stop-tags.js";

export const stopTagSuccession: TagSuccessionConfig = {
  [tag.CITY_LOOP_UNDERGROUND]: [tag.CITY_LOOP],
};
