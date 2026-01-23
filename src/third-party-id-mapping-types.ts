export type LinePtvApiIdMapping = Record<string, number>;

export type StopGtfsIds = {
  readonly parent: string;
  readonly general?: string[];
  readonly platforms?: Readonly<Record<number, readonly string[]>>;
  readonly replacementBus?: string[];
};

export type StopPtvIds = readonly string[];

export type StopGtfsIdMapping = Record<number, StopGtfsIds>;
export type StopPtvApiIdMapping = Record<number, StopPtvIds>;

export type LineGtfsIdMapping = Record<string, LineGtfsIdMappingMetadata>;

export type LineGtfsIdMappingMetadata = {
  lineId: number;
  replacementBus?: boolean;
};
