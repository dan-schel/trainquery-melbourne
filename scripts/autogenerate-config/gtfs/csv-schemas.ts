import z from "zod";
import { floatStringSchema } from "../utils/schema-utils.js";

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
    route_type: z.string(),
    route_color: z.string(),
    route_text_color: z.string(),
  })
  .readonly();
