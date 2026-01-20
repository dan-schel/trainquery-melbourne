export type LinePtvApiIdMapping = Record<string, number>;
export type StopPtvApiIdMapping = Record<string, number>;
export type StopGtfsIdMapping = Record<string, StopAndPositionId>;

export type StopAndPositionId = { stopId: number; positionId: number | null };
