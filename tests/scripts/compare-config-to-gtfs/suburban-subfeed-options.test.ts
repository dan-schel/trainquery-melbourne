import { describe, expect, it } from "vitest";
import * as line from "../../../src/config/lines/line-ids.js";
import { suburbanSubfeedOptions } from "../../../scripts/compare-config-to-gtfs/suburban-subfeed-options.js";

describe("suburbanSubfeedOptions", () => {
  it("ignores City Circle when it temporarily disappears from GTFS", () => {
    expect(
      suburbanSubfeedOptions.lines?.[line.CITY_CIRCLE]?.ignoreNotFoundInGtfs,
    ).toBe(true);
  });
});
