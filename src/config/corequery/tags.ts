import type { TagsConfig } from "corequery";
import { stopTagSuccession } from "./stops/stop-tag-succession.js";
import { lineTagSuccession } from "./lines/line-tag-succession.js";
import { serviceTagSuccession } from "./lines/service-tag-succession.js";

export const tags: TagsConfig = {
  stopTagSuccession: stopTagSuccession,
  lineTagSuccession: lineTagSuccession,
  serviceTagSuccession: serviceTagSuccession,
};
