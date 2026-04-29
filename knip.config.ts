import type { KnipConfig } from "knip";

const config: KnipConfig = {
  tags: ["-knipignore"],
  ignoreFiles: ["src/gtfs/schedule/patches/patch-duplicate-stop-times.ts"],
};

export default config;
