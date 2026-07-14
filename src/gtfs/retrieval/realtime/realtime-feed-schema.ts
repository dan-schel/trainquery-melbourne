import { z } from "zod";
import {
  floatStringSchema,
  gtfsDateSchema,
  gtfsStopTimeSchema,
} from "../../utils/zod.js";

// This schema is designed to be a strict subset of the GTFS-RT spec itself.
// Even the fields we actually rely on in practice must be marked as optional if
// they can be optional in the spec, because otherwise PTV could start
// publishing a small of trip updates (or whatever) which take advantage of
// features we don't support, and we'd have no method of gracefully handling it.
//
// In situations like this, we want to be able to log the strange new format
// we're seeing, but still continue processing the data we DO know how to
// handle. e.g. If PTV starts using GTFS-RT to publish added adhoc trips, we
// wouldn't want that to crash our ability to mark scheduled trips as delayed.

export type TripDescriptorJson = z.infer<typeof tripDescriptorSchema>;
const tripDescriptorSchema = z
  .object({
    tripId: z.string().optional(),
    startTime: gtfsStopTimeSchema.optional(),
    startDate: gtfsDateSchema.optional(),
    scheduleRelationship: z.string().optional(),
    routeId: z.string().optional(),
  })
  .readonly();

export type UpdatedTimeJson = z.infer<typeof updatedTimeJson>;
const updatedTimeJson = z
  .object({
    delay: z.number().optional(),
    time: floatStringSchema.optional(),
  })
  .readonly();

export type StopTimeUpdateJson = z.infer<typeof stopTimeUpdateSchema>;
const stopTimeUpdateSchema = z
  .object({
    stopSequence: z.number().optional(),
    arrival: updatedTimeJson.optional(),
    departure: updatedTimeJson.optional(),
    stopId: z.string().optional(),
    scheduleRelationship: z.string().default("SCHEDULED"),
  })
  .readonly();

export type TripUpdateJson = z.infer<typeof tripUpdateSchema>;
const tripUpdateSchema = z
  .object({
    trip: tripDescriptorSchema,
    stopTimeUpdate: stopTimeUpdateSchema.array().optional(),
  })
  .readonly();

export type RealtimeFeedJson = z.infer<typeof realtimeFeedSchema>;
export const realtimeFeedSchema = z
  .object({
    tripUpdates: tripUpdateSchema.array().default([]),
  })
  .readonly();
