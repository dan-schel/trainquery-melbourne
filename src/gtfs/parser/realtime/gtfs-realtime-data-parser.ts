import { GtfsRealtimeData } from "../../data/gtfs-realtime-data.js";
import type { GtfsSchedule } from "../../data/gtfs-schedule.js";
import type { GtfsUpdatedTrip } from "../../data/gtfs-updated-trip.js";
import type { StopGtfsIdMapping } from "../../data/ids/stop-gtfs-id-mapping.js";
import type { RealtimeFeedJson } from "../../retrieval/realtime/realtime-feed-schema.js";
import {
  GtfsTripUpdateParser,
  type GtfsTripUpdateParsingError,
} from "./gtfs-trip-update-parser.js";

export class GtfsRealtimeDataParser {
  private readonly _tripUpdateParser: GtfsTripUpdateParser;

  constructor(onError: (error: GtfsRealtimeDataParsingError) => void) {
    this._tripUpdateParser = new GtfsTripUpdateParser(onError);
  }

  parse(
    realtimeData: RealtimeFeedJson,
    scheduleData: GtfsSchedule,
    stopGtfsIdMapping: StopGtfsIdMapping,
  ): GtfsRealtimeData {
    const updatedTrips: GtfsUpdatedTrip[] = [];

    for (const tripUpdates of realtimeData.tripUpdates) {
      const result = this._tripUpdateParser.parse(
        tripUpdates,
        scheduleData,
        stopGtfsIdMapping,
      );

      if (result != null) {
        updatedTrips.push(result);
      }
    }

    return new GtfsRealtimeData(updatedTrips);
  }
}

export type GtfsRealtimeDataParsingError = GtfsTripUpdateParsingError;
