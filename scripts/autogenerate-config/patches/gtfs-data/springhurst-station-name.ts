import { createReplaceStopNamePatch } from "./utils/replace-stop-name.js";

export const springhurstStationNamePatch = createReplaceStopNamePatch({
  id: "1620",
  subfeed: "regional",
  correctName: "Springhurst Railway Station",
  expectedName: "",
});
