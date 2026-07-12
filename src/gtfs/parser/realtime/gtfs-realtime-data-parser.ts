import type { GtfsRealtimeData } from "../../data/gtfs-realtime-data.js";
import type { GtfsSchedule } from "../../data/gtfs-schedule.js";

export class GtfsRealtimeDataParser {
  constructor() {}

  parse(scheduleData: GtfsSchedule): GtfsRealtimeData {}
}
