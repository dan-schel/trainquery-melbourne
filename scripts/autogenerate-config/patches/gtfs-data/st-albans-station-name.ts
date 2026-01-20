import { createReplaceStopNamePatch } from "./utils/create-replace-stop-name-patch.js";

export const stAlbansStationNamePatch = createReplaceStopNamePatch({
  id: "vic:rail:SAB",
  subfeed: "suburban",
  correctName: "St Albans Railway Station",
  expectedName: "St Albans Railway Station (St Albans)",
});
