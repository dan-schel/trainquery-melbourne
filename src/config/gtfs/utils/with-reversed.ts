import type { RouteConfig } from "../types.js";
import * as tag from "../../corequery/lines/service-tags.js";
import { getTagName } from "../../../utils/get-tag-name.js";

const reversedTags: Record<number, number> = {
  [tag.CITYBOUND]: tag.OUTBOUND,
  [tag.OUTBOUND]: tag.CITYBOUND,
  [tag.CLOCKWISE]: tag.ANTICLOCKWISE,
  [tag.ANTICLOCKWISE]: tag.CLOCKWISE,

  // Tags which intentionally don't change when reversed. Specified here to
  // differentiate from tags which are missing from this mapping by mistake.
  // For missing tags, `withReversed` will throw an error.
  [tag.DIRECT]: tag.DIRECT,
  [tag.VIA_CITY_LOOP]: tag.VIA_CITY_LOOP,
};

export function withReversed(route: RouteConfig): RouteConfig {
  return {
    stops: [...route.stops].reverse(),

    serviceTags: route.serviceTags.map((tag) => {
      const reversedTag = reversedTags[tag];
      if (reversedTag == null) {
        throw new Error(`Unknown tag ${getTagName(tag, "service") ?? tag}.`);
      }
      return reversedTag;
    }),
  };
}
