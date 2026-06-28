import { defineConfig } from "vitest/config";

// TODO: This whole config file can be removed once NodeJS v26 becomes LTS
// (expected in October 2026), as it only exists to add the Temporal polyfill.
export default defineConfig({
  test: {
    setupFiles: ["./tests/setup.ts"],
  },
});
