import { createAddStopUnlessExistsPatch } from "./utils/create-add-stop-unless-exists-patch.js";

export const addFlemingtonRacecourseStationPatch =
  createAddStopUnlessExistsPatch({
    expectedGtfsId: "vic:rail:RCE",
    expectedName: /\bFlemington Racecourse\b/i,

    // Flemington Racecourse is only sometimes missing from the GTFS data.
    throwIfAlreadyExists: false,

    stop: {
      name: "Flemington Racecourse",
      gtfsId: "vic:rail:RCE",
      latitude: -37.78721073,
      longitude: 144.90757709,
      platforms: [
        { name: "Platform 1", gtfsId: "15524" },
        { name: "Platform 2", gtfsId: "15525" },
      ],
    },
  });
