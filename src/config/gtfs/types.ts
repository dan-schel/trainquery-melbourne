import type { Color } from "corequery";

export type StopGtfsIdsConfig = Record<number, StopGtfsIdsBySubfeedConfig>;
export type LineGtfsIdsConfig = Record<number, LineGtfsIdsBySubfeedConfig>;

type StopGtfsIdsBySubfeedConfig = {
  readonly suburban?: StopGtfsIdCollectionConfig;
  readonly regional?: StopGtfsIdCollectionConfig;
};

type LineGtfsIdsBySubfeedConfig = {
  readonly suburban?: LineGtfsIdCollectionConfig;
  readonly regional?: LineGtfsIdCollectionConfig;
};

export type StopGtfsIdCollectionConfig = {
  readonly parent: string;
  readonly general?: readonly string[];
  readonly platforms?: Readonly<Record<number, readonly string[]>>;
  readonly replacementBus?: readonly string[];
};

export type LineGtfsIdCollectionConfig = {
  readonly primary: string;
  readonly other?: readonly string[];
  readonly replacementBus?: readonly string[];
};

export type LineRoutesConfig = Record<number, readonly RouteConfig[]>;

export type RouteConfig = {
  readonly color: Color;
  readonly stops: readonly RouteStopConfig[];
  readonly serviceTags: readonly number[];
};

export type RouteStopConfig = {
  readonly stopId: number;
  readonly collapseInStoppingPatterns: boolean;
};
