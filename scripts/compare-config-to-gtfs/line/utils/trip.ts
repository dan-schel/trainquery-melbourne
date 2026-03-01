import type { StopGtfsIdMapping } from "../../../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import type {
  StopTimesCsv,
  TripsCsvRow,
} from "../../../../src/gtfs/schedule/csv-schemas.js";
import { StoppingPattern } from "./stopping-pattern.js";

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
    tripCsvRow: TripsCsvRow;
    stopTimes: StopTimesCsv;
    stopIdMapping: StopGtfsIdMapping;
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
