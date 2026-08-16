import { GtfsSystem } from "../../../../../src/gtfs/corequery-gtfs/gtfs-system.js";
import path from "path";

export function createGtfsSystemForIntegrationTest(dirname: string) {
  const configJsonPath = path.join(dirname, "config.json");
  const realtimeJsonPath = path.join(dirname, "gtfs", "realtime.json");
  const scheduleCsvsPath = path.join(dirname, "gtfs");

  // I'm gonna have to duplicate the zod stuff inside here I guess. It's just
  // for the test fixture, so I think it's okay.

  const system = GtfsSystem.build("test", config);
  system.onNewScheduleData();
  return system;
}
