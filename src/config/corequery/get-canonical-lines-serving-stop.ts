import { createCanonicalLinesServingStopAlgorithm } from "corequery";
import { lines } from "./lines/index.js";
import { tags } from "./tags.js";
import * as lineTag from "./lines/line-tags.js";

export const getCanonicalLinesServingStop =
  createCanonicalLinesServingStopAlgorithm({
    lines: lines,
    lineTagSuccession: tags.lineTagSuccession,

    // Flemington Racecourse and City Circle lines are examples of "part time"
    // lines which should only be shown if there's no other lines serving the
    // stop.
    tierLinesByTag: [lineTag.FULL_TIME, lineTag.PART_TIME],
  });
