import z from "zod";
import {
  booleanIntegerStringSchema,
  floatStringSchema,
} from "../utils/schema-utils";

export const stopsCsvSchema = z
  .object({
    stop_id: z.string(),
    stop_name: z.string(),
    stop_lat: floatStringSchema,
    stop_lon: floatStringSchema,
    stop_url: z.string(),
    location_type: z.string(),
    parent_station: z.string(),
    wheelchair_boarding: booleanIntegerStringSchema,
    level_id: z.string(),
    platform_code: z.string().optional(),
  })
  .readonly();

export type StopsCsv = readonly z.infer<typeof stopsCsvSchema>[];

// Add other schemas for the other files here as needed.
