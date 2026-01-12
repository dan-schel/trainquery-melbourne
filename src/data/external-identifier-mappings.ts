export type LinePtvApiIdMapping = Map<number, number>;
export type StopPtvApiIdMapping = Map<number, number>;
export type StopGtfsIdMapping = Map<number, StopAndPositionId>;

type StopAndPositionId = { stopId: number; positionId: number | null };
