import { createReplaceStopNamePatch } from "./utils/create-replace-stop-name-patch.js";

export const jolimontStationNamePatch = createReplaceStopNamePatch({
  id: "vic:rail:JLI",
  subfeed: "suburban",
  correctName: "Jolimont Railway Station",
  expectedName: "Jolimont-MCG Railway Station",
});
