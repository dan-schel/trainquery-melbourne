import type { StopGtfsIdMappingMetadata } from "../../../src/data/third-party-id-mapping-types.js";
import { ThirdPartyIdMapping } from "./third-party-id-mapping.js";

export class StopGtfsIdsMapping extends ThirdPartyIdMapping<StopGtfsIdMappingMetadata> {
  protected override formatValue(value: StopGtfsIdMappingMetadata): string {
    const items: string[] = [`stopId: ${value.stopId}`];

    if (value.positionId != null) items.push(`positionId: ${value.positionId}`);
    if (value.replacementBus === true) items.push(`replacementBus: true`);

    return `{ ${items.join(", ")} }`;
  }

  protected override getDataTypeName(): string {
    return "StopGtfsIdMapping";
  }

  protected override getConstantName(): string {
    return "stopGtfsIds";
  }
}
