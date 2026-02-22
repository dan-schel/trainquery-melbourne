import type { TagsConfig } from "corequery";
import { stopTagSuccession } from "./stops/stop-tag-succession.js";
import { lineTagSuccession } from "./lines/line-tag-succession.js";
import { routeTagSuccession } from "./lines/route-tag-succession.js";

export const tags: TagsConfig = {
  stopTagSuccession: stopTagSuccession,
  lineTagSuccession: lineTagSuccession,
  routeTagSuccession: routeTagSuccession,
};
