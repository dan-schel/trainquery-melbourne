import z from "zod";
import { floatStringSchema, intStringSchema } from "../../utils.js";

export type StopsCsvRow = z.infer<typeof stopsCsvSchema>;
export type StopsCsv = readonly StopsCsvRow[];
export const stopsCsvSchema = z
  .object({
    stop_id: z.string(),
    stop_name: z.string(),
    stop_lat: floatStringSchema,
    stop_lon: floatStringSchema,
    stop_url: z.string(),
    location_type: z.string(),
    parent_station: z.string(),
    wheelchair_boarding: z.string(),
    level_id: z.string(),
    platform_code: z.string().optional(),
  })
  .readonly();

export type RoutesCsvRow = z.infer<typeof routesCsvSchema>;
export type RoutesCsv = readonly RoutesCsvRow[];
export const routesCsvSchema = z
  .object({
    route_id: z.string(),
    agency_id: z.string(),
    route_short_name: z.string(),
    route_long_name: z.string(),
    route_type: intStringSchema,
    route_color: z.string(),
    route_text_color: z.string(),
  })
  .readonly();

export type TripsCsvRow = z.infer<typeof tripsCsvSchema>;
export type TripsCsv = readonly TripsCsvRow[];
export const tripsCsvSchema = z
  .object({
    route_id: z.string(),
    service_id: z.string(),
    trip_id: z.string(),
    shape_id: z.string(),
    trip_headsign: z.string(),
    direction_id: z.string(),
    block_id: z.string(),
    wheelchair_accessible: intStringSchema,
    bikes_allowed: intStringSchema,
  })
  .readonly();

export type StopTimesCsvRow = z.infer<typeof stopTimesCsvSchema>;
export type StopTimesCsv = readonly StopTimesCsvRow[];
export const stopTimesCsvSchema = z
  .object({
    trip_id: z.string(),
    arrival_time: z.string(),
    departure_time: z.string(),
    stop_id: z.string(),
    stop_sequence: intStringSchema,
    stop_headsign: z.string(),
    pickup_type: intStringSchema,
    drop_off_type: intStringSchema,
    shape_dist_traveled: floatStringSchema,
  })
  .readonly();
