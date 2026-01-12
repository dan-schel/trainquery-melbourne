import z from "zod";

export type GtfsFile<T extends z.ZodType> = {
  filePath: string;
  schema: T;
};

const stopsCsvSchema = z.object({
  stop_id: z.string(),
  stop_name: z.string().transform((x) => x.trim()),
  stop_lat: z.string(),
  stop_lon: z.string(),
  parent_station: z.string(),
  platform_code: z.string().optional(),
});

// export type StopsCsv = z.infer<typeof stopsCsvSchema>;

export const STOPS_CSV: GtfsFile<typeof stopsCsvSchema> = {
  filePath: "stops.txt",
  schema: stopsCsvSchema,
};
