import type { LineGtfsIdMappingMetadata } from "../../../src/config/third-party-id-mapping-types.js";
import type { AutogenerationContext } from "../autogeneration-context.js";
import { ThirdPartyIdMapping } from "./third-party-id-mapping.js";

export class LineGtfsIdsMapping extends ThirdPartyIdMapping<LineGtfsIdMappingMetadata> {
  protected override _formatValue(
    ctx: AutogenerationContext,
    value: LineGtfsIdMappingMetadata,
  ): string {
    const lineId = ctx.lineIds.requireById(value.lineId);
    const items: string[] = [`lineId: line.${lineId.constantName}`];

    if (value.replacementBus === true) items.push(`replacementBus: true`);

    return `{ ${items.join(", ")} }`;
  }

  protected override _getDataTypeName(): string {
    return "LineGtfsIdMapping";
  }

  protected override _getConstantName(): string {
    return "lineGtfsIds";
  }

  protected override _getAdditionalImports(): string[] {
    return ['import * as line from "./line-ids.js";'];
  }
}
