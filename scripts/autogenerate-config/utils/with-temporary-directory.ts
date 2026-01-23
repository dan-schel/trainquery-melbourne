import { uuid } from "@dan-schel/js-utils";
import fsp from "fs/promises";
import path from "path";

const temporaryDirectoryPath = "./local/temp";

export async function withTemporaryDirectory<T>(
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
