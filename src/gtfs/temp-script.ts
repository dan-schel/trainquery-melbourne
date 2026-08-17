import type { Corequery } from "corequery";
import { env } from "../env.js";
import { LineGtfsIdMapping } from "./corequery-gtfs/data/ids/line-gtfs-id-mapping.js";
import { StopGtfsIdMapping } from "./corequery-gtfs/data/ids/stop-gtfs-id-mapping.js";
import {
  readGtfsCsvs,
  type MelbourneGtfsCsvData,
} from "./retrieval/schedule/read-gtfs-csvs.js";
import { withGtfsCsvs } from "./retrieval/schedule/with-gtfs-csvs.js";
import {
  GtfsScheduleParser,
  type GtfsScheduleParsingError,
} from "./corequery-gtfs/parser/schedule/gtfs-schedule-parser.js";
import type { GtfsConfig } from "./corequery-gtfs/config/index.js";
import { LineRoutesMapping } from "./corequery-gtfs/data/route/line-routes-mapping.js";
import { fetchGtfsRealtime } from "./retrieval/realtime/fetch-gtfs-realtime.js";
import {
  GtfsRealtimeDataParser,
  type GtfsRealtimeDataParsingError,
} from "./corequery-gtfs/parser/realtime/gtfs-realtime-data-parser.js";
import type { RealtimeDataJson } from "./corequery-gtfs/data/raw/realtime-data-json.js";
import type { GtfsScheduleData } from "./corequery-gtfs/data/gtfs-schedule-data.js";
import type { GtfsRealtimeData } from "./corequery-gtfs/data/gtfs-realtime-data.js";
import { BonusLinesMapping } from "./corequery-gtfs/data/route/bonus-lines-mapping.js";
import { assertNever, itsOk, listifyAnd } from "@dan-schel/js-utils";
import { GtfsScheduledMovementsIndex } from "./corequery-gtfs/departures/gtfs-scheduled-movements-index.js";
import * as stop from "../config/corequery/stops/stop-ids.js";
import { ZipperDeparturesIterator } from "./corequery-gtfs/departures/zipper-departures-iterator.js";
import { GtfsScheduledTrip } from "./corequery-gtfs/data/gtfs-scheduled-trip.js";
import { GtfsUpdatedTrip } from "./corequery-gtfs/data/gtfs-updated-trip.js";
import type { DeparturesSearchDirection } from "./corequery-gtfs/departures/departures-iterator.js";
import type { GtfsTripServicingMovement } from "./corequery-gtfs/data/utils.js";
import {
  MultifeedDeparturesIterator,
  MultifeedDeparturesIteratorResult,
} from "./corequery-gtfs/departures/multifeed-departures-iterator.js";
import fs from "fs";

type GtfsParsingError = GtfsScheduleParsingError | GtfsRealtimeDataParsingError;

type TotalGtfsData = Awaited<ReturnType<typeof parse>>;

type Query = {
  stopId: number;
  time: Temporal.Instant;
  direction: DeparturesSearchDirection;
};

const now = Temporal.Now.zonedDateTimeISO("Australia/Melbourne")
  .round({
    smallestUnit: "minute",
    roundingMode: "floor",
  })
  .toInstant();

const QUERY: Query = {
  stopId: stop.CLAYTON,
  time: now,
  direction: "forwards",
};

export async function runGtfsTempScript(
  ctx: Corequery,
  suburbanConfig: GtfsConfig,
  regionalConfig: GtfsConfig,
) {
  const formalConfig = formalizeConfig(suburbanConfig, regionalConfig);

  const data = await parse(ctx, formalConfig);

  console.log("\n-----\n");

  queryDepartures(ctx, data, formalConfig);
}

