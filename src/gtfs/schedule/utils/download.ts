import fs from "fs";
import { Readable } from "stream";
import { ReadableStream } from "stream/web";

export async function download(
  url: string,
  destinationPath: string,
  headers: Record<string, string> = {},
) {
  const response = await fetch(url, { headers: headers });

  await new Promise<void>((resolve, reject) => {
    if (!response.ok) {
      throw new Error(`Got ${response.status} when downloading "${url}".`);
    }
    if (response.body == null) {
      throw new Error(`Failed to download "${url}".`);
    }

    const destination = fs.createWriteStream(destinationPath);
    const stream = Readable.fromWeb(
      response.body as ReadableStream<Uint8Array<ArrayBuffer>>,
    );

    stream.pipe(destination);
    stream.on("error", () => reject(new Error(`Failed to download "${url}".`)));
    destination.on("error", () =>
      reject(new Error(`Failed to download "${url}".`)),
    );
    destination.on("finish", resolve);
  });
}
