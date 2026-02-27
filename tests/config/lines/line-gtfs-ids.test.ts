import { describe, it } from "vitest";
import { expectedSortedSourceCode } from "../support/expect-sorted-source-code.js";

describe("lineGtfsIds", () => {
  it("are listed alphabetically", async () => {
    await expectedSortedSourceCode(
      "src/config/lines/line-gtfs-ids.ts",
      /^  \[([^\]]+)\]:/,
      (match) => match[1],
    );
  });
});
