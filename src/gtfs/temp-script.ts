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
import { LineRoutesMapping } from "./data/route/line-routes-mapping.js";
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
import type { GtfsScheduleData } from "./data/gtfs-schedule-data.js";
import type { GtfsRealtimeData } from "./data/gtfs-realtime-data.js";
import { BonusLinesMapping } from "./data/route/bonus-lines-mapping.js";
import { assertNever, itsOk, listifyAnd } from "@dan-schel/js-utils";
import { GtfsScheduledMovementsIndex } from "./departures/gtfs-scheduled-movements-index.js";
import * as stop from "../config/corequery/stops/stop-ids.js";
import {
  MELBOURNE_TIMEZONE,
  MELBOURNE_TIMEZONE_DATA,
} from "./utils/melbourne-timezone-data.js";
import { ZipperDeparturesIterator } from "./departures/zipper-departures-iterator.js";
import { GtfsScheduledTrip } from "./data/gtfs-scheduled-trip.js";
import { GtfsUpdatedTrip } from "./data/gtfs-updated-trip.js";
import type { GtfsScheduledTripServicingMovement } from "./data/gtfs-scheduled-trip-movements.js";
import type { GtfsUpdatedTripServicingMovement } from "./data/gtfs-updated-trip-movements.js";
import type {
  DeparturesIteratorResult,
  DeparturesSearchDirection,
} from "./departures/departures-iterator.js";

type GtfsParsingError =
  | GtfsScheduleParsingError
  | GtfsRealtimeFeedSplittingError
  | GtfsRealtimeDataParsingError;

type TotalGtfsData = Awaited<ReturnType<typeof parse>>;

type Query = {
  stopId: number;
  time: Temporal.Instant;
  direction: DeparturesSearchDirection;
};

const QUERY: Query = {
  stopId: stop.DROUIN,
  time: Temporal.Instant.from("2026-08-09T16:04:00+10:00"),
  direction: "forwards",
};

export async function runGtfsTempScript(ctx: Corequery, config: GtfsConfig) {
  const formalConfig = formalizeConfig(config);

  const data = await parse(ctx, formalConfig);

  console.log("\n-----\n");

  queryDepartures(ctx, data);
}

function formalizeConfig(config: GtfsConfig) {
  const lineRoutesMapping = LineRoutesMapping.build(config.lineRoutesMapping);
  const bonusLinesMapping = BonusLinesMapping.build(
    config.bonusLinesMapping ?? {},
  );

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
    lineRoutesMapping,
    bonusLinesMapping,
    suburbanLineGtfsIdMapping,
    regionalLineGtfsIdMapping,
    suburbanStopGtfsIdMapping,
    regionalStopGtfsIdMapping,
  };
}

async function parse(
  ctx: Corequery,
  formalConfig: ReturnType<typeof formalizeConfig>,
) {
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

  const statsStr = formatStats(
    ctx,
    suburbanSchedule,
    regionalSchedule,
    suburbanRealtimeData,
    regionalRealtimeData,
  );
  console.log(statsStr + "\n");

  const errorsStr = formatErrors(errors);
  console.log(errorsStr);

  return {
    suburbanSchedule,
    regionalSchedule,
    suburbanRealtimeData,
    regionalRealtimeData,
    errors,
  };
}

