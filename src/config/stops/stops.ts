import { type StopConfig } from "corequery";
import * as stop from "./stop-ids.js";
import * as position from "./stop-position-ids.js";
import * as tag from "./stop-tags.js";

// Run `npm run import-stop-from-gtfs` to make your life easier :)

export const AIRCRAFT: StopConfig = {
  id: stop.AIRCRAFT,
  name: "Aircraft",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "aircraft",
  location: { latitude: -37.86660595, longitude: 144.76080944 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ALAMEIN: StopConfig = {
  id: stop.ALAMEIN,
  name: "Alamein",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "alamein",
  location: { latitude: -37.86832039, longitude: 145.07965567 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const ALBION: StopConfig = {
  id: stop.ALBION,
  name: "Albion",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "albion",
  location: { latitude: -37.77765281, longitude: 144.82470361 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ALBURY: StopConfig = {
  id: stop.ALBURY,
  name: "Albury",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "albury",
  location: { latitude: -36.0850459, longitude: 146.9243814 },
  positions: [{ stopPositionId: position.PLATFORM_2, name: "2" }],
};

export const ALPHINGTON: StopConfig = {
  id: stop.ALPHINGTON,
  name: "Alphington",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "alphington",
  location: { latitude: -37.77839363, longitude: 145.03125493 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ALTONA: StopConfig = {
  id: stop.ALTONA,
  name: "Altona",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "altona",
  location: { latitude: -37.8671476, longitude: 144.82964474 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const ANSTEY: StopConfig = {
  id: stop.ANSTEY,
  name: "Anstey",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "anstey",
  location: { latitude: -37.76124203, longitude: 144.96068404 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ARARAT: StopConfig = {
  id: stop.ARARAT,
  name: "Ararat",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "ararat",
  location: { latitude: -37.28224082, longitude: 142.93691176 },
  positions: [{ stopPositionId: position.PLATFORM_2, name: "2" }],
};

export const ARDEER: StopConfig = {
  id: stop.ARDEER,
  name: "Ardeer",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "ardeer",
  location: { latitude: -37.78306529, longitude: 144.80218807 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ARMADALE: StopConfig = {
  id: stop.ARMADALE,
  name: "Armadale",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "armadale",
  location: { latitude: -37.85645238, longitude: 145.01932554 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ASCOT_VALE: StopConfig = {
  id: stop.ASCOT_VALE,
  name: "Ascot Vale",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "ascotvale",
  location: { latitude: -37.77530609, longitude: 144.92182074 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ASHBURTON: StopConfig = {
  id: stop.ASHBURTON,
  name: "Ashburton",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "ashburton",
  location: { latitude: -37.86196753, longitude: 145.08134376 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const ASPENDALE: StopConfig = {
  id: stop.ASPENDALE,
  name: "Aspendale",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "aspendale",
  location: { latitude: -38.02722019, longitude: 145.10214962 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const AUBURN: StopConfig = {
  id: stop.AUBURN,
  name: "Auburn",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "auburn",
  location: { latitude: -37.82239831, longitude: 145.04584366 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const AVENEL: StopConfig = {
  id: stop.AVENEL,
  name: "Avenel",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "avenel",
  location: { latitude: -36.89364778, longitude: 145.22951498 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BACCHUS_MARSH: StopConfig = {
  id: stop.BACCHUS_MARSH,
  name: "Bacchus Marsh",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "bacchusmarsh",
  location: { latitude: -37.68757821, longitude: 144.43678516 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BAIRNSDALE: StopConfig = {
  id: stop.BAIRNSDALE,
  name: "Bairnsdale",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "bairnsdale",
  location: { latitude: -37.82872043, longitude: 147.62761375 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const BALACLAVA: StopConfig = {
  id: stop.BALACLAVA,
  name: "Balaclava",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "balaclava",
  location: { latitude: -37.86948773, longitude: 144.9935121 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BALLAN: StopConfig = {
  id: stop.BALLAN,
  name: "Ballan",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "ballan",
  location: { latitude: -37.60429951, longitude: 144.22544803 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BALLARAT: StopConfig = {
  id: stop.BALLARAT,
  name: "Ballarat",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "ballarat",
  location: { latitude: -37.55879148, longitude: 143.85945743 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BATMAN: StopConfig = {
  id: stop.BATMAN,
  name: "Batman",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "batman",
  location: { latitude: -37.73352285, longitude: 144.96284055 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BAXTER: StopConfig = {
  id: stop.BAXTER,
  name: "Baxter",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "baxter",
  location: { latitude: -38.19404306, longitude: 145.16052609 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const BAYSWATER: StopConfig = {
  id: stop.BAYSWATER,
  name: "Bayswater",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "bayswater",
  location: { latitude: -37.84173004, longitude: 145.26813639 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BEACONSFIELD: StopConfig = {
  id: stop.BEACONSFIELD,
  name: "Beaconsfield",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "beaconsfield",
  location: { latitude: -38.05083135, longitude: 145.36607374 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BEAUFORT: StopConfig = {
  id: stop.BEAUFORT,
  name: "Beaufort",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "beaufort",
  location: { latitude: -37.42762724, longitude: 143.38238116 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const BELGRAVE: StopConfig = {
  id: stop.BELGRAVE,
  name: "Belgrave",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "belgrave",
  location: { latitude: -37.9091021, longitude: 145.35529128 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BELL: StopConfig = {
  id: stop.BELL,
  name: "Bell",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "bell",
  location: { latitude: -37.74556212, longitude: 145.00015503 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BENALLA: StopConfig = {
  id: stop.BENALLA,
  name: "Benalla",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "benalla",
  location: { latitude: -36.54455031, longitude: 145.98391505 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const BENDIGO: StopConfig = {
  id: stop.BENDIGO,
  name: "Bendigo",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "bendigo",
  location: { latitude: -36.76566973, longitude: 144.28300893 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BENTLEIGH: StopConfig = {
  id: stop.BENTLEIGH,
  name: "Bentleigh",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "bentleigh",
  location: { latitude: -37.91742457, longitude: 145.03699513 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const BERWICK: StopConfig = {
  id: stop.BERWICK,
  name: "Berwick",
  tags: [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "berwick",
  location: { latitude: -38.03998037, longitude: 145.34541666 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BIRREGURRA: StopConfig = {
  id: stop.BIRREGURRA,
  name: "Birregurra",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "birregurra",
  location: { latitude: -38.32880781, longitude: 143.78362521 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const BITTERN: StopConfig = {
  id: stop.BITTERN,
  name: "Bittern",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "bittern",
  location: { latitude: -38.33739032, longitude: 145.17802653 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const BLACKBURN: StopConfig = {
  id: stop.BLACKBURN,
  name: "Blackburn",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "blackburn",
  location: { latitude: -37.82007075, longitude: 145.15001354 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const BONBEACH: StopConfig = {
  id: stop.BONBEACH,
  name: "Bonbeach",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "bonbeach",
  location: { latitude: -38.06547485, longitude: 145.1201058 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BORONIA: StopConfig = {
  id: stop.BORONIA,
  name: "Boronia",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "boronia",
  location: { latitude: -37.86040238, longitude: 145.28470457 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BOX_HILL: StopConfig = {
  id: stop.BOX_HILL,
  name: "Box Hill",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "boxhill",
  location: { latitude: -37.81922165, longitude: 145.12142893 },
  positions: [
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
    { stopPositionId: position.PLATFORM_4, name: "4" },
  ],
};

export const BRIGHTON_BEACH: StopConfig = {
  id: stop.BRIGHTON_BEACH,
  name: "Brighton Beach",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "brightonbeach",
  location: { latitude: -37.92648432, longitude: 144.98915355 },
  positions: [
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const BROADFORD: StopConfig = {
  id: stop.BROADFORD,
  name: "Broadford",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "broadford",
  location: { latitude: -37.20720049, longitude: 145.0430079 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BROADMEADOWS: StopConfig = {
  id: stop.BROADMEADOWS,
  name: "Broadmeadows",
  tags: [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "broadmeadows",
  location: { latitude: -37.68304926, longitude: 144.91961322 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const BRUNSWICK: StopConfig = {
  id: stop.BRUNSWICK,
  name: "Brunswick",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "brunswick",
  location: { latitude: -37.76772055, longitude: 144.95958654 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BUNYIP: StopConfig = {
  id: stop.BUNYIP,
  name: "Bunyip",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "bunyip",
  location: { latitude: -38.09910771, longitude: 145.72075749 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const BURNLEY: StopConfig = {
  id: stop.BURNLEY,
  name: "Burnley",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "burnley",
  location: { latitude: -37.82756022, longitude: 145.00755515 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
    { stopPositionId: position.PLATFORM_4, name: "4" },
  ],
};

export const BURWOOD: StopConfig = {
  id: stop.BURWOOD,
  name: "Burwood",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "burwood",
  location: { latitude: -37.85156328, longitude: 145.08051107 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CAMBERWELL: StopConfig = {
  id: stop.CAMBERWELL,
  name: "Camberwell",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "camberwell",
  location: { latitude: -37.82656714, longitude: 145.05869718 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const CAMPERDOWN: StopConfig = {
  id: stop.CAMPERDOWN,
  name: "Camperdown",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "camperdown",
  location: { latitude: -38.22890091, longitude: 143.1509278 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const CANTERBURY: StopConfig = {
  id: stop.CANTERBURY,
  name: "Canterbury",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "canterbury",
  location: { latitude: -37.82448518, longitude: 145.08122424 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const CARDINIA_ROAD: StopConfig = {
  id: stop.CARDINIA_ROAD,
  name: "Cardinia Road",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "cardiniaroad",
  location: { latitude: -38.07129047, longitude: 145.43779101 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CARNEGIE: StopConfig = {
  id: stop.CARNEGIE,
  name: "Carnegie",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "carnegie",
  location: { latitude: -37.88624148, longitude: 145.05857506 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CAROLINE_SPRINGS: StopConfig = {
  id: stop.CAROLINE_SPRINGS,
  name: "Caroline Springs",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "carolinesprings",
  location: { latitude: -37.76612649, longitude: 144.73573715 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CARRUM: StopConfig = {
  id: stop.CARRUM,
  name: "Carrum",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "carrum",
  location: { latitude: -38.07653027, longitude: 145.1228096 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CASTLEMAINE: StopConfig = {
  id: stop.CASTLEMAINE,
  name: "Castlemaine",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "castlemaine",
  location: { latitude: -37.06284167, longitude: 144.21397878 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CAULFIELD: StopConfig = {
  id: stop.CAULFIELD,
  name: "Caulfield",
  tags: [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "caulfield",
  location: { latitude: -37.87745946, longitude: 145.04252478 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
    { stopPositionId: position.PLATFORM_4, name: "4" },
  ],
};

export const CHATHAM: StopConfig = {
  id: stop.CHATHAM,
  name: "Chatham",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "chatham",
  location: { latitude: -37.82429952, longitude: 145.08864793 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const CHELSEA: StopConfig = {
  id: stop.CHELSEA,
  name: "Chelsea",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "chelsea",
  location: { latitude: -38.05329032, longitude: 145.1166795 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CHELTENHAM: StopConfig = {
  id: stop.CHELTENHAM,
  name: "Cheltenham",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "cheltenham",
  location: { latitude: -37.96664989, longitude: 145.05455793 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const CHILTERN: StopConfig = {
  id: stop.CHILTERN,
  name: "Chiltern",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "chiltern",
  location: { latitude: -36.15563663, longitude: 146.61137475 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CLARKEFIELD: StopConfig = {
  id: stop.CLARKEFIELD,
  name: "Clarkefield",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "clarkefield",
  location: { latitude: -37.48349769, longitude: 144.74537264 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CLAYTON: StopConfig = {
  id: stop.CLAYTON,
  name: "Clayton",
  tags: [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "clayton",
  location: { latitude: -37.92468255, longitude: 145.12053436 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CLIFTON_HILL: StopConfig = {
  id: stop.CLIFTON_HILL,
  name: "Clifton Hill",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "cliftonhill",
  location: { latitude: -37.78865745, longitude: 144.9954167 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CLUNES: StopConfig = {
  id: stop.CLUNES,
  name: "Clunes",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "clunes",
  location: { latitude: -37.30301059, longitude: 143.78208969 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const COBBLEBANK: StopConfig = {
  id: stop.COBBLEBANK,
  name: "Cobblebank",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "cobblebank",
  location: { latitude: -37.71254554, longitude: 144.60410782 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const COBURG: StopConfig = {
  id: stop.COBURG,
  name: "Coburg",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "coburg",
  location: { latitude: -37.74234502, longitude: 144.96333634 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const COLAC: StopConfig = {
  id: stop.COLAC,
  name: "Colac",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "colac",
  location: { latitude: -38.34337792, longitude: 143.58665305 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const COLLINGWOOD: StopConfig = {
  id: stop.COLLINGWOOD,
  name: "Collingwood",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "collingwood",
  location: { latitude: -37.80452593, longitude: 144.99374967 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const COOLAROO: StopConfig = {
  id: stop.COOLAROO,
  name: "Coolaroo",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "coolaroo",
  location: { latitude: -37.66111042, longitude: 144.92604123 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CORIO: StopConfig = {
  id: stop.CORIO,
  name: "Corio",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "corio",
  location: { latitude: -38.07283126, longitude: 144.37976842 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CRAIGIEBURN: StopConfig = {
  id: stop.CRAIGIEBURN,
  name: "Craigieburn",
  tags: [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "craigieburn",
  location: { latitude: -37.6019248, longitude: 144.94330601 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CRANBOURNE: StopConfig = {
  id: stop.CRANBOURNE,
  name: "Cranbourne",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "cranbourne",
  location: { latitude: -38.09953731, longitude: 145.28059898 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CRESWICK: StopConfig = {
  id: stop.CRESWICK,
  name: "Creswick",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "creswick",
  location: { latitude: -37.42460539, longitude: 143.88812365 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const CRIB_POINT: StopConfig = {
  id: stop.CRIB_POINT,
  name: "Crib Point",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "cribpoint",
  location: { latitude: -38.36612338, longitude: 145.20404332 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const CROXTON: StopConfig = {
  id: stop.CROXTON,
  name: "Croxton",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "croxton",
  location: { latitude: -37.764101, longitude: 144.99705619 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const CROYDON: StopConfig = {
  id: stop.CROYDON,
  name: "Croydon",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "croydon",
  location: { latitude: -37.79530018, longitude: 145.28048737 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const DANDENONG: StopConfig = {
  id: stop.DANDENONG,
  name: "Dandenong",
  tags: [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "dandenong",
  location: { latitude: -37.98996792, longitude: 145.20972537 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const DAREBIN: StopConfig = {
  id: stop.DAREBIN,
  name: "Darebin",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "darebin",
  location: { latitude: -37.77496341, longitude: 145.03847598 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const DARLING: StopConfig = {
  id: stop.DARLING,
  name: "Darling",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "darling",
  location: { latitude: -37.86895684, longitude: 145.06295083 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const DEER_PARK: StopConfig = {
  id: stop.DEER_PARK,
  name: "Deer Park",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "deerpark",
  location: { latitude: -37.77728102, longitude: 144.77108058 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const DENNIS: StopConfig = {
  id: stop.DENNIS,
  name: "Dennis",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "dennis",
  location: { latitude: -37.77918729, longitude: 145.00824163 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const DIAMOND_CREEK: StopConfig = {
  id: stop.DIAMOND_CREEK,
  name: "Diamond Creek",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "diamondcreek",
  location: { latitude: -37.67337905, longitude: 145.15853819 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const DIGGERS_REST: StopConfig = {
  id: stop.DIGGERS_REST,
  name: "Diggers Rest",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "diggersrest",
  location: { latitude: -37.62696051, longitude: 144.71982218 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const DINGEE: StopConfig = {
  id: stop.DINGEE,
  name: "Dingee",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "dingee",
  location: { latitude: -36.36923291, longitude: 144.23112034 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const DONNYBROOK: StopConfig = {
  id: stop.DONNYBROOK,
  name: "Donnybrook",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "donnybrook",
  location: { latitude: -37.54202766, longitude: 144.97020358 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const DROUIN: StopConfig = {
  id: stop.DROUIN,
  name: "Drouin",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "drouin",
  location: { latitude: -38.1364519, longitude: 145.85594693 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const EAGLEHAWK: StopConfig = {
  id: stop.EAGLEHAWK,
  name: "Eaglehawk",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "eaglehawk",
  location: { latitude: -36.71852539, longitude: 144.2483799 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const EAGLEMONT: StopConfig = {
  id: stop.EAGLEMONT,
  name: "Eaglemont",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "eaglemont",
  location: { latitude: -37.76358553, longitude: 145.05394269 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const EAST_CAMBERWELL: StopConfig = {
  id: stop.EAST_CAMBERWELL,
  name: "East Camberwell",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "eastcamberwell",
  location: { latitude: -37.82589419, longitude: 145.06819025 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const EAST_MALVERN: StopConfig = {
  id: stop.EAST_MALVERN,
  name: "East Malvern",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "eastmalvern",
  location: { latitude: -37.87692101, longitude: 145.06939324 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const EAST_RICHMOND: StopConfig = {
  id: stop.EAST_RICHMOND,
  name: "East Richmond",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "eastrichmond",
  location: { latitude: -37.82639995, longitude: 144.99706569 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ECHUCA: StopConfig = {
  id: stop.ECHUCA,
  name: "Echuca",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "echuca",
  location: { latitude: -36.13098223, longitude: 144.75345866 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const EDITHVALE: StopConfig = {
  id: stop.EDITHVALE,
  name: "Edithvale",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "edithvale",
  location: { latitude: -38.03653574, longitude: 145.10758338 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ELMORE: StopConfig = {
  id: stop.ELMORE,
  name: "Elmore",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "elmore",
  location: { latitude: -36.49502002, longitude: 144.60775752 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const ELSTERNWICK: StopConfig = {
  id: stop.ELSTERNWICK,
  name: "Elsternwick",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "elsternwick",
  location: { latitude: -37.88475311, longitude: 145.00089787 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ELTHAM: StopConfig = {
  id: stop.ELTHAM,
  name: "Eltham",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "eltham",
  location: { latitude: -37.71354967, longitude: 145.14782202 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const EPPING: StopConfig = {
  id: stop.EPPING,
  name: "Epping",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "epping",
  location: { latitude: -37.65217784, longitude: 145.03107934 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const EPSOM: StopConfig = {
  id: stop.EPSOM,
  name: "Epsom",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "epsom",
  location: { latitude: -36.70628781, longitude: 144.3210526 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const ESSENDON: StopConfig = {
  id: stop.ESSENDON,
  name: "Essendon",
  tags: [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "essendon",
  location: { latitude: -37.7560117, longitude: 144.9161975 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const EUROA: StopConfig = {
  id: stop.EUROA,
  name: "Euroa",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "euroa",
  location: { latitude: -36.74918387, longitude: 145.56802043 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const FAIRFIELD: StopConfig = {
  id: stop.FAIRFIELD,
  name: "Fairfield",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "fairfield",
  location: { latitude: -37.77917126, longitude: 145.0169053 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const FAWKNER: StopConfig = {
  id: stop.FAWKNER,
  name: "Fawkner",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "fawkner",
  location: { latitude: -37.71462129, longitude: 144.96054503 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const FERNTREE_GULLY: StopConfig = {
  id: stop.FERNTREE_GULLY,
  name: "Ferntree Gully",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "ferntreegully",
  location: { latitude: -37.88169799, longitude: 145.29525126 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const FLAGSTAFF: StopConfig = {
  id: stop.FLAGSTAFF,
  name: "Flagstaff",
  tags: [tag.CITY_LOOP_UNDERGROUND, tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "flagstaff",
  location: { latitude: -37.8119815, longitude: 144.95566511 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
    { stopPositionId: position.PLATFORM_4, name: "4" },
  ],
};

export const FLEMINGTON_BRIDGE: StopConfig = {
  id: stop.FLEMINGTON_BRIDGE,
  name: "Flemington Bridge",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "flemingtonbridge",
  location: { latitude: -37.78813995, longitude: 144.93932328 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const FLEMINGTON_RACECOURSE: StopConfig = {
  id: stop.FLEMINGTON_RACECOURSE,
  name: "Flemington Racecourse",
  tags: [tag.SPECIAL_EVENTS_ONLY, tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "flemingtonracecourse",
  location: { latitude: -37.78721073, longitude: 144.90757709 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const FLINDERS_STREET: StopConfig = {
  id: stop.FLINDERS_STREET,
  name: "Flinders Street",
  tags: [tag.CITY_LOOP, tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "flindersstreet",
  location: { latitude: -37.81830513, longitude: 144.96696435 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
    { stopPositionId: position.PLATFORM_4, name: "4" },
    { stopPositionId: position.PLATFORM_5, name: "5" },
    { stopPositionId: position.PLATFORM_6, name: "6" },
    { stopPositionId: position.PLATFORM_7, name: "7" },
    { stopPositionId: position.PLATFORM_8, name: "8" },
    { stopPositionId: position.PLATFORM_9, name: "9" },
    { stopPositionId: position.PLATFORM_10, name: "10" },
    { stopPositionId: position.PLATFORM_12, name: "12" },
    { stopPositionId: position.PLATFORM_13, name: "13" },
    { stopPositionId: position.PLATFORM_14, name: "14" },
  ],
};

export const FOOTSCRAY: StopConfig = {
  id: stop.FOOTSCRAY,
  name: "Footscray",
  tags: [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "footscray",
  location: { latitude: -37.80141343, longitude: 144.90202006 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
    { stopPositionId: position.PLATFORM_4, name: "4" },
    { stopPositionId: position.PLATFORM_5, name: "5" },
    { stopPositionId: position.PLATFORM_6, name: "6" },
  ],
};

export const FRANKSTON: StopConfig = {
  id: stop.FRANKSTON,
  name: "Frankston",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "frankston",
  location: { latitude: -38.14299007, longitude: 145.12616228 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const GARDENVALE: StopConfig = {
  id: stop.GARDENVALE,
  name: "Gardenvale",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "gardenvale",
  location: { latitude: -37.89669508, longitude: 145.00416843 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const GARDINER: StopConfig = {
  id: stop.GARDINER,
  name: "Gardiner",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "gardiner",
  location: { latitude: -37.85327908, longitude: 145.05165466 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const GARFIELD: StopConfig = {
  id: stop.GARFIELD,
  name: "Garfield",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "garfield",
  location: { latitude: -38.09103062, longitude: 145.67422472 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const GEELONG: StopConfig = {
  id: stop.GEELONG,
  name: "Geelong",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "geelong",
  location: { latitude: -38.14470898, longitude: 144.3549152 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const GINIFER: StopConfig = {
  id: stop.GINIFER,
  name: "Ginifer",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "ginifer",
  location: { latitude: -37.76008529, longitude: 144.81135895 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const GISBORNE: StopConfig = {
  id: stop.GISBORNE,
  name: "Gisborne",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "gisborne",
  location: { latitude: -37.4588255, longitude: 144.59872157 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const GLEN_IRIS: StopConfig = {
  id: stop.GLEN_IRIS,
  name: "Glen Iris",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "gleniris",
  location: { latitude: -37.85930842, longitude: 145.0582249 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const GLEN_WAVERLEY: StopConfig = {
  id: stop.GLEN_WAVERLEY,
  name: "Glen Waverley",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "glenwaverley",
  location: { latitude: -37.87950407, longitude: 145.16205755 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const GLENBERVIE: StopConfig = {
  id: stop.GLENBERVIE,
  name: "Glenbervie",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "glenbervie",
  location: { latitude: -37.74720985, longitude: 144.92093868 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const GLENFERRIE: StopConfig = {
  id: stop.GLENFERRIE,
  name: "Glenferrie",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "glenferrie",
  location: { latitude: -37.82146682, longitude: 145.03643883 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const GLEN_HUNTLY: StopConfig = {
  id: stop.GLEN_HUNTLY,
  name: "Glen Huntly",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "glenhuntly",
  location: { latitude: -37.88971946, longitude: 145.04222285 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const GLENROY: StopConfig = {
  id: stop.GLENROY,
  name: "Glenroy",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "glenroy",
  location: { latitude: -37.70453633, longitude: 144.9172204 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const GOORNONG: StopConfig = {
  id: stop.GOORNONG,
  name: "Goornong",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "goornong",
  location: { latitude: -36.61518327, longitude: 144.50347417 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const GOWRIE: StopConfig = {
  id: stop.GOWRIE,
  name: "Gowrie",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "gowrie",
  location: { latitude: -37.700678, longitude: 144.95887432 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const GREENSBOROUGH: StopConfig = {
  id: stop.GREENSBOROUGH,
  name: "Greensborough",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "greensborough",
  location: { latitude: -37.70371477, longitude: 145.10793589 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HALLAM: StopConfig = {
  id: stop.HALLAM,
  name: "Hallam",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "hallam",
  location: { latitude: -38.01774038, longitude: 145.2697768 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HAMPTON: StopConfig = {
  id: stop.HAMPTON,
  name: "Hampton",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "hampton",
  location: { latitude: -37.9379864, longitude: 145.00150445 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HARTWELL: StopConfig = {
  id: stop.HARTWELL,
  name: "Hartwell",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "hartwell",
  location: { latitude: -37.84398457, longitude: 145.07555959 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HASTINGS: StopConfig = {
  id: stop.HASTINGS,
  name: "Hastings",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "hastings",
  location: { latitude: -38.30565853, longitude: 145.18597988 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const HAWKSBURN: StopConfig = {
  id: stop.HAWKSBURN,
  name: "Hawksburn",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "hawksburn",
  location: { latitude: -37.84458683, longitude: 145.00190352 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HAWKSTOWE: StopConfig = {
  id: stop.HAWKSTOWE,
  name: "Hawkstowe",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "hawkstowe",
  location: { latitude: -37.62297489, longitude: 145.09729471 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HAWTHORN: StopConfig = {
  id: stop.HAWTHORN,
  name: "Hawthorn",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "hawthorn",
  location: { latitude: -37.82182601, longitude: 145.02289866 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const HEATHCOTE_JUNCTION: StopConfig = {
  id: stop.HEATHCOTE_JUNCTION,
  name: "Heathcote Junction",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "heathcotejunction",
  location: { latitude: -37.37172322, longitude: 145.02824986 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HEATHERDALE: StopConfig = {
  id: stop.HEATHERDALE,
  name: "Heatherdale",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "heatherdale",
  location: { latitude: -37.8188232, longitude: 145.21397044 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HEATHMONT: StopConfig = {
  id: stop.HEATHMONT,
  name: "Heathmont",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "heathmont",
  location: { latitude: -37.82832227, longitude: 145.24455538 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HEIDELBERG: StopConfig = {
  id: stop.HEIDELBERG,
  name: "Heidelberg",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "heidelberg",
  location: { latitude: -37.75707293, longitude: 145.06068552 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HEYINGTON: StopConfig = {
  id: stop.HEYINGTON,
  name: "Heyington",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "heyington",
  location: { latitude: -37.83465462, longitude: 145.02264711 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HIGHETT: StopConfig = {
  id: stop.HIGHETT,
  name: "Highett",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "highett",
  location: { latitude: -37.948425, longitude: 145.0418718 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HOLMESGLEN: StopConfig = {
  id: stop.HOLMESGLEN,
  name: "Holmesglen",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "holmesglen",
  location: { latitude: -37.87440222, longitude: 145.09066203 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HOPPERS_CROSSING: StopConfig = {
  id: stop.HOPPERS_CROSSING,
  name: "Hoppers Crossing",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "hopperscrossing",
  location: { latitude: -37.88338025, longitude: 144.70074704 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HUGHESDALE: StopConfig = {
  id: stop.HUGHESDALE,
  name: "Hughesdale",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "hughesdale",
  location: { latitude: -37.89419074, longitude: 145.07618607 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HUNTINGDALE: StopConfig = {
  id: stop.HUNTINGDALE,
  name: "Huntingdale",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "huntingdale",
  location: { latitude: -37.91101734, longitude: 145.10236432 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HURSTBRIDGE: StopConfig = {
  id: stop.HURSTBRIDGE,
  name: "Hurstbridge",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "hurstbridge",
  location: { latitude: -37.63939817, longitude: 145.19201689 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const IVANHOE: StopConfig = {
  id: stop.IVANHOE,
  name: "Ivanhoe",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "ivanhoe",
  location: { latitude: -37.76889674, longitude: 145.04542519 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const JACANA: StopConfig = {
  id: stop.JACANA,
  name: "Jacana",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "jacana",
  location: { latitude: -37.69513079, longitude: 144.91585052 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const JEWELL: StopConfig = {
  id: stop.JEWELL,
  name: "Jewell",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "jewell",
  location: { latitude: -37.77498702, longitude: 144.95871691 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const JOLIMONT: StopConfig = {
  id: stop.JOLIMONT,
  name: "Jolimont",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "jolimont",
  location: { latitude: -37.81652702, longitude: 144.98409834 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const JORDANVILLE: StopConfig = {
  id: stop.JORDANVILLE,
  name: "Jordanville",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "jordanville",
  location: { latitude: -37.87360339, longitude: 145.11209016 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const KANANOOK: StopConfig = {
  id: stop.KANANOOK,
  name: "Kananook",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "kananook",
  location: { latitude: -38.12175231, longitude: 145.13537493 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const KANGAROO_FLAT: StopConfig = {
  id: stop.KANGAROO_FLAT,
  name: "Kangaroo Flat",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "kangarooflat",
  location: { latitude: -36.79483364, longitude: 144.24899016 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const KEILOR_PLAINS: StopConfig = {
  id: stop.KEILOR_PLAINS,
  name: "Keilor Plains",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "keilorplains",
  location: { latitude: -37.72927934, longitude: 144.79373807 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const KENSINGTON: StopConfig = {
  id: stop.KENSINGTON,
  name: "Kensington",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "kensington",
  location: { latitude: -37.79378022, longitude: 144.93052444 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const KEON_PARK: StopConfig = {
  id: stop.KEON_PARK,
  name: "Keon Park",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "keonpark",
  location: { latitude: -37.69487012, longitude: 145.01188382 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const KERANG: StopConfig = {
  id: stop.KERANG,
  name: "Kerang",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "kerang",
  location: { latitude: -35.73312162, longitude: 143.92442509 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const KILMORE_EAST: StopConfig = {
  id: stop.KILMORE_EAST,
  name: "Kilmore East",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "kilmoreeast",
  location: { latitude: -37.29321027, longitude: 144.98356599 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const KOOYONG: StopConfig = {
  id: stop.KOOYONG,
  name: "Kooyong",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "kooyong",
  location: { latitude: -37.83992894, longitude: 145.03355161 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const KYNETON: StopConfig = {
  id: stop.KYNETON,
  name: "Kyneton",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "kyneton",
  location: { latitude: -37.25827885, longitude: 144.45060159 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const LABURNUM: StopConfig = {
  id: stop.LABURNUM,
  name: "Laburnum",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "laburnum",
  location: { latitude: -37.82078023, longitude: 145.14070271 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const LALOR: StopConfig = {
  id: stop.LALOR,
  name: "Lalor",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "lalor",
  location: { latitude: -37.66585075, longitude: 145.01719317 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const LARA: StopConfig = {
  id: stop.LARA,
  name: "Lara",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "lara",
  location: { latitude: -38.02242764, longitude: 144.41440429 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const LAVERTON: StopConfig = {
  id: stop.LAVERTON,
  name: "Laverton",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "laverton",
  location: { latitude: -37.86369404, longitude: 144.77261667 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const LEAWARRA: StopConfig = {
  id: stop.LEAWARRA,
  name: "Leawarra",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "leawarra",
  location: { latitude: -38.152034, longitude: 145.13953396 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const LILYDALE: StopConfig = {
  id: stop.LILYDALE,
  name: "Lilydale",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "lilydale",
  location: { latitude: -37.75721264, longitude: 145.34582227 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const LITTLE_RIVER: StopConfig = {
  id: stop.LITTLE_RIVER,
  name: "Little River",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "littleriver",
  location: { latitude: -37.96292909, longitude: 144.49848487 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const LONGWARRY: StopConfig = {
  id: stop.LONGWARRY,
  name: "Longwarry",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "longwarry",
  location: { latitude: -38.11099211, longitude: 145.76686029 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const LYNBROOK: StopConfig = {
  id: stop.LYNBROOK,
  name: "Lynbrook",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "lynbrook",
  location: { latitude: -38.05734985, longitude: 145.24925211 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MACAULAY: StopConfig = {
  id: stop.MACAULAY,
  name: "Macaulay",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "macaulay",
  location: { latitude: -37.79426673, longitude: 144.93616633 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MACEDON: StopConfig = {
  id: stop.MACEDON,
  name: "Macedon",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "macedon",
  location: { latitude: -37.42357331, longitude: 144.56139685 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MACLEOD: StopConfig = {
  id: stop.MACLEOD,
  name: "Macleod",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "macleod",
  location: { latitude: -37.7260123, longitude: 145.06914332 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const MALMSBURY: StopConfig = {
  id: stop.MALMSBURY,
  name: "Malmsbury",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "malmsbury",
  location: { latitude: -37.18974032, longitude: 144.37532317 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const MALVERN: StopConfig = {
  id: stop.MALVERN,
  name: "Malvern",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "malvern",
  location: { latitude: -37.8662533, longitude: 145.02929394 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
    { stopPositionId: position.PLATFORM_4, name: "4" },
  ],
};

export const MARSHALL: StopConfig = {
  id: stop.MARSHALL,
  name: "Marshall",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "marshall",
  location: { latitude: -38.198549, longitude: 144.35505671 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MARYBOROUGH: StopConfig = {
  id: stop.MARYBOROUGH,
  name: "Maryborough",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "maryborough",
  location: { latitude: -37.05090849, longitude: 143.74240234 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const MCKINNON: StopConfig = {
  id: stop.MCKINNON,
  name: "McKinnon",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "mckinnon",
  location: { latitude: -37.91030903, longitude: 145.03829897 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const MELBOURNE_CENTRAL: StopConfig = {
  id: stop.MELBOURNE_CENTRAL,
  name: "Melbourne Central",
  tags: [tag.CITY_LOOP_UNDERGROUND, tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "melbournecentral",
  location: { latitude: -37.80993896, longitude: 144.96260489 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
    { stopPositionId: position.PLATFORM_4, name: "4" },
  ],
};

export const MELTON: StopConfig = {
  id: stop.MELTON,
  name: "Melton",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "melton",
  location: { latitude: -37.70347382, longitude: 144.57209861 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MENTONE: StopConfig = {
  id: stop.MENTONE,
  name: "Mentone",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "mentone",
  location: { latitude: -37.98277704, longitude: 145.06580232 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MERINDA_PARK: StopConfig = {
  id: stop.MERINDA_PARK,
  name: "Merinda Park",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "merindapark",
  location: { latitude: -38.07900048, longitude: 145.26351137 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MERLYNSTON: StopConfig = {
  id: stop.MERLYNSTON,
  name: "Merlynston",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "merlynston",
  location: { latitude: -37.72093389, longitude: 144.96131355 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MERNDA: StopConfig = {
  id: stop.MERNDA,
  name: "Mernda",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "mernda",
  location: { latitude: -37.60254907, longitude: 145.10095293 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MERRI: StopConfig = {
  id: stop.MERRI,
  name: "Merri",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "merri",
  location: { latitude: -37.77784668, longitude: 144.99297248 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MIDDLE_BRIGHTON: StopConfig = {
  id: stop.MIDDLE_BRIGHTON,
  name: "Middle Brighton",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "middlebrighton",
  location: { latitude: -37.91513441, longitude: 144.99629909 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MIDDLE_FOOTSCRAY: StopConfig = {
  id: stop.MIDDLE_FOOTSCRAY,
  name: "Middle Footscray",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "middlefootscray",
  location: { latitude: -37.8025047, longitude: 144.89147208 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MIDDLE_GORGE: StopConfig = {
  id: stop.MIDDLE_GORGE,
  name: "Middle Gorge",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "middlegorge",
  location: { latitude: -37.64403391, longitude: 145.09212201 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MITCHAM: StopConfig = {
  id: stop.MITCHAM,
  name: "Mitcham",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "mitcham",
  location: { latitude: -37.81816668, longitude: 145.19220824 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MOE: StopConfig = {
  id: stop.MOE,
  name: "Moe",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "moe",
  location: { latitude: -38.17689039, longitude: 146.26054896 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const MONTMORENCY: StopConfig = {
  id: stop.MONTMORENCY,
  name: "Montmorency",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "montmorency",
  location: { latitude: -37.71529624, longitude: 145.12151574 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MOONEE_PONDS: StopConfig = {
  id: stop.MOONEE_PONDS,
  name: "Moonee Ponds",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "mooneeponds",
  location: { latitude: -37.76570666, longitude: 144.9191607 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MOORABBIN: StopConfig = {
  id: stop.MOORABBIN,
  name: "Moorabbin",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "moorabbin",
  location: { latitude: -37.93447096, longitude: 145.03676929 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const MOOROOLBARK: StopConfig = {
  id: stop.MOOROOLBARK,
  name: "Mooroolbark",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "mooroolbark",
  location: { latitude: -37.78474883, longitude: 145.3124024 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MOOROOPNA: StopConfig = {
  id: stop.MOOROOPNA,
  name: "Mooroopna",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "mooroopna",
  location: { latitude: -36.39912828, longitude: 145.35821484 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const MORDIALLOC: StopConfig = {
  id: stop.MORDIALLOC,
  name: "Mordialloc",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "mordialloc",
  location: { latitude: -38.00658295, longitude: 145.08765936 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MORELAND: StopConfig = {
  id: stop.MORELAND,
  name: "Moreland",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "moreland",
  location: { latitude: -37.75448484, longitude: 144.96182303 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MORRADOO: StopConfig = {
  id: stop.MORRADOO,
  name: "Morradoo",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "morradoo",
  location: { latitude: -38.35403334, longitude: 145.18960249 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const MORWELL: StopConfig = {
  id: stop.MORWELL,
  name: "Morwell",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "morwell",
  location: { latitude: -38.23674592, longitude: 146.39677567 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MOUNT_WAVERLEY: StopConfig = {
  id: stop.MOUNT_WAVERLEY,
  name: "Mount Waverley",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "mountwaverley",
  location: { latitude: -37.87526408, longitude: 145.1280441 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const MURCHISON_EAST: StopConfig = {
  id: stop.MURCHISON_EAST,
  name: "Murchison East",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "murchisoneast",
  location: { latitude: -36.61314794, longitude: 145.24063556 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const MURRUMBEENA: StopConfig = {
  id: stop.MURRUMBEENA,
  name: "Murrumbeena",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "murrumbeena",
  location: { latitude: -37.89019832, longitude: 145.06737487 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const NAGAMBIE: StopConfig = {
  id: stop.NAGAMBIE,
  name: "Nagambie",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "nagambie",
  location: { latitude: -36.7854641, longitude: 145.16035666 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const NAR_NAR_GOON: StopConfig = {
  id: stop.NAR_NAR_GOON,
  name: "Nar Nar Goon",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "narnargoon",
  location: { latitude: -38.08159155, longitude: 145.57166573 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const NARRE_WARREN: StopConfig = {
  id: stop.NARRE_WARREN,
  name: "Narre Warren",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "narrewarren",
  location: { latitude: -38.02777361, longitude: 145.303993 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const NEWMARKET: StopConfig = {
  id: stop.NEWMARKET,
  name: "Newmarket",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "newmarket",
  location: { latitude: -37.78732767, longitude: 144.92897847 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const NEWPORT: StopConfig = {
  id: stop.NEWPORT,
  name: "Newport",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "newport",
  location: { latitude: -37.84272637, longitude: 144.8835883 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const NOBLE_PARK: StopConfig = {
  id: stop.NOBLE_PARK,
  name: "Noble Park",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "noblepark",
  location: { latitude: -37.96661867, longitude: 145.17632482 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const NORTH_BRIGHTON: StopConfig = {
  id: stop.NORTH_BRIGHTON,
  name: "North Brighton",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "northbrighton",
  location: { latitude: -37.90478832, longitude: 145.00261908 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const NORTH_GEELONG: StopConfig = {
  id: stop.NORTH_GEELONG,
  name: "North Geelong",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "northgeelong",
  location: { latitude: -38.12268295, longitude: 144.35231162 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const NORTH_MELBOURNE: StopConfig = {
  id: stop.NORTH_MELBOURNE,
  name: "North Melbourne",
  tags: [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "northmelbourne",
  location: { latitude: -37.80630984, longitude: 144.94151017 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
    { stopPositionId: position.PLATFORM_4, name: "4" },
    { stopPositionId: position.PLATFORM_5, name: "5" },
    { stopPositionId: position.PLATFORM_6, name: "6" },
  ],
};

export const NORTH_RICHMOND: StopConfig = {
  id: stop.NORTH_RICHMOND,
  name: "North Richmond",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "northrichmond",
  location: { latitude: -37.81039836, longitude: 144.99250026 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const NORTH_SHORE: StopConfig = {
  id: stop.NORTH_SHORE,
  name: "North Shore",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "northshore",
  location: { latitude: -38.09837714, longitude: 144.36532142 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const NORTH_WILLIAMSTOWN: StopConfig = {
  id: stop.NORTH_WILLIAMSTOWN,
  name: "North Williamstown",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "northwilliamstown",
  location: { latitude: -37.85733348, longitude: 144.88906947 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const NORTHCOTE: StopConfig = {
  id: stop.NORTHCOTE,
  name: "Northcote",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "northcote",
  location: { latitude: -37.76986537, longitude: 144.99527721 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const NUNAWADING: StopConfig = {
  id: stop.NUNAWADING,
  name: "Nunawading",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "nunawading",
  location: { latitude: -37.82061218, longitude: 145.1748915 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const OAK_PARK: StopConfig = {
  id: stop.OAK_PARK,
  name: "Oak Park",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "oakpark",
  location: { latitude: -37.71794973, longitude: 144.92151877 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const OAKLEIGH: StopConfig = {
  id: stop.OAKLEIGH,
  name: "Oakleigh",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "oakleigh",
  location: { latitude: -37.90037214, longitude: 145.08830787 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const OFFICER: StopConfig = {
  id: stop.OFFICER,
  name: "Officer",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "officer",
  location: { latitude: -38.06614572, longitude: 145.41098723 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ORMOND: StopConfig = {
  id: stop.ORMOND,
  name: "Ormond",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "ormond",
  location: { latitude: -37.90321167, longitude: 145.03961342 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const PAKENHAM: StopConfig = {
  id: stop.PAKENHAM,
  name: "Pakenham",
  tags: [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "pakenham",
  location: { latitude: -38.08061397, longitude: 145.48637907 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const PARKDALE: StopConfig = {
  id: stop.PARKDALE,
  name: "Parkdale",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "parkdale",
  location: { latitude: -37.99307882, longitude: 145.07632682 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const PARLIAMENT: StopConfig = {
  id: stop.PARLIAMENT,
  name: "Parliament",
  tags: [tag.CITY_LOOP_UNDERGROUND, tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "parliament",
  location: { latitude: -37.811337, longitude: 144.973119 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
    { stopPositionId: position.PLATFORM_4, name: "4" },
  ],
};

export const PASCOE_VALE: StopConfig = {
  id: stop.PASCOE_VALE,
  name: "Pascoe Vale",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "pascoevale",
  location: { latitude: -37.73075596, longitude: 144.92819562 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const PATTERSON: StopConfig = {
  id: stop.PATTERSON,
  name: "Patterson",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "patterson",
  location: { latitude: -37.92514919, longitude: 145.03547003 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const PRAHRAN: StopConfig = {
  id: stop.PRAHRAN,
  name: "Prahran",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "prahran",
  location: { latitude: -37.84951848, longitude: 144.98985992 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const PRESTON: StopConfig = {
  id: stop.PRESTON,
  name: "Preston",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "preston",
  location: { latitude: -37.73867424, longitude: 145.00052198 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const PYRAMID: StopConfig = {
  id: stop.PYRAMID,
  name: "Pyramid",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "pyramid",
  location: { latitude: -36.0534147, longitude: 144.11332145 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const REGENT: StopConfig = {
  id: stop.REGENT,
  name: "Regent",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "regent",
  location: { latitude: -37.72840277, longitude: 145.00277256 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const RESERVOIR: StopConfig = {
  id: stop.RESERVOIR,
  name: "Reservoir",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "reservoir",
  location: { latitude: -37.71688492, longitude: 145.00699582 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const RICHMOND: StopConfig = {
  id: stop.RICHMOND,
  name: "Richmond",
  tags: [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "richmond",
  location: { latitude: -37.82407446, longitude: 144.99016426 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
    { stopPositionId: position.PLATFORM_4, name: "4" },
    { stopPositionId: position.PLATFORM_5, name: "5" },
    { stopPositionId: position.PLATFORM_6, name: "6" },
    { stopPositionId: position.PLATFORM_7, name: "7" },
    { stopPositionId: position.PLATFORM_8, name: "8" },
    { stopPositionId: position.PLATFORM_9, name: "9" },
    { stopPositionId: position.PLATFORM_10, name: "10" },
  ],
};

export const RIDDELLS_CREEK: StopConfig = {
  id: stop.RIDDELLS_CREEK,
  name: "Riddells Creek",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "riddellscreek",
  location: { latitude: -37.46512379, longitude: 144.67983071 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const RINGWOOD: StopConfig = {
  id: stop.RINGWOOD,
  name: "Ringwood",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "ringwood",
  location: { latitude: -37.81588648, longitude: 145.22896846 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const RINGWOOD_EAST: StopConfig = {
  id: stop.RINGWOOD_EAST,
  name: "Ringwood East",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "ringwoodeast",
  location: { latitude: -37.81196804, longitude: 145.25019091 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const RIPPONLEA: StopConfig = {
  id: stop.RIPPONLEA,
  name: "Ripponlea",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "ripponlea",
  location: { latitude: -37.87596086, longitude: 144.99525782 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const RIVERSDALE: StopConfig = {
  id: stop.RIVERSDALE,
  name: "Riversdale",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "riversdale",
  location: { latitude: -37.83150543, longitude: 145.06964598 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ROCHESTER: StopConfig = {
  id: stop.ROCHESTER,
  name: "Rochester",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "rochester",
  location: { latitude: -36.3623605, longitude: 144.69868134 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const ROCKBANK: StopConfig = {
  id: stop.ROCKBANK,
  name: "Rockbank",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "rockbank",
  location: { latitude: -37.72926127, longitude: 144.65063148 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ROSANNA: StopConfig = {
  id: stop.ROSANNA,
  name: "Rosanna",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "rosanna",
  location: { latitude: -37.7428786, longitude: 145.06614029 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ROSEDALE: StopConfig = {
  id: stop.ROSEDALE,
  name: "Rosedale",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "rosedale",
  location: { latitude: -38.15640367, longitude: 146.78696637 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const ROXBURGH_PARK: StopConfig = {
  id: stop.ROXBURGH_PARK,
  name: "Roxburgh Park",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "roxburghpark",
  location: { latitude: -37.63823121, longitude: 144.93540368 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ROYAL_PARK: StopConfig = {
  id: stop.ROYAL_PARK,
  name: "Royal Park",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "royalpark",
  location: { latitude: -37.78119293, longitude: 144.95230127 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const RUSHALL: StopConfig = {
  id: stop.RUSHALL,
  name: "Rushall",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "rushall",
  location: { latitude: -37.78321711, longitude: 144.99240708 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const RUTHVEN: StopConfig = {
  id: stop.RUTHVEN,
  name: "Ruthven",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "ruthven",
  location: { latitude: -37.70789754, longitude: 145.00951662 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const SALE: StopConfig = {
  id: stop.SALE,
  name: "Sale",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "sale",
  location: { latitude: -38.10310272, longitude: 147.05480513 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const SANDOWN_PARK: StopConfig = {
  id: stop.SANDOWN_PARK,
  name: "Sandown Park",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "sandownpark",
  location: { latitude: -37.95648655, longitude: 145.16282634 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const SANDRINGHAM: StopConfig = {
  id: stop.SANDRINGHAM,
  name: "Sandringham",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "sandringham",
  location: { latitude: -37.95033018, longitude: 145.00456136 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const SEAFORD: StopConfig = {
  id: stop.SEAFORD,
  name: "Seaford",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "seaford",
  location: { latitude: -38.10402104, longitude: 145.1282304 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const SEAHOLME: StopConfig = {
  id: stop.SEAHOLME,
  name: "Seaholme",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "seaholme",
  location: { latitude: -37.86784231, longitude: 144.84095773 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const SEDDON: StopConfig = {
  id: stop.SEDDON,
  name: "Seddon",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "seddon",
  location: { latitude: -37.80900514, longitude: 144.89567157 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const SEYMOUR: StopConfig = {
  id: stop.SEYMOUR,
  name: "Seymour",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "seymour",
  location: { latitude: -37.02472873, longitude: 145.13772862 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const SHEPPARTON: StopConfig = {
  id: stop.SHEPPARTON,
  name: "Shepparton",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "shepparton",
  location: { latitude: -36.38379101, longitude: 145.40649749 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const SHERWOOD_PARK: StopConfig = {
  id: stop.SHERWOOD_PARK,
  name: "Sherwood Park",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "sherwoodpark",
  location: { latitude: -38.38638239, longitude: 142.53884888 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const SHOWGROUNDS: StopConfig = {
  id: stop.SHOWGROUNDS,
  name: "Showgrounds",
  tags: [tag.SPECIAL_EVENTS_ONLY, tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "showgrounds",
  location: { latitude: -37.7834722, longitude: 144.91425689 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const SOMERVILLE: StopConfig = {
  id: stop.SOMERVILLE,
  name: "Somerville",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "somerville",
  location: { latitude: -38.22534196, longitude: 145.17624492 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const SOUTH_GEELONG: StopConfig = {
  id: stop.SOUTH_GEELONG,
  name: "South Geelong",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "southgeelong",
  location: { latitude: -38.15865863, longitude: 144.35898705 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const SOUTH_KENSINGTON: StopConfig = {
  id: stop.SOUTH_KENSINGTON,
  name: "South Kensington",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "southkensington",
  location: { latitude: -37.79953087, longitude: 144.92546901 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const SOUTH_MORANG: StopConfig = {
  id: stop.SOUTH_MORANG,
  name: "South Morang",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "southmorang",
  location: { latitude: -37.64905033, longitude: 145.06701257 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const SOUTH_YARRA: StopConfig = {
  id: stop.SOUTH_YARRA,
  name: "South Yarra",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "southyarra",
  location: { latitude: -37.83844935, longitude: 144.99234221 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
    { stopPositionId: position.PLATFORM_4, name: "4" },
    { stopPositionId: position.PLATFORM_5, name: "5" },
    { stopPositionId: position.PLATFORM_6, name: "6" },
  ],
};

export const SOUTHERN_CROSS: StopConfig = {
  id: stop.SOUTHERN_CROSS,
  name: "Southern Cross",
  tags: [tag.CITY_LOOP, tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "southerncross",
  location: { latitude: -37.8186631, longitude: 144.95277706 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_2A, name: "2A" },
    { stopPositionId: position.PLATFORM_2B, name: "2B" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
    { stopPositionId: position.PLATFORM_3A, name: "3A" },
    { stopPositionId: position.PLATFORM_3B, name: "3B" },
    { stopPositionId: position.PLATFORM_4, name: "4" },
    { stopPositionId: position.PLATFORM_4A, name: "4A" },
    { stopPositionId: position.PLATFORM_4B, name: "4B" },
    { stopPositionId: position.PLATFORM_5, name: "5" },
    { stopPositionId: position.PLATFORM_5A, name: "5A" },
    { stopPositionId: position.PLATFORM_5B, name: "5B" },
    { stopPositionId: position.PLATFORM_6, name: "6" },
    { stopPositionId: position.PLATFORM_6A, name: "6A" },
    { stopPositionId: position.PLATFORM_6B, name: "6B" },
    { stopPositionId: position.PLATFORM_7, name: "7" },
    { stopPositionId: position.PLATFORM_7A, name: "7A" },
    { stopPositionId: position.PLATFORM_7B, name: "7B" },
    { stopPositionId: position.PLATFORM_8, name: "8" },
    { stopPositionId: position.PLATFORM_8A, name: "8A" },
    { stopPositionId: position.PLATFORM_8B, name: "8B" },
    { stopPositionId: position.PLATFORM_8S, name: "8S" },
    { stopPositionId: position.PLATFORM_9, name: "9" },
    { stopPositionId: position.PLATFORM_10, name: "10" },
    { stopPositionId: position.PLATFORM_11, name: "11" },
    { stopPositionId: position.PLATFORM_12, name: "12" },
    { stopPositionId: position.PLATFORM_13, name: "13" },
    { stopPositionId: position.PLATFORM_14, name: "14" },
    { stopPositionId: position.PLATFORM_15, name: "15" },
    { stopPositionId: position.PLATFORM_15A, name: "15A" },
    { stopPositionId: position.PLATFORM_15B, name: "15B" },
    { stopPositionId: position.PLATFORM_16, name: "16" },
    { stopPositionId: position.PLATFORM_16A, name: "16A" },
    { stopPositionId: position.PLATFORM_16B, name: "16B" },
  ],
};

export const SOUTHLAND: StopConfig = {
  id: stop.SOUTHLAND,
  name: "Southland",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "southland",
  location: { latitude: -37.95813507, longitude: 145.04864786 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const SPOTSWOOD: StopConfig = {
  id: stop.SPOTSWOOD,
  name: "Spotswood",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "spotswood",
  location: { latitude: -37.83063888, longitude: 144.88593345 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const SPRINGHURST: StopConfig = {
  id: stop.SPRINGHURST,
  name: "Springhurst",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "springhurst",
  location: { latitude: -36.18627209, longitude: 146.47042552 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const SPRINGVALE: StopConfig = {
  id: stop.SPRINGVALE,
  name: "Springvale",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "springvale",
  location: { latitude: -37.94950878, longitude: 145.15345183 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ST_ALBANS: StopConfig = {
  id: stop.ST_ALBANS,
  name: "St Albans",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "stalbans",
  location: { latitude: -37.74486131, longitude: 144.80005045 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const STONY_POINT: StopConfig = {
  id: stop.STONY_POINT,
  name: "Stony Point",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "stonypoint",
  location: { latitude: -38.37423454, longitude: 145.22183746 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const STRATFORD: StopConfig = {
  id: stop.STRATFORD,
  name: "Stratford",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "stratford",
  location: { latitude: -37.96704739, longitude: 147.08146945 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const STRATHMORE: StopConfig = {
  id: stop.STRATHMORE,
  name: "Strathmore",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "strathmore",
  location: { latitude: -37.74359132, longitude: 144.92731571 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const SUNBURY: StopConfig = {
  id: stop.SUNBURY,
  name: "Sunbury",
  tags: [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "sunbury",
  location: { latitude: -37.57928396, longitude: 144.72798098 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const SUNSHINE: StopConfig = {
  id: stop.SUNSHINE,
  name: "Sunshine",
  tags: [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "sunshine",
  location: { latitude: -37.78853633, longitude: 144.8328782 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
    { stopPositionId: position.PLATFORM_4, name: "4" },
  ],
};

export const SWAN_HILL: StopConfig = {
  id: stop.SWAN_HILL,
  name: "Swan Hill",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "swanhill",
  location: { latitude: -35.34111357, longitude: 143.56234321 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const SYNDAL: StopConfig = {
  id: stop.SYNDAL,
  name: "Syndal",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "syndal",
  location: { latitude: -37.87622062, longitude: 145.14978071 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const TALBOT: StopConfig = {
  id: stop.TALBOT,
  name: "Talbot",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "talbot",
  location: { latitude: -37.17289923, longitude: 143.70564034 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const TALLAROOK: StopConfig = {
  id: stop.TALLAROOK,
  name: "Tallarook",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "tallarook",
  location: { latitude: -37.09233454, longitude: 145.10299728 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const TARNEIT: StopConfig = {
  id: stop.TARNEIT,
  name: "Tarneit",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "tarneit",
  location: { latitude: -37.83215468, longitude: 144.69448757 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const TECOMA: StopConfig = {
  id: stop.TECOMA,
  name: "Tecoma",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "tecoma",
  location: { latitude: -37.90811849, longitude: 145.34299458 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const TERANG: StopConfig = {
  id: stop.TERANG,
  name: "Terang",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "terang",
  location: { latitude: -38.23621199, longitude: 142.91147221 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const THOMASTOWN: StopConfig = {
  id: stop.THOMASTOWN,
  name: "Thomastown",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "thomastown",
  location: { latitude: -37.68033809, longitude: 145.01427887 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const THORNBURY: StopConfig = {
  id: stop.THORNBURY,
  name: "Thornbury",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "thornbury",
  location: { latitude: -37.75505179, longitude: 144.99857152 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const TOORAK: StopConfig = {
  id: stop.TOORAK,
  name: "Toorak",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "toorak",
  location: { latitude: -37.85077381, longitude: 145.01390858 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const TOORONGA: StopConfig = {
  id: stop.TOORONGA,
  name: "Tooronga",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "tooronga",
  location: { latitude: -37.84936553, longitude: 145.04173374 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const TOTTENHAM: StopConfig = {
  id: stop.TOTTENHAM,
  name: "Tottenham",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "tottenham",
  location: { latitude: -37.7992509, longitude: 144.86294494 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const TRAFALGAR: StopConfig = {
  id: stop.TRAFALGAR,
  name: "Trafalgar",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "trafalgar",
  location: { latitude: -38.2072423, longitude: 146.15477284 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const TRARALGON: StopConfig = {
  id: stop.TRARALGON,
  name: "Traralgon",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "traralgon",
  location: { latitude: -38.19888494, longitude: 146.53788212 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const TYABB: StopConfig = {
  id: stop.TYABB,
  name: "Tyabb",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "tyabb",
  location: { latitude: -38.259815, longitude: 145.18640071 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const TYNONG: StopConfig = {
  id: stop.TYNONG,
  name: "Tynong",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "tynong",
  location: { latitude: -38.08499626, longitude: 145.6282343 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const UPFIELD: StopConfig = {
  id: stop.UPFIELD,
  name: "Upfield",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "upfield",
  location: { latitude: -37.66607779, longitude: 144.94673994 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const UPPER_FERNTREE_GULLY: StopConfig = {
  id: stop.UPPER_FERNTREE_GULLY,
  name: "Upper Ferntree Gully",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "upperferntreegully",
  location: { latitude: -37.8926717, longitude: 145.30753019 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const UPWEY: StopConfig = {
  id: stop.UPWEY,
  name: "Upwey",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "upwey",
  location: { latitude: -37.90369097, longitude: 145.33133336 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const VICTORIA_PARK: StopConfig = {
  id: stop.VICTORIA_PARK,
  name: "Victoria Park",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "victoriapark",
  location: { latitude: -37.79915782, longitude: 144.99445143 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const VIOLET_TOWN: StopConfig = {
  id: stop.VIOLET_TOWN,
  name: "Violet Town",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "violettown",
  location: { latitude: -36.63881606, longitude: 145.71592345 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WALLAN: StopConfig = {
  id: stop.WALLAN,
  name: "Wallan",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "wallan",
  location: { latitude: -37.41653632, longitude: 145.00535827 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WANDONG: StopConfig = {
  id: stop.WANDONG,
  name: "Wandong",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "wandong",
  location: { latitude: -37.3546771, longitude: 145.02641544 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WANGARATTA: StopConfig = {
  id: stop.WANGARATTA,
  name: "Wangaratta",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "wangaratta",
  location: { latitude: -36.35515492, longitude: 146.31702684 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const WARRAGUL: StopConfig = {
  id: stop.WARRAGUL,
  name: "Warragul",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "warragul",
  location: { latitude: -38.16483276, longitude: 145.93265719 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WARRNAMBOOL: StopConfig = {
  id: stop.WARRNAMBOOL,
  name: "Warrnambool",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "warrnambool",
  location: { latitude: -38.38501396, longitude: 142.47554504 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const WATERGARDENS: StopConfig = {
  id: stop.WATERGARDENS,
  name: "Watergardens",
  tags: [tag.SUBURBAN_GTFS_SUBFEED, tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "watergardens",
  location: { latitude: -37.70111071, longitude: 144.77418099 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const WATSONIA: StopConfig = {
  id: stop.WATSONIA,
  name: "Watsonia",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "watsonia",
  location: { latitude: -37.71095798, longitude: 145.08379338 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WATTLE_GLEN: StopConfig = {
  id: stop.WATTLE_GLEN,
  name: "Wattle Glen",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "wattleglen",
  location: { latitude: -37.66396792, longitude: 145.18161453 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const WAURN_PONDS: StopConfig = {
  id: stop.WAURN_PONDS,
  name: "Waurn Ponds",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "waurnponds",
  location: { latitude: -38.21580573, longitude: 144.30683114 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WENDOUREE: StopConfig = {
  id: stop.WENDOUREE,
  name: "Wendouree",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "wendouree",
  location: { latitude: -37.53997217, longitude: 143.82121077 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WERRIBEE: StopConfig = {
  id: stop.WERRIBEE,
  name: "Werribee",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "werribee",
  location: { latitude: -37.89937805, longitude: 144.66111801 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const WEST_FOOTSCRAY: StopConfig = {
  id: stop.WEST_FOOTSCRAY,
  name: "West Footscray",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "westfootscray",
  location: { latitude: -37.80180266, longitude: 144.88398479 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const WEST_RICHMOND: StopConfig = {
  id: stop.WEST_RICHMOND,
  name: "West Richmond",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "westrichmond",
  location: { latitude: -37.81494896, longitude: 144.99142278 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WESTALL: StopConfig = {
  id: stop.WESTALL,
  name: "Westall",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "westall",
  location: { latitude: -37.93847284, longitude: 145.13881033 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const WESTGARTH: StopConfig = {
  id: stop.WESTGARTH,
  name: "Westgarth",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "westgarth",
  location: { latitude: -37.7806207, longitude: 144.99923319 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WESTONA: StopConfig = {
  id: stop.WESTONA,
  name: "Westona",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "westona",
  location: { latitude: -37.86516348, longitude: 144.81349356 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WILLIAMS_LANDING: StopConfig = {
  id: stop.WILLIAMS_LANDING,
  name: "Williams Landing",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "williamslanding",
  location: { latitude: -37.86986533, longitude: 144.74744472 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WILLIAMSTOWN: StopConfig = {
  id: stop.WILLIAMSTOWN,
  name: "Williamstown",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "williamstown",
  location: { latitude: -37.86775292, longitude: 144.90532331 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const WILLIAMSTOWN_BEACH: StopConfig = {
  id: stop.WILLIAMSTOWN_BEACH,
  name: "Williamstown Beach",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "williamstownbeach",
  location: { latitude: -37.86398189, longitude: 144.89448368 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WILLISON: StopConfig = {
  id: stop.WILLISON,
  name: "Willison",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "willison",
  location: { latitude: -37.83571565, longitude: 145.07029756 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WINCHELSEA: StopConfig = {
  id: stop.WINCHELSEA,
  name: "Winchelsea",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "winchelsea",
  location: { latitude: -38.24013506, longitude: 143.98413389 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const WINDSOR: StopConfig = {
  id: stop.WINDSOR,
  name: "Windsor",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "windsor",
  location: { latitude: -37.85605308, longitude: 144.99203517 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WODONGA: StopConfig = {
  id: stop.WODONGA,
  name: "Wodonga",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "wodonga",
  location: { latitude: -36.10584513, longitude: 146.87126565 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const WOODEND: StopConfig = {
  id: stop.WOODEND,
  name: "Woodend",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "woodend",
  location: { latitude: -37.35879859, longitude: 144.52589012 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const WYNDHAM_VALE: StopConfig = {
  id: stop.WYNDHAM_VALE,
  name: "Wyndham Vale",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "wyndhamvale",
  location: { latitude: -37.87252742, longitude: 144.60835702 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const YARRAGON: StopConfig = {
  id: stop.YARRAGON,
  name: "Yarragon",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "yarragon",
  location: { latitude: -38.20315754, longitude: 146.0630628 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const YARRAMAN: StopConfig = {
  id: stop.YARRAMAN,
  name: "Yarraman",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "yarraman",
  location: { latitude: -37.97825454, longitude: 145.19160028 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const YARRAVILLE: StopConfig = {
  id: stop.YARRAVILLE,
  name: "Yarraville",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "yarraville",
  location: { latitude: -37.81585044, longitude: 144.88993371 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const HUNTLY: StopConfig = {
  id: stop.HUNTLY,
  name: "Huntly",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "huntly",
  location: { latitude: -36.66584794, longitude: 144.36982046 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const RAYWOOD: StopConfig = {
  id: stop.RAYWOOD,
  name: "Raywood",
  tags: [tag.REGIONAL_GTFS_SUBFEED],
  urlPath: "raywood",
  location: { latitude: -36.53195927, longitude: 144.20116104 },
  positions: [{ stopPositionId: position.PLATFORM_1, name: "1" }],
};

export const UNION: StopConfig = {
  id: stop.UNION,
  name: "Union",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "union",
  location: { latitude: -37.82315506, longitude: 145.10034527 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
    { stopPositionId: position.PLATFORM_3, name: "3" },
  ],
};

export const EAST_PAKENHAM: StopConfig = {
  id: stop.EAST_PAKENHAM,
  name: "East Pakenham",
  tags: [tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "eastpakenham",
  location: { latitude: -38.08441136, longitude: 145.50635689 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ANZAC: StopConfig = {
  id: stop.ANZAC,
  name: "Anzac",
  tags: [tag.METRO_TUNNEL, tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "anzac",
  location: { latitude: -37.83331103, longitude: 144.97279042 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const TOWN_HALL: StopConfig = {
  id: stop.TOWN_HALL,
  name: "Town Hall",
  tags: [tag.METRO_TUNNEL, tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "townhall",
  location: { latitude: -37.81699161, longitude: 144.96709126 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const STATE_LIBRARY: StopConfig = {
  id: stop.STATE_LIBRARY,
  name: "State Library",
  tags: [tag.METRO_TUNNEL, tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "statelibrary",
  location: { latitude: -37.80943693, longitude: 144.9632775 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const PARKVILLE: StopConfig = {
  id: stop.PARKVILLE,
  name: "Parkville",
  tags: [tag.METRO_TUNNEL, tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "parkville",
  location: { latitude: -37.79987386, longitude: 144.95954246 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};

export const ARDEN: StopConfig = {
  id: stop.ARDEN,
  name: "Arden",
  tags: [tag.METRO_TUNNEL, tag.SUBURBAN_GTFS_SUBFEED],
  urlPath: "arden",
  location: { latitude: -37.80122194, longitude: 144.94120851 },
  positions: [
    { stopPositionId: position.PLATFORM_1, name: "1" },
    { stopPositionId: position.PLATFORM_2, name: "2" },
  ],
};
