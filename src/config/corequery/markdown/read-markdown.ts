import fs from "fs";

export function readMarkdownSync(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}
