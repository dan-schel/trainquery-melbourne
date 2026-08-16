import { GtfsFeed } from "../corequery-gtfs/data/gtfs-feed.js";
import type { LineGtfsIdMapping } from "../corequery-gtfs/data/ids/line-gtfs-id-mapping.js";
import type { StopGtfsIdMapping } from "../corequery-gtfs/data/ids/stop-gtfs-id-mapping.js";
import type { BonusLinesMapping } from "../corequery-gtfs/data/route/bonus-lines-mapping.js";
import type { LineRoutesMapping } from "../corequery-gtfs/data/route/line-routes-mapping.js";
import type { TimezoneData } from "../departures/scheduled-departures-blocks-builder.js";
import type { RealtimeFeedJson } from "../retrieval/realtime/realtime-feed-schema.js";
import type { GtfsFeedCsv } from "../retrieval/schedule/read-gtfs-csvs.js";
import {
  GtfsRealtimeDataParser,
  type GtfsRealtimeDataParsingError,
} from "./realtime/gtfs-realtime-data-parser.js";
import {
  GtfsScheduleParser,
  type GtfsScheduleParsingError,
} from "./schedule/gtfs-schedule-parser.js";

export class GtfsFeedParser {
  private readonly _scheduleParser: GtfsScheduleParser;
  private readonly _realtimeParser: GtfsRealtimeDataParser;

  constructor(
    lineRoutesMapping: LineRoutesMapping,
    bonusLinesMapping: BonusLinesMapping,
    private readonly _timezoneData: TimezoneData,
    _onScheduleParsingError: (error: GtfsScheduleParsingError) => void,
    _onRealtimeParsingError: (error: GtfsRealtimeDataParsingError) => void,
  ) {
    this._scheduleParser = new GtfsScheduleParser(
      lineRoutesMapping,
      bonusLinesMapping,
      _onScheduleParsingError,
    );
    this._realtimeParser = new GtfsRealtimeDataParser(
      _timezoneData.timezone,
      _onRealtimeParsingError,
    );
  }

  parse(
    corequeryDataSourceId: string,
    scheduleCsvs: GtfsFeedCsv,
    realtimeJson: RealtimeFeedJson,
    lineGtfsIdMapping: LineGtfsIdMapping,
    stopGtfsIdMapping: StopGtfsIdMapping,
  ): GtfsFeed {
    const scheduleData = this._scheduleParser.parse(
      scheduleCsvs,
      lineGtfsIdMapping,
      stopGtfsIdMapping,
    );
    const realtimeData = this._realtimeParser.parse(
      realtimeJson,
      scheduleData,
      stopGtfsIdMapping,
    );

    return GtfsFeed.fromNewScheduleData(
      corequeryDataSourceId,
      scheduleData,
      realtimeData,
      this._timezoneData,
    );
  }

  updateWithNewRealtimeData(
    gtfsFeed: GtfsFeed,
    realtimeData: RealtimeFeedJson,
    stopGtfsIdMapping: StopGtfsIdMapping,
  ): GtfsFeed {
    const updatedRealtime = this._realtimeParser.parse(
      realtimeData,
      gtfsFeed.scheduleData,
      stopGtfsIdMapping,
    );

    return gtfsFeed.withUpdatedRealtimeData(updatedRealtime);
  }
}
