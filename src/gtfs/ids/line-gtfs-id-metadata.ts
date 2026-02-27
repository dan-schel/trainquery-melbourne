export type LineGtfsIdMetadata =
  | PrimaryLineGtfsIdMetadata
  | OtherLineGtfsIdMetadata
  | ReplacementBusLineGtfsIdMetadata;

export type PrimaryLineGtfsIdMetadata = {
  readonly type: "primary";
  readonly id: string;
  readonly lineId: number;
};

export type OtherLineGtfsIdMetadata = {
  readonly type: "other";
  readonly id: string;
  readonly lineId: number;
};

export type ReplacementBusLineGtfsIdMetadata = {
  readonly type: "replacement-bus";
  readonly id: string;
  readonly lineId: number;
};
