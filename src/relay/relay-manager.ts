import type { GtfsSystem } from "corequery-gtfs";

type RelayManagerFields = {
  relayKey: string;
  suburbanGtfs: GtfsSystem;
  regionalGtfs: GtfsSystem;
};

export class RelayManager {
  readonly suburbanGtfs: GtfsSystem;
  readonly regionalGtfs: GtfsSystem;

  constructor(fields: RelayManagerFields) {
    this.suburbanGtfs = fields.suburbanGtfs;
    this.regionalGtfs = fields.regionalGtfs;
  }

  async init() {
    // Download initial data. Retry X number of times if it fails. Don't return
    // control until data is fetched (or we've given up for that feed).
  }

  start() {
    // Start polling the relay status endpoint every X seconds for updates. If
    // an update is noticed, push it to the relevant GTFS system.
  }

  stop() {}
}
