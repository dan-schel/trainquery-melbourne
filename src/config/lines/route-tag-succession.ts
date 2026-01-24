import type { TagSuccessionConfig } from "corequery";
import * as tag from "./route-tags.js";

export const routeTagSuccession: TagSuccessionConfig = {
  [tag.UP_DIRECT]: [tag.UP, tag.DIRECT],
  [tag.DOWN_DIRECT]: [tag.DOWN, tag.DIRECT],
  [tag.UP_VIA_CITY_LOOP]: [tag.UP, tag.VIA_CITY_LOOP],
  [tag.DOWN_VIA_CITY_LOOP]: [tag.DOWN, tag.VIA_CITY_LOOP],
  [tag.UP_VIA_METRO_TUNNEL]: [tag.UP, tag.VIA_METRO_TUNNEL],
  [tag.DOWN_VIA_METRO_TUNNEL]: [tag.DOWN, tag.VIA_METRO_TUNNEL],
  [tag.COMMON_UP]: [tag.UP, tag.COMMON],
  [tag.COMMON_DOWN]: [tag.DOWN, tag.COMMON],
  [tag.ALBURY_BRANCH_UP]: [tag.UP, tag.ALBURY_BRANCH],
  [tag.ALBURY_BRANCH_DOWN]: [tag.DOWN, tag.ALBURY_BRANCH],
  [tag.SHEPPARTON_BRANCH_UP]: [tag.UP, tag.SHEPPARTON_BRANCH],
  [tag.SHEPPARTON_BRANCH_DOWN]: [tag.DOWN, tag.SHEPPARTON_BRANCH],
  [tag.ECHUCA_BRANCH_UP]: [tag.UP, tag.ECHUCA_BRANCH],
  [tag.ECHUCA_BRANCH_DOWN]: [tag.DOWN, tag.ECHUCA_BRANCH],
  [tag.SWAN_HILL_BRANCH_UP]: [tag.UP, tag.SWAN_HILL_BRANCH],
  [tag.SWAN_HILL_BRANCH_DOWN]: [tag.DOWN, tag.SWAN_HILL_BRANCH],
  [tag.MARYBOROUGH_BRANCH_UP]: [tag.UP, tag.MARYBOROUGH_BRANCH],
  [tag.MARYBOROUGH_BRANCH_DOWN]: [tag.DOWN, tag.MARYBOROUGH_BRANCH],
  [tag.ARARAT_BRANCH_UP]: [tag.UP, tag.ARARAT_BRANCH],
  [tag.ARARAT_BRANCH_DOWN]: [tag.DOWN, tag.ARARAT_BRANCH],
};
