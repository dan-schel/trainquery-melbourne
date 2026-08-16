// TODO: [DS] This is how IDs are expressed for Melbourne, using terms like
// suburban, regional, platforms, replacement bus, etc. I'd like to keep this
// for trainquery-melbourne, but do a conversion step before passing it to
// corequery-gtfs which should obviously be agnostic to those terms and operate
// at the feed-level.
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
