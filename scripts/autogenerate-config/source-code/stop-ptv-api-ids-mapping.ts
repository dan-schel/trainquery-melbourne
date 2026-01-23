import type { AutogenerationContext } from "../autogeneration-context.js";
import { ThirdPartyIdMapping } from "./third-party-id-mapping.js";

export class StopPtvApiIdsMapping extends ThirdPartyIdMapping<number> {
  protected override _formatValue(
    ctx: AutogenerationContext,
    value: number,
  ): string {
    const stopId = ctx.stopIds.requireById(value);
    return `stop.${stopId.constantName}`;
  }

  protected override _getDataTypeName(): string {
    return "StopPtvApiIdMapping";
  }

  protected override _getConstantName(): string {
    return "stopPtvApiIds";
  }

  protected override _getAdditionalImports(): string[] {
    return ['import * as stop from "./stop-ids.js";'];
  }
}
