export type DeparturesSearchDirection = "forwards" | "backwards";

export interface IDeparturesIterator<T> {
  set(instant: Temporal.Instant, direction: DeparturesSearchDirection): void;

  // TODO: We'd be able able to get rid of this if ScheduledDeparturesBlockEntry
  // was a class and could calculate its own (memoized, if necessary) instant.
  getNextValueInstant(): Temporal.Instant | null;

  peek(): T | null;
  take(): T;
}
