import {
  platformSortOrder,
  type ParsedStop,
} from "../../stops/extract-stops-from-tree.js";
import { type StopPatch } from "../patch.js";

type PlatformMapping = Readonly<Record<string, readonly string[]>>;

const regionalPlatforms: PlatformMapping = {
  "Albury": ["2"],
  "Ararat": ["2"],
  "Ardeer": ["1", "2"],
  "Avenel": ["1", "2"],
  "Bacchus Marsh": ["1", "2"],
  "Bairnsdale": ["1"],
  "Ballan": ["1", "2"],
  "Ballarat": ["1", "2"],
  "Beaufort": ["1"],
  "Benalla": ["1"],
  "Bendigo": ["1", "2"],
  "Birregurra": ["1"],
  "Broadford": ["1", "2"],
  "Bunyip": ["1", "2"],
  "Camperdown": ["1"],
  "Caroline Springs": ["1", "2"],
  "Castlemaine": ["1", "2"],
  "Chiltern": ["1", "2"],
  "Clarkefield": ["1", "2"],
  "Clunes": ["1"],
  "Cobblebank": ["1", "2"],
  "Colac": ["1"],
  "Corio": ["1", "2"],
  "Creswick": ["1"],
  "Deer Park": ["1", "2"],
  "Dingee": ["1"],
  "Donnybrook": ["1", "2"],
  "Drouin": ["1", "2"],
  "Eaglehawk": ["1"],
  "Echuca": ["1"],
  "Elmore": ["1"],
  "Epsom": ["1"],
  "Euroa": ["1", "2"],
  "Garfield": ["1", "2"],
  "Geelong": ["1", "2", "3"],
  "Gisborne": ["1", "2"],
  "Goornong": ["1"],
  "Heathcote Junction": ["1", "2"],
  "Huntly": ["1"],
  "Kangaroo Flat": ["1", "2"],
  "Kerang": ["1"],
  "Kilmore East": ["1", "2"],
  "Kyneton": ["1", "2"],
  "Lara": ["1", "2"],
  "Little River": ["1", "2"],
  "Longwarry": ["1", "2"],
  "Macedon": ["1", "2"],
  "Malmsbury": ["1"],
  "Marshall": ["1", "2"],
  "Maryborough": ["1"],
  "Melton": ["1", "2"],
  "Moe": ["1"],
  "Mooroopna": ["1"],
  "Morwell": ["1", "2"],
  "Murchison East": ["1"],
  "Nagambie": ["1"],
  "Nar Nar Goon": ["1", "2"],
  "North Geelong": ["1", "2"],
  "North Shore": ["1", "2"],
  "Pyramid": ["1"],
  "Raywood": ["1"],
  "Riddells Creek": ["1", "2"],
  "Rochester": ["1"],
  "Rockbank": ["1", "2"],
  "Rosedale": ["1"],
  "Sale": ["1"],
  "Seymour": ["1", "2", "3"],
  "Shepparton": ["1"],
  "Sherwood Park": ["1"],
  "South Geelong": ["1", "2"],
  "Springhurst": ["1", "2"],
  "Stratford": ["1"],
  "Swan Hill": ["1"],
  "Talbot": ["1"],
  "Tallarook": ["1", "2"],
  "Tarneit": ["1", "2"],
  "Terang": ["1"],
  "Trafalgar": ["1", "2"],
  "Traralgon": ["1", "2"],
  "Tynong": ["1", "2"],
  "Violet Town": ["1", "2"],
  "Wallan": ["1", "2"],
  "Wandong": ["1", "2"],
  "Wangaratta": ["1"],
  "Warragul": ["1", "2"],
  "Warrnambool": ["1"],
  "Waurn Ponds": ["1", "2"],
  "Wendouree": ["1", "2"],
  "Winchelsea": ["1"],
  "Wodonga": ["1"],
  "Woodend": ["1", "2"],
  "Wyndham Vale": ["1", "2"],
  "Yarragon": ["1", "2"],
};

const additionalSuburbanPlatforms: PlatformMapping = {
  "Berwick": [],
  "Broadmeadows": ["3"],
  "Caulfield": [],
  "Clayton": [],
  "Craigieburn": [],
  "Dandenong": [],
  "Essendon": [],
  "Flinders Street": ["14"],
  "Footscray": [],
  "North Melbourne": [],
  "Pakenham": [],
  "Richmond": [],
  "Southern Cross": [
    "1",
    "2",
    "2A",
    "2B",
    "3",
    "3A",
    "3B",
    "4",
    "4A",
    "4B",
    "5",
    "5A",
    "5B",
    "6",
    "6A",
    "6B",
    "7",
    "7A",
    "7B",
    "8A",
    "8B",
    "8S",
    "15",
    "15A",
    "15B",
    "16",
    "16A",
    "16B",
  ],
  "Sunbury": [],
  "Sunshine": [],
  "Watergardens": [],
};

export const addRegionalPlatformsPatch: StopPatch = (_ctx, stops) => {
  const regionalKeys = Object.keys(regionalPlatforms);
  const suburbanKeys = Object.keys(additionalSuburbanPlatforms);
  const allKeys = [...regionalKeys, ...suburbanKeys];
  const invalidKey = allKeys.find((k) => !stops.some((s) => s.name === k));
  if (invalidKey != null) throw new Error(`No stop called "${invalidKey}".`);

  return stops.map((stop) => {
    const platformCodes = regionalPlatforms[stop.name];
    const additionalPlatformCodes = additionalSuburbanPlatforms[stop.name];

    if (platformCodes != null && additionalPlatformCodes != null) {
      throw new Error(`${stop.name} present in both lists.`);
    } else if (platformCodes != null) {
      return replacePlatformCodes(stop, platformCodes);
    } else if (additionalPlatformCodes != null) {
      return addPlatformCodes(stop, additionalPlatformCodes);
    } else {
      return stop;
    }
  });
};

function replacePlatformCodes(
  stop: ParsedStop,
  platformCodes: readonly string[],
): ParsedStop {
  const hasPlatforms = stop.platforms.length > 0;
  if (hasPlatforms) throw new Error(`${stop.name} already has platforms.`);

  return {
    ...stop,
    platforms: platformCodes
      .map((p) => ({ platformCode: p }))
      .sort(platformSortOrder),
  };
}

function addPlatformCodes(
  stop: ParsedStop,
  platformCodes: readonly string[],
): ParsedStop {
  const platforms = [...stop.platforms];

  for (const code of platformCodes) {
    const existing = platforms.some((p) => p.platformCode === code);
    if (existing) throw new Error(`${stop.name} already has platform ${code}.`);

    platforms.push({ platformCode: code });
  }

  return {
    ...stop,
    platforms: platforms.sort(platformSortOrder),
  };
}
