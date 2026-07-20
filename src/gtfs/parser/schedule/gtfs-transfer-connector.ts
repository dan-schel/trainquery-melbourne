import type {
  TransfersCsv,
  TransfersCsvRow,
} from "../../retrieval/schedule/csv-schemas.js";
import { GtfsScheduledTrip } from "../../data/gtfs-scheduled-trip.js";

const TRANSFER_TYPE_IN_SEAT_TRANSFER = 4;

export class GtfsTransferConnector {
  constructor(
    private readonly _onError: (error: GtfsTransferConnectionError) => void,
  ) {}

  connect(
    trips: readonly GtfsScheduledTrip[],
    transfers: TransfersCsv,
  ): readonly GtfsScheduledTrip[] {
    const tripMap = new Map<string, GtfsScheduledTrip>(
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

      // TODO: Should I report if the transfer.from_stop_id is not the same as
      // the transfer.to_stop_id? That would mean a "in-seat transfer" to a
      // different platform, which should be impossible.

      if (fromTrip.termination.gtfsIdMetadata.id !== transfer.from_stop_id) {
        this._onError(new TransferIsNotFromTerminusError(transfer, fromTrip));
        continue;
      }
      if (toTrip.origination.gtfsIdMetadata.id !== transfer.to_stop_id) {
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

      const [newFrom, newTo] = GtfsScheduledTrip.connectAsTransfer(
        fromTrip,
        toTrip,
      );
      tripMap.set(fromTrip.gtfsTripId, newFrom);
      tripMap.set(toTrip.gtfsTripId, newTo);
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
    readonly fromTrip: GtfsScheduledTrip,
  ) {
    super();
  }
}

export class TransferIsNotToOriginError extends Error {
  readonly type = "transfer-is-not-to-origin";
  constructor(
    readonly transfer: TransfersCsvRow,
    readonly toTrip: GtfsScheduledTrip,
  ) {
    super();
  }
}

export class TransferReferencesTripAlreadyConnectedError extends Error {
  readonly type = "transfer-references-trip-already-connected";
  constructor(
    readonly transfer: TransfersCsvRow,
    readonly tripWithExistingConnection: GtfsScheduledTrip,
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
