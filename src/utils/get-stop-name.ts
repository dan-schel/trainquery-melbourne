import type { StopConfig } from "corequery";

export function getStopName(stopId: number, stops: readonly StopConfig[]) {
  return stops.find((s) => s.id === stopId)?.name ?? null;
}
