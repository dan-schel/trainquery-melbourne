import { type RouteBuilderOutput } from "./utils.js";

type Options = {
  items: readonly RouteBuilderOutput[];
};

export function merge(options: Options): RouteBuilderOutput {
  return {
    routes: options.items.flatMap((item) => item.routes),
    diagram: {
      entries: options.items.flatMap((item) => item.diagram.entries),
    },
  };
}
