import { ThirdPartyIdMapping } from "./third-party-id-mapping.js";

export class StopPtvApiIdsMapping extends ThirdPartyIdMapping<number> {
  protected override formatValue(value: number): string {
    return value.toFixed();
  }

  protected override getDataTypeName(): string {
    return "StopPtvApiIdMapping";
  }

  protected override getConstantName(): string {
    return "stopPtvApiIds";
  }
}
