export function numberWiseSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true });
}
