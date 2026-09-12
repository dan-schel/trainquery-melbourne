import { parseIntThrow } from "@dan-schel/js-utils";
import type {
  LineGtfsIdCollectionConfig,
  StopGtfsIdCollectionConfig,
} from "corequery-gtfs";

export type MultifeedStopGtfsIdsConfig = Record<number, FeedStopGtfsIdsConfig>;
export type MultifeedLineGtfsIdsConfig = Record<number, FeedLineGtfsIdsConfig>;

type FeedStopGtfsIdsConfig = {
  readonly suburban?: TrainqueryStopGtfsIdCollectionConfig;
  readonly regional?: TrainqueryStopGtfsIdCollectionConfig;
};

type FeedLineGtfsIdsConfig = {
  readonly suburban?: TrainqueryLineGtfsIdCollectionConfig;
  readonly regional?: TrainqueryLineGtfsIdCollectionConfig;
};

type TrainqueryStopGtfsIdCollectionConfig = {
  readonly parent: string;
  readonly general?: readonly string[];
  readonly platforms?: Readonly<Record<number, readonly string[]>>;
  readonly replacementBus?: readonly string[];
};

type TrainqueryLineGtfsIdCollectionConfig = {
  readonly primary: string;
  readonly other?: readonly string[];
  readonly replacementBus?: readonly string[];
};

export function splitMultifeedStopGtfsIdsConfig(
  config: MultifeedStopGtfsIdsConfig,
) {
  const suburban: Record<number, StopGtfsIdCollectionConfig> = {};
  const regional: Record<number, StopGtfsIdCollectionConfig> = {};

  function convert(
    input: TrainqueryStopGtfsIdCollectionConfig,
  ): StopGtfsIdCollectionConfig {
    return {
      general: [input.parent, ...(input.general ?? [])],
      positional: input.platforms,
    };
  }

  for (const [stopIdStr, feedConfig] of Object.entries(config)) {
    const stopId = parseIntThrow(stopIdStr);

    if (feedConfig.suburban != null) {
      suburban[stopId] = convert(feedConfig.suburban);
    }
    if (feedConfig.regional != null) {
      regional[stopId] = convert(feedConfig.regional);
    }
  }

  return { suburban, regional };
}

export function splitMultifeedLineGtfsIdsConfig(
  config: MultifeedLineGtfsIdsConfig,
) {
  const suburban: Record<number, LineGtfsIdCollectionConfig> = {};
  const regional: Record<number, LineGtfsIdCollectionConfig> = {};

  function convert(
    input: TrainqueryLineGtfsIdCollectionConfig,
  ): LineGtfsIdCollectionConfig {
    return {
      general: [input.primary, ...(input.other ?? [])],
      ignored: input.replacementBus,
    };
  }

  for (const [lineIdStr, feedConfig] of Object.entries(config)) {
    const lineId = parseIntThrow(lineIdStr);

    if (feedConfig.suburban != null) {
      suburban[lineId] = convert(feedConfig.suburban);
    }
    if (feedConfig.regional != null) {
      regional[lineId] = convert(feedConfig.regional);
    }
  }

  return { suburban, regional };
}
