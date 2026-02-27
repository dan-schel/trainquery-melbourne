import { assert, describe, it } from "vitest";
import fsp from "fs/promises";
import { parseIntThrow } from "@dan-schel/js-utils";

describe("constants source code files", () => {
  it("each constant value matches the source code line number", async () => {
    // Test ensures the constant values align perfectly with the source code's
    // line numbers. The idea is that values are never removed from the file,
    // just commented out so it's clear in the future why a number was skipped,
    // and that it shouldn't ever be added back (unless it's semantically
    // equivalent and safe to do so, I guess).
    //
    // The purpose of using numeric IDs (e.g. as opposed to slugs) is so they're
    // completely arbitrary and meaningless. There should be no desired to
    // organise them, and therefore they can remain consistent across time, and
    // happily stored in the DB or a user's local storage for long periods.

    const idFiles = [
      "src/config/lines/line-ids.ts",
      "src/config/lines/line-tags.ts",
      "src/config/lines/route-ids.ts",
      "src/config/lines/route-tags.ts",
      "src/config/stops/stop-ids.ts",
      "src/config/stops/stop-tags.ts",
      "src/config/stops/stop-position-ids.ts",
    ];

    const offsets: Record<string, number> = {
      "src/config/stops/stop-position-ids.ts": 50,
    };

    for (const file of idFiles) {
      const text = await fsp.readFile(file, "utf-8");
      const lines = text.split("\n");

      lines.forEach((line, i) => {
        const match = line.match(
          /^(\/\/ \[REMOVED\] |\/\*\* @knipignore \*\/ )?export const [A-Z0-9_]+ = ([0-9]+);( (-|\/\/) .*)?$|^$|^\/\/ \[NOTE\] /,
        );

        if (match == null) {
          assert(false, `Line ${i + 1} of ${file} is formatted incorrectly.`);
        }

        const value = match[2];
        if (value == null) return; // Not a constant declaration, so ignore.

        if (parseIntThrow(value) !== i + 1 + (offsets[file] ?? 0)) {
          assert(
            false,
            `Line ${i + 1} of ${file} is ${value}, it should be ${i + 1} to align with the line number.`,
          );
        }
      });
    }
  });
});
