import z from "zod";
import {
  floatStringSchema,
  gtfsBooleanSchema,
  gtfsDateSchema,
  gtfsStopTimeSchema,
  intStringSchema,
} from "../../utils/zod.js";

type FullStopsCsvRow = z.infer<typeof stopsCsvSchema>;
type FullStopsCsv = readonly FullStopsCsvRow[];
export const stopsCsvSchema = z
  .object({
    stop_id: z.string(),
    stop_name: z.string(),
    stop_lat: floatStringSchema,
    stop_lon: floatStringSchema,
    stop_url: z.string(),
    // location_type: z.string(),
    parent_station: z.string(),
    // wheelchair_boarding: z.string(),
    // level_id: z.string(),
    platform_code: z.string().optional(),
  })
  .readonly();

type FullRoutesCsvRow = z.infer<typeof routesCsvSchema>;
type FullRoutesCsv = readonly FullRoutesCsvRow[];
export const routesCsvSchema = z
  .object({
    route_id: z.string(),
    // agency_id: z.string(),
    // route_short_name: z.string(),
    route_long_name: z.string(),
    // route_type: intStringSchema,
    // route_color: z.string(),
    // route_text_color: z.string(),
  })
  .readonly();

type FullTripsCsvRow = z.infer<typeof tripsCsvSchema>;
type FullTripsCsv = readonly FullTripsCsvRow[];
export const tripsCsvSchema = z
  .object({
    route_id: z.string(),
    service_id: z.string(),
    trip_id: z.string(),
    // shape_id: z.string(),
    // trip_headsign: z.string(),
    // direction_id: z.string(),
    // block_id: z.string(),
    // wheelchair_accessible: intStringSchema,
    // bikes_allowed: intStringSchema,
  })
  .readonly();

type FullStopTimesCsvRow = z.infer<typeof stopTimesCsvSchema>;
type FullStopTimesCsv = readonly FullStopTimesCsvRow[];
export const stopTimesCsvSchema = z
  .object({
    trip_id: z.string(),
    arrival_time: gtfsStopTimeSchema,
    departure_time: gtfsStopTimeSchema,
    stop_id: z.string(),
    stop_sequence: intStringSchema,
    // stop_headsign: z.string(),
    pickup_type: intStringSchema,
    drop_off_type: intStringSchema,
    // shape_dist_traveled: floatStringSchema,
  })
  .readonly();

type FullCalendarCsvRow = z.infer<typeof calendarCsvSchema>;
type FullCalendarCsv = readonly FullCalendarCsvRow[];
export const calendarCsvSchema = z
  .object({
    service_id: z.string(),
    monday: gtfsBooleanSchema,
    tuesday: gtfsBooleanSchema,
    wednesday: gtfsBooleanSchema,
    thursday: gtfsBooleanSchema,
    friday: gtfsBooleanSchema,
    saturday: gtfsBooleanSchema,
    sunday: gtfsBooleanSchema,
    start_date: gtfsDateSchema,
    end_date: gtfsDateSchema,
  })
  .readonly();

type FullCalendarDatesCsvRow = z.infer<typeof calendarDatesCsvSchema>;
type FullCalendarDatesCsv = readonly FullCalendarDatesCsvRow[];
export const calendarDatesCsvSchema = z
  .object({
    service_id: z.string(),
    date: gtfsDateSchema,
    exception_type: intStringSchema,
  })
  .readonly();

type FullTransfersCsvRow = z.infer<typeof transfersCsvSchema>;
type FullTransfersCsv = readonly FullTransfersCsvRow[];
export const transfersCsvSchema = z
  .object({
    from_stop_id: z.string(),
    to_stop_id: z.string(),
    // from_route_id: z.string(),
    // to_route_id: z.string(),
    from_trip_id: z.string(),
    to_trip_id: z.string(),
    transfer_type: intStringSchema,
    // min_transfer_time: z.string(),
  })
  .readonly();

export type FullGtfsFeedCsv = {
  readonly stops: FullStopsCsv;
  readonly routes: FullRoutesCsv;
  readonly trips: FullTripsCsv;
  readonly stopTimes: FullStopTimesCsv;
  readonly calendar: FullCalendarCsv;
  readonly calendarDates: FullCalendarDatesCsv;
  readonly transfers: FullTransfersCsv;
};
