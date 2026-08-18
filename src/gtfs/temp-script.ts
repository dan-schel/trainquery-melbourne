import type { Corequery } from "corequery";
import { env } from "../env.js";
import {
  type GtfsConfig,
  GtfsScheduledTrip,
  GtfsSystem,
  type GtfsTripServicingMovement,
  GtfsUpdatedTrip,
  MultifeedDeparturesIterator,
  MultifeedDeparturesIteratorResult,
} from "corequery-gtfs";
import * as stop from "../config/corequery/stops/stop-ids.js";
import { withGtfsCsvs } from "./retrieval/schedule/with-gtfs-csvs.js";
import { readGtfsCsvs } from "./retrieval/schedule/read-gtfs-csvs.js";
import { fetchGtfsRealtime } from "./retrieval/realtime/fetch-gtfs-realtime.js";
import { assertNever, itsOk, listifyAnd } from "@dan-schel/js-utils";

// TODO: [DS] Should be given by corequery.
type DeparturesSearchDirection = "forwards" | "backwards";

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
  const suburbanFeed = GtfsSystem.build("gtfs-suburban", suburbanConfig);
  const regionalFeed = GtfsSystem.build("gtfs-regional", regionalConfig);

  console.log("Downloading/reading...");

  const gtfsData = await withGtfsCsvs(env.RELAY_KEY, readGtfsCsvs);
  const suburbanJson = await fetchGtfsRealtime(env.RELAY_KEY, "suburban");
  const regionalJson = await fetchGtfsRealtime(env.RELAY_KEY, "regional");

  console.log("Parsing...");

  const start = performance.now();
  suburbanFeed.onNewScheduleData(gtfsData.suburban, suburbanJson);
  regionalFeed.onNewScheduleData(gtfsData.regional, regionalJson);
  const end = performance.now();
  const diff = end - start;

  console.log(`Done parsing! (${diff.toFixed(2)}ms)\n`);

  const statsStr = formatStats(ctx, suburbanFeed, regionalFeed);
  console.log(statsStr + "\n");
  const errorsStr = formatErrors(suburbanFeed, regionalFeed);
  console.log(errorsStr);

  console.log("\n-----\n");

  queryDepartures(ctx, suburbanFeed, regionalFeed);
}

function formatStats(
  ctx: Corequery,
  suburbanFeed: GtfsSystem,
  regionalFeed: GtfsSystem,
) {
  function lineNames({ lineIds }: { lineIds: readonly number[] }) {
    return listifyAnd(lineIds.map((id) => ctx.lines.require(id).name).sort());
  }

  const allTrips = [
    ...suburbanFeed.requireFeed().scheduleData.allTrips(),
    ...regionalFeed.requireFeed().scheduleData.allTrips(),
  ];
  const allTripUpdates = [
    ...suburbanFeed.requireFeed().realtimeData.allTrips(),
    ...regionalFeed.requireFeed().realtimeData.allTrips(),
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

function formatErrors(suburbanFeed: GtfsSystem, regionalFeed: GtfsSystem) {
  const errors = [
    ...suburbanFeed.scheduleParsingErrors,
    ...suburbanFeed.realtimeParsingErrors,
    ...regionalFeed.scheduleParsingErrors,
    ...regionalFeed.realtimeParsingErrors,
  ];

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
  suburbanFeed: GtfsSystem,
  regionalFeed: GtfsSystem,
) {
  console.log("Querying for departures...");
  const start = performance.now();

  const iterator = MultifeedDeparturesIterator.build({
    suburban: suburbanFeed
      .requireFeed()
      .createCorequeryDepartureIterator(QUERY.stopId),
    regional: regionalFeed
      .requireFeed()
      .createCorequeryDepartureIterator(QUERY.stopId),
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
    console.log(formatDeparture(ctx, dep));
  }
  if (result.length === 0) {
    console.log("None.");
  }
}

function formatDeparture(
  ctx: Corequery,
  departure: MultifeedDeparturesIteratorResult,
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
        "Australia/Melbourne",
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
      timeZone: "Australia/Melbourne",
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
