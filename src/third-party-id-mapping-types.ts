export type StopGtfsIds = {
  readonly parent: string;
  readonly general?: readonly string[];
  readonly platforms?: Readonly<Record<number, readonly string[]>>;
  readonly replacementBus?: readonly string[];
};

export type LineGtfsIds = {
  readonly primary: string;
  readonly other?: readonly string[];
  readonly replacementBus?: readonly string[];
};

export type StopPtvApiIds = readonly string[];

export type LinePtvApiIds = readonly string[];

export type StopGtfsIdMapping = Record<number, StopGtfsIds>;
export type LineGtfsIdMapping = Record<number, LineGtfsIds>;
export type StopPtvApiIdMapping = Record<number, StopPtvApiIds>;
export type LinePtvIdMapping = Record<number, LinePtvApiIds>;
