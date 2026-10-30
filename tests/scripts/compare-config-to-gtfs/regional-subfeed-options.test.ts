import { assert, describe, it } from "vitest";
import { regionalSubfeedOptions } from "../../../scripts/compare-config-to-gtfs/regional-subfeed-options.js";
import { StoppingPattern } from "../../../scripts/compare-config-to-gtfs/line/utils/stopping-pattern.js";
import { Trip } from "../../../scripts/compare-config-to-gtfs/line/utils/trip.js";

const routeId = "aus:vic:vic-01-vPK:";

describe("regionalSubfeedOptions", () => {
  it("ignores the Pakenham VLINE route", () => {
    assert(
      regionalSubfeedOptions.ignoredGtfsRouteIdsMissingFromConfig?.includes(
        routeId,
      ) ?? false,
    );
    assert(
      regionalSubfeedOptions.ignoreTripNotAssignedToALine?.(
        new Trip(routeId, routeId, new StoppingPattern([])),
      ) ?? false,
    );
  });

  it("does not ignore other routes", () => {
    assert.equal(
      regionalSubfeedOptions.ignoreTripNotAssignedToALine?.(
        new Trip("other-route", "other-route", new StoppingPattern([])),
      ),
      false,
    );
  });
});
