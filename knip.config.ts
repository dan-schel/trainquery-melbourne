import type { KnipConfig } from "knip";

const config: KnipConfig = {
  tags: ["-knipignore"],
  entry: ["src/index.ts"],
  ignoreDependencies: ["@vitest/coverage-v8"],
};

export default config;
