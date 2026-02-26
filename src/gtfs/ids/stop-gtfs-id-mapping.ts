import { parseIntThrow } from "@dan-schel/js-utils";
import type { StopGtfsIdsConfig } from "../../config/third-party-id-mapping-types.js";
import type { Subfeed } from "../schedule/utils/subfeed.js";
import type { StopGtfsIdMetadata } from "./stop-gtfs-id-metadata.js";
import { StopGtfsIdCollection } from "./stop-gtfs-id-collection.js";

type FromStopIdMapping = Map<number, StopGtfsIdCollection>;
type FromGtfsIdMapping = Map<string, StopGtfsIdMetadata>;

export class StopGtfsIdMapping {
  private _fromStopIdMapping: FromStopIdMapping;
  private _fromGtfsIdMapping: FromGtfsIdMapping;

  constructor(fromStopIdMapping: FromStopIdMapping) {
    this._fromStopIdMapping = fromStopIdMapping;
    this._fromGtfsIdMapping =
      StopGtfsIdMapping._reverseMapping(fromStopIdMapping);
  }

  tryResolve(gtfsId: string): StopGtfsIdMetadata | null {
    return this._fromGtfsIdMapping.get(gtfsId) ?? null;
  }

  resolveOrThrow(gtfsId: string): StopGtfsIdMetadata {
    const result = this.tryResolve(gtfsId);
    if (result == null) throw new Error(`GTFS ID "${gtfsId}" not mapped.`);
    return result;
  }

  getForStop(stopId: number): StopGtfsIdCollection | null {
    return this._fromStopIdMapping.get(stopId) ?? null;
  }

  requireForStop(stopId: number): StopGtfsIdCollection {
    const result = this.getForStop(stopId);
    if (result == null) throw new Error(`No GTFS IDs for stop ${stopId}.`);
    return result;
  }

  static build(config: StopGtfsIdsConfig, subfeed: Subfeed): StopGtfsIdMapping {
    const result = new Map<number, StopGtfsIdCollection>();

    for (const [stopIdStr, gtfsIdsBySubfeed] of Object.entries(config)) {
      const stopId = parseIntThrow(stopIdStr);
      const gtfsIds = gtfsIdsBySubfeed[subfeed];

      // This stop might not have IDs for this subfeed.
      if (gtfsIds != null) {
        result.set(stopId, StopGtfsIdCollection.build(stopId, gtfsIds));
      }
    }

    return new StopGtfsIdMapping(result);
  }

  private static _reverseMapping(
    fromStopIdMapping: FromStopIdMapping,
  ): FromGtfsIdMapping {
    const result = new Map<string, StopGtfsIdMetadata>();

    for (const gtfsIdCollection of fromStopIdMapping.values()) {
      for (const gtfsId of gtfsIdCollection.all()) {
        result.set(gtfsId.id, gtfsId);
      }
    }

    return result;
  }
}
