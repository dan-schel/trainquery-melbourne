import { describe, expect, it } from "vitest";
import {
  GtfsTransferConnector,
  TransferIsNotInSeatTransferError,
  TransferIsNotSameStopAndPositionError,
  type GtfsTransferConnectionError,
} from "../../../../src/gtfs/parser/schedule/gtfs-transfer-connector.js";
import {
  TransferIsNotFromTerminusError,
  TransferIsNotToOriginError,
  TransferReferencesNonExistentTrip,
  TransferReferencesTripAlreadyConnectedError,
} from "../../../../src/gtfs/parser/schedule/gtfs-transfer-connector.js";
import { itsOk } from "@dan-schel/js-utils";
import { GtfsScheduledTrip } from "../../../../src/gtfs/data/gtfs-scheduled-trip.js";
import { GtfsCalendar } from "../../../../src/gtfs/data/gtfs-calendar.js";
import {
  GtfsScheduledTripOriginatingMovement,
  GtfsScheduledTripTerminatingMovement,
} from "../../../../src/gtfs/data/gtfs-scheduled-trip-movements.js";
import { GtfsStopTime } from "../../../../src/gtfs/data/gtfs-stop-time.js";

describe("GtfsTransferConnector", () => {
  const TRANSFER = {
    from_stop_id: "2",
    to_stop_id: "2",
    from_trip_id: "trip-a",
    to_trip_id: "trip-b",
    transfer_type: 4,
    min_transfer_time: "0",
  };
  const TRIPS = [makeTrip("trip-a", "1", "2"), makeTrip("trip-b", "2", "3")];

  it("connects trips using in-seat transfers", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((e) => errors.push(e));

    const trips = connector.connect(TRIPS, [TRANSFER]);

    expect(trips).toHaveLength(2);
    expect(errors).toEqual([]);
    expect(trips[0]?.nextTrip?.gtfsTripId).toBe("trip-b");
    expect(trips[1]?.previousTrip?.gtfsTripId).toBe("trip-a");
  });

  it("reports non in-seat transfers and leaves the trips disconnected", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((e) => errors.push(e));

    const transfersCsv = [{ ...TRANSFER, transfer_type: 0 }];
    const trips = connector.connect(TRIPS, transfersCsv);

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

    const transfersCsv = [{ ...TRANSFER, from_trip_id: "missing" }];
    const result = connector.connect(TRIPS, transfersCsv);

    expect(result).toHaveLength(2);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TransferReferencesNonExistentTrip);
  });

  it("reports transfers that reference a missing 'to' trip", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((e) => errors.push(e));

    const transfersCsv = [{ ...TRANSFER, to_trip_id: "missing" }];
    const result = connector.connect(TRIPS, transfersCsv);

    expect(result).toHaveLength(2);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TransferReferencesNonExistentTrip);
  });

  it("reports transfers that do not start from the 'from' trip terminus", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((e) => errors.push(e));

    const trips = [makeTrip("trip-a", "1", "2"), makeTrip("trip-b", "1", "3")];
    const transfersCsv = [{ ...TRANSFER, from_stop_id: "1", to_stop_id: "1" }];
    const result = connector.connect(trips, transfersCsv);

    expect(result).toHaveLength(2);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TransferIsNotFromTerminusError);
    expect(itsOk(result[0]).nextTrip).toBeNull();
    expect(itsOk(result[1]).previousTrip).toBeNull();
  });

  it("reports transfers that do not end at the 'to' trip origin", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((e) => errors.push(e));

    const trips = [makeTrip("trip-a", "1", "2"), makeTrip("trip-b", "3", "2")];
    const transfersCsv = [{ ...TRANSFER, to_stop_id: "2", from_stop_id: "2" }];
    const result = connector.connect(trips, transfersCsv);

    expect(result).toHaveLength(2);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TransferIsNotToOriginError);
    expect(itsOk(result[0]).nextTrip).toBeNull();
    expect(itsOk(result[1]).previousTrip).toBeNull();
  });

  it("reports transfers involving trips that are already connected", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((e) => errors.push(e));

    const inputTrips = [
      makeTrip("trip-a", "1", "2").with({
        nextTrip: makeTrip("mid", "2", "3"),
      }),
      makeTrip("trip-b", "2", "3"),
    ];
    const transfersCsv = [TRANSFER];

    const result = connector.connect(inputTrips, transfersCsv);

    expect(result).toHaveLength(2);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      TransferReferencesTripAlreadyConnectedError,
    );
  });

  it("reports transfers where the 'from' stop & position is different to the 'to' stop & position", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((e) => errors.push(e));

    const trips = [makeTrip("trip-a", "1", "2"), makeTrip("trip-b", "3", "4")];
    const transfersCsv = [{ ...TRANSFER, from_stop_id: "2", to_stop_id: "3" }];
    const result = connector.connect(trips, transfersCsv);

    expect(result).toHaveLength(2);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TransferIsNotSameStopAndPositionError);
  });

  function makeTrip(
    id: string,
    originGtfsStopId: string,
    terminusGtfsStopId: string,
  ) {
    const origin = new GtfsScheduledTripOriginatingMovement({
      stopId: 1,
      positionId: null,
      departureTime: GtfsStopTime.fromSecondsSinceMidnight(60),
      gtfsIdMetadata: {
        type: "parent",
        id: originGtfsStopId,
        stopId: 1,
      },
      gtfsStopSequence: 1,
    });

    const terminus = new GtfsScheduledTripTerminatingMovement({
      stopId: 2,
      positionId: null,
      arrivalTime: GtfsStopTime.fromSecondsSinceMidnight(0),
      gtfsIdMetadata: {
        type: "parent",
        id: terminusGtfsStopId,
        stopId: 2,
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
