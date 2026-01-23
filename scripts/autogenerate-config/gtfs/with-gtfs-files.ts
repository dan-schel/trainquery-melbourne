import path from "path";
import { withTemporaryDirectory } from "../utils/with-temporary-directory.js";
import { download } from "../utils/download.js";
import { extractZip } from "../utils/extract-zip.js";

const gtfsUrl = "https://vtar.trainquery.com/gtfs.zip";

export type GtfsDirectories = {
  readonly suburban: string;
  readonly regional: string;
};

export async function withGtfsFiles<T>(
  relayKey: string,
  callback: (directories: GtfsDirectories) => Promise<T>,
): Promise<T> {
  return await withTemporaryDirectory(async (tempDir) => {
    const gtfsZipPath = path.join(tempDir, "gtfs.zip");
    const suburbanZipPath = path.join(tempDir, "suburban.zip");
    const regionalZipPath = path.join(tempDir, "regional.zip");
    const suburbanDir = path.join(tempDir, "suburban");
    const regionalDir = path.join(tempDir, "regional");

    await download(gtfsUrl, gtfsZipPath, { "relay-key": relayKey });
    await extractZip(gtfsZipPath, tempDir);
    await extractZip(suburbanZipPath, suburbanDir);
    await extractZip(regionalZipPath, regionalDir);

    return await callback({ suburban: suburbanDir, regional: regionalDir });
  });
}
