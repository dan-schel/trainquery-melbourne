import { describe, expect, it } from "vitest";
import {
  GtfsTransferConnector,
  TransferIsNotInSeatTransferError,
  type GtfsTransferConnectionError,
} from "../../../../src/gtfs/parser/schedule/gtfs-transfer-connector.js";
import {
  TransferIsNotFromTerminusError,
  TransferIsNotToOriginError,
  TransferReferencesNonExistentTrip,
  TransferReferencesTripAlreadyConnectedError,
} from "../../../../src/gtfs/parser/schedule/gtfs-transfer-connector.js";
import { itsOk } from "@dan-schel/js-utils";
import type { TransfersCsvRow } from "../../../../src/gtfs/retrieval/schedule/csv-schemas.js";
import { GtfsScheduledTrip } from "../../../../src/gtfs/data/gtfs-scheduled-trip.js";
import { GtfsCalendar } from "../../../../src/gtfs/data/gtfs-calendar.js";
import {
  GtfsScheduledTripOriginatingMovement,
  GtfsScheduledTripTerminatingMovement,
} from "../../../../src/gtfs/data/gtfs-scheduled-trip-movements.js";
import { GtfsStopTime } from "../../../../src/gtfs/data/gtfs-stop-time.js";

describe("GtfsTransferConnector", () => {
  it("connects trips using in-seat transfers", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((e) => errors.push(e));

    const inputTrips = [makeTrip("from", "A", "B"), makeTrip("to", "B", "C")];
    const transfersCsv = [
      {
        from_stop_id: "B",
        to_stop_id: "B",
        from_trip_id: "from",
        to_trip_id: "to",
        transfer_type: 4,
        min_transfer_time: "0",
      },
    ];

    const trips = connector.connect(inputTrips, transfersCsv);
    expect(trips).toHaveLength(2);
    const fromTrip = itsOk(trips[0]);
    const toTrip = itsOk(trips[1]);

    expect(errors).toEqual([]);
    expect(fromTrip.nextTrip?.gtfsTripId).toBe("to");
    expect(toTrip.previousTrip?.gtfsTripId).toBe("from");
  });

  it("reports non in-seat transfers and leaves the trips disconnected", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((e) => errors.push(e));

    const inputTrips = [makeTrip("from", "A", "B"), makeTrip("to", "B", "C")];
    const transfersCsv = [transfer({ transfer_type: 0 })];
    const trips = connector.connect(inputTrips, transfersCsv);

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TransferIsNotInSeatTransferError);

    const [firstTrip, secondTrip] = trips;
    if (firstTrip == null || secondTrip == null) {
      throw new Error("Expected two trips.");
    }

    expect(firstTrip.nextTrip).toBeNull();
    expect(secondTrip.previousTrip).toBeNull();
  });

  it("reports transfers that reference a missing 'from' trip", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((e) => errors.push(e));

    const inputTrips = [makeTrip("to", "B", "C")];
    const transfersCsv = [
      transfer({ from_trip_id: "missing", to_trip_id: "to" }),
    ];

    const result = connector.connect(inputTrips, transfersCsv);

    expect(result).toHaveLength(1);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TransferReferencesNonExistentTrip);
  });

  it("reports transfers that reference a missing 'to' trip", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((e) => errors.push(e));

    const inputTrips = [makeTrip("from", "A", "B")];
    const transfersCsv = [
      transfer({ from_trip_id: "from", to_trip_id: "missing" }),
    ];

    const result = connector.connect(inputTrips, transfersCsv);

    expect(result).toHaveLength(1);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TransferReferencesNonExistentTrip);
  });

  it("reports transfers that do not start from the from trip terminus", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((e) => errors.push(e));

    const inputTrips = [makeTrip("from", "A", "B"), makeTrip("to", "B", "C")];
    const transfersCsv = [transfer({ from_stop_id: "A", to_trip_id: "to" })];
    const result = connector.connect(inputTrips, transfersCsv);

    expect(result).toHaveLength(2);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TransferIsNotFromTerminusError);

    const [firstTrip, secondTrip] = result;
    if (firstTrip == null || secondTrip == null) {
      throw new Error("Expected two trips.");
    }

    expect(firstTrip.nextTrip).toBeNull();
    expect(secondTrip.previousTrip).toBeNull();
  });

  it("reports transfers that do not end at the to trip origin", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((e) => errors.push(e));

    const inputTrips = [makeTrip("from", "A", "B"), makeTrip("to", "B", "C")];
    const transfersCsv = [transfer({ from_trip_id: "from", to_stop_id: "C" })];
    const result = connector.connect(inputTrips, transfersCsv);

    expect(result).toHaveLength(2);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TransferIsNotToOriginError);

    const [firstTrip, secondTrip] = result;
    if (firstTrip == null || secondTrip == null) {
      throw new Error("Expected two trips.");
    }

    expect(firstTrip.nextTrip).toBeNull();
    expect(secondTrip.previousTrip).toBeNull();
  });

  it("reports transfers involving trips that are already connected", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((e) => errors.push(e));

    const inputTrips = [
      makeTrip("from", "A", "B").with({
        nextTrip: makeTrip("mid", "B", "C"),
      }),
      makeTrip("to", "B", "C"),
    ];
    const transfersCsv = [transfer({ from_trip_id: "from", to_trip_id: "to" })];

    const result = connector.connect(inputTrips, transfersCsv);

    expect(result).toHaveLength(2);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      TransferReferencesTripAlreadyConnectedError,
    );
  });

  function transfer(overrides: Partial<TransfersCsvRow> = {}): TransfersCsvRow {
    return {
      from_stop_id: "B",
      to_stop_id: "B",
      from_trip_id: "from",
      to_trip_id: "to",
      transfer_type: 4,
      min_transfer_time: "0",
      ...overrides,
    };
  }

  function makeTrip(
    id: string,
    originGtfsStopId: string,
    terminusGtfsStopId: string,
  ) {
    const origin = new GtfsScheduledTripOriginatingMovement({
      stopId: 1,
      positionId: 1,
      departureTime: GtfsStopTime.fromSecondsSinceMidnight(60),
      gtfsIdMetadata: {
        type: "platform" as const,
        id: originGtfsStopId,
        stopId: 1,
        positionId: 1,
      },
      gtfsStopSequence: 1,
    });

    const terminus = new GtfsScheduledTripTerminatingMovement({
      stopId: 2,
      positionId: 1,
      arrivalTime: GtfsStopTime.fromSecondsSinceMidnight(0),
      gtfsIdMetadata: {
        type: "platform" as const,
        id: terminusGtfsStopId,
        stopId: 2,
        positionId: 1,
      },
      gtfsStopSequence: 2,
    });

    return new GtfsScheduledTrip({
      gtfsTripId: id,
      gtfsRouteId: "",
      calendar: GtfsCalendar.everyday(""),
      movements: [origin, terminus],
      lineIds: [1],
      color: "red",
      serviceTags: [],
      previousTrip: null,
      nextTrip: null,
    });
  }
});
