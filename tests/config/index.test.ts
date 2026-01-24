import { describe, it, expect } from "vitest";
import { lintConfig, LintOptions } from "corequery";
import { lintableConfig } from "../../src/config/index.js";

const options: LintOptions = {};

describe("config", () => {
  it("passes linting", () => {
    expect(() => lintConfig(lintableConfig, options)).not.toThrow();
  });
});
