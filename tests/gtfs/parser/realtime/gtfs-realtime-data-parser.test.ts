import { describe, expect, it } from "vitest";
import { GtfsRealtimeDataParser } from "../../../../src/gtfs/parser/realtime/gtfs-realtime-data-parser.js";
import {
  UnsupportedTripUpdateScheduleRelationshipError,
  type GtfsTripUpdateParsingError,
} from "../../../../src/gtfs/parser/realtime/gtfs-trip-update-parser.js";
import {
  realtimeFeed,
  scheduleWithTrip,
  stopTimeUpdate,
  tripDescriptor,
  tripUpdate,
} from "./factories.js";
import { stopMapping } from "../factories.js";

describe("GtfsRealtimeDataParser", () => {
  it("parses realtime feed into updated trips and drops invalid updates", () => {
    const errors: GtfsTripUpdateParsingError[] = [];
    const parser = new GtfsRealtimeDataParser("Australia/Melbourne", (e) =>
      errors.push(e),
    );
    const { schedule, trip } = scheduleWithTrip();

    const validUpdate = tripUpdate({
      trip: tripDescriptor({ tripId: trip.gtfsTripId }),
      stopTimeUpdate: [stopTimeUpdate({ stopSequence: 1, stopId: "A" })],
    });

    const invalidUpdate = tripUpdate({
      trip: tripDescriptor({
        tripId: trip.gtfsTripId,
        scheduleRelationship: "ADDED",
      }),
    });

    const parsed = parser.parse(
      realtimeFeed([validUpdate, invalidUpdate]),
      schedule,
      stopMapping(["A", "B"]),
    );

    expect(parsed.updatedTrips).toHaveLength(1);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      UnsupportedTripUpdateScheduleRelationshipError,
    );
  });
});
