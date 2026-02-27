import { Tags } from "corequery";
import type { Subfeed } from "../../src/gtfs/schedule/utils/subfeed.js";
import * as stopTag from "../../src/config/stops/stop-tags.js";
import * as lineTag from "../../src/config/lines/line-tags.js";
import { lintableConfig } from "../../src/config/index.js";
import { StopGtfsIdMapping } from "../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import { stopGtfsIds } from "../../src/config/stops/stop-gtfs-ids.js";
import { LineGtfsIdMapping } from "../../src/gtfs/ids/line-gtfs-id-mapping.js";
import { lineGtfsIds } from "../../src/config/lines/line-gtfs-ids.js";

const stopSubfeedTags = {
  suburban: stopTag.SUBURBAN_GTFS_SUBFEED,
  regional: stopTag.REGIONAL_GTFS_SUBFEED,
};

const lineSubfeedTags = {
  suburban: lineTag.SUBURBAN_GTFS_SUBFEED,
  regional: lineTag.REGIONAL_GTFS_SUBFEED,
};

export function extractConfigForSubfeed(subfeed: Subfeed) {
  const stopTag = stopSubfeedTags[subfeed];
  const lineTag = lineSubfeedTags[subfeed];

  return {
    stops: lintableConfig.stops.filter((x) => {
      const tags = Tags.build(x.tags, lintableConfig.tags.stopTagSuccession);
      return tags.has(stopTag);
    }),
    lines: lintableConfig.lines.filter((x) => {
      const tags = Tags.build(x.tags, lintableConfig.tags.lineTagSuccession);
      return tags.has(lineTag);
    }),
    stopIdMapping: StopGtfsIdMapping.build(stopGtfsIds, subfeed),
    lineIdMapping: LineGtfsIdMapping.build(lineGtfsIds, subfeed),
  };
}
