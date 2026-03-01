import type { StoppingPattern } from "./stopping-pattern.js";
import type { Trip } from "./trip.js";

export type UniqueStoppingPattern = {
  readonly pattern: StoppingPattern;
  readonly tripCount: number;
  readonly exampleTripId: string;
  readonly exampleRouteId: string;
};

export class UniqueStoppingPatternTracker {
  private _patterns: Map<string, UniqueStoppingPattern>;

  constructor() {
    this._patterns = new Map();
  }

  all() {
    return Array.from(this._patterns.values());
  }

  consider(trip: Trip) {
    const key = trip.pattern.getKey();
    const existingEntry = this._patterns.get(key);

    if (existingEntry == null) {
      this._patterns.set(key, {
        pattern: trip.pattern,
        exampleTripId: trip.tripId,
        exampleRouteId: trip.routeId,
        tripCount: 1,
      });
    } else {
      this._patterns.set(key, {
        ...existingEntry,
        tripCount: existingEntry.tripCount + 1,
      });
    }
  }

  static process(trips: readonly Trip[]) {
    const tracker = new UniqueStoppingPatternTracker();

    for (const trip of trips) {
      tracker.consider(trip);
    }

    return tracker.all();
  }
}
