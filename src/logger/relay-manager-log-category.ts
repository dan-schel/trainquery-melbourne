export class RelayManagerLogCategory {
  constructor(private readonly _log: (message: string) => void) {}

  refreshedGtfsSchedule() {
    this._log("Refreshed all GTFS schedule + realtime data.");
  }

  refreshedSuburbanGtfsRealtime() {
    this._log("Refreshed suburban GTFS realtime data.");
  }

  refreshedRegionalGtfsRealtime() {
    this._log("Refreshed regional GTFS realtime data.");
  }

  updateRelayStatusError(error: unknown) {
    this._log(`Error updating relay status: ${this._formatError(error)}`);
  }

  updateGtfsScheduleError(error: unknown) {
    this._log(`Error updating GTFS schedule: ${this._formatError(error)}`);
  }

  updateSuburbanGtfsRealtimeError(error: unknown) {
    this._log(
      `Error updating suburban GTFS realtime data: ${this._formatError(error)}`,
    );
  }

  updateRegionalGtfsRealtimeError(error: unknown) {
    this._log(
      `Error updating regional GTFS realtime data: ${this._formatError(error)}`,
    );
  }

  retryingInSeconds(seconds: number, error: unknown) {
    this._log(
      `Error occured. Retrying in ${seconds} seconds. ${this._formatError(error)}`,
    );
  }

  private _formatError(error: unknown): string {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}\n${error.stack}`;
    } else {
      return String(error);
    }
  }
}
