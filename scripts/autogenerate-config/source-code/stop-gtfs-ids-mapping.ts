import type { StopGtfsIdMappingMetadata } from "../../../src/config/third-party-id-mapping-types.js";
import type { AutogenerationContext } from "../autogeneration-context.js";
import { ThirdPartyIdMapping } from "./third-party-id-mapping.js";

export class StopGtfsIdsMapping extends ThirdPartyIdMapping<StopGtfsIdMappingMetadata> {
  protected override _formatValue(
    ctx: AutogenerationContext,
    value: StopGtfsIdMappingMetadata,
  ): string {
    const stopId = ctx.stopIds.requireById(value.stopId);
    const items: string[] = [`stopId: stop.${stopId.constantName}`];

    if (value.positionId != null) {
      const positionId = ctx.positionIds.requireById(value.positionId);
      items.push(`positionId: position.${positionId.constantName}`);
    }
    if (value.replacementBus === true) items.push(`replacementBus: true`);

    return `{ ${items.join(", ")} }`;
  }

  protected override _getDataTypeName(): string {
    return "StopGtfsIdMapping";
  }

  protected override _getConstantName(): string {
    return "stopGtfsIds";
  }

  protected override _getAdditionalImports(): string[] {
    return [
      'import * as stop from "./stop-ids.js";',
      'import * as position from "./stop-position-ids.js";',
    ];
  }
}
