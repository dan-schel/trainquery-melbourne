import type { Corequery } from "corequery";
import { env } from "../env.js";
import { LineGtfsIdMapping } from "./data/ids/line-gtfs-id-mapping.js";
import { StopGtfsIdMapping } from "./data/ids/stop-gtfs-id-mapping.js";
import {
  readGtfsCsvs,
  type GtfsCsvData,
} from "./retrieval/schedule/read-gtfs-csvs.js";
import { withGtfsCsvs } from "./retrieval/schedule/with-gtfs-csvs.js";
import {
  GtfsScheduleParser,
  type GtfsScheduleParsingError,
} from "./parser/schedule/gtfs-schedule-parser.js";
import type { GtfsConfig } from "./config/index.js";
import { LineRoutes } from "./data/route/line-routes.js";
import { fetchGtfsRealtime } from "./retrieval/realtime/fetch-gtfs-realtime.js";
import {
  GtfsRealtimeDataParser,
  type GtfsRealtimeDataParsingError,
} from "./parser/realtime/gtfs-realtime-data-parser.js";
import {
  GtfsRealtimeFeedSplitter,
  type GtfsRealtimeFeedSplittingError,
} from "./parser/realtime/gtfs-realtime-feed-splitter.js";
import type { RealtimeFeedJson } from "./retrieval/realtime/realtime-feed-schema.js";
import type { GtfsSchedule } from "./data/gtfs-schedule.js";
import type { GtfsRealtimeData } from "./data/gtfs-realtime-data.js";

type GtfsParsingError =
  | GtfsScheduleParsingError
  | GtfsRealtimeFeedSplittingError
  | GtfsRealtimeDataParsingError;

export async function runGtfsTempScript(ctx: Corequery, config: GtfsConfig) {
  const formalConfig = formalizeConfig(config);

  console.log("Downloading/reading...");
  const gtfsData = await withGtfsCsvs(env.RELAY_KEY, readGtfsCsvs);
  const fullRealtimeData = await fetchGtfsRealtime(env.RELAY_KEY);

  console.log("Parsing...");
  const start = performance.now();
  const errors: GtfsParsingError[] = [];

  const { suburbanSchedule, regionalSchedule } = parseSchedule(
    gtfsData,
    formalConfig,
    errors,
  );

  const { suburbanRealtimeData, regionalRealtimeData } = parseRealtime(
    fullRealtimeData,
    suburbanSchedule,
    regionalSchedule,
    formalConfig,
    errors,
  );

  const end = performance.now();
  const diff = end - start;
  console.log(`Done parsing! (${diff.toFixed(2)}ms)\n`);

  if (errors.length === 0) {
    const stats = formatStats(
      ctx,
      suburbanSchedule,
      regionalSchedule,
      suburbanRealtimeData,
      regionalRealtimeData,
    );

    console.log(stats);
  } else {
    for (const error of errors) {
      console.error(error);
    }
  }
}

function formalizeConfig(config: GtfsConfig) {
  const lineRoutes = LineRoutes.build(config.lineRoutes);

  const suburbanLineGtfsIdMapping = LineGtfsIdMapping.build(
    config.lineGtfsIds,
    "suburban",
  );
  const regionalLineGtfsIdMapping = LineGtfsIdMapping.build(
    config.lineGtfsIds,
    "regional",
  );

  const suburbanStopGtfsIdMapping = StopGtfsIdMapping.build(
    config.stopGtfsIds,
    "suburban",
  );
  const regionalStopGtfsIdMapping = StopGtfsIdMapping.build(
    config.stopGtfsIds,
    "regional",
  );

  return {
    lineRoutes,
    suburbanLineGtfsIdMapping,
    regionalLineGtfsIdMapping,
    suburbanStopGtfsIdMapping,
    regionalStopGtfsIdMapping,
  };
}

function parseSchedule(
  gtfsData: GtfsCsvData,
  config: ReturnType<typeof formalizeConfig>,
  errors: GtfsParsingError[],
) {
  const parser = new GtfsScheduleParser(config.lineRoutes, (e) =>
    errors.push(e),
  );

  const suburbanSchedule = parser.parse(
    gtfsData.suburban,
    config.suburbanLineGtfsIdMapping,
    config.suburbanStopGtfsIdMapping,
  );

  const regionalSchedule = parser.parse(
    gtfsData.regional,
    config.regionalLineGtfsIdMapping,
    config.regionalStopGtfsIdMapping,
  );

  return { suburbanSchedule, regionalSchedule };
}

function parseRealtime(
  fullRealtimeData: RealtimeFeedJson,
  suburbanSchedule: GtfsSchedule,
  regionalSchedule: GtfsSchedule,
  config: ReturnType<typeof formalizeConfig>,
  errors: GtfsParsingError[],
) {
  const splitter = new GtfsRealtimeFeedSplitter(
    config.suburbanLineGtfsIdMapping,
    config.regionalLineGtfsIdMapping,
    (e) => errors.push(e),
  );
  const { suburban: suburbanJson, regional: regionalJson } =
    splitter.split(fullRealtimeData);

  const parser = new GtfsRealtimeDataParser((e) => errors.push(e));
  const suburbanRealtimeData = parser.parse(
    suburbanJson,
    suburbanSchedule,
    config.suburbanStopGtfsIdMapping,
  );
  const regionalRealtimeData = parser.parse(
    regionalJson,
    regionalSchedule,
    config.regionalStopGtfsIdMapping,
  );

  return { suburbanRealtimeData, regionalRealtimeData };
}

function formatStats(
  ctx: Corequery,
  suburbanSchedule: GtfsSchedule,
  regionalSchedule: GtfsSchedule,
  suburbanRealtimeData: GtfsRealtimeData,
  regionalRealtimeData: GtfsRealtimeData,
) {
  const tripLines = [
    ...suburbanSchedule.allTrips(),
    ...regionalSchedule.allTrips(),
  ].map((x) => x.lineId);

  const tripUpdateLines = [
    ...suburbanRealtimeData.updatedTrips,
    ...regionalRealtimeData.updatedTrips,
  ].map((x) => x.scheduledTrip.lineId);

  let output = "Trip counts:";
  for (const line of ctx.lines.all()) {
    const count = tripLines.filter((x) => x === line.id).length;
    const updateCount = tripUpdateLines.filter((x) => x === line.id).length;
    output += `\n - ${line.name}: ${count} trips, ${updateCount} trip updates`;
  }
  return output;
}
