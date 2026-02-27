import type { LineGtfsIdsConfig } from "../third-party-id-mapping-types.js";
import * as line from "./line-ids.js";

export const lineGtfsIds: LineGtfsIdsConfig = {
  [line.SANDRINGHAM]: {
    suburban: {
      primary: "aus:vic:vic-02-SHM:",
      replacementBus: ["aus:vic:vic-02-SHM-R:"],
    },
  },

  [line.FRANKSTON]: {
    suburban: {
      primary: "aus:vic:vic-02-FKN:",
      replacementBus: ["aus:vic:vic-02-FKN-R:"],
    },
  },

  [line.STONY_POINT]: {
    suburban: {
      primary: "aus:vic:vic-02-STY:",
      replacementBus: ["aus:vic:vic-02-STY-R:"],
    },
  },

  [line.CRANBOURNE]: {
    suburban: {
      primary: "aus:vic:vic-02-CBE:",
      replacementBus: ["aus:vic:vic-02-CBE-R:"],
    },
  },

  [line.PAKENHAM]: {
    suburban: {
      primary: "aus:vic:vic-02-PKM:",
      replacementBus: ["aus:vic:vic-02-PKM-R:"],
    },
  },

  [line.GIPPSLAND]: {
    regional: {
      primary: "aus:vic:vic-01-TRN:",
      other: ["aus:vic:vic-01-BDE:"],
    },
  },

  [line.GLEN_WAVERLEY]: {
    suburban: {
      primary: "aus:vic:vic-02-GWY:",
      replacementBus: ["aus:vic:vic-02-GWY-R:"],
    },
  },

  [line.ALAMEIN]: {
    suburban: {
      primary: "aus:vic:vic-02-ALM:",
      replacementBus: ["aus:vic:vic-02-ALM-R:"],
    },
  },

  [line.BELGRAVE]: {
    suburban: {
      primary: "aus:vic:vic-02-BEG:",
      replacementBus: ["aus:vic:vic-02-BEG-R:"],
    },
  },

  [line.LILYDALE]: {
    suburban: {
      primary: "aus:vic:vic-02-LIL:",
      replacementBus: ["aus:vic:vic-02-LIL-R:"],
    },
  },

  [line.HURSTBRIDGE]: {
    suburban: {
      primary: "aus:vic:vic-02-HBE:",
      replacementBus: ["aus:vic:vic-02-HBE-R:"],
    },
  },

  [line.MERNDA]: {
    suburban: {
      primary: "aus:vic:vic-02-MDD:",
      replacementBus: ["aus:vic:vic-02-MDD-R:"],
    },
  },

  [line.UPFIELD]: {
    suburban: {
      primary: "aus:vic:vic-02-UFD:",
      replacementBus: ["aus:vic:vic-02-UFD-R:"],
    },
  },

  [line.CRAIGIEBURN]: {
    suburban: {
      primary: "aus:vic:vic-02-CGB:",
      replacementBus: ["aus:vic:vic-02-CGB-R:"],
    },
  },

  [line.SEYMOUR]: {
    regional: {
      primary: "aus:vic:vic-01-SER:",
      other: ["aus:vic:vic-01-ABY:", "aus:vic:vic-01-SNH:"],
    },
  },

  [line.FLEMINGTON_RACECOURSE]: {
    suburban: {
      primary: "aus:vic:vic-02-RCE:",
      replacementBus: ["aus:vic:vic-02-RCE-R:"],
    },
  },

  [line.SUNBURY]: {
    suburban: {
      primary: "aus:vic:vic-02-SUY:",
      replacementBus: ["aus:vic:vic-02-SUY-R:"],
    },
  },

  [line.BENDIGO]: {
    regional: {
      primary: "aus:vic:vic-01-BGO:",
      other: ["aus:vic:vic-01-ECH:", "aus:vic:vic-01-SWL:"],
    },
  },

  [line.BALLARAT]: {
    regional: {
      primary: "aus:vic:vic-01-BAT:",
      other: ["aus:vic:vic-01-ART:", "aus:vic:vic-01-MBY:"],
    },
  },

  [line.GEELONG]: {
    regional: {
      primary: "aus:vic:vic-01-GEL:",
      other: ["aus:vic:vic-01-WBL:"],
    },
  },

  [line.WERRIBEE]: {
    suburban: {
      primary: "aus:vic:vic-02-WER:",
      replacementBus: ["aus:vic:vic-02-WER-R:"],
    },
  },

  [line.WILLIAMSTOWN]: {
    suburban: {
      primary: "aus:vic:vic-02-WIL:",
      replacementBus: ["aus:vic:vic-02-WIL-R:"],
    },
  },
};
