import type { StopAndPositionId } from "../../../src/data/third-party-id-mapping-types.js";
import { ThirdPartyIdMapping } from "./third-party-id-mapping.js";

export class StopGtfsIdsMapping extends ThirdPartyIdMapping<StopAndPositionId> {
  protected override formatValue(value: StopAndPositionId): string {
    const positionId = value.positionId === null ? "null" : value.positionId;
    return `{ stopId: ${value.stopId}, positionId: ${positionId} }`;
  }

  protected override getImportCode(): string {
    return 'import type { StopGtfsIdMapping } from "./third-party-id-mapping-types.js";';
  }

  protected override getConstantName(): string {
    return "stopGtfsIds";
  }
}
