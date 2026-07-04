// TODO: Move to corequery (this is the abstract class corequery consumers
// extend from and then configure corequery to use).

// TODO: This is the placeholder to match what corequery implements.
export type Departure = {
  stuff: "things";
};

export type DepartureSearchDirection = "forwards" | "backwards";

export abstract class DepartureIterator {
  constructor(
    protected readonly _stopId: number,
    protected readonly _time: Temporal.Instant,
    protected readonly _direction: DepartureSearchDirection,
  ) {}

  abstract take(): Departure | null;
  abstract peek(): Departure | null;
}
