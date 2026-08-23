import { parseIntThrow } from "@dan-schel/js-utils";
import { type CorequeryConfigBuilder, ConsoleLogger } from "corequery";
import { env } from "../../env.js";
import { assets } from "./assets.js";
import { getCanonicalLinesServingStop } from "./get-canonical-lines-serving-stop.js";
import { lintableConfig } from "./lintable-config.js";

export const buildConfig: CorequeryConfigBuilder = () => ({
  ...lintableConfig,

  port: parseIntThrow(env.PORT ?? "3000"),
  version: env.COMMIT_HASH ?? "dev",
  assets: assets,
  logger: new ConsoleLogger(),
  getCanonicalLinesServingStop,

  // TODO: Implement serviceSources, one for each subfeed. Use corequery-gtfs.
  // Corequery-gtfs needs to be updated to handle the interface of corequery.
  // It won't be able to instantiate classes directly, because it doesn't depend
  // on corequery, but we can duplicate the *Fields types in corequery that it
  // needs in corequery-gtfs, and then here in TrainQuery Melbourne, do the
  // conversion from ServiceFields -> new Service(fields), including for each
  // inner class, e.g. each type of movement.
  //
  // Once done, this should dramatically reduce the number of things
  // corequery-gtfs needs to expose (because we won't need temp-script anymore,
  // essentially). Then it would be good to do an audit of what corequery-gtfs
  // is exposing, and see if we can reduce it to a minimum, and make it
  // explicit. Once done, corequery-gtfs is essentially done, save for new
  // features and migrating further logic to it, so update docs and publish
  // v1.0.0?
  //
  // I haven't implemented the zipper iterator at the corequery level yet, but
  // I suppose trainquery melbourne doesn't need to know about it. It supplies
  // the two service sources, and it's up to corequery to decide what to do with
  // them. One argument against that is that if we implemented source switching,
  // corequery should never use suburban gtfs without regional gtfs, do wouldn't
  // it make sense to combine them and represent them as one source? However,
  // that wouldn't allow us to have separate source IDs for the two subfeeds,
  // meaning we'd have to implement ID prefixing or something.
  //
  // Note for corequery-gtfs: `intrasourceId` will be prefixed with the service
  // day and then the rest is the trip ID (don't assume the entire thing is a
  // trip ID!).
});
