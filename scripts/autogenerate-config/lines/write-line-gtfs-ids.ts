import type { LineGtfsIdMappingMetadata } from "../../../src/third-party-id-mapping-types.js";
import type { AutogenerationContext } from "../autogeneration-context.js";
import type { WithId } from "../utils/sync-ids.js";
import type {
  ParsedLine,
  ParsedLineGtfsId,
} from "./extract-lines-from-subfeed.js";

type FullLine = WithId<ParsedLine>;

export function writeLineGtfsIds(
  ctx: AutogenerationContext,
  lines: FullLine[],
) {
  for (const line of lines) {
    for (const gtfsId of line.gtfsIds) {
      ctx.lineGtfsIds.add(
        gtfsId.id,
        createMetadata(line, gtfsId),
        line.name,
        line.id,
        gtfsId.type === "replacement-bus" ? "Replacement bus" : null,
      );
    }
  }
}

function createMetadata(
  line: FullLine,
  gtfsId: ParsedLineGtfsId,
): LineGtfsIdMappingMetadata {
  if (gtfsId.type === "replacement-bus") {
    return { lineId: line.id, replacementBus: true };
  } else {
    return { lineId: line.id };
  }
}
