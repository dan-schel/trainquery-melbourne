import { parseIntThrow } from "@dan-schel/js-utils";
import type {
  LineGtfsIdCollectionConfig,
  StopGtfsIdCollectionConfig,
} from "corequery-gtfs";

export type MultifeedStopGtfsIdsConfig = Record<number, FeedStopGtfsIdsConfig>;
export type MultifeedLineGtfsIdsConfig = Record<number, FeedLineGtfsIdsConfig>;

type FeedStopGtfsIdsConfig = {
  readonly suburban?: StopGtfsIdCollectionConfig;
  readonly regional?: StopGtfsIdCollectionConfig;
};

type FeedLineGtfsIdsConfig = {
  readonly suburban?: LineGtfsIdCollectionConfig;
  readonly regional?: LineGtfsIdCollectionConfig;
};

export function splitMultifeedStopGtfsIdsConfig(
  config: MultifeedStopGtfsIdsConfig,
) {
  const suburban: Record<number, StopGtfsIdCollectionConfig> = {};
  const regional: Record<number, StopGtfsIdCollectionConfig> = {};

  for (const [stopIdStr, feedConfig] of Object.entries(config)) {
    const stopId = parseIntThrow(stopIdStr);

    if (feedConfig.suburban != null) {
      suburban[stopId] = feedConfig.suburban;
    }
    if (feedConfig.regional != null) {
      regional[stopId] = feedConfig.regional;
    }
  }

  return { suburban, regional };
}

export function splitMultifeedLineGtfsIdsConfig(
  config: MultifeedLineGtfsIdsConfig,
) {
  const suburban: Record<number, LineGtfsIdCollectionConfig> = {};
  const regional: Record<number, LineGtfsIdCollectionConfig> = {};

  for (const [lineIdStr, feedConfig] of Object.entries(config)) {
    const lineId = parseIntThrow(lineIdStr);

    if (feedConfig.suburban != null) {
      suburban[lineId] = feedConfig.suburban;
    }
    if (feedConfig.regional != null) {
      regional[lineId] = feedConfig.regional;
    }
  }

  return { suburban, regional };
}
