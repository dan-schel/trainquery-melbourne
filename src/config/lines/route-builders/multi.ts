import { type RouteBuilderOutput } from "./utils.js";

type Options = {
  readonly items: readonly RouteBuilderOutput[];

  // TODO: This whole multi pattern is ugly, especially this "lets override the
  // names" thing. Can we find another way/get rid of it. It's used for the
  // metro tunnel lines. Probably also we really need is the routes to be
  // combined, since the metro tunnel is open full-time now.
  readonly diagramNames: readonly string[];
};

export function multi(options: Options): RouteBuilderOutput {
  return {
    routes: options.items.flatMap((item) => item.routes),
    diagram: {
      entries: options.items.flatMap((item, i) =>
        item.diagram.entries.map((entry) => ({
          ...entry,
          name: options.diagramNames[i] ?? null,
        })),
      ),
    },
  };
}
