export type LinePtvApiIdMapping = Record<string, number>;
export type StopPtvApiIdMapping = Record<string, number>;
export type StopGtfsIdMapping = Record<string, StopGtfsIdMappingMetadata>;

export type StopGtfsIdMappingMetadata = {
  stopId: number;
  positionId?: number | null;
  replacementBus?: boolean;
};
