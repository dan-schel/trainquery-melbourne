import { createReplaceStopNamePatch } from "./utils/replace-stop-name.js";

export const stAlbansStationNamePatch = createReplaceStopNamePatch({
  id: "vic:rail:SAB",
  subfeed: "suburban",
  correctName: "St Albans Railway Station",
  expectedName: "St Albans Railway Station (St Albans)",
});
