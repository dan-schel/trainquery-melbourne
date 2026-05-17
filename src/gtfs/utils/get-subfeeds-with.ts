import { Tags, type LineConfig, type StopConfig } from "corequery";
import { lineTagSuccession } from "../../config/corequery/lines/line-tag-succession.js";
import { stopTagSuccession } from "../../config/corequery/stops/stop-tag-succession.js";
import * as lineTag from "../../config/corequery/lines/line-tags.js";
import * as stopTag from "../../config/corequery/stops/stop-tags.js";

export function getSubfeedsWithLine(line: LineConfig) {
  const tags = Tags.build(line.tags, lineTagSuccession);
  return {
    suburban: tags.has(lineTag.SUBURBAN_GTFS_SUBFEED),
    regional: tags.has(lineTag.REGIONAL_GTFS_SUBFEED),
  };
}

export function getSubfeedsWithStop(stop: StopConfig) {
  const tags = Tags.build(stop.tags, stopTagSuccession);
  return {
    suburban: tags.has(stopTag.SUBURBAN_GTFS_SUBFEED),
    regional: tags.has(stopTag.REGIONAL_GTFS_SUBFEED),
  };
}
