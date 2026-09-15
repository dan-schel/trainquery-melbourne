import { nonNull } from "@dan-schel/js-utils";
import type { FullStopTimesCsv } from "../../../../src/gtfs/retrieval/schedule/csv-schemas.js";

export class StoppingPattern {
  constructor(readonly stops: number[]) {}

  getKey() {
    return this.stops.join(",");
  }

  format(getStopName: (stopId: number) => string | null) {
    return this.stops
      .map((s) => `${getStopName(s) ?? "???"} (#${s})`)
      .join(" → ");
  }

  static create({
    stopTimes,
    stopIdMapping,
    onUnmappedGtfsStopIdInUse,
  }: {
    stopTimes: FullStopTimesCsv;
    stopIdMapping: Map<string, number>;
    onUnmappedGtfsStopIdInUse: (gtfsId: string) => void;
  }): StoppingPattern {
    const stops = stopTimes
      .map((x) => {
        const stopId = stopIdMapping.get(x.stop_id);
        if (stopId != null) return stopId;

        onUnmappedGtfsStopIdInUse(x.stop_id);
        return null;
      })
      .filter(nonNull);

    return new StoppingPattern(stops);
  }
}
