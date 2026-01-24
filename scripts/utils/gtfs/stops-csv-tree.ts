import { isPresent, unique } from "@dan-schel/js-utils";
import type {
  StopsCsv,
  StopsCsvRow,
} from "../../../src/gtfs/schedule/csv-schemas.js";
import type { Subfeed } from "../../../src/gtfs/schedule/utils/subfeed.js";
import type { GtfsData } from "../../../src/gtfs/schedule/read-gtfs.js";

export type StopsCsvTreeNode = StopsCsvRow & {
  readonly children: readonly StopsCsvTreeNode[];
  readonly subfeeds: readonly Subfeed[];
};

export class StopsCsvTree {
  constructor(readonly nodes: readonly StopsCsvTreeNode[]) {}

  setSubfeed(subfeed: Subfeed): StopsCsvTree {
    return new StopsCsvTree(
      StopsCsvTree._setSubfeedOnNodes(subfeed, this.nodes),
    );
  }

  static fromGtfsData(data: GtfsData) {
    return StopsCsvTree.merge(
      StopsCsvTree.build(data.suburban.stops).setSubfeed("suburban"),
      StopsCsvTree.build(data.regional.stops).setSubfeed("regional"),
    );
  }

  static build(rows: StopsCsv): StopsCsvTree {
    type MutableStopsCsvTreeNode = StopsCsvRow & {
      readonly children: MutableStopsCsvTreeNode[];
      readonly subfeeds: readonly Subfeed[];
    };

    const tree = new Map<string, MutableStopsCsvTreeNode>();
    for (const row of rows) {
      tree.set(row.stop_id, { ...row, children: [], subfeeds: [] });
    }

    for (const node of tree.values()) {
      if (node.parent_station === "") continue;

      const parentNode = tree.get(node.parent_station);
      if (parentNode == null) throw new Error(`Orphaned node: ${node.stop_id}`);

      parentNode.children.push(node);
    }

    const nodes = Array.from(tree.values());
    const topLevelNodes = nodes.filter((n) => n.parent_station === "");
    return new StopsCsvTree(topLevelNodes);
  }

  static merge(a: StopsCsvTree, b: StopsCsvTree): StopsCsvTree {
    return new StopsCsvTree(StopsCsvTree._mergeNodeLists(a.nodes, b.nodes));
  }

  private static _setSubfeedOnNodes(
    subfeed: Subfeed,
    nodes: readonly StopsCsvTreeNode[],
  ): StopsCsvTreeNode[] {
    return nodes.map((node) => ({
      ...node,
      children: StopsCsvTree._setSubfeedOnNodes(subfeed, node.children),
      subfeeds: [subfeed],
    }));
  }

  private static _mergeNodeLists(
    a: readonly StopsCsvTreeNode[],
    b: readonly StopsCsvTreeNode[],
  ): StopsCsvTreeNode[] {
    const map = new Map<string, StopsCsvTreeNode>();

    for (const node of a) {
      map.set(node.stop_id, node);
    }

    for (const node of b) {
      const existingNode = map.get(node.stop_id);
      if (existingNode != null) {
        const mergedNode = StopsCsvTree._mergeLikeNodes(existingNode, node);
        map.set(node.stop_id, mergedNode);
      } else {
        map.set(node.stop_id, node);
      }
    }

    return Array.from(map.values());
  }

  private static _mergeLikeNodes(
    a: StopsCsvTreeNode,
    b: StopsCsvTreeNode,
  ): StopsCsvTreeNode {
    const children = StopsCsvTree._mergeNodeLists(a.children, b.children);
    const betterNode = StopsCsvTree._selectBetterNode(a, b);
    return {
      ...betterNode,
      children,
      subfeeds: unique<Subfeed>([...a.subfeeds, ...b.subfeeds]),
    };
  }

  private static _selectBetterNode(a: StopsCsvTreeNode, b: StopsCsvTreeNode) {
    // Prefer nodes with a platform code defined.
    if (isPresent(a.platform_code) && !isPresent(b.platform_code)) return a;
    if (isPresent(b.platform_code) && !isPresent(a.platform_code)) return b;

    return a;
  }
}
