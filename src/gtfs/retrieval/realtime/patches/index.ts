import type { RealtimeFeed } from "../realtime-json-schemas.js";
import { patchArrivalTimeBeforeDeparture } from "./patch-arrival-time-before-departure.js";

type Patch = (realtimeFeed: RealtimeFeed) => RealtimeFeed;

const activePatches: Patch[] = [patchArrivalTimeBeforeDeparture];

export function applyPatches(realtimeFeed: RealtimeFeed): RealtimeFeed {
  return activePatches.reduce((data, patch) => patch(data), realtimeFeed);
}
