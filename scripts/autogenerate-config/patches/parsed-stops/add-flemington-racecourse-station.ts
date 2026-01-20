import { createAddStopUnlessExistsPatch } from "./utils/create-add-stop-unless-exists-patch.js";

export const addFlemingtonRacecourseStationPatch =
  createAddStopUnlessExistsPatch({
    expectedGtfsId: "vic:rail:RCE",
    expectedName: /\bFlemington Racecourse\b/i,

    // Flemington Racecourse is only sometimes missing from the GTFS data.
    throwIfAlreadyExists: false,

    stop: {
      name: "Flemington Racecourse",
      latitude: -37.78721073,
      longitude: 144.90757709,

      platforms: [{ platformCode: "1" }, { platformCode: "2" }],

      gtfsIds: [
        { id: "vic:rail:RCE", platformCode: null },
        { id: "15524", platformCode: "1" },
        { id: "15525", platformCode: "2" },
      ],
    },
  });
