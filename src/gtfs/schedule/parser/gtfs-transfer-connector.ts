import type { TransfersCsv, TransfersCsvRow } from "../csv/csv-schemas.js";
import { GtfsTrip } from "../data/gtfs-trip.js";

const TRANSFER_TYPE_IN_SEAT_TRANSFER = 4;

export class GtfsTransferConnector {
  constructor(
    private readonly _onError: (error: GtfsTransferConnectionError) => void,
  ) {}

  connect(
    trips: readonly GtfsTrip[],
    transfers: TransfersCsv,
  ): readonly GtfsTrip[] {
    const tripMap = new Map<string, GtfsTrip>(
      trips.map((trip) => [trip.gtfsTripId, trip]),
    );

    for (const transfer of transfers) {
      const fromTrip = tripMap.get(transfer.from_trip_id);
      const toTrip = tripMap.get(transfer.to_trip_id);

      // TrainQuery only cares about "in-seat" transfers, because we're only
      // parsing these transfers to form trips into multiple "legs" of a
      // service, a.k.a. what I used to call continuations.
      //
      // We should ignore them, but it's not really an error. I'm just reporting
      // them because right now PTV only publishes in-seat transfers, and I'm
      // curious to see if that changes one day (e.g. with V/Line's guaranteed
      // coach connections, or coupling of trains at Ballarat).
      if (transfer.transfer_type !== TRANSFER_TYPE_IN_SEAT_TRANSFER) {
        this._onError(new TransferIsNotInSeatTransferError(transfer));
        continue;
      }

      if (fromTrip == null) {
        this._onError(
          new TransferReferencesNonExistentTrip(transfer, "from_trip_id"),
        );
        continue;
      }
      if (toTrip == null) {
        this._onError(
          new TransferReferencesNonExistentTrip(transfer, "to_trip_id"),
        );
        continue;
      }

      if (fromTrip.terminus.gtfsIdMetadata.id !== transfer.from_stop_id) {
        this._onError(new TransferIsNotFromTerminusError(transfer, fromTrip));
        continue;
      }
      if (toTrip.origin.gtfsIdMetadata.id !== transfer.to_stop_id) {
        this._onError(new TransferIsNotToOriginError(transfer, toTrip));
        continue;
      }

      if (fromTrip.nextTrip != null) {
        this._onError(
          new TransferReferencesTripAlreadyConnectedError(transfer, fromTrip),
        );
        continue;
      }
      if (toTrip.previousTrip != null) {
        this._onError(
          new TransferReferencesTripAlreadyConnectedError(transfer, toTrip),
        );
        continue;
      }

      const [newFromTrip, newToTrip] = GtfsTrip.connect(fromTrip, toTrip);
      tripMap.set(fromTrip.gtfsTripId, newFromTrip);
      tripMap.set(toTrip.gtfsTripId, newToTrip);
    }

    return Array.from(tripMap.values());
  }
}

export type GtfsTransferConnectionError =
  | TransferReferencesNonExistentTrip
  | TransferIsNotFromTerminusError
  | TransferIsNotToOriginError
  | TransferReferencesTripAlreadyConnectedError
  | TransferIsNotInSeatTransferError;

export class TransferReferencesNonExistentTrip extends Error {
  readonly type = "transfer-references-non-existent-trip";
  constructor(
    readonly transfer: TransfersCsvRow,
    readonly field: "from_trip_id" | "to_trip_id",
  ) {
    super();
  }
}

export class TransferIsNotFromTerminusError extends Error {
  readonly type = "transfer-is-not-from-terminus";
  constructor(
    readonly transfer: TransfersCsvRow,
    readonly fromTrip: GtfsTrip,
  ) {
    super();
  }
}

export class TransferIsNotToOriginError extends Error {
  readonly type = "transfer-is-not-to-origin";
  constructor(
    readonly transfer: TransfersCsvRow,
    readonly toTrip: GtfsTrip,
  ) {
    super();
  }
}

export class TransferReferencesTripAlreadyConnectedError extends Error {
  readonly type = "transfer-references-trip-already-connected";
  constructor(
    readonly transfer: TransfersCsvRow,
    readonly tripWithExistingConnection: GtfsTrip,
  ) {
    super();
  }
}

export class TransferIsNotInSeatTransferError extends Error {
  readonly type = "transfer-is-not-in-seat-transfer";
  constructor(readonly transfer: TransfersCsvRow) {
    super();
  }
}
