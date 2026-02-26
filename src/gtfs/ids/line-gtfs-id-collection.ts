import type { LineGtfsIdMetadata } from "./line-gtfs-id-metadata.js";
import type { LineGtfsIdCollectionForSubfeedConfig } from "../../config/third-party-id-mapping-types.js";

export class LineGtfsIdCollection {
  constructor(
    readonly lineId: number,
    readonly primary: string,
    readonly other: readonly string[],
    readonly replacementBus: readonly string[],
  ) {}

  all(): LineGtfsIdMetadata[] {
    return [
      {
        type: "primary",
        id: this.primary,
        lineId: this.lineId,
      },

      ...this.other.map((id) => ({
        type: "other" as const,
        id,
        lineId: this.lineId,
      })),

      ...this.replacementBus.map((id) => ({
        type: "replacement-bus" as const,
        id,
        lineId: this.lineId,
      })),
    ];
  }

  static build(
    stopId: number,
    gtfsIdsForSubfeed: LineGtfsIdCollectionForSubfeedConfig,
  ) {
    return new LineGtfsIdCollection(
      stopId,
      gtfsIdsForSubfeed.primary,
      gtfsIdsForSubfeed.other ?? [],
      gtfsIdsForSubfeed.replacementBus ?? [],
    );
  }
}
