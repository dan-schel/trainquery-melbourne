import type { LineGtfsIdMapping } from "../third-party-id-mapping-types.js";
import * as line from "./line-ids.js";

// prettier-ignore
export const lineGtfsIds: LineGtfsIdMapping = {
  // Sandringham
  "aus:vic:vic-02-SHM:": { lineId: line.SANDRINGHAM },
  "aus:vic:vic-02-SHM-R:": { lineId: line.SANDRINGHAM, replacementBus: true }, // Replacement bus

  // Frankston
  "aus:vic:vic-02-FKN:": { lineId: line.FRANKSTON },
  "aus:vic:vic-02-FKN-R:": { lineId: line.FRANKSTON, replacementBus: true }, // Replacement bus

  // Stony Point
  "aus:vic:vic-02-STY:": { lineId: line.STONY_POINT },
  "aus:vic:vic-02-STY-R:": { lineId: line.STONY_POINT, replacementBus: true }, // Replacement bus

  // Cranbourne
  "aus:vic:vic-02-CBE:": { lineId: line.CRANBOURNE },
  "aus:vic:vic-02-CBE-R:": { lineId: line.CRANBOURNE, replacementBus: true }, // Replacement bus

  // Pakenham
  "aus:vic:vic-02-PKM:": { lineId: line.PAKENHAM },
  "aus:vic:vic-02-PKM-R:": { lineId: line.PAKENHAM, replacementBus: true }, // Replacement bus

  // Gippsland
  "aus:vic:vic-01-TRN:": { lineId: line.GIPPSLAND },

  // Glen Waverley
  "aus:vic:vic-02-GWY:": { lineId: line.GLEN_WAVERLEY },
  "aus:vic:vic-02-GWY-R:": { lineId: line.GLEN_WAVERLEY, replacementBus: true }, // Replacement bus

  // Alamein
  "aus:vic:vic-02-ALM:": { lineId: line.ALAMEIN },
  "aus:vic:vic-02-ALM-R:": { lineId: line.ALAMEIN, replacementBus: true }, // Replacement bus

  // Belgrave
  "aus:vic:vic-02-BEG:": { lineId: line.BELGRAVE },
  "aus:vic:vic-02-BEG-R:": { lineId: line.BELGRAVE, replacementBus: true }, // Replacement bus

  // Lilydale
  "aus:vic:vic-02-LIL:": { lineId: line.LILYDALE },
  "aus:vic:vic-02-LIL-R:": { lineId: line.LILYDALE, replacementBus: true }, // Replacement bus

  // Hurstbridge
  "aus:vic:vic-02-HBE:": { lineId: line.HURSTBRIDGE },
  "aus:vic:vic-02-HBE-R:": { lineId: line.HURSTBRIDGE, replacementBus: true }, // Replacement bus

  // Mernda
  "aus:vic:vic-02-MDD:": { lineId: line.MERNDA },
  "aus:vic:vic-02-MDD-R:": { lineId: line.MERNDA, replacementBus: true }, // Replacement bus

  // Upfield
  "aus:vic:vic-02-UFD:": { lineId: line.UPFIELD },
  "aus:vic:vic-02-UFD-R:": { lineId: line.UPFIELD, replacementBus: true }, // Replacement bus

  // Craigieburn
  "aus:vic:vic-02-CGB:": { lineId: line.CRAIGIEBURN },
  "aus:vic:vic-02-CGB-R:": { lineId: line.CRAIGIEBURN, replacementBus: true }, // Replacement bus

  // Seymour
  "aus:vic:vic-01-SER:": { lineId: line.SEYMOUR },

  // Flemington Racecourse
  "aus:vic:vic-02-RCE:": { lineId: line.FLEMINGTON_RACECOURSE },
  "aus:vic:vic-02-RCE-R:": { lineId: line.FLEMINGTON_RACECOURSE, replacementBus: true }, // Replacement bus

  // Sunbury
  "aus:vic:vic-02-SUY:": { lineId: line.SUNBURY },
  "aus:vic:vic-02-SUY-R:": { lineId: line.SUNBURY, replacementBus: true }, // Replacement bus

  // Bendigo
  "aus:vic:vic-01-BGO:": { lineId: line.BENDIGO },

  // Ballarat
  "aus:vic:vic-01-BAT:": { lineId: line.BALLARAT },

  // Geelong
  "aus:vic:vic-01-GEL:": { lineId: line.GEELONG },

  // Werribee
  "aus:vic:vic-02-WER:": { lineId: line.WERRIBEE },
  "aus:vic:vic-02-WER-R:": { lineId: line.WERRIBEE, replacementBus: true }, // Replacement bus

  // Williamstown
  "aus:vic:vic-02-WIL:": { lineId: line.WILLIAMSTOWN },
  "aus:vic:vic-02-WIL-R:": { lineId: line.WILLIAMSTOWN, replacementBus: true }, // Replacement bus

  // Albury
  "aus:vic:vic-01-ABY:": { lineId: line.ALBURY },

  // Ararat
  "aus:vic:vic-01-ART:": { lineId: line.ARARAT },

  // Bairnsdale
  "aus:vic:vic-01-BDE:": { lineId: line.BAIRNSDALE },

  // Echuca
  "aus:vic:vic-01-ECH:": { lineId: line.ECHUCA },

  // Maryborough
  "aus:vic:vic-01-MBY:": { lineId: line.MARYBOROUGH },

  // Shepparton
  "aus:vic:vic-01-SNH:": { lineId: line.SHEPPARTON },

  // Swan Hill
  "aus:vic:vic-01-SWL:": { lineId: line.SWAN_HILL },

  // Warrnambool
  "aus:vic:vic-01-WBL:": { lineId: line.WARRNAMBOOL },
};