function parseSchedule(
  gtfsData: GtfsCsvData,
  config: ReturnType<typeof formalizeConfig>,
  errors: GtfsParsingError[],
) {
  const parser = new GtfsScheduleParser(
    config.lineRoutesMapping,
    config.bonusLinesMapping,
    (e) => errors.push(e),
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
  suburbanSchedule: GtfsScheduleData,
  regionalSchedule: GtfsScheduleData,
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

  const parser = new GtfsRealtimeDataParser(MELBOURNE_TIMEZONE, (e) =>
    errors.push(e),
  );
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
  suburbanSchedule: GtfsScheduleData,
  regionalSchedule: GtfsScheduleData,
  suburbanRealtimeData: GtfsRealtimeData,
  regionalRealtimeData: GtfsRealtimeData,
) {
  function lineNames({ lineIds }: { lineIds: readonly number[] }) {
    return listifyAnd(lineIds.map((id) => ctx.lines.require(id).name).sort());
  }

  const allTrips = [
    ...suburbanSchedule.allTrips(),
    ...regionalSchedule.allTrips(),
  ];
  const allTripUpdates = [
    ...suburbanRealtimeData.allTrips(),
    ...regionalRealtimeData.allTrips(),
  ];

  const stats = new Map<string, { trips: number; tripUpdates: number }>();

  for (const trip of allTrips) {
    const lineName = lineNames(trip);
    const stat = stats.get(lineName) ?? { trips: 0, tripUpdates: 0 };
    stat.trips += 1;
    stats.set(lineName, stat);
  }

  for (const tripUpdate of allTripUpdates) {
    const lineName = lineNames(tripUpdate.scheduledTrip);
    const stat = stats.get(lineName) ?? { trips: 0, tripUpdates: 0 };
    stat.tripUpdates += 1;
    stats.set(lineName, stat);
  }

  let output = "Trip counts:";
  for (const line of Array.from(stats.keys()).sort()) {
    const { trips, tripUpdates } = itsOk(stats.get(line));
    output += `\n - ${line}: ${trips} trips, ${tripUpdates} trip updates`;
  }
  return output;
}

function formatErrors(errors: GtfsParsingError[]) {
  if (errors.length === 0) return "No errors!";

  const stats = new Map<string, number>();
  for (const error of errors) {
    const type = error.type;
    const count = stats.get(type) ?? 0;
    stats.set(type, count + 1);
  }

  let output = "Error counts:";
  for (const type of Array.from(stats.keys()).sort()) {
    const count = itsOk(stats.get(type));
    output += `\n - ${type}: ${count}`;
  }
  return output;
}

function queryDepartures(ctx: Corequery, data: TotalGtfsData) {
  const {
    suburbanSchedule,
    suburbanRealtimeData,
    regionalSchedule,
    regionalRealtimeData,
  } = data;

  const { regionalIndex, suburbanIndex } = buildIndices(
    regionalSchedule,
    suburbanSchedule,
  );

  console.log("\n-----\n");

  console.log("Querying for departures...");
  const start = performance.now();

  // TODO: We still need a multifeed departures iterator (implemented with a
  // zipper iterator) to inject the subfeed ID into the result.
  const iterator = new ZipperDeparturesIterator([
    ZipperDeparturesIterator.forSubfeed(
      QUERY.stopId,
      regionalIndex,
      regionalRealtimeData,
      MELBOURNE_TIMEZONE_DATA,
    ),
    ZipperDeparturesIterator.forSubfeed(
      QUERY.stopId,
      suburbanIndex,
      suburbanRealtimeData,
      MELBOURNE_TIMEZONE_DATA,
    ),
  ]);

  iterator.set(QUERY.time, QUERY.direction);

  const result = [];
  while (iterator.peek() != null && result.length < 10) {
    const dep = iterator.take();
    result.push(dep);
  }

  const end = performance.now();
  const diff = end - start;
  console.log(`Done querying! (${diff.toFixed(2)}ms)\n`);

  console.log(`Departures:\n`);
  for (const dep of result) {
    console.log(formatDeparture(ctx, dep));
  }
  if (result.length === 0) {
    console.log("None.");
  }
}

function buildIndices(
  regionalSchedule: GtfsScheduleData,
  suburbanSchedule: GtfsScheduleData,
) {
  console.log("Building indices...");
  const start = performance.now();

  const regionalIndex = GtfsScheduledMovementsIndex.build(regionalSchedule);
  const suburbanIndex = GtfsScheduledMovementsIndex.build(suburbanSchedule);

  const end = performance.now();
  const diff = end - start;
  console.log(`Done building indices! (${diff.toFixed(2)}ms)`);

  return { regionalIndex, suburbanIndex };
}

function formatDeparture(ctx: Corequery, departure: DeparturesIteratorResult) {
  type GtfsTripServicingMovement =
    | GtfsScheduledTripServicingMovement
    | GtfsUpdatedTripServicingMovement;

  function getScheduledTripInfo(trip: GtfsScheduledTrip | GtfsUpdatedTrip) {
    if (trip instanceof GtfsScheduledTrip) {
      return trip;
    } else if (trip instanceof GtfsUpdatedTrip) {
      return trip.scheduledTrip;
    } else {
      assertNever(trip);
    }
  }

  function formatDelay(movement: GtfsTripServicingMovement) {
    if ("realtimeTimeRelevantToDeparturesAlgorithm" in movement) {
      const realtimeTime = movement.realtimeTimeRelevantToDeparturesAlgorithm;
      if (realtimeTime == null) return `No realtime data at this stop`;
      const scheduledTime = movement.scheduledTimeRelevantToDeparturesAlgorithm;
      const minsDelayed = realtimeTime.since(scheduledTime).total("minutes");

      if (minsDelayed === 0) return `On time`;

      return `${minsDelayed} mins late`;
    } else {
      return `No realtime data`;
    }
  }

  function getScheduledTime(movement: GtfsTripServicingMovement) {
    if ("scheduledTimeRelevantToDeparturesAlgorithm" in movement) {
      return movement.scheduledTimeRelevantToDeparturesAlgorithm;
    } else {
      return movement.timeRelevantToDeparturesAlgorithm.toInstant(
        departure.serviceDay,
        MELBOURNE_TIMEZONE,
      );
    }
  }

  const scheduledTrip = getScheduledTripInfo(departure.trip);
  const delayStr = formatDelay(departure.movement);
  const scheduledTime = getScheduledTime(departure.movement).toLocaleString(
    "en-AU",
    {
      timeStyle: "short",
      dateStyle: "short",
      timeZone: MELBOURNE_TIMEZONE,
    },
  );
  const terminus = ctx.stops.require(scheduledTrip.termination.stopId).name;
  const finalTerminus = ctx.stops.require(
    scheduledTrip.finalTermination.stopId,
  ).name;

  const terminusStr =
    finalTerminus === terminus
      ? terminus
      : `${finalTerminus} (via ${terminus})`;

  return `${scheduledTime}   ${terminusStr.padEnd(50, " ")}   ${delayStr}`;
}
