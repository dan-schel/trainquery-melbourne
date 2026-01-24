import { describe, it, expect } from "vitest";
import { lintConfig } from "corequery";
import { lintableConfig } from "../../src/config/index.js";

// TODO: Use LintOptions type from corequery repo.
type LintOptions = NonNullable<Parameters<typeof lintConfig>[1]>;

const options: LintOptions = {};

describe("config", () => {
  it("passes linting", () => {
    expect(() => lintConfig(lintableConfig, options)).not.toThrow();
  });
});
