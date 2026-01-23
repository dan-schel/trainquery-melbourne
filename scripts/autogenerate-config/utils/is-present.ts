export function isPresent(str: string | null | undefined): str is string {
  return str != null && str.length > 0;
}