function formalizeConfig(
  suburbanConfig: GtfsConfig,
  regionalConfig: GtfsConfig,
) {
  // Temporary hack: using the suburban config since it's identical in both.
  const lineRoutesMapping = LineRoutesMapping.build(
    suburbanConfig.lineRoutesMapping,
  );
  const bonusLinesMapping = BonusLinesMapping.build(
    suburbanConfig.bonusLinesMapping ?? {},
  );

  const suburbanLineGtfsIdMapping = LineGtfsIdMapping.build(
    suburbanConfig.lineGtfsIds,
  );
  const regionalLineGtfsIdMapping = LineGtfsIdMapping.build(
    regionalConfig.lineGtfsIds,
  );

  const suburbanStopGtfsIdMapping = StopGtfsIdMapping.build(
    suburbanConfig.stopGtfsIds,
  );
  const regionalStopGtfsIdMapping = StopGtfsIdMapping.build(
    regionalConfig.stopGtfsIds,
  );

  return {
    lineRoutesMapping,
    bonusLinesMapping,
    suburbanLineGtfsIdMapping,
    regionalLineGtfsIdMapping,
    suburbanStopGtfsIdMapping,
    regionalStopGtfsIdMapping,
    timezoneData: suburbanConfig.timezoneData,
  };
}

async function parse(
  ctx: Corequery,
  formalConfig: ReturnType<typeof formalizeConfig>,
) {
  console.log("Downloading/reading...");
  const gtfsData = await withGtfsCsvs(env.RELAY_KEY, readGtfsCsvs);
  const suburbanJson = await fetchGtfsRealtime(env.RELAY_KEY, "suburban");
  const regionalJson = await fetchGtfsRealtime(env.RELAY_KEY, "regional");

  console.log("Parsing...");
  const start = performance.now();
  const errors: GtfsParsingError[] = [];

  const { suburbanSchedule, regionalSchedule } = parseSchedule(
    gtfsData,
    formalConfig,
    errors,
  );

  const { suburbanRealtimeData, regionalRealtimeData } = parseRealtime(
    suburbanJson,
    regionalJson,
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
  gtfsData: MelbourneGtfsCsvData,
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
  suburbanJson: RealtimeDataJson,
  regionalJson: RealtimeDataJson,
  suburbanSchedule: GtfsScheduleData,
  regionalSchedule: GtfsScheduleData,
  config: ReturnType<typeof formalizeConfig>,
  errors: GtfsParsingError[],
) {
  fs.writeFileSync(
    "realtime-suburban.json",
    JSON.stringify(suburbanJson, null, 2),
  );
  fs.writeFileSync(
    "realtime-regional.json",
    JSON.stringify(regionalJson, null, 2),
  );

  const parser = new GtfsRealtimeDataParser(config.timezoneData.timezone, (e) =>
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

function queryDepartures(
  ctx: Corequery,
  data: TotalGtfsData,
  config: ReturnType<typeof formalizeConfig>,
) {
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
  const iterator = MultifeedDeparturesIterator.build({
    regional: ZipperDeparturesIterator.forFeed(
      QUERY.stopId,
      regionalIndex,
      regionalRealtimeData,
      config.timezoneData,
    ),
    suburban: ZipperDeparturesIterator.forFeed(
      QUERY.stopId,
      suburbanIndex,
      suburbanRealtimeData,
      config.timezoneData,
    ),
  });

  iterator.set(QUERY.time, QUERY.direction);

  const result: MultifeedDeparturesIteratorResult[] = [];
  while (iterator.peek() != null && result.length < 10) {
    const dep = iterator.take();
    result.push(dep);
  }

  const end = performance.now();
  const diff = end - start;
  console.log(`Done querying! (${diff.toFixed(2)}ms)\n`);

  console.log(`Departures:\n`);
  for (const dep of result) {
    console.log(formatDeparture(ctx, dep, config));
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

function formatDeparture(
  ctx: Corequery,
  departure: MultifeedDeparturesIteratorResult,
  config: ReturnType<typeof formalizeConfig>,
) {
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
        config.timezoneData.timezone,
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
      timeZone: config.timezoneData.timezone,
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

  return `${scheduledTime.padEnd(18)}   ${terminusStr.padEnd(50, " ")}   ${delayStr}`;
}
