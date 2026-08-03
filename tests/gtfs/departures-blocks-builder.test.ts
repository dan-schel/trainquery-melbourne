import { describe, expect, it } from "vitest";
import { MELBOURNE_TIMEZONE_DATA } from "../../src/gtfs/utils/melbourne-timezone-data.js";
import { DeparturesBlocksBuilder } from "../../src/gtfs/departures/departures-blocks-builder.js";
import { BoundedInstantRange } from "../../src/gtfs/data/bounded-instant-range.js";
import {
  ScheduledDeparturesBlock,
  type ScheduledDeparturesBlockEntry,
} from "../../src/gtfs/departures/scheduled-departures-block.js";
import { itsOk } from "@dan-schel/js-utils";
import { GtfsScheduledTrip } from "../../src/gtfs/data/gtfs-scheduled-trip.js";
import { GtfsCalendar } from "../../src/gtfs/data/gtfs-calendar.js";
import {
  GtfsScheduledTripOriginatingMovement,
  GtfsScheduledTripTerminatingMovement,
} from "../../src/gtfs/data/gtfs-scheduled-trip-movements.js";
import { GtfsStopTime } from "../../src/gtfs/data/gtfs-stop-time.js";

describe("ScheduledDeparturesBlock", () => {
  describe("allBlocksWithinTimeRange", () => {
    const builder = new DeparturesBlocksBuilder(
      createMovements({ earliest: "05:18:00", latest: "26:08:00" }),
      null,
      MELBOURNE_TIMEZONE_DATA,
    );

    it("returns all scheduled departures blocks within the time range", () => {
      expectScheduledBlocks({
        builder,
        queryStart: "2026-08-02T00:00:00+10:00",
        queryEnd: "2026-08-03T00:00:00+10:00",
        result: [
          {
            serviceDay: "2026-08-01",
            earliest: "2026-08-01T05:18:00+10:00",
            latest: "2026-08-02T02:08:00+10:00",
          },
          {
            serviceDay: "2026-08-02",
            earliest: "2026-08-02T05:18:00+10:00",
            latest: "2026-08-03T02:08:00+10:00",
          },
        ],
      });

      expectScheduledBlocks({
        builder,
        queryStart: "2026-08-02T00:00:00+10:00",
        queryEnd: "2026-08-05T00:00:00+10:00",
        result: [
          {
            serviceDay: "2026-08-01",
            earliest: "2026-08-01T05:18:00+10:00",
            latest: "2026-08-02T02:08:00+10:00",
          },
          {
            serviceDay: "2026-08-02",
            earliest: "2026-08-02T05:18:00+10:00",
            latest: "2026-08-03T02:08:00+10:00",
          },
          {
            serviceDay: "2026-08-03",
            earliest: "2026-08-03T05:18:00+10:00",
            latest: "2026-08-04T02:08:00+10:00",
          },
          {
            serviceDay: "2026-08-04",
            earliest: "2026-08-04T05:18:00+10:00",
            latest: "2026-08-05T02:08:00+10:00",
          },
        ],
      });
    });

    it("doesn't omit the last movement of the day if the query equals it's exact time", () => {
      expectScheduledBlocks({
        builder,
        queryStart: "2026-08-02T02:08:00+10:00",
        queryEnd: "2026-08-03T00:00:00+10:00",
        result: [
          {
            serviceDay: "2026-08-01",
            earliest: "2026-08-01T05:18:00+10:00",
            latest: "2026-08-02T02:08:00+10:00",
          },
          {
            serviceDay: "2026-08-02",
            earliest: "2026-08-02T05:18:00+10:00",
            latest: "2026-08-03T02:08:00+10:00",
          },
        ],
      });
    });

    it("doesn't omit the first movement of the day if the query equals it's exact time", () => {
      expectScheduledBlocks({
        builder,
        queryStart: "2026-08-02T00:00:00+10:00",
        queryEnd: "2026-08-02T05:18:00+10:00",
        result: [
          {
            serviceDay: "2026-08-01",
            earliest: "2026-08-01T05:18:00+10:00",
            latest: "2026-08-02T02:08:00+10:00",
          },
          {
            serviceDay: "2026-08-02",
            earliest: "2026-08-02T05:18:00+10:00",
            latest: "2026-08-03T02:08:00+10:00",
          },
        ],
      });
    });

    it("works correctly at the boundaries", () => {
      expectScheduledBlocks({
        builder,
        queryStart: "2026-08-02T05:18:00+10:00",
        queryEnd: "2026-08-02T05:18:00+10:00",
        result: [
          {
            serviceDay: "2026-08-02",
            earliest: "2026-08-02T05:18:00+10:00",
            latest: "2026-08-03T02:08:00+10:00",
          },
        ],
      });

      expectScheduledBlocks({
        builder,
        queryStart: "2026-08-02T05:17:00+10:00",
        queryEnd: "2026-08-02T05:17:00+10:00",
        result: [],
      });

      expectScheduledBlocks({
        builder,
        queryStart: "2026-08-02T02:08:00+10:00",
        queryEnd: "2026-08-02T02:08:00+10:00",
        result: [
          {
            serviceDay: "2026-08-01",
            earliest: "2026-08-01T05:18:00+10:00",
            latest: "2026-08-02T02:08:00+10:00",
          },
        ],
      });

      expectScheduledBlocks({
        builder,
        queryStart: "2026-08-02T02:09:00+10:00",
        queryEnd: "2026-08-02T02:09:00+10:00",
        result: [],
      });
    });

    it("handles transition out of DST correctly", () => {
      expectScheduledBlocks({
        builder,
        queryStart: "2026-04-05T01:00:00+11:00",
        queryEnd: "2026-04-05T05:30:00+10:00",
        result: [
          {
            serviceDay: "2026-04-04",
            earliest: "2026-04-04T05:18:00+11:00",
            latest: "2026-04-05T02:08:00+11:00",
          },
          {
            serviceDay: "2026-04-05",
            earliest: "2026-04-05T05:18:00+10:00",
            latest: "2026-04-06T02:08:00+10:00",
          },
        ],
      });

      expectScheduledBlocks({
        builder,
        queryStart: "2026-04-05T02:09:00+11:00",
        queryEnd: "2026-04-05T05:17:00+10:00",
        result: [],
      });
    });

    it("handles transition into DST correctly", () => {
      expectScheduledBlocks({
        builder,
        queryStart: "2026-10-04T01:00:00+10:00",
        queryEnd: "2026-10-04T05:30:00+11:00",
        result: [
          {
            serviceDay: "2026-10-03",
            earliest: "2026-10-03T05:18:00+10:00",
            latest: "2026-10-04T02:08:00+10:00",
          },
          {
            serviceDay: "2026-10-04",
            earliest: "2026-10-04T05:18:00+11:00",
            latest: "2026-10-05T02:08:00+11:00",
          },
        ],
      });

      expectScheduledBlocks({
        builder,
        queryStart: "2026-10-04T02:09:00+10:00",
        queryEnd: "2026-10-04T05:17:00+11:00",
        result: [],
      });
    });

    it("returns an empty array if there's no scheduled movements", () => {
      const builder = new DeparturesBlocksBuilder(
        [],
        null,
        MELBOURNE_TIMEZONE_DATA,
      );

      expectScheduledBlocks({
        builder,
        queryStart: "2026-08-02T00:00:00+10:00",
        queryEnd: "2026-08-03T00:00:00+10:00",
        result: [],
      });
    });

    it("returns a realtime departures block if it falls within the time range", () => {
      // TODO: Implement this test!
    });
  });
});

