import type { LintingContext } from "../linting-context.js";

export function requireStopName(
  lintingContext: LintingContext,
  stopId: number,
): string {
  const stops = lintingContext.lintableConfig.stops;
  const stopConfig = stops.find((s) => s.id === stopId);
  if (stopConfig == null) throw new Error(`Cannot find stop ${stopId}`);
  return stopConfig.name;
}
