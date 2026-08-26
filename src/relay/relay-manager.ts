import { type GtfsSystem, GtfsFeed } from "corequery-gtfs";
import z from "zod";
import { withGtfsCsvs } from "../gtfs/retrieval/schedule/with-gtfs-csvs.js";
import { readGtfsCsvs } from "../gtfs/retrieval/schedule/read-gtfs-csvs.js";
import { fetchGtfsRealtime } from "../gtfs/retrieval/realtime/fetch-gtfs-realtime.js";
import { itsOk, listifyAnd } from "@dan-schel/js-utils";
import type { Trainquery } from "../index.js";

type RelayManagerFields = {
  ctx: Trainquery;
  relayKey: string;

  suburbanGtfs: GtfsSystem;
  regionalGtfs: GtfsSystem;

  relayPollIntervalSeconds: number;
  initialRetryIntervalsSeconds: number[];
};

type RelayStatus = z.infer<typeof relayStatusSchema>;
const relayStatusSchema = z.object({
  gtfs: z.object({
    hash: z.string(),
  }),
  gtfsRealtimeSuburban: z.object({
    hash: z.string(),
  }),
  gtfsRealtimeRegional: z.object({
    hash: z.string(),
  }),
});

// TODO: The hash watcher stuff is a bit of a mess at the moment (i.e. the logic
// is hard to follow).

export class RelayManager {
  readonly suburbanGtfs: GtfsSystem;
  readonly regionalGtfs: GtfsSystem;

  private readonly _ctx: Trainquery;
  private readonly _relayKey: string;
  private readonly _relayPollIntervalSeconds: number;
  private readonly _initialRetryIntervalsSeconds: number[];

  private readonly _hashWatcher: HashWatcher;
  private _timeoutId: NodeJS.Timeout | null;

  constructor(fields: RelayManagerFields) {
    this.suburbanGtfs = fields.suburbanGtfs;
    this.regionalGtfs = fields.regionalGtfs;

    this._ctx = fields.ctx;
    this._relayKey = fields.relayKey;
    this._relayPollIntervalSeconds = fields.relayPollIntervalSeconds;
    this._initialRetryIntervalsSeconds = fields.initialRetryIntervalsSeconds;

    this._hashWatcher = new HashWatcher({
      // If/when the relay is modified to serve the two GTFS schedule feeds
      // separately, then we can create two separate hash watchers like we do
      // for realtime.
      gtfs: {
        extractHash: (relayStatus) => relayStatus.gtfs.hash,
        onStartup: () => this._onGtfsScheduleStartup(),
        onHashChanged: () => this._onGtfsScheduleHashChanged(),
      },

      gtfsRealtimeSuburban: {
        extractHash: (relayStatus) => relayStatus.gtfsRealtimeSuburban.hash,
        onStartup: () => this._onSuburbanGtfsRealtimeStartup(),
        onHashChanged: () => this._onSuburbanGtfsRealtimeHashChanged(),

        // When the GTFS schedule updates, we already refetch realtime data as
        // part of it, so no need (would always happen on startup).
        skipIfUpdated: ["gtfs"],
      },

      gtfsRealtimeRegional: {
        extractHash: (relayStatus) => relayStatus.gtfsRealtimeRegional.hash,
        onStartup: () => this._onRegionalGtfsRealtimeStartup(),
        onHashChanged: () => this._onRegionalGtfsRealtimeHashChanged(),
        skipIfUpdated: ["gtfs"],
      },
    });

    this._timeoutId = null;
  }

  private get _relayLogger() {
    return this._ctx.custom.trainqueryLogger.relayManager;
  }

  async init() {
    // TODO: Corequery will need to be configured to display a banner if
    // initialization fails.

    const relayStatus = await this._withRetries(() => this._fetchRelayStatus());
    await Promise.allSettled(this._hashWatcher.onStartup(relayStatus));

    if (this.suburbanGtfs.getFeed() == null) {
      this.suburbanGtfs.setFeed(GtfsFeed.empty);
    }
    if (this.regionalGtfs.getFeed() == null) {
      this.regionalGtfs.setFeed(GtfsFeed.empty);
    }
  }

  start() {
    if (this._timeoutId != null) throw new Error("Already started.");

    this._timeoutId = setInterval(
      () => this._onTick(),
      this._relayPollIntervalSeconds * 1000,
    );
  }

  stop() {
    if (this._timeoutId == null) throw new Error("Already stopped.");

    clearInterval(this._timeoutId);
    this._timeoutId = null;
  }

  private _onTick() {
    this._updateRelayStatus().catch((e) => {
      this._relayLogger.updateRelayStatusError(e);
    });
  }

  private _onGtfsScheduleHashChanged() {
    void this._updateGtfsSchedule().catch((e) => {
      this._relayLogger.updateGtfsScheduleError(e);
    });
  }

  private async _onGtfsScheduleStartup() {
    await this._withRetries(() => this._updateGtfsSchedule());
  }

