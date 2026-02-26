export type StopGtfsIdsConfig = Record<number, StopGtfsIdCollectionConfig>;
export type LineGtfsIdsConfig = Record<number, LineAllGtfsIdCollectionConfig>;
export type StopPtvApiIdsConfig = Record<number, StopPtvApiIdCollectionConfig>;
export type LinePtvApiIdsConfig = Record<number, LinePtvApiIdCollectionConfig>;

export type StopGtfsIdCollectionConfig = {
  readonly suburban?: StopGtfsIdCollectionForSubfeedConfig;
  readonly regional?: StopGtfsIdCollectionForSubfeedConfig;
};

export type StopGtfsIdCollectionForSubfeedConfig = {
  readonly parent: string;
  readonly general?: readonly string[];
  readonly platforms?: Readonly<Record<number, readonly string[]>>;
  readonly replacementBus?: readonly string[];
};

export type LineAllGtfsIdCollectionConfig = {
  readonly suburban?: LineAllGtfsIdCollectionForSubfeedConfig;
  readonly regional?: LineAllGtfsIdCollectionForSubfeedConfig;
};

export type LineAllGtfsIdCollectionForSubfeedConfig = {
  readonly primary: string;
  readonly other?: readonly string[];
  readonly replacementBus?: readonly string[];
};

type StopPtvApiIdCollectionConfig = readonly string[];

type LinePtvApiIdCollectionConfig = readonly string[];
