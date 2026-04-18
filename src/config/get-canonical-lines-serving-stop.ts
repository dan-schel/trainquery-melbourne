import { createCanonicalLinesServingStopAlgorithm } from "corequery";
import { lines } from "./lines/index.js";
import { tags } from "./tags.js";
import * as lineTag from "./lines/line-tags.js";
import * as routeTag from "./lines/route-tags.js";

export const getCanonicalLinesServingStop =
  createCanonicalLinesServingStopAlgorithm({
    lines: lines,
    lineTagSuccession: tags.lineTagSuccession,
    routeTagSuccession: tags.routeTagSuccession,

    // Flemington Racecourse and City Circle lines are examples of "part time"
    // lines which should only be shown if there's no other lines serving the
    // stop.
    tierLinesByTag: [lineTag.FULL_TIME, lineTag.PART_TIME],

    // The Munnel lines all have City Loop alternative routes (for footy
    // specials or whatever else), and we don't want those lines being mentioned
    // at South Yarra, North Melbourne, etc.
    ignoreRoutesWithTags: [routeTag.NON_CANONICAL],
  });
