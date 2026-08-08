export type DeparturesSearchDirection = "forwards" | "backwards";

export interface IDeparturesIterator<T> {
  set(instant: Temporal.Instant, direction: DeparturesSearchDirection): void;
  getNextValueInstant(): Temporal.Instant | null;
  peek(): T | null;
  take(): T;
}
