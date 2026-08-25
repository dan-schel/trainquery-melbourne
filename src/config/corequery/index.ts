import { parseIntThrow } from "@dan-schel/js-utils";
import { type CorequeryConfigBuilder, ConsoleLogger } from "corequery";
import { assets } from "./assets.js";
import { getCanonicalLinesServingStop } from "./get-canonical-lines-serving-stop.js";
import { lintableConfig } from "./lintable-config.js";
import type { RelayManager } from "../../relay/relay-manager.js";
import { createServiceSources } from "./service-sources.js";

export function createConfigBuilder({
  envPort,
  envCommitHash,
  relayManager,
}: {
  relayManager: RelayManager;
  envPort: string | undefined;
  envCommitHash: string | undefined;
}): CorequeryConfigBuilder {
  return () => ({
    ...lintableConfig,

    // TODO: Was there a reason I don't use `default` from zod to set these?
    port: parseIntThrow(envPort ?? "3000"),
    version: envCommitHash ?? "dev",

    assets,
    logger: new ConsoleLogger(),
    getCanonicalLinesServingStop,

    // TODO: Now that temp-script is gone, it would be good to do an audit of
    // what corequery-gtfs is exposing, and see if we can reduce it to a
    // minimum, and make it explicit. Once done, and other TODOs within
    // corequery-gtfs are addressed (e.g. connecting transfers), then
    // corequery-gtfs is essentially done, save for new features and migrating
    // further logic to it, so update docs and publish v1.0.0?
    serviceSources: createServiceSources(relayManager),
  });
}
