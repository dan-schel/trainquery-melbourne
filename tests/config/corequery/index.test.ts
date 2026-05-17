import { describe, it, expect } from "vitest";
import { lintConfig, type LintOptions } from "corequery";
import { lintableConfig } from "../../../src/config/corequery/index.js";
import * as line from "../../../src/config/corequery/lines/line-ids.js";

const options: LintOptions = {
  linesPage: {
    [line.CITY_CIRCLE]: {
      // The City Circle line is a bit of a hidden line that doesn't need to
      // appear on the lines page.
      ignoreUnlistedLine: true,
    },
  },
};

describe("config", () => {
  it("passes CoreQuery linting", () => {
    expect(lintConfig(lintableConfig, options)).toStrictEqual([]);
  });
});
