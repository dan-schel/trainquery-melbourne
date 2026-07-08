import { describe, expect, it } from "vitest";
import {
  GtfsTransferConnector,
  TransferIsNotInSeatTransferError,
  type GtfsTransferConnectionError,
} from "../../../../src/gtfs/schedule/parser/gtfs-transfer-connector.js";
import {
  TransferIsNotFromTerminusError,
  TransferIsNotToOriginError,
  TransferReferencesNonExistentTrip,
  TransferReferencesTripAlreadyConnectedError,
} from "../../../../src/gtfs/schedule/parser/gtfs-transfer-connector.js";
import { itsOk } from "@dan-schel/js-utils";
import { makeTrip, transfer } from "./factories.js";

describe("GtfsTransferConnector", () => {
  it("connects trips using in-seat transfers", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((error) => errors.push(error));

    const trips = connector.connect(
      [makeTrip("from", "A", "B"), makeTrip("to", "B", "C")],
      [
        {
          from_stop_id: "B",
          to_stop_id: "B",
          from_route_id: "route-1",
          to_route_id: "route-1",
          from_trip_id: "from",
          to_trip_id: "to",
          transfer_type: 4,
          min_transfer_time: "0",
        },
      ],
    );
    expect(trips).toHaveLength(2);
    const fromTrip = itsOk(trips[0]);
    const toTrip = itsOk(trips[1]);

    expect(errors).toEqual([]);
    expect(fromTrip.nextTrip?.gtfsTripId).toBe("to");
    expect(toTrip.previousTrip?.gtfsTripId).toBe("from");
  });

  it("reports non in-seat transfers and leaves the trips disconnected", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((error) => errors.push(error));

    const trips = [makeTrip("from", "A", "B"), makeTrip("to", "B", "C")];
    const result = connector.connect(trips, [transfer({ transfer_type: 0 })]);

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TransferIsNotInSeatTransferError);

    const [firstTrip, secondTrip] = result;
    if (firstTrip == null || secondTrip == null) {
      throw new Error("Expected two trips.");
    }

    expect(firstTrip.nextTrip).toBeNull();
    expect(secondTrip.previousTrip).toBeNull();
  });

  it("reports transfers that reference a missing 'from' trip", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((error) => errors.push(error));

    const result = connector.connect(
      [makeTrip("to", "B", "C")],
      [transfer({ from_trip_id: "missing", to_trip_id: "to" })],
    );

    expect(result).toHaveLength(1);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TransferReferencesNonExistentTrip);
  });

  it("reports transfers that reference a missing 'to' trip", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((error) => errors.push(error));

    const result = connector.connect(
      [makeTrip("from", "A", "B")],
      [transfer({ from_trip_id: "from", to_trip_id: "missing" })],
    );

    expect(result).toHaveLength(1);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(TransferReferencesNonExistentTrip);
  });

  it("reports transfers that do not start from the from trip terminus", () => {
    const errors: GtfsTransferConnectionError[] = [];
    const connector = new GtfsTransferConnector((error) => errors.push(error));

    const result = connector.connect(
      [makeTrip("from", "A", "B"), makeTrip("to", "B", "C")],
      [transfer({ from_stop_id: "A", to_trip_id: "to" })],
    );

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
    const connector = new GtfsTransferConnector((error) => errors.push(error));

    const result = connector.connect(
      [makeTrip("from", "A", "B"), makeTrip("to", "B", "C")],
      [transfer({ from_trip_id: "from", to_stop_id: "C" })],
    );

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
    const connector = new GtfsTransferConnector((error) => errors.push(error));

    const alreadyConnectedTrip = makeTrip("from", "A", "B").with({
      nextTrip: makeTrip("mid", "B", "C"),
    });

    const result = connector.connect(
      [alreadyConnectedTrip, makeTrip("to", "B", "C")],
      [transfer({ from_trip_id: "from", to_trip_id: "to" })],
    );

    expect(result).toHaveLength(2);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(
      TransferReferencesTripAlreadyConnectedError,
    );
  });
});
