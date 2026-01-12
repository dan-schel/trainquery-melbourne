import fs from "fs";
import { Readable } from "stream";
import { ReadableStream } from "stream/web";
import AdmZip from "adm-zip";
import { uuid } from "@dan-schel/js-utils";
import fsp from "fs/promises";
import path from "path";

const temporaryDirectoryPath = "./local/temp";
const gtfsUrl = "https://vtar.trainquery.com/gtfs.zip";

export async function withGtfsData<T>(
  relayKey: string,
  callback: (data: { regionalDir: string; suburbanDir: string }) => Promise<T>,
): Promise<T> {
  return await withTemporaryDirectory(async (tempDir) => {
    const gtfsZipPath = path.join(tempDir, "gtfs.zip");
    const regionalZipPath = path.join(tempDir, "regional.zip");
    const suburbanZipPath = path.join(tempDir, "suburban.zip");
    const regionalDir = path.join(tempDir, "regional");
    const suburbanDir = path.join(tempDir, "suburban");

    await download(gtfsUrl, gtfsZipPath, { "relay-key": relayKey });
    await extractZip(gtfsZipPath, tempDir);
    await extractZip(regionalZipPath, regionalDir);
    await extractZip(suburbanZipPath, suburbanDir);

    return await callback({ regionalDir, suburbanDir });
  });
}

async function withTemporaryDirectory<T>(
  callback: (tempDir: string) => Promise<T>,
): Promise<T> {
  const tempDir = path.join(temporaryDirectoryPath, uuid());
  await fsp.mkdir(tempDir, { recursive: true });

  try {
    return await callback(tempDir);
  } finally {
    await fsp.rm(tempDir, { recursive: true, force: true });
  }
}

async function download(
  url: string,
  destinationPath: string,
  headers: Record<string, string> = {},
) {
  const response = await fetch(url, { headers: headers });

  await new Promise<void>((resolve, reject) => {
    if (response.body == null) {
      throw new Error(`Failed to download "${url}".`);
    }

    const destination = fs.createWriteStream(destinationPath);
    const stream = Readable.fromWeb(
      response.body as ReadableStream<Uint8Array<ArrayBuffer>>,
    );

    stream.pipe(destination);
    stream.on("error", () => reject());
    destination.on("error", () => reject());
    destination.on("finish", resolve);
  });
}

async function extractZip(zipPath: string, location: string): Promise<void> {
  const zip = new AdmZip(zipPath);

  await new Promise<void>((resolve, reject) => {
    zip.extractAllToAsync(location, true, false, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
