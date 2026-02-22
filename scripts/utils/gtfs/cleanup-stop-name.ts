export function cleanupStopName(name: string): string {
  return name.trim().replace(/( Railway)? Station$/g, "");
}
