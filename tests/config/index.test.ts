import { describe, it, expect } from "vitest";
import { lintConfig, type LintOptions } from "corequery";
import { lintableConfig } from "../../src/config/index.js";

const options: LintOptions = {};

describe("config", () => {
  it("passes CoreQuery linting", () => {
    expect(lintConfig(lintableConfig, options)).toStrictEqual([]);
  });
});
