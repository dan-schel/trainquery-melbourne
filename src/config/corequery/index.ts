import { parseIntThrow } from "@dan-schel/js-utils";
import { type CorequeryConfigBuilder } from "corequery";
import { assets } from "./assets.js";
import { getCanonicalLinesServingStop } from "./get-canonical-lines-serving-stop.js";
import { lintableConfig } from "./lintable-config.js";
import { RelayManager } from "../../relay/relay-manager.js";
import { createServiceSources } from "./service-sources.js";
import { regionalGtfsConfig, suburbanGtfsConfig } from "../gtfs/index.js";
import { GtfsSystem } from "corequery-gtfs";
import { TrainqueryLogger } from "../../logger/trainquery-logger.js";

export type CustomContext = {
  readonly trainqueryLogger: TrainqueryLogger;
  readonly relayManager: RelayManager;
};

export function createConfigBuilder({
  envPort,
  envCommitHash,
  envRelayKey,
}: {
  envPort: string | undefined;
  envCommitHash: string | undefined;
  envRelayKey: string;
}): CorequeryConfigBuilder<CustomContext> {
  return (app) => {
    const relayManager = new RelayManager({
      app: app,
      relayKey: envRelayKey,
      suburbanGtfs: GtfsSystem.build(suburbanGtfsConfig),
      regionalGtfs: GtfsSystem.build(regionalGtfsConfig),
      relayPollIntervalSeconds: 5,
      initialRetryIntervalsSeconds: [5, 60],
    });

    const logger = new TrainqueryLogger();

    return {
      ...lintableConfig,

      // TODO: Was there a reason I don't use `default` from zod to set these?
      port: parseIntThrow(envPort ?? "3000"),
      version: envCommitHash ?? "dev",

      assets,
      logger,
      getCanonicalLinesServingStop,

      serviceSources: createServiceSources(relayManager),

      custom: {
        trainqueryLogger: logger,
        relayManager,
      },
    };
  };
}
