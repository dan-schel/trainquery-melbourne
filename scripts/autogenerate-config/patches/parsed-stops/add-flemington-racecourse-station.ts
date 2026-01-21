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
        {
          id: "vic:rail:RCE",
          type: "parent",
          platformCode: null,
          subfeeds: ["suburban"],
        },
        {
          id: "15524",
          type: "train",
          platformCode: "1",
          subfeeds: ["suburban"],
        },
        {
          id: "15525",
          type: "train",
          platformCode: "2",
          subfeeds: ["suburban"],
        },
      ],
    },
  });
