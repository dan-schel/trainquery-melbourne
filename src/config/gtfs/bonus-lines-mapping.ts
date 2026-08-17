import * as line from "../corequery/lines/line-ids.js";
import { type BonusLinesMappingConfig } from "corequery-gtfs";

export const bonusLinesMapping: BonusLinesMappingConfig = {
  // "Bonus lines" is the ability to add additional lines that we consider a
  // service to be on, other than just the line mapped to the GTFS route ID. We
  // can use it to add lines or to replace the mapped line.
  //
  // e.g. any trains successfully parsed for the Cranbourne line (i.e. has a
  // GTFS route ID which is mapped to the Cranbourne line and matches one of its
  // routes) should then be tried against Pakenham line routes too. If they
  // match any (will happen if the train only runs to Westall or Dandenong),
  // then "add" the Pakenham line, and consider the train to be on both lines
  // equally.
  [line.CRANBOURNE]: {
    mode: "add",
    lines: [line.PAKENHAM],
  },
  // And this does the reverse, so that Pakenham line trains could also be
  // Cranbourne line trains if they match a route.
  [line.PAKENHAM]: {
    mode: "add",
    lines: [line.CRANBOURNE],
  },

  [line.ALAMEIN]: {
    mode: "add",
    lines: [line.BELGRAVE, line.LILYDALE, line.GLEN_WAVERLEY],
  },
  [line.BELGRAVE]: {
    mode: "add",
    lines: [line.ALAMEIN, line.LILYDALE, line.GLEN_WAVERLEY],
  },
  [line.LILYDALE]: {
    mode: "add",
    lines: [line.ALAMEIN, line.BELGRAVE, line.GLEN_WAVERLEY],
  },
  [line.GLEN_WAVERLEY]: {
    mode: "add",
    lines: [line.ALAMEIN, line.BELGRAVE, line.LILYDALE],
  },

  [line.MERNDA]: {
    mode: "add",
    lines: [line.HURSTBRIDGE],
  },
  [line.HURSTBRIDGE]: {
    mode: "add",
    lines: [line.MERNDA],
  },

  [line.CRAIGIEBURN]: {
    mode: "add",
    lines: [line.UPFIELD],
  },
  [line.UPFIELD]: {
    mode: "add",
    lines: [line.CRAIGIEBURN],
  },
  [line.FLEMINGTON_RACECOURSE]: {
    // Use `mode: "replace"` so that Flinders Street to North Melbourne services
    // are considered Craigieburn & Upfield services, not Flemington Racecourse
    // services.
    mode: "replace",
    lines: [line.CRAIGIEBURN, line.UPFIELD],
  },

  [line.WERRIBEE]: {
    mode: "add",
    lines: [line.WILLIAMSTOWN],
  },
  [line.WILLIAMSTOWN]: {
    mode: "add",
    lines: [line.WERRIBEE],
  },
};
