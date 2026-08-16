import type { GtfsStopTime } from "../gtfs-stop-time.js";

// TODO: [DS] Some stuff in there isn't relavent to corequery-gtfs, and is only
// used by the gtfs linting scripts in trainquery-melbourne, so we can drop it
// from these types.
export type StopsCsvRow = {
  stop_id: string;
  stop_name: string;
  stop_lat: number;
  stop_lon: number;
  stop_url: string;
  parent_station: string;
  platform_code?: string;
};
export type StopsCsv = readonly StopsCsvRow[];

export type RoutesCsvRow = {
  route_id: string;
  route_long_name: string;
};
export type RoutesCsv = readonly RoutesCsvRow[];

export type TripsCsvRow = {
  route_id: string;
  service_id: string;
  trip_id: string;
};
export type TripsCsv = readonly TripsCsvRow[];

export type StopTimesCsvRow = {
  trip_id: string;
  arrival_time: GtfsStopTime;
  departure_time: GtfsStopTime;
  stop_id: string;
  stop_sequence: number;
  pickup_type: number;
  drop_off_type: number;
};
export type StopTimesCsv = readonly StopTimesCsvRow[];

export type CalendarCsvRow = {
  service_id: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  start_date: Temporal.PlainDate;
  end_date: Temporal.PlainDate;
};
export type CalendarCsv = readonly CalendarCsvRow[];

export type CalendarDatesCsvRow = {
  service_id: string;
  date: Temporal.PlainDate;
  exception_type: number;
};
export type CalendarDatesCsv = readonly CalendarDatesCsvRow[];

export type TransfersCsvRow = {
  from_stop_id: string;
  to_stop_id: string;
  from_trip_id: string;
  to_trip_id: string;
  transfer_type: number;
};
export type TransfersCsv = readonly TransfersCsvRow[];

export type GtfsFeedCsv = {
  readonly stops: StopsCsv;
  readonly routes: RoutesCsv;
  readonly trips: TripsCsv;
  readonly stopTimes: StopTimesCsv;
  readonly calendar: CalendarCsv;
  readonly calendarDates: CalendarDatesCsv;
  readonly transfers: TransfersCsv;
};
