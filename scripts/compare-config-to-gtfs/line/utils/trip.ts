import { StoppingPattern } from "./stopping-pattern.js";
import type {
  FullStopTimesCsv,
  FullTripsCsvRow,
} from "../../../../src/gtfs/retrieval/schedule/csv-schemas.js";

export class Trip {
  constructor(
    readonly tripId: string,
    readonly routeId: string,
    readonly pattern: StoppingPattern,
  ) {}

  static fromCsv({
    tripCsvRow,
    stopTimes,
    stopIdMapping,
    onUnmappedGtfsStopIdInUse,
  }: {
    tripCsvRow: FullTripsCsvRow;
    stopTimes: FullStopTimesCsv;
    stopIdMapping: Map<string, number>;
    onUnmappedGtfsStopIdInUse: (gtfsId: string) => void;
  }) {
    return new Trip(
      tripCsvRow.trip_id,
      tripCsvRow.route_id,
      StoppingPattern.create({
        stopTimes,
        stopIdMapping,
        onUnmappedGtfsStopIdInUse,
      }),
    );
  }
}
