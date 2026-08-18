import type { KnipConfig } from "knip";

const config: KnipConfig = {
  tags: ["-knipignore"],

  // TODO: Remove this.
  ignoreIssues: {
    "src/gtfs/temp-script.ts": ["files"],
    "src/gtfs/retrieval/realtime/fetch-gtfs-realtime.ts": ["exports"],
  },
};

export default config;
