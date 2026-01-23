export type LinePtvApiIdMapping = Record<string, number>;

export type StopPtvApiIdMapping = Record<number, string[]>;

export type StopGtfsIdMapping = Record<
  number,
  {
    parent: string;
    general?: string[];
    platforms?: Record<number, string[]>;
    replacementBus?: string[];
  }
>;

export type LineGtfsIdMapping = Record<string, LineGtfsIdMappingMetadata>;

export type LineGtfsIdMappingMetadata = {
  lineId: number;
  replacementBus?: boolean;
};
