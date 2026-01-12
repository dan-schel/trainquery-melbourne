import type { KnipConfig } from "knip";

const config: KnipConfig = {
  tags: ["-knipignore"],
  ignoreDependencies: ["@vitest/coverage-v8"],
};

export default config;
