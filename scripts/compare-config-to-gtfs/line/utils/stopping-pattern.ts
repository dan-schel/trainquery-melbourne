import { nonNull } from "@dan-schel/js-utils";
import type { StopGtfsIdMapping } from "../../../../src/gtfs/ids/stop-gtfs-id-mapping.js";
import type { StopTimesCsv } from "../../../../src/gtfs/schedule/csv-schemas.js";

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
    stopTimes: StopTimesCsv;
    stopIdMapping: StopGtfsIdMapping;
    onUnmappedGtfsStopIdInUse: (gtfsId: string) => void;
  }): StoppingPattern {
    const stops = stopTimes
      .map((x) => {
        const stopId = stopIdMapping.tryResolve(x.stop_id)?.stopId ?? null;
        if (stopId != null) return stopId;

        onUnmappedGtfsStopIdInUse(x.stop_id);
        return null;
      })
      .filter(nonNull);

    return new StoppingPattern(stops);
  }
}
