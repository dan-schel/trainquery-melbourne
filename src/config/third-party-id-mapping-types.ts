export type StopGtfsIdMapping = Record<number, StopGtfsIds>;
export type LineGtfsIdMapping = Record<number, LineGtfsIds>;
export type StopPtvApiIdMapping = Record<number, StopPtvApiIds>;
export type LinePtvApiIdMapping = Record<number, LinePtvApiIds>;

export type StopGtfsIds = {
  readonly parent: string;
  readonly general?: readonly string[];
  readonly platforms?: Readonly<Record<number, readonly string[]>>;
  readonly replacementBus?: readonly string[];
};
type LineGtfsIds = {
  readonly primary: string;
  readonly other?: readonly string[];
  readonly replacementBus?: readonly string[];
};
type StopPtvApiIds = readonly string[];
type LinePtvApiIds = readonly string[];
