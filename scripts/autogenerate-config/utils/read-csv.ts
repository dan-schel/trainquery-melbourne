import fs from "fs";
import csvParser from "csv-parser";
import z from "zod";

export async function readCsv<T extends z.ZodType>(
  path: string,
  schema: T,
): Promise<readonly z.infer<T>[]> {
  return await new Promise((resolve) => {
    const results: z.infer<T>[] = [];
    fs.createReadStream(path)
      .pipe(
        csvParser({
          mapHeaders: ({ header }) => header.trim(),
        }),
      )
      .on("data", (row) => {
        results.push(schema.parse(row));
      })
      .on("end", () => {
        resolve(results);
      });
  });
}
