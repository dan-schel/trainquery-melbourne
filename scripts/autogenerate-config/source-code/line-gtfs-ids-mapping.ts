import type { LineGtfsIdMappingMetadata } from "../../../src/third-party-id-mapping-types.js";
import { ThirdPartyIdMapping } from "./third-party-id-mapping.js";

export class LineGtfsIdsMapping extends ThirdPartyIdMapping<LineGtfsIdMappingMetadata> {
  protected override formatValue(value: LineGtfsIdMappingMetadata): string {
    const items: string[] = [`lineId: ${value.lineId}`];

    if (value.replacementBus === true) items.push(`replacementBus: true`);

    return `{ ${items.join(", ")} }`;
  }

  protected override getDataTypeName(): string {
    return "LineGtfsIdMapping";
  }

  protected override getConstantName(): string {
    return "lineGtfsIds";
  }
}
