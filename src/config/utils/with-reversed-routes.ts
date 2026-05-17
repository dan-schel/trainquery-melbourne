import type { RouteConfig } from "../gtfs/types.js";
import * as tag from "../corequery/lines/service-tags.js";
import { getTagName } from "../../utils/get-tag-name.js";

const reversedTags: Record<number, number> = {
  [tag.CITYBOUND]: tag.OUTBOUND,
  [tag.OUTBOUND]: tag.CITYBOUND,
  [tag.CITY_LOOP_CLOCKWISE]: tag.CITY_LOOP_ANTICLOCKWISE,
  [tag.CITY_LOOP_ANTICLOCKWISE]: tag.CITY_LOOP_CLOCKWISE,

  // Tags which intentionally don't change when reversed. Specified here to
  // differentiate from tags which are missing from this mapping by mistake.
  // For missing tags, `withReversed` will throw an error.
  [tag.DIRECT]: tag.DIRECT,
  [tag.VIA_CITY_LOOP]: tag.VIA_CITY_LOOP,
};

export function withReversedRoutes(
  route: readonly RouteConfig[],
): readonly RouteConfig[] {
  return route.flatMap(withReversedRoute);
}

export function withReversedRoute(route: RouteConfig): readonly RouteConfig[] {
  return [route, buildReversedRoute(route)];
}

function buildReversedRoute(route: RouteConfig): RouteConfig {
  return {
    color: route.color,
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
