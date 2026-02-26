export type StopGtfsIdsConfig = Record<number, StopGtfsIdsBySubfeedConfig>;
export type LineGtfsIdsConfig = Record<number, LineGtfsIdsBySubfeedConfig>;
export type StopPtvApiIdsConfig = Record<number, StopPtvApiIdCollectionConfig>;
export type LinePtvApiIdsConfig = Record<number, LinePtvApiIdCollectionConfig>;

export type StopGtfsIdsBySubfeedConfig = {
  readonly suburban?: StopGtfsIdCollectionConfig;
  readonly regional?: StopGtfsIdCollectionConfig;
};

export type LineGtfsIdsBySubfeedConfig = {
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

type StopPtvApiIdCollectionConfig = readonly string[];

type LinePtvApiIdCollectionConfig = readonly string[];
