import { createReplaceStopNamePatch } from "./utils/replace-stop-name";

export const jolimontStationNamePatch = createReplaceStopNamePatch({
  id: "vic:rail:JLI",
  subfeed: "suburban",
  correctName: "Jolimont Railway Station",
  expectedName: "Jolimont-MCG Railway Station",
});
