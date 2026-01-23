export type LinePtvApiIdMapping = Record<string, number>;

export type StopPtvApiIdMapping = Record<string, number>;

export type StopGtfsIdMapping = Record<
  number,
  {
    parent: string[];
    [stopPositionId: number]: string[];
    unknownPlatform?: string[];
    replacementBus?: string[];
  }
>;

export type LineGtfsIdMapping = Record<string, LineGtfsIdMappingMetadata>;

// TODO: Remove this.
export type StopGtfsIdMappingMetadata = {
  stopId: number;
  positionId?: number | null;
  replacementBus?: boolean;
};

export type LineGtfsIdMappingMetadata = {
  lineId: number;
  replacementBus?: boolean;
};
