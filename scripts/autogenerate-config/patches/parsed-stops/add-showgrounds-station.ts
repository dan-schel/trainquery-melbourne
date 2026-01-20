import { createAddStopUnlessExistsPatch } from "./utils/create-add-stop-unless-exists-patch.js";

export const addShowgroundsStationPatch = createAddStopUnlessExistsPatch({
  expectedGtfsId: "vic:rail:SGS",
  expectedName: /\bShowgrounds\b/i,

  // Showgrounds is only sometimes missing from the GTFS data.
  throwIfAlreadyExists: false,

  stop: {
    name: "Showgrounds",
    gtfsId: "vic:rail:SGS",

    // Note: I've grabbed these coordinates from Google Maps, so when
    // Showgrounds station is next added back to the GTFS data, I expect these
    // to need updating.
    latitude: -37.7833933,
    longitude: 144.9149124,
  },
});