  private _onSuburbanGtfsRealtimeHashChanged() {
    void this._updateSuburbanGtfsRealtime().catch((e) => {
      this._relayLogger.updateSuburbanGtfsRealtimeError(e);
    });
  }

  private async _onSuburbanGtfsRealtimeStartup() {
    await this._withRetries(() => this._updateSuburbanGtfsRealtime());
  }

  private _onRegionalGtfsRealtimeHashChanged() {
    void this._updateRegionalGtfsRealtime().catch((e) => {
      this._ctx.custom.trainqueryLogger.relayManager.updateRegionalGtfsRealtimeError(
        e,
      );
    });
  }

  private async _onRegionalGtfsRealtimeStartup() {
    await this._withRetries(() => this._updateRegionalGtfsRealtime());
  }

  private async _updateRelayStatus() {
    this._hashWatcher.onNewRelayStatus(await this._fetchRelayStatus());
  }

  private async _fetchRelayStatus() {
    const url = "https://vtar.trainquery.com/status.json";
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Got ${res.status} error fetching "${url}".`);

    return relayStatusSchema.parse(await res.json());
  }

  private async _updateGtfsSchedule() {
    const gtfsData = await withGtfsCsvs(this._relayKey, readGtfsCsvs);
    const suburbanGtfs = await fetchGtfsRealtime(this._relayKey, "suburban");
    const regionalGtfs = await fetchGtfsRealtime(this._relayKey, "regional");

    this.suburbanGtfs.onNewScheduleData(gtfsData.suburban, suburbanGtfs);
    this.regionalGtfs.onNewScheduleData(gtfsData.regional, regionalGtfs);
    this._relayLogger.refreshedGtfsSchedule();
  }

  private async _updateSuburbanGtfsRealtime() {
    const suburbanGtfs = await fetchGtfsRealtime(this._relayKey, "suburban");

    this.suburbanGtfs.onNewRealtimeData(suburbanGtfs);
    this._relayLogger.refreshedSuburbanGtfsRealtime();
  }

  private async _updateRegionalGtfsRealtime() {
    const regionalGtfs = await fetchGtfsRealtime(this._relayKey, "regional");

    this.suburbanGtfs.onNewRealtimeData(regionalGtfs);
    this._relayLogger.refreshedRegionalGtfsRealtime();
  }

  private async _withRetries<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: unknown;

    for (const interval of this._initialRetryIntervalsSeconds) {
      try {
        return await fn();
      } catch (e) {
        lastError = e;
        this._relayLogger.retryingInSeconds(interval, e);
        await new Promise((resolve) => setTimeout(resolve, interval * 1000));
      }
    }

    throw lastError;
  }
}

type HashWatcherConfigEntry = {
  readonly extractHash: (relayStatus: RelayStatus) => string;
  readonly onStartup: () => Promise<void>;
  readonly onHashChanged: () => void;
  readonly skipIfUpdated?: string[];
};

class HashWatcher {
  private readonly _lastSeenHashes: Map<string, string>;

  constructor(
    private readonly _config: Record<string, HashWatcherConfigEntry>,
  ) {
    this._lastSeenHashes = new Map();

    const configEntries = Object.entries(this._config);
    for (const [key, entryConfig] of configEntries) {
      const skipIfUpdated = entryConfig.skipIfUpdated ?? [];
      const invalidKeys = skipIfUpdated.filter(
        (skipKey) => !(skipKey in this._config),
      );

      if (invalidKeys.length > 0) {
        const invalidStr = listifyAnd(invalidKeys.map((x) => `"${x}"`));
        throw new Error(`"${key}" has invalid ${invalidStr} in skipIfUpdated.`);
      }
    }
  }

  onStartup(relayStatus: RelayStatus) {
    const promises = [];

    for (const key of this._applyHashUpdates(relayStatus)) {
      const entryConfig = itsOk(this._config[key]);
      promises.push(entryConfig.onStartup());
    }

    return promises;
  }

  onNewRelayStatus(relayStatus: RelayStatus) {
    for (const key of this._applyHashUpdates(relayStatus)) {
      const entryConfig = itsOk(this._config[key]);
      entryConfig.onHashChanged();
    }
  }

  private _applyHashUpdates(relayStatus: RelayStatus) {
    const configEntries = Object.entries(this._config);

    const needsUpdate = new Set<string>();

    for (const [key, entryConfig] of configEntries) {
      const newHash = entryConfig.extractHash(relayStatus);
      const lastSeenHash = this._lastSeenHashes.get(key);

      if (lastSeenHash !== newHash) {
        needsUpdate.add(key);
        this._lastSeenHashes.set(key, newHash);
      }
    }

    return Array.from(needsUpdate).filter((key) => {
      const skipIfUpdated = itsOk(this._config[key]).skipIfUpdated ?? [];
      const shouldSkip = skipIfUpdated.some((k) => needsUpdate.has(k));

      return !shouldSkip;
    });
  }
}