function createMovements({
  earliest,
  latest,
}: {
  earliest: string;
  latest: string;
}): ScheduledDeparturesBlockEntry[] {
  const earliestTime = GtfsStopTime.parse(earliest);
  const latestTime = GtfsStopTime.parse(latest);

  const trip1 = createTrip({ tripId: "trip-1", originationTime: earliestTime });
  const trip2 = createTrip({ tripId: "trip-2", originationTime: latestTime });

  return [
    { trip: trip1, time: earliestTime, movement: trip1.origination },
    { trip: trip2, time: latestTime, movement: trip2.origination },
  ];
}

function createTrip({
  tripId,
  originationTime,
}: {
  tripId: string;
  originationTime: GtfsStopTime;
}) {
  return new GtfsScheduledTrip({
    gtfsTripId: tripId,
    gtfsRouteId: "route-1",
    calendar: GtfsCalendar.everyday("cal-1"),
    movements: [
      new GtfsScheduledTripOriginatingMovement({
        stopId: 1,
        positionId: null,
        departureTime: originationTime,
        gtfsIdMetadata: {
          type: "parent",
          id: "stop-1",
          stopId: 1,
        },
        gtfsStopSequence: 1,
      }),
      new GtfsScheduledTripTerminatingMovement({
        stopId: 2,
        positionId: null,
        arrivalTime: originationTime.plus({ minutes: 5 }),
        gtfsIdMetadata: {
          type: "parent",
          id: "stop-2",
          stopId: 2,
        },
        gtfsStopSequence: 2,
      }),
    ],
    lineIds: [1],
    color: null,
    serviceTags: [],
    previousTrip: null,
    nextTrip: null,
  });
}

function expectScheduledBlocks({
  builder,
  queryStart,
  queryEnd,
  result,
}: {
  builder: DeparturesBlocksBuilder;
  queryStart: string;
  queryEnd: string;
  result: {
    serviceDay: string;
    earliest: string;
    latest: string;
  }[];
}) {
  const queryStartInstant = Temporal.Instant.from(queryStart);
  const queryEndInstant = Temporal.Instant.from(queryEnd);
  const range = new BoundedInstantRange(queryStartInstant, queryEndInstant);

  const blocks = builder
    .allBlocksWithinTimeRange(range)
    .filter((block) => block instanceof ScheduledDeparturesBlock);

  expect(blocks).toHaveLength(result.length);

  for (let i = 0; i < result.length; i++) {
    const expected = itsOk(result[i]);
    const expectedServiceDay = Temporal.PlainDate.from(expected.serviceDay);
    const expectedEarliest = Temporal.Instant.from(expected.earliest);
    const expectedLatest = Temporal.Instant.from(expected.latest);

    const block = itsOk(blocks[i]);
    expect(block.serviceDay).toEqual(expectedServiceDay);
    expect(block.instantRange.start).toEqual(expectedEarliest);
    expect(block.instantRange.end).toEqual(expectedLatest);
  }
}
