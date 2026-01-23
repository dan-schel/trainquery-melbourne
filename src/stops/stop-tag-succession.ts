import type { TagSuccession } from "../tag-succession.js";
import * as tag from "./stop-tags.js";

export const stopTagSuccession: TagSuccession = {
  [tag.CITY_LOOP_UNDERGROUND]: [tag.CITY_LOOP],
};
