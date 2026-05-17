import { type RouteBuilderOutput } from "./utils.js";

type Options = {
  readonly input: RouteBuilderOutput;
  readonly tags: readonly number[];
};

export function addRouteTags(options: Options): RouteBuilderOutput {
  return {
    routes: options.input.routes.map((route) => ({
      ...route,
      tags: [...route.tags, ...options.tags],
    })),
    diagram: options.input.diagram,
  };
}
