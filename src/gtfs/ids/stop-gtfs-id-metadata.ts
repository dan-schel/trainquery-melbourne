export type StopGtfsIdMetadata =
  | ParentStopGtfsIdMetadata
  | GeneralStopGtfsIdMetadata
  | PlatformStopGtfsIdMetadata
  | ReplacementBusStopGtfsIdMetadata;

export type ParentStopGtfsIdMetadata = {
  readonly type: "parent";
  readonly id: string;
  readonly stopId: number;
};

export type GeneralStopGtfsIdMetadata = {
  readonly type: "general";
  readonly id: string;
  readonly stopId: number;
};

export type PlatformStopGtfsIdMetadata = {
  readonly type: "platform";
  readonly id: string;
  readonly stopId: number;
  readonly positionId: number;
};

export type ReplacementBusStopGtfsIdMetadata = {
  readonly type: "replacement-bus";
  readonly id: string;
  readonly stopId: number;
};
