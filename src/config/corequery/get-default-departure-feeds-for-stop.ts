import {
  CorequeryFilters,
  type GetDefaultDepartureFeedsForStopConfig,
  type StopDefaultDepartureFeedConfig,
} from "corequery";
import * as serviceTag from "./lines/service-tags.js";
import * as lineTag from "./lines/line-tags.js";
import * as stop from "./stops/stop-ids.js";
import * as position from "./stops/stop-position-ids.js";

export const getDefaultDepartureFeedsForStop: GetDefaultDepartureFeedsForStopConfig =
  (stopId) => {
    if (stopId === stop.FLINDERS_STREET) {
      return [allTrains];
    }

    if (stopId === stop.SOUTHERN_CROSS) {
      return [regional, suburban];
    }

    // TODO: Kinda feels like I should be able to check the stop tags, and say
    // "do this for the CITY_LOOP_UNDERGROUND" stops. Isn't this type of thing
    // why stop tags exist?
    //
    // I can't just pass app, since this function is called as stops are being
    // instantiated, but I think I could pass the tags object without any
    // worries.
    if (
      stopId === stop.FLAGSTAFF ||
      stopId === stop.MELBOURNE_CENTRAL ||
      stopId === stop.PARLIAMENT
    ) {
      return [platform1, platform2, platform3, platform4];
    }

    // ...And then same for METRO_TUNNEL.
    if (
      stopId === stop.ANZAC ||
      stopId === stop.TOWN_HALL ||
      stopId === stop.STATE_LIBRARY ||
      stopId === stop.PARKVILLE ||
      stopId === stop.ARDEN
    ) {
      return [eastbound, westbound];
    }

    return [citybound, outbound];
  };

const citybound: StopDefaultDepartureFeedConfig = {
  name: "Citybound trains",
  desiredCount: 5,
  filterExpression: CorequeryFilters.serviceTag(serviceTag.CITYBOUND),
};

const outbound: StopDefaultDepartureFeedConfig = {
  name: "Outbound trains",
  desiredCount: 5,
  filterExpression: CorequeryFilters.serviceTag(serviceTag.OUTBOUND),
};

const regional: StopDefaultDepartureFeedConfig = {
  name: "Regional trains",
  desiredCount: 5,
  filterExpression: CorequeryFilters.lineTag(lineTag.REGIONAL),
};

const suburban: StopDefaultDepartureFeedConfig = {
  name: "Suburban trains",
  desiredCount: 5,
  filterExpression: CorequeryFilters.lineTag(lineTag.SUBURBAN),
};

const platform1: StopDefaultDepartureFeedConfig = {
  name: "Trains on platform 1",
  desiredCount: 3,
  filterExpression: CorequeryFilters.position(position.PLATFORM_1),
};

const platform2: StopDefaultDepartureFeedConfig = {
  name: "Trains on platform 2",
  desiredCount: 3,
  filterExpression: CorequeryFilters.position(position.PLATFORM_2),
};

const platform3: StopDefaultDepartureFeedConfig = {
  name: "Trains on platform 3",
  desiredCount: 3,
  filterExpression: CorequeryFilters.position(position.PLATFORM_3),
};

const platform4: StopDefaultDepartureFeedConfig = {
  name: "Trains on platform 4",
  desiredCount: 3,
  filterExpression: CorequeryFilters.position(position.PLATFORM_4),
};

const eastbound: StopDefaultDepartureFeedConfig = {
  name: "Eastbound trains",
  desiredCount: 5,
  filterExpression: CorequeryFilters.serviceTag(serviceTag.EASTBOUND),
};

const westbound: StopDefaultDepartureFeedConfig = {
  name: "Westbound trains",
  desiredCount: 5,
  filterExpression: CorequeryFilters.serviceTag(serviceTag.WESTBOUND),
};

const allTrains: StopDefaultDepartureFeedConfig = {
  name: "All trains",
  desiredCount: 10,
  filterExpression: "",
};
