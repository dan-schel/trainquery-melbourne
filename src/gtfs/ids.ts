import { parseIntThrow } from "@dan-schel/js-utils";
import type {
  LineGtfsIdCollectionConfig,
  StopGtfsIdCollectionConfig,
} from "corequery-gtfs";

export type TrainqueryMultifeedStopGtfsIdsConfig = Record<
  number,
  {
    readonly suburban?: TrainqueryStopGtfsIdCollectionConfig;
    readonly regional?: TrainqueryStopGtfsIdCollectionConfig;
  }
>;

export type TrainqueryMultifeedLineGtfsIdsConfig = Record<
  number,
  {
    readonly suburban?: TrainqueryLineGtfsIdCollectionConfig;
    readonly regional?: TrainqueryLineGtfsIdCollectionConfig;
  }
>;

export type TrainqueryStopGtfsIdsConfig = Record<
  number,
  TrainqueryStopGtfsIdCollectionConfig
>;

export type TrainqueryLineGtfsIdsConfig = Record<
  number,
  TrainqueryLineGtfsIdCollectionConfig
>;

export type TrainqueryStopGtfsIdCollectionConfig = {
  readonly parent: string;
  readonly general?: readonly string[];
  readonly platforms?: Readonly<Record<number, readonly string[]>>;
  readonly replacementBus?: readonly string[];
};

export type TrainqueryLineGtfsIdCollectionConfig = {
  readonly primary: string;
  readonly other?: readonly string[];
  readonly replacementBus?: readonly string[];
};

export function splitMultifeedIdConfig<T>(
  input: Record<number, { suburban?: T; regional?: T }>,
) {
  const suburban: Record<number, T> = {};
  const regional: Record<number, T> = {};

  for (const [idStr, feedConfig] of Object.entries(input)) {
    const id = parseIntThrow(idStr);

    if (feedConfig.suburban != null) {
      suburban[id] = feedConfig.suburban;
    }
    if (feedConfig.regional != null) {
      regional[id] = feedConfig.regional;
    }
  }

  return { suburban, regional };
}

export function convertToCorequeryGtfsStopIdsConfig(
  input: TrainqueryStopGtfsIdsConfig,
) {
  function convert(
    input: TrainqueryStopGtfsIdCollectionConfig,
  ): StopGtfsIdCollectionConfig {
    return {
      general: [input.parent, ...(input.general ?? [])],
      positional: input.platforms,
    };
  }

  return Object.fromEntries(
    Object.entries(input).map(([stopIdStr, stopConfig]) => [
      parseIntThrow(stopIdStr),
      convert(stopConfig),
    ]),
  );
}

export function convertToCorequeryGtfsLineIdsConfig(
  input: TrainqueryLineGtfsIdsConfig,
) {
  function convert(
    input: TrainqueryLineGtfsIdCollectionConfig,
  ): LineGtfsIdCollectionConfig {
    return {
      general: [input.primary, ...(input.other ?? [])],
      ignored: input.replacementBus,
    };
  }

  return Object.fromEntries(
    Object.entries(input).map(([lineIdStr, lineConfig]) => [
      parseIntThrow(lineIdStr),
      convert(lineConfig),
    ]),
  );
}
