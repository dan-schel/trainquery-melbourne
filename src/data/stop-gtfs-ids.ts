import type { StopGtfsIdMapping } from "./third-party-id-mapping-types.js";

export const stopGtfsIds: StopGtfsIdMapping = {
  // Aircraft
  "vic:rail:ACF": { stopId: 1 }, // Parent
  "13738": { stopId: 1, positionId: 51 }, // Platform 1
  "13739": { stopId: 1, positionId: 52 }, // Platform 2
  "26100": { stopId: 1, replacementBus: true }, // Replacement bus

  // Alamein
  "vic:rail:ALM": { stopId: 2 }, // Parent
  "11197": { stopId: 2, positionId: 51 }, // Platform 1
  "vic:rail:ALM_ConX": { stopId: 2 },
  "vic:rail:ALM_EN1": { stopId: 2 },
  "26101": { stopId: 2, replacementBus: true }, // Replacement bus

  // Albion
  "vic:rail:ALB": { stopId: 3 }, // Parent
  "15364": { stopId: 3, positionId: 51 }, // Platform 1
  "15365": { stopId: 3, positionId: 52 }, // Platform 2

  // Albury
  "nsw:rail:ABY": { stopId: 4 }, // Parent
  "20287": { stopId: 4 },

  // Alphington
  "vic:rail:ALP": { stopId: 5 }, // Parent
  "13750": { stopId: 5, positionId: 51 }, // Platform 1
  "13751": { stopId: 5, positionId: 52 }, // Platform 2
  "26103": { stopId: 5, replacementBus: true }, // Replacement bus

  // Altona
  "vic:rail:ALT": { stopId: 6 }, // Parent
  "13742": { stopId: 6, positionId: 51 }, // Platform 1
  "26104": { stopId: 6, replacementBus: true }, // Replacement bus

  // Anstey
  "vic:rail:ASY": { stopId: 7 }, // Parent
  "14312": { stopId: 7, positionId: 51 }, // Platform 1
  "14313": { stopId: 7, positionId: 52 }, // Platform 2

  // Anzac
  "vic:rail:AZC": { stopId: 318 }, // Parent
  "26556": { stopId: 318, positionId: 51 }, // Platform 1
  "26557": { stopId: 318, positionId: 52 }, // Platform 2
  "vic:rail:AZC_CN1": { stopId: 318 },
  "vic:rail:AZC_CN2": { stopId: 318 },
  "vic:rail:AZC_CN3": { stopId: 318 },
  "vic:rail:AZC_DP1": { stopId: 318 },
  "vic:rail:AZC_DP2": { stopId: 318 },
  "vic:rail:AZC_EN1": { stopId: 318 },
  "vic:rail:AZC_EN2": { stopId: 318 },
  "vic:rail:AZC_EN3": { stopId: 318 },
  "vic:rail:AZC_EN4": { stopId: 318 },
  "vic:rail:AZC_LI1": { stopId: 318 },
  "vic:rail:AZC_LI2": { stopId: 318 },
  "vic:rail:AZC_LI3": { stopId: 318 },
  "vic:rail:AZC_LI4": { stopId: 318 },
  "vic:rail:AZC_LI5": { stopId: 318 },

  // Ararat
  "vic:rail:ART": { stopId: 8 }, // Parent
  "20288": { stopId: 8 },

  // Ardeer
  "vic:rail:ARR": { stopId: 9 }, // Parent
  "20020": { stopId: 9 },

  // Arden
  "vic:rail:ARN": { stopId: 322 }, // Parent
  "26548": { stopId: 322, positionId: 51 }, // Platform 1
  "26549": { stopId: 322, positionId: 52 }, // Platform 2
  "vic:rail:ARN_DP1": { stopId: 322 },
  "vic:rail:ARN_DP2": { stopId: 322 },
  "vic:rail:ARN_DP3": { stopId: 322 },
  "vic:rail:ARN_EN1": { stopId: 322 },
  "vic:rail:ARN_LI1": { stopId: 322 },
  "vic:rail:ARN_LI2": { stopId: 322 },

  // Armadale
  "vic:rail:ARM": { stopId: 10 }, // Parent
  "14259": { stopId: 10, positionId: 51 }, // Platform 1
  "14260": { stopId: 10, positionId: 52 }, // Platform 2

  // Ascot Vale
  "vic:rail:ASV": { stopId: 11 }, // Parent
  "15548": { stopId: 11, positionId: 51 }, // Platform 1
  "15549": { stopId: 11, positionId: 52 }, // Platform 2

  // Ashburton
  "vic:rail:ASH": { stopId: 12 }, // Parent
  "11198": { stopId: 12, positionId: 51 }, // Platform 1

  // Aspendale
  "vic:rail:ASP": { stopId: 13 }, // Parent
  "11234": { stopId: 13, positionId: 51 }, // Platform 1
  "11235": { stopId: 13, positionId: 52 }, // Platform 2
  "vic:rail:ASP_ConX": { stopId: 13 },
  "vic:rail:ASP_EN1": { stopId: 13 },
  "vic:rail:ASP_EN2": { stopId: 13 },
  "vic:rail:ASP_EN3": { stopId: 13 },
  "vic:rail:ASP_PR1": { stopId: 13 },
  "26109": { stopId: 13, replacementBus: true }, // Replacement bus

  // Auburn
  "vic:rail:AUB": { stopId: 14 }, // Parent
  "12238": { stopId: 14, positionId: 51 }, // Platform 1
  "12239": { stopId: 14, positionId: 52 }, // Platform 2
  "12240": { stopId: 14, positionId: 53 }, // Platform 3

  // Avenel
  "vic:rail:AVL": { stopId: 15 }, // Parent
  "20289": { stopId: 15 },

  // Bacchus Marsh
  "vic:rail:BAH": { stopId: 16 }, // Parent
  "20290": { stopId: 16 },

  // Bairnsdale
  "vic:rail:BDE": { stopId: 17 }, // Parent
  "20291": { stopId: 17 },

  // Balaclava
  "vic:rail:BCV": { stopId: 18 }, // Parent
  "14288": { stopId: 18, positionId: 51 }, // Platform 1
  "14287": { stopId: 18, positionId: 52 }, // Platform 2
  "vic:rail:BCV_ConX": { stopId: 18 },
  "vic:rail:BCV_DP1": { stopId: 18 },
  "vic:rail:BCV_DP2": { stopId: 18 },
  "vic:rail:BCV_EN1": { stopId: 18 },
  "vic:rail:BCV_EN2": { stopId: 18 },
  "vic:rail:BCV_EN3": { stopId: 18 },
  "vic:rail:BCV_EN4": { stopId: 18 },
  "26111": { stopId: 18, replacementBus: true }, // Replacement bus

  // Ballan
  "vic:rail:BLN": { stopId: 19 }, // Parent
  "20292": { stopId: 19 },

  // Ballarat
  "vic:rail:BAT-V": { stopId: 20 }, // Parent
  "20293": { stopId: 20 },

  // Batman
  "vic:rail:BAT": { stopId: 21 }, // Parent
  "14306": { stopId: 21, positionId: 51 }, // Platform 1
  "14307": { stopId: 21, positionId: 52 }, // Platform 2

  // Baxter
  "vic:rail:BXR": { stopId: 22 }, // Parent
  "5701": { stopId: 22, positionId: 51 }, // Platform 1

  // Bayswater
  "vic:rail:BAY": { stopId: 23 }, // Parent
  "11410": { stopId: 23, positionId: 51 }, // Platform 1
  "11411": { stopId: 23, positionId: 52 }, // Platform 2

  // Beaconsfield
  "vic:rail:BFD": { stopId: 24 }, // Parent
  "12176": { stopId: 24, positionId: 51 }, // Platform 1
  "12177": { stopId: 24, positionId: 52 }, // Platform 2
  "26115": { stopId: 24, replacementBus: true }, // Replacement bus

  // Beaufort
  "vic:rail:BET": { stopId: 25 }, // Parent
  "20294": { stopId: 25 },

  // Belgrave
  "vic:rail:BEG": { stopId: 26 }, // Parent
  "11119": { stopId: 26, positionId: 51 }, // Platform 1
  "11120": { stopId: 26, positionId: 52 }, // Platform 2

  // Bell
  "vic:rail:BEL": { stopId: 27 }, // Parent
  "15381": { stopId: 27, positionId: 51 }, // Platform 1
  "15382": { stopId: 27, positionId: 52 }, // Platform 2
  "vic:rail:BEL_BR1": { stopId: 27 },
  "vic:rail:BEL_CN1": { stopId: 27 },
  "vic:rail:BEL_EN1": { stopId: 27 },
  "vic:rail:BEL_EN2": { stopId: 27 },
  "vic:rail:BEL_PR1": { stopId: 27 },
  "26117": { stopId: 27, replacementBus: true }, // Replacement bus

  // Benalla
  "vic:rail:BXA": { stopId: 28 }, // Parent
  "20295": { stopId: 28 },

  // Bendigo
  "vic:rail:BGO": { stopId: 29 }, // Parent
  "20296": { stopId: 29 },

  // Bentleigh
  "vic:rail:BEN": { stopId: 30 }, // Parent
  "14239": { stopId: 30, positionId: 51 }, // Platform 1
  "14240": { stopId: 30, positionId: 52 }, // Platform 2
  "14241": { stopId: 30, positionId: 53 }, // Platform 3

  // Berwick
  "vic:rail:BEW": { stopId: 31 }, // Parent
  "12178": { stopId: 31, positionId: 51 }, // Platform 1
  "12179": { stopId: 31, positionId: 52 }, // Platform 2
  "22251": { stopId: 31 },
  "26119": { stopId: 31, replacementBus: true }, // Replacement bus

  // Birregurra
  "vic:rail:BGE": { stopId: 32 }, // Parent
  "20297": { stopId: 32 },

  // Bittern
  "vic:rail:BIT": { stopId: 33 }, // Parent
  "3236": { stopId: 33, positionId: 51 }, // Platform 1

  // Blackburn
  "vic:rail:BBN": { stopId: 34 }, // Parent
  "12226": { stopId: 34, positionId: 51 }, // Platform 1
  "12227": { stopId: 34, positionId: 52 }, // Platform 2
  "12228": { stopId: 34, positionId: 53 }, // Platform 3
  "vic:rail:BBN_BR1": { stopId: 34 },
  "vic:rail:BBN_ConX": { stopId: 34 },
  "vic:rail:BBN_DP1": { stopId: 34 },
  "vic:rail:BBN_DP2": { stopId: 34 },
  "vic:rail:BBN_DP3": { stopId: 34 },
  "vic:rail:BBN_DP4": { stopId: 34 },
  "vic:rail:BBN_DP5": { stopId: 34 },
  "vic:rail:BBN_EN1": { stopId: 34 },
  "vic:rail:BBN_EN2": { stopId: 34 },
  "vic:rail:BBN_EN3": { stopId: 34 },
  "vic:rail:BBN_EN4": { stopId: 34 },
  "vic:rail:BBN_EN5": { stopId: 34 },
  "vic:rail:BBN_LI1": { stopId: 34 },
  "vic:rail:BBN_LI2": { stopId: 34 },
  "vic:rail:BBN_PR1": { stopId: 34 },
  "vic:rail:BBN_PR2": { stopId: 34 },
  "vic:rail:BBN_TX1": { stopId: 34 },
  "26121": { stopId: 34, replacementBus: true }, // Replacement bus

  // Bonbeach
  "vic:rail:BON": { stopId: 35 }, // Parent
  "11228": { stopId: 35, positionId: 51 }, // Platform 1
  "11229": { stopId: 35, positionId: 52 }, // Platform 2
  "vic:rail:BON_BR1": { stopId: 35 },
  "vic:rail:BON_ConX": { stopId: 35 },
  "vic:rail:BON_DP1": { stopId: 35 },
  "vic:rail:BON_DP2": { stopId: 35 },
  "vic:rail:BON_EN1": { stopId: 35 },
  "vic:rail:BON_EN2": { stopId: 35 },
  "vic:rail:BON_EN3": { stopId: 35 },
  "vic:rail:BON_EN4": { stopId: 35 },
  "vic:rail:BON_EN5": { stopId: 35 },
  "vic:rail:BON_EN6": { stopId: 35 },
  "vic:rail:BON_KR1": { stopId: 35 },
  "vic:rail:BON_KR2": { stopId: 35 },
  "vic:rail:BON_LI1": { stopId: 35 },
  "vic:rail:BON_LI2": { stopId: 35 },
  "vic:rail:BON_PR1": { stopId: 35 },
  "vic:rail:BON_PR2": { stopId: 35 },
  "26122": { stopId: 35, replacementBus: true }, // Replacement bus

  // Boronia
  "vic:rail:BOR": { stopId: 36 }, // Parent
  "11249": { stopId: 36, positionId: 51 }, // Platform 1
  "11409": { stopId: 36, positionId: 52 }, // Platform 2

  // Box Hill
  "vic:rail:BOX": { stopId: 37 }, // Parent
  "12221": { stopId: 37, positionId: 52 }, // Platform 2
  "12222": { stopId: 37, positionId: 53 }, // Platform 3
  "12223": { stopId: 37, positionId: 54 }, // Platform 4
  "vic:rail:BOX_CN1": { stopId: 37 },
  "vic:rail:BOX_ConX": { stopId: 37 },
  "vic:rail:BOX_DP1": { stopId: 37 },
  "vic:rail:BOX_DP2": { stopId: 37 },
  "vic:rail:BOX_DP3": { stopId: 37 },
  "vic:rail:BOX_EN1": { stopId: 37 },
  "vic:rail:BOX_LI1": { stopId: 37 },
  "vic:rail:BOX_PR1": { stopId: 37 },
  "vic:rail:BOX_PR2": { stopId: 37 },
  "vic:rail:BOX_PR3": { stopId: 37 },
  "vic:rail:BOX_TX1": { stopId: 37 },
  "26124": { stopId: 37, replacementBus: true }, // Replacement bus

  // Brighton Beach
  "vic:rail:BBH": { stopId: 38 }, // Parent
  "14275": { stopId: 38, positionId: 52 }, // Platform 2
  "14276": { stopId: 38, positionId: 53 }, // Platform 3

  // Broadford
  "vic:rail:BRF": { stopId: 39 }, // Parent
  "20298": { stopId: 39 },

  // Broadmeadows
  "vic:rail:BMS": { stopId: 40 }, // Parent
  "15529": { stopId: 40, positionId: 51 }, // Platform 1
  "15530": { stopId: 40, positionId: 52 }, // Platform 2
  "22254": { stopId: 40 },

  // Brunswick
  "vic:rail:BWK": { stopId: 41 }, // Parent
  "14314": { stopId: 41, positionId: 51 }, // Platform 1
  "14315": { stopId: 41, positionId: 52 }, // Platform 2

  // Bunyip
  "vic:rail:BYP": { stopId: 42 }, // Parent
  "20299": { stopId: 42 },

  // Burnley
  "vic:rail:BLY": { stopId: 43 }, // Parent
  "12247": { stopId: 43, positionId: 51 }, // Platform 1
  "12248": { stopId: 43, positionId: 52 }, // Platform 2
  "12249": { stopId: 43, positionId: 53 }, // Platform 3
  "12250": { stopId: 43, positionId: 54 }, // Platform 4
  "vic:rail:BLY_ConX": { stopId: 43 },
  "vic:rail:BLY_DP1": { stopId: 43 },
  "vic:rail:BLY_DP2": { stopId: 43 },
  "vic:rail:BLY_DP3": { stopId: 43 },
  "vic:rail:BLY_DP4": { stopId: 43 },
  "vic:rail:BLY_EN1": { stopId: 43 },
  "vic:rail:BLY_EN2": { stopId: 43 },
  "vic:rail:BLY_EN3": { stopId: 43 },
  "vic:rail:BLY_PR": { stopId: 43 },
  "26128": { stopId: 43, replacementBus: true }, // Replacement bus

  // Burwood
  "vic:rail:BWD": { stopId: 44 }, // Parent
  "11200": { stopId: 44, positionId: 51 }, // Platform 1
  "11199": { stopId: 44, positionId: 52 }, // Platform 2
  "vic:rail:BWD_ConX": { stopId: 44 },
  "vic:rail:BWD_EN1": { stopId: 44 },
  "vic:rail:BWD_EN2": { stopId: 44 },
  "vic:rail:BWD_PR1": { stopId: 44 },
  "vic:rail:BWD_PR2": { stopId: 44 },
  "26129": { stopId: 44, replacementBus: true }, // Replacement bus

  // Camberwell
  "vic:rail:CAM": { stopId: 45 }, // Parent
  "11207": { stopId: 45, positionId: 51 }, // Platform 1
  "11208": { stopId: 45, positionId: 52 }, // Platform 2
  "11209": { stopId: 45, positionId: 53 }, // Platform 3
  "vic:rail:CAM_ConX": { stopId: 45 },
  "vic:rail:CAM_DP1": { stopId: 45 },
  "vic:rail:CAM_DP2": { stopId: 45 },
  "vic:rail:CAM_DP3": { stopId: 45 },
  "vic:rail:CAM_EN1": { stopId: 45 },
  "vic:rail:CAM_EN2": { stopId: 45 },
  "vic:rail:CAM_EN3": { stopId: 45 },
  "vic:rail:CAM_EN4": { stopId: 45 },
  "vic:rail:CAM_PR1": { stopId: 45 },
  "vic:rail:CAM_TX1": { stopId: 45 },
  "26130": { stopId: 45, replacementBus: true }, // Replacement bus

  // Camperdown
  "vic:rail:CPD": { stopId: 46 }, // Parent
  "20300": { stopId: 46 },

  // Canterbury
  "vic:rail:CBY": { stopId: 47 }, // Parent
  "12210": { stopId: 47, positionId: 51 }, // Platform 1
  "12211": { stopId: 47, positionId: 52 }, // Platform 2
  "12209": { stopId: 47, positionId: 53 }, // Platform 3

  // Cardinia Road
  "vic:rail:CDA": { stopId: 48 }, // Parent
  "26501": { stopId: 48, positionId: 51 }, // Platform 1
  "26502": { stopId: 48, positionId: 52 }, // Platform 2
  "26132": { stopId: 48, replacementBus: true }, // Replacement bus

  // Carnegie
  "vic:rail:CNE": { stopId: 49 }, // Parent
  "13729": { stopId: 49, positionId: 51 }, // Platform 1
  "13730": { stopId: 49, positionId: 52 }, // Platform 2
  "vic:rail:CNE_BR1": { stopId: 49 },
  "vic:rail:CNE_ConX": { stopId: 49 },
  "vic:rail:CNE_DP1": { stopId: 49 },
  "vic:rail:CNE_DP2": { stopId: 49 },
  "vic:rail:CNE_EN1": { stopId: 49 },
  "vic:rail:CNE_EN2": { stopId: 49 },
  "vic:rail:CNE_LI1": { stopId: 49 },
  "vic:rail:CNE_PR1": { stopId: 49 },
  "26133": { stopId: 49, replacementBus: true }, // Replacement bus

  // Caroline Springs
  "vic:rail:RVH": { stopId: 50 }, // Parent
  "52011": { stopId: 50 },

  // Carrum
  "vic:rail:CAR": { stopId: 51 }, // Parent
  "11226": { stopId: 51, positionId: 51 }, // Platform 1
  "11227": { stopId: 51, positionId: 52 }, // Platform 2

  // Castlemaine
  "vic:rail:CME": { stopId: 52 }, // Parent
  "20301": { stopId: 52 },

  // Caulfield
  "vic:rail:CFD": { stopId: 53 }, // Parent
  "14251": { stopId: 53, positionId: 51 }, // Platform 1
  "14252": { stopId: 53, positionId: 52 }, // Platform 2
  "14253": { stopId: 53, positionId: 53 }, // Platform 3
  "14254": { stopId: 53, positionId: 54 }, // Platform 4
  "22248": { stopId: 53 },
  "vic:rail:CFD_BR1": { stopId: 53 },
  "vic:rail:CFD_ConX": { stopId: 53 },
  "vic:rail:CFD_DP1": { stopId: 53 },
  "vic:rail:CFD_DP2": { stopId: 53 },
  "vic:rail:CFD_DP3": { stopId: 53 },
  "vic:rail:CFD_DP4": { stopId: 53 },
  "vic:rail:CFD_EN1": { stopId: 53 },
  "vic:rail:CFD_EN2": { stopId: 53 },
  "vic:rail:CFD_EN3": { stopId: 53 },
  "vic:rail:CFD_EN4": { stopId: 53 },
  "vic:rail:CFD_EN5": { stopId: 53 },
  "vic:rail:CFD_EN6": { stopId: 53 },
  "vic:rail:CFD_KR1": { stopId: 53 },
  "vic:rail:CFD_PR1": { stopId: 53 },
  "vic:rail:CFD_TX1": { stopId: 53 },
  "26135": { stopId: 53, replacementBus: true }, // Replacement bus

  // Chatham
  "vic:rail:CHM": { stopId: 54 }, // Parent
  "12212": { stopId: 54, positionId: 51 }, // Platform 1
  "12213": { stopId: 54, positionId: 52 }, // Platform 2
  "12214": { stopId: 54, positionId: 53 }, // Platform 3

  // Chelsea
  "vic:rail:CSA": { stopId: 55 }, // Parent
  "11230": { stopId: 55, positionId: 51 }, // Platform 1
  "11231": { stopId: 55, positionId: 52 }, // Platform 2
  "vic:rail:CSA_BR1": { stopId: 55 },
  "vic:rail:CSA_ConX": { stopId: 55 },
  "vic:rail:CSA_DP1": { stopId: 55 },
  "vic:rail:CSA_DP2": { stopId: 55 },
  "vic:rail:CSA_EN1": { stopId: 55 },
  "vic:rail:CSA_EN2": { stopId: 55 },
  "vic:rail:CSA_EN3": { stopId: 55 },
  "vic:rail:CSA_EN4": { stopId: 55 },
  "vic:rail:CSA_EN5": { stopId: 55 },
  "vic:rail:CSA_EN6": { stopId: 55 },
  "vic:rail:CSA_LI1": { stopId: 55 },
  "vic:rail:CSA_LI2": { stopId: 55 },
  "vic:rail:CSA_PR1": { stopId: 55 },
  "26137": { stopId: 55, replacementBus: true }, // Replacement bus

  // Cheltenham
  "vic:rail:CTM": { stopId: 56 }, // Parent
  "11243": { stopId: 56, positionId: 51 }, // Platform 1
  "11242": { stopId: 56, positionId: 52 }, // Platform 2
  "11244": { stopId: 56, positionId: 53 }, // Platform 3
  "vic:rail:CTM_BR1": { stopId: 56 },
  "vic:rail:CTM_ConX": { stopId: 56 },
  "vic:rail:CTM_DP1": { stopId: 56 },
  "vic:rail:CTM_EN1": { stopId: 56 },
  "vic:rail:CTM_LI1": { stopId: 56 },
  "vic:rail:CTM_LI2": { stopId: 56 },
  "vic:rail:CTM_PR1": { stopId: 56 },
  "26138": { stopId: 56, replacementBus: true }, // Replacement bus

  // Chiltern
  "vic:rail:CHI": { stopId: 57 }, // Parent
  "20302": { stopId: 57 },

  // Clarkefield
  "vic:rail:CKF": { stopId: 58 }, // Parent
  "20303": { stopId: 58 },

  // Clayton
  "vic:rail:CLA": { stopId: 59 }, // Parent
  "13718": { stopId: 59, positionId: 51 }, // Platform 1
  "13719": { stopId: 59, positionId: 52 }, // Platform 2
  "22249": { stopId: 59 },
  "vic:rail:CLA_BR1": { stopId: 59 },
  "vic:rail:CLA_ConX": { stopId: 59 },
  "vic:rail:CLA_DP1": { stopId: 59 },
  "vic:rail:CLA_EN1": { stopId: 59 },
  "vic:rail:CLA_LI1": { stopId: 59 },
  "vic:rail:CLA_PR1": { stopId: 59 },
  "26139": { stopId: 59, replacementBus: true }, // Replacement bus

  // Clifton Hill
  "vic:rail:CHL": { stopId: 60 }, // Parent
  "14330": { stopId: 60, positionId: 51 }, // Platform 1
  "14331": { stopId: 60, positionId: 52 }, // Platform 2
  "vic:rail:CHL_BR1": { stopId: 60 },
  "vic:rail:CHL_DP1": { stopId: 60 },
  "vic:rail:CHL_DP2": { stopId: 60 },
  "vic:rail:CHL_DP3": { stopId: 60 },
  "vic:rail:CHL_EN1": { stopId: 60 },
  "vic:rail:CHL_EN2": { stopId: 60 },
  "vic:rail:CHL_EN3": { stopId: 60 },
  "vic:rail:CHL_EN4": { stopId: 60 },
  "vic:rail:CHL_EN5": { stopId: 60 },
  "vic:rail:CHL_PR1": { stopId: 60 },
  "vic:rail:CHL_PR2": { stopId: 60 },
  "26140": { stopId: 60, replacementBus: true }, // Replacement bus

  // Clunes
  "vic:rail:CLU": { stopId: 61 }, // Parent
  "44952": { stopId: 61 },

  // Cobblebank
  "vic:rail:TLN": { stopId: 62 }, // Parent
  "48804": { stopId: 62 },

  // Coburg
  "vic:rail:COB": { stopId: 63 }, // Parent
  "14308": { stopId: 63, positionId: 51 }, // Platform 1
  "14309": { stopId: 63, positionId: 52 }, // Platform 2

  // Colac
  "vic:rail:COL": { stopId: 64 }, // Parent
  "20304": { stopId: 64 },

  // Collingwood
  "vic:rail:CWD": { stopId: 65 }, // Parent
  "14335": { stopId: 65, positionId: 51 }, // Platform 1
  "14334": { stopId: 65, positionId: 52 }, // Platform 2
  "vic:rail:CWD_DP1": { stopId: 65 },
  "vic:rail:CWD_DP2": { stopId: 65 },
  "vic:rail:CWD_EN1": { stopId: 65 },
  "vic:rail:CWD_EN2": { stopId: 65 },
  "vic:rail:CWD_EN3": { stopId: 65 },
  "vic:rail:CWD_EN4": { stopId: 65 },
  "vic:rail:CWD_EN5": { stopId: 65 },
  "vic:rail:CWD_EN6": { stopId: 65 },
  "vic:rail:CWD_PR1": { stopId: 65 },
  "26142": { stopId: 65, replacementBus: true }, // Replacement bus

  // Coolaroo
  "vic:rail:CLO": { stopId: 66 }, // Parent
  "26503": { stopId: 66, positionId: 51 }, // Platform 1
  "26504": { stopId: 66, positionId: 52 }, // Platform 2

  // Corio
  "vic:rail:COR": { stopId: 67 }, // Parent
  "20305": { stopId: 67 },

  // Craigieburn
  "vic:rail:CGB": { stopId: 68 }, // Parent
  "15527": { stopId: 68, positionId: 51 }, // Platform 1
  "15528": { stopId: 68, positionId: 52 }, // Platform 2
  "20029": { stopId: 68 },
  "vic:rail:CGB_BR1": { stopId: 68 },
  "vic:rail:CGB_ConX": { stopId: 68 },
  "vic:rail:CGB_DP1": { stopId: 68 },
  "vic:rail:CGB_DP2": { stopId: 68 },
  "vic:rail:CGB_EN1": { stopId: 68 },
  "vic:rail:CGB_EN2": { stopId: 68 },
  "vic:rail:CGB_EN3": { stopId: 68 },
  "vic:rail:CGB_KR1": { stopId: 68 },
  "vic:rail:CGB_PR1": { stopId: 68 },
  "vic:rail:CGB_PR2": { stopId: 68 },
  "vic:rail:CGB_TX1": { stopId: 68 },
  "26144": { stopId: 68, replacementBus: true }, // Replacement bus

  // Cranbourne
  "vic:rail:CBE": { stopId: 69 }, // Parent
  "12184": { stopId: 69, positionId: 51 }, // Platform 1
  "12185": { stopId: 69, positionId: 52 }, // Platform 2
  "vic:rail:CBE_BR1": { stopId: 69 },
  "vic:rail:CBE_ConX": { stopId: 69 },
  "vic:rail:CBE_EN1": { stopId: 69 },
  "vic:rail:CBE_PR1": { stopId: 69 },
  "vic:rail:CBE_PR2": { stopId: 69 },
  "26145": { stopId: 69, replacementBus: true }, // Replacement bus

  // Creswick
  "vic:rail:CWK": { stopId: 70 }, // Parent
  "44951": { stopId: 70 },

  // Crib Point
  "vic:rail:CPT": { stopId: 71 }, // Parent
  "615": { stopId: 71, positionId: 51 }, // Platform 1

  // Croxton
  "vic:rail:CXT": { stopId: 72 }, // Parent
  "15385": { stopId: 72, positionId: 51 }, // Platform 1
  "15386": { stopId: 72, positionId: 52 }, // Platform 2
  "vic:rail:CXT_EN1": { stopId: 72 },
  "vic:rail:CXT_EN2": { stopId: 72 },
  "vic:rail:CXT_EN3": { stopId: 72 },
  "vic:rail:CXT_EN4": { stopId: 72 },
  "vic:rail:CXT_EN5": { stopId: 72 },
  "vic:rail:CXT_EN6": { stopId: 72 },
  "vic:rail:CXT_EN7": { stopId: 72 },
  "26147": { stopId: 72, replacementBus: true }, // Replacement bus

  // Croydon
  "vic:rail:CDN": { stopId: 73 }, // Parent
  "12168": { stopId: 73, positionId: 51 }, // Platform 1
  "12169": { stopId: 73, positionId: 52 }, // Platform 2

  // Dandenong
  "vic:rail:DNG": { stopId: 74 }, // Parent
  "12187": { stopId: 74, positionId: 51 }, // Platform 1
  "12188": { stopId: 74, positionId: 52 }, // Platform 2
  "12189": { stopId: 74, positionId: 53 }, // Platform 3
  "22250": { stopId: 74 },
  "vic:rail:DNG_BR1": { stopId: 74 },
  "vic:rail:DNG_ConX": { stopId: 74 },
  "vic:rail:DNG_DP1": { stopId: 74 },
  "vic:rail:DNG_DP2": { stopId: 74 },
  "vic:rail:DNG_DP3": { stopId: 74 },
  "vic:rail:DNG_DP4": { stopId: 74 },
  "vic:rail:DNG_DP5": { stopId: 74 },
  "vic:rail:DNG_DP6": { stopId: 74 },
  "vic:rail:DNG_DP7": { stopId: 74 },
  "vic:rail:DNG_DP8": { stopId: 74 },
  "vic:rail:DNG_EN1": { stopId: 74 },
  "vic:rail:DNG_EN2": { stopId: 74 },
  "vic:rail:DNG_EN3": { stopId: 74 },
  "vic:rail:DNG_EN4": { stopId: 74 },
  "vic:rail:DNG_EN5": { stopId: 74 },
  "vic:rail:DNG_LI1": { stopId: 74 },
  "vic:rail:DNG_LI2": { stopId: 74 },
  "vic:rail:DNG_PR1": { stopId: 74 },
  "vic:rail:DNG_PR2": { stopId: 74 },
  "vic:rail:DNG_TX1": { stopId: 74 },
  "26149": { stopId: 74, replacementBus: true }, // Replacement bus

  // Darebin
  "vic:rail:DBN": { stopId: 75 }, // Parent
  "13752": { stopId: 75, positionId: 51 }, // Platform 1
  "13753": { stopId: 75, positionId: 52 }, // Platform 2
  "26150": { stopId: 75, replacementBus: true }, // Replacement bus

  // Darling
  "vic:rail:DLG": { stopId: 76 }, // Parent
  "8272": { stopId: 76, positionId: 51 }, // Platform 1
  "8691": { stopId: 76, positionId: 52 }, // Platform 2

  // Deer Park
  "vic:rail:DEK": { stopId: 77 }, // Parent
  "19982": { stopId: 77 },

  // Dennis
  "vic:rail:DEN": { stopId: 78 }, // Parent
  "13746": { stopId: 78, positionId: 51 }, // Platform 1
  "13747": { stopId: 78, positionId: 52 }, // Platform 2
  "26152": { stopId: 78, replacementBus: true }, // Replacement bus

  // Diamond Creek
  "vic:rail:DCK": { stopId: 79 }, // Parent
  "15334": { stopId: 79, positionId: 51 }, // Platform 1
  "15335": { stopId: 79, positionId: 52 }, // Platform 2
  "vic:rail:DCK_ConX": { stopId: 79 },
  "vic:rail:DCK_DP1": { stopId: 79 },
  "vic:rail:DCK_DP2": { stopId: 79 },
  "vic:rail:DCK_EN1": { stopId: 79 },
  "vic:rail:DCK_EN2": { stopId: 79 },
  "vic:rail:DCK_EN3": { stopId: 79 },
  "vic:rail:DCK_PR1": { stopId: 79 },
  "26153": { stopId: 79, replacementBus: true }, // Replacement bus

  // Diggers Rest
  "vic:rail:DRT": { stopId: 80 }, // Parent
  "26505": { stopId: 80, positionId: 51 }, // Platform 1
  "15354": { stopId: 80, positionId: 52 }, // Platform 2

  // Dingee
  "vic:rail:DGE": { stopId: 81 }, // Parent
  "20306": { stopId: 81 },

  // Donnybrook
  "vic:rail:DBK": { stopId: 82 }, // Parent
  "20307": { stopId: 82 },

  // Drouin
  "vic:rail:DRN": { stopId: 83 }, // Parent
  "20308": { stopId: 83 },

  // Eaglehawk
  "vic:rail:EAG-V": { stopId: 84 }, // Parent
  "20309": { stopId: 84 },

  // Eaglemont
  "vic:rail:EAG": { stopId: 85 }, // Parent
  "13756": { stopId: 85, positionId: 51 }, // Platform 1
  "13757": { stopId: 85, positionId: 52 }, // Platform 2
  "26155": { stopId: 85, replacementBus: true }, // Replacement bus

  // East Camberwell
  "vic:rail:ECM": { stopId: 86 }, // Parent
  "12206": { stopId: 86, positionId: 51 }, // Platform 1
  "12207": { stopId: 86, positionId: 52 }, // Platform 2
  "12208": { stopId: 86, positionId: 53 }, // Platform 3
  "vic:rail:ECM_ConX": { stopId: 86 },
  "vic:rail:ECM_DP1": { stopId: 86 },
  "vic:rail:ECM_DP2": { stopId: 86 },
  "vic:rail:ECM_DP3": { stopId: 86 },
  "vic:rail:ECM_EN1": { stopId: 86 },
  "vic:rail:ECM_EN2": { stopId: 86 },
  "vic:rail:ECM_EN3": { stopId: 86 },
  "vic:rail:ECM_EN4": { stopId: 86 },
  "vic:rail:ECM_PR1": { stopId: 86 },
  "26156": { stopId: 86, replacementBus: true }, // Replacement bus

  // East Malvern
  "vic:rail:EMV": { stopId: 87 }, // Parent
  "8705": { stopId: 87, positionId: 51 }, // Platform 1
  "8718": { stopId: 87, positionId: 52 }, // Platform 2

  // East Pakenham
  "vic:rail:EPH": { stopId: 317 }, // Parent
  "26506": { stopId: 317, positionId: 51 }, // Platform 1
  "26507": { stopId: 317, positionId: 52 }, // Platform 2
  "26158": { stopId: 317, replacementBus: true }, // Replacement bus

  // East Richmond
  "vic:rail:ERM": { stopId: 88 }, // Parent
  "12251": { stopId: 88, positionId: 51 }, // Platform 1
  "12252": { stopId: 88, positionId: 52 }, // Platform 2
  "vic:rail:ERM_ConX": { stopId: 88 },
  "vic:rail:ERM_EN1": { stopId: 88 },
  "vic:rail:ERM_EN2": { stopId: 88 },
  "vic:rail:ERM_EN3": { stopId: 88 },
  "vic:rail:ERM_EN4": { stopId: 88 },
  "vic:rail:ERM_EN5": { stopId: 88 },
  "26159": { stopId: 88, replacementBus: true }, // Replacement bus

  // Echuca
  "vic:rail:ECH": { stopId: 89 }, // Parent
  "20310": { stopId: 89 },

  // Edithvale
  "vic:rail:EDI": { stopId: 90 }, // Parent
  "11232": { stopId: 90, positionId: 51 }, // Platform 1
  "11233": { stopId: 90, positionId: 52 }, // Platform 2
  "vic:rail:EDI_BR1": { stopId: 90 },
  "vic:rail:EDI_ConX": { stopId: 90 },
  "vic:rail:EDI_DP1": { stopId: 90 },
  "vic:rail:EDI_DP2": { stopId: 90 },
  "vic:rail:EDI_EN1": { stopId: 90 },
  "vic:rail:EDI_EN2": { stopId: 90 },
  "vic:rail:EDI_EN3": { stopId: 90 },
  "vic:rail:EDI_EN4": { stopId: 90 },
  "vic:rail:EDI_EN5": { stopId: 90 },
  "vic:rail:EDI_EN6": { stopId: 90 },
  "vic:rail:EDI_EN7": { stopId: 90 },
  "vic:rail:EDI_KR1": { stopId: 90 },
  "vic:rail:EDI_LI1": { stopId: 90 },
  "vic:rail:EDI_LI2": { stopId: 90 },
  "vic:rail:EDI_PR1": { stopId: 90 },
  "vic:rail:EDI_PR2": { stopId: 90 },
  "26160": { stopId: 90, replacementBus: true }, // Replacement bus

  // Elmore
  "vic:rail:EME": { stopId: 91 }, // Parent
  "20311": { stopId: 91 },

  // Elsternwick
  "vic:rail:ELS": { stopId: 92 }, // Parent
  "14283": { stopId: 92, positionId: 51 }, // Platform 1
  "14284": { stopId: 92, positionId: 52 }, // Platform 2
  "vic:rail:ELS_ConX": { stopId: 92 },
  "vic:rail:ELS_EN1": { stopId: 92 },
  "vic:rail:ELS_EN2": { stopId: 92 },
  "vic:rail:ELS_PR1": { stopId: 92 },
  "26161": { stopId: 92, replacementBus: true }, // Replacement bus

  // Eltham
  "vic:rail:ELT": { stopId: 93 }, // Parent
  "15332": { stopId: 93, positionId: 51 }, // Platform 1
  "15333": { stopId: 93, positionId: 52 }, // Platform 2
  "vic:rail:ELT_BR1": { stopId: 93 },
  "vic:rail:ELT_ConX": { stopId: 93 },
  "vic:rail:ELT_DP1": { stopId: 93 },
  "vic:rail:ELT_DP2": { stopId: 93 },
  "vic:rail:ELT_DP3": { stopId: 93 },
  "vic:rail:ELT_DP4": { stopId: 93 },
  "vic:rail:ELT_DP5": { stopId: 93 },
  "vic:rail:ELT_EN1": { stopId: 93 },
  "vic:rail:ELT_EN2": { stopId: 93 },
  "vic:rail:ELT_EN3": { stopId: 93 },
  "vic:rail:ELT_PR1": { stopId: 93 },
  "vic:rail:ELT_PR2": { stopId: 93 },
  "vic:rail:ELT_PR3": { stopId: 93 },
  "vic:rail:ELT_PR4": { stopId: 93 },
  "vic:rail:ELT_TX1": { stopId: 93 },
  "26162": { stopId: 93, replacementBus: true }, // Replacement bus

  // Epping
  "vic:rail:EPP": { stopId: 94 }, // Parent
  "15366": { stopId: 94, positionId: 51 }, // Platform 1
  "15367": { stopId: 94, positionId: 52 }, // Platform 2
  "vic:rail:EPP_BR1": { stopId: 94 },
  "vic:rail:EPP_EN1": { stopId: 94 },
  "vic:rail:EPP_PR1": { stopId: 94 },
  "vic:rail:EPP_PR2": { stopId: 94 },
  "vic:rail:EPP_PR3": { stopId: 94 },
  "vic:rail:EPP_PR4": { stopId: 94 },
  "vic:rail:EPP_TX1": { stopId: 94 },
  "26163": { stopId: 94, replacementBus: true }, // Replacement bus

  // Epsom
  "vic:rail:EPM": { stopId: 95 }, // Parent
  "47642": { stopId: 95 },

  // Essendon
  "vic:rail:ESD": { stopId: 96 }, // Parent
  "15543": { stopId: 96, positionId: 51 }, // Platform 1
  "15544": { stopId: 96, positionId: 52 }, // Platform 2
  "15545": { stopId: 96, positionId: 53 }, // Platform 3
  "22253": { stopId: 96 },
  "vic:rail:ESD_ConX": { stopId: 96 },
  "vic:rail:ESD_DP1": { stopId: 96 },
  "vic:rail:ESD_DP2": { stopId: 96 },
  "vic:rail:ESD_DP3": { stopId: 96 },
  "vic:rail:ESD_EN1": { stopId: 96 },
  "vic:rail:ESD_EN2": { stopId: 96 },
  "vic:rail:ESD_EN3": { stopId: 96 },
  "vic:rail:ESD_EN4": { stopId: 96 },
  "vic:rail:ESD_PR1": { stopId: 96 },
  "vic:rail:ESD_PR2": { stopId: 96 },
  "26164": { stopId: 96, replacementBus: true }, // Replacement bus

  // Euroa
  "vic:rail:EOA": { stopId: 97 }, // Parent
  "20312": { stopId: 97 },

  // Fairfield
  "vic:rail:FFD": { stopId: 98 }, // Parent
  "13748": { stopId: 98, positionId: 51 }, // Platform 1
  "13749": { stopId: 98, positionId: 52 }, // Platform 2
  "26165": { stopId: 98, replacementBus: true }, // Replacement bus

  // Fawkner
  "vic:rail:FAK": { stopId: 99 }, // Parent
  "14302": { stopId: 99, positionId: 51 }, // Platform 1
  "14303": { stopId: 99, positionId: 52 }, // Platform 2

  // Ferntree Gully
  "vic:rail:FTG": { stopId: 100 }, // Parent
  "11247": { stopId: 100, positionId: 51 }, // Platform 1
  "11248": { stopId: 100, positionId: 52 }, // Platform 2

  // Flagstaff
  "vic:rail:FGS": { stopId: 101 }, // Parent
  "10920": { stopId: 101, positionId: 51 }, // Platform 1
  "10921": { stopId: 101, positionId: 52 }, // Platform 2
  "12195": { stopId: 101, positionId: 53 }, // Platform 3
  "12196": { stopId: 101, positionId: 54 }, // Platform 4
  "vic:rail:FGS_CN1": { stopId: 101 },
  "vic:rail:FGS_ConX": { stopId: 101 },
  "vic:rail:FGS_DP1": { stopId: 101 },
  "vic:rail:FGS_DP2": { stopId: 101 },
  "vic:rail:FGS_DP3": { stopId: 101 },
  "vic:rail:FGS_EN1": { stopId: 101 },
  "vic:rail:FGS_EN2": { stopId: 101 },
  "vic:rail:FGS_LII": { stopId: 101 },
  "26168": { stopId: 101, replacementBus: true }, // Replacement bus

  // Flemington Bridge
  "vic:rail:FBD": { stopId: 102 }, // Parent
  "14320": { stopId: 102, positionId: 51 }, // Platform 1
  "14321": { stopId: 102, positionId: 52 }, // Platform 2

  // Flemington Racecourse
  "vic:rail:RCE": { stopId: 103 }, // Parent
  "15524": { stopId: 103, positionId: 51 }, // Platform 1
  "15525": { stopId: 103, positionId: 52 }, // Platform 2

  // Flinders Street
  "vic:rail:FSS": { stopId: 104 }, // Parent
  "11212": { stopId: 104, positionId: 51 }, // Platform 1
  "11213": { stopId: 104, positionId: 52 }, // Platform 2
  "11214": { stopId: 104, positionId: 53 }, // Platform 3
  "11215": { stopId: 104, positionId: 54 }, // Platform 4
  "11216": { stopId: 104, positionId: 55 }, // Platform 5
  "11217": { stopId: 104, positionId: 56 }, // Platform 6
  "11218": { stopId: 104, positionId: 57 }, // Platform 7
  "12205": { stopId: 104, positionId: 58 }, // Platform 8
  "12204": { stopId: 104, positionId: 59 }, // Platform 9
  "12203": { stopId: 104, positionId: 60 }, // Platform 10
  "12202": { stopId: 104, positionId: 62 }, // Platform 12
  "12201": { stopId: 104, positionId: 63 }, // Platform 13
  "22238": { stopId: 104 },
  "vic:rail:FSS_CN1": { stopId: 104 },
  "vic:rail:FSS_ConX": { stopId: 104 },
  "vic:rail:FSS_dDP1": { stopId: 104 },
  "vic:rail:FSS_dDP2": { stopId: 104 },
  "vic:rail:FSS_dDP3": { stopId: 104 },
  "vic:rail:FSS_dDP4": { stopId: 104 },
  "vic:rail:FSS_dDP5": { stopId: 104 },
  "vic:rail:FSS_dDP6": { stopId: 104 },
  "vic:rail:FSS_dDP7": { stopId: 104 },
  "vic:rail:FSS_dDP8": { stopId: 104 },
  "vic:rail:FSS_dDP9": { stopId: 104 },
  "vic:rail:FSS_dEN1": { stopId: 104 },
  "vic:rail:FSS_dEN2": { stopId: 104 },
  "vic:rail:FSS_dEN3": { stopId: 104 },
  "vic:rail:FSS_dEN4": { stopId: 104 },
  "vic:rail:FSS_DP1": { stopId: 104 },
  "vic:rail:FSS_DP2": { stopId: 104 },
  "vic:rail:FSS_DP3": { stopId: 104 },
  "vic:rail:FSS_DP4": { stopId: 104 },
  "vic:rail:FSS_DP5": { stopId: 104 },
  "vic:rail:FSS_DP6": { stopId: 104 },
  "vic:rail:FSS_DP7": { stopId: 104 },
  "vic:rail:FSS_eDP1": { stopId: 104 },
  "vic:rail:FSS_eDP2": { stopId: 104 },
  "vic:rail:FSS_eDP3": { stopId: 104 },
  "vic:rail:FSS_eDP4": { stopId: 104 },
  "vic:rail:FSS_eDP5": { stopId: 104 },
  "vic:rail:FSS_eDP6": { stopId: 104 },
  "vic:rail:FSS_eDP7": { stopId: 104 },
  "vic:rail:FSS_eDP8": { stopId: 104 },
  "vic:rail:FSS_eDP9": { stopId: 104 },
  "vic:rail:FSS_eEN1": { stopId: 104 },
  "vic:rail:FSS_eEN2": { stopId: 104 },
  "vic:rail:FSS_LI2": { stopId: 104 },
  "vic:rail:FSS_LI3": { stopId: 104 },
  "vic:rail:FSS_LI4": { stopId: 104 },
  "vic:rail:FSS_LI5": { stopId: 104 },
  "vic:rail:FSS_LI7": { stopId: 104 },
  "vic:rail:FSS_sEN1": { stopId: 104 },
  "vic:rail:FSS_sEN2": { stopId: 104 },
  "vic:rail:FSS_sEN3": { stopId: 104 },
  "vic:rail:FSS_yDP1": { stopId: 104 },
  "vic:rail:FSS_yDP2": { stopId: 104 },
  "vic:rail:FSS_yEN1": { stopId: 104 },
  "vic:rail:FSS_yEN2": { stopId: 104 },
  "26170": { stopId: 104, replacementBus: true }, // Replacement bus

  // Footscray
  "vic:rail:FSY": { stopId: 105 }, // Parent
  "15518": { stopId: 105, positionId: 51 }, // Platform 1
  "15519": { stopId: 105, positionId: 52 }, // Platform 2
  "15520": { stopId: 105, positionId: 53 }, // Platform 3
  "15521": { stopId: 105, positionId: 54 }, // Platform 4
  "26508": { stopId: 105, positionId: 55 }, // Platform 5
  "26509": { stopId: 105, positionId: 56 }, // Platform 6
  "22240": { stopId: 105 },
  "vic:rail:FSY_BR1": { stopId: 105 },
  "vic:rail:FSY_CN1": { stopId: 105 },
  "vic:rail:FSY_ConX": { stopId: 105 },
  "vic:rail:FSY_DP1": { stopId: 105 },
  "vic:rail:FSY_DP2": { stopId: 105 },
  "vic:rail:FSY_DP3": { stopId: 105 },
  "vic:rail:FSY_DP4": { stopId: 105 },
  "vic:rail:FSY_DP5": { stopId: 105 },
  "vic:rail:FSY_DP6": { stopId: 105 },
  "vic:rail:FSY_DP7": { stopId: 105 },
  "vic:rail:FSY_DP8": { stopId: 105 },
  "vic:rail:FSY_DP9": { stopId: 105 },
  "vic:rail:FSY_EN1": { stopId: 105 },
  "vic:rail:FSY_EN10": { stopId: 105 },
  "vic:rail:FSY_EN11": { stopId: 105 },
  "vic:rail:FSY_EN12": { stopId: 105 },
  "vic:rail:FSY_EN2": { stopId: 105 },
  "vic:rail:FSY_EN3": { stopId: 105 },
  "vic:rail:FSY_EN4": { stopId: 105 },
  "vic:rail:FSY_EN5": { stopId: 105 },
  "vic:rail:FSY_EN6": { stopId: 105 },
  "vic:rail:FSY_EN7": { stopId: 105 },
  "vic:rail:FSY_EN8": { stopId: 105 },
  "vic:rail:FSY_EN9": { stopId: 105 },
  "vic:rail:FSY_KR1": { stopId: 105 },
  "vic:rail:FSY_LI1": { stopId: 105 },
  "vic:rail:FSY_LI2": { stopId: 105 },
  "vic:rail:FSY_LI3": { stopId: 105 },
  "vic:rail:FSY_LI4": { stopId: 105 },
  "vic:rail:FSY_PR1": { stopId: 105 },
  "vic:rail:FSY_TX1": { stopId: 105 },
  "26171": { stopId: 105, replacementBus: true }, // Replacement bus

  // Frankston
  "vic:rail:FKN": { stopId: 106 }, // Parent
  "11220": { stopId: 106, positionId: 51 }, // Platform 1
  "11221": { stopId: 106, positionId: 52 }, // Platform 2
  "26510": { stopId: 106, positionId: 53 }, // Platform 3
  "vic:rail:FKN_BR1": { stopId: 106 },
  "vic:rail:FKN_BR2": { stopId: 106 },
  "vic:rail:FKN_ConX": { stopId: 106 },
  "vic:rail:FKN_DP1": { stopId: 106 },
  "vic:rail:FKN_DP2": { stopId: 106 },
  "vic:rail:FKN_DP3": { stopId: 106 },
  "vic:rail:FKN_DP4": { stopId: 106 },
  "vic:rail:FKN_EN1": { stopId: 106 },
  "vic:rail:FKN_EN2": { stopId: 106 },
  "vic:rail:FKN_EN3": { stopId: 106 },
  "vic:rail:FKN_PR1": { stopId: 106 },
  "26172": { stopId: 106, replacementBus: true }, // Replacement bus

  // Gardenvale
  "vic:rail:GVE": { stopId: 107 }, // Parent
  "14281": { stopId: 107, positionId: 51 }, // Platform 1
  "14282": { stopId: 107, positionId: 52 }, // Platform 2

  // Gardiner
  "vic:rail:GAR": { stopId: 108 }, // Parent
  "12269": { stopId: 108, positionId: 51 }, // Platform 1
  "5804": { stopId: 108, positionId: 52 }, // Platform 2

  // Garfield
  "vic:rail:GAR-V": { stopId: 109 }, // Parent
  "20313": { stopId: 109 },

  // Geelong
  "vic:rail:GEL": { stopId: 110 }, // Parent
  "20314": { stopId: 110 },

  // Ginifer
  "vic:rail:GIN": { stopId: 111 }, // Parent
  "15362": { stopId: 111, positionId: 51 }, // Platform 1
  "15363": { stopId: 111, positionId: 52 }, // Platform 2

  // Gisborne
  "vic:rail:GIS": { stopId: 112 }, // Parent
  "20315": { stopId: 112 },

  // Glen Huntly
  "vic:rail:GHY": { stopId: 117 }, // Parent
  "14248": { stopId: 117, positionId: 51 }, // Platform 1
  "14249": { stopId: 117, positionId: 52 }, // Platform 2
  "14250": { stopId: 117, positionId: 53 }, // Platform 3

  // Glen Iris
  "vic:rail:GIR": { stopId: 113 }, // Parent
  "5966": { stopId: 113, positionId: 51 }, // Platform 1
  "8266": { stopId: 113, positionId: 52 }, // Platform 2

  // Glen Waverley
  "vic:rail:GWY": { stopId: 114 }, // Parent
  "12158": { stopId: 114, positionId: 51 }, // Platform 1
  "12159": { stopId: 114, positionId: 52 }, // Platform 2
  "vic:rail:GWY_BR1": { stopId: 114 },
  "vic:rail:GWY_ConX": { stopId: 114 },
  "vic:rail:GWY_EN1": { stopId: 114 },
  "vic:rail:GWY_PR1": { stopId: 114 },
  "vic:rail:GWY_PR2": { stopId: 114 },
  "26177": { stopId: 114, replacementBus: true }, // Replacement bus

  // Glenbervie
  "vic:rail:GBV": { stopId: 115 }, // Parent
  "15541": { stopId: 115, positionId: 51 }, // Platform 1
  "15542": { stopId: 115, positionId: 52 }, // Platform 2

  // Glenferrie
  "vic:rail:GFE": { stopId: 116 }, // Parent
  "12241": { stopId: 116, positionId: 51 }, // Platform 1
  "12242": { stopId: 116, positionId: 52 }, // Platform 2
  "12243": { stopId: 116, positionId: 53 }, // Platform 3
  "vic:rail:GFE_ConX": { stopId: 116 },
  "vic:rail:GFE_DP1": { stopId: 116 },
  "vic:rail:GFE_DP2": { stopId: 116 },
  "vic:rail:GFE_DP3": { stopId: 116 },
  "vic:rail:GFE_EN1": { stopId: 116 },
  "vic:rail:GFE_EN2": { stopId: 116 },
  "26179": { stopId: 116, replacementBus: true }, // Replacement bus

  // Glenroy
  "vic:rail:GRY": { stopId: 118 }, // Parent
  "15533": { stopId: 118, positionId: 51 }, // Platform 1
  "15534": { stopId: 118, positionId: 52 }, // Platform 2
  "vic:rail:GRY_BR1": { stopId: 118 },
  "vic:rail:GRY_CN1": { stopId: 118 },
  "vic:rail:GRY_ConX": { stopId: 118 },
  "vic:rail:GRY_DP1": { stopId: 118 },
  "vic:rail:GRY_EN1": { stopId: 118 },
  "vic:rail:GRY_EN2": { stopId: 118 },
  "vic:rail:GRY_EN3": { stopId: 118 },
  "vic:rail:GRY_EN4": { stopId: 118 },
  "vic:rail:GRY_LI1": { stopId: 118 },
  "vic:rail:GRY_LI2": { stopId: 118 },
  "vic:rail:GRY_PR1": { stopId: 118 },
  "vic:rail:GRY_PR2": { stopId: 118 },
  "vic:rail:GRY_PR3": { stopId: 118 },
  "26181": { stopId: 118, replacementBus: true }, // Replacement bus

  // Goornong
  "vic:rail:GRG": { stopId: 119 }, // Parent
  "51809": { stopId: 119 },

  // Gowrie
  "vic:rail:GOW": { stopId: 120 }, // Parent
  "14300": { stopId: 120, positionId: 51 }, // Platform 1
  "14301": { stopId: 120, positionId: 52 }, // Platform 2

  // Greensborough
  "vic:rail:GRN": { stopId: 121 }, // Parent
  "15329": { stopId: 121, positionId: 51 }, // Platform 1
  "15330": { stopId: 121, positionId: 52 }, // Platform 2
  "vic:rail:GRN_BR1": { stopId: 121 },
  "vic:rail:GRN_ConX": { stopId: 121 },
  "vic:rail:GRN_DP1": { stopId: 121 },
  "vic:rail:GRN_DP2": { stopId: 121 },
  "vic:rail:GRN_EN1": { stopId: 121 },
  "vic:rail:GRN_EN2": { stopId: 121 },
  "vic:rail:GRN_KR1": { stopId: 121 },
  "vic:rail:GRN_KR2": { stopId: 121 },
  "vic:rail:GRN_LI1": { stopId: 121 },
  "vic:rail:GRN_LI2": { stopId: 121 },
  "vic:rail:GRN_PR1": { stopId: 121 },
  "vic:rail:GRN_PR2": { stopId: 121 },
  "26183": { stopId: 121, replacementBus: true }, // Replacement bus

  // Hallam
  "vic:rail:HLM": { stopId: 122 }, // Parent
  "12182": { stopId: 122, positionId: 51 }, // Platform 1
  "12183": { stopId: 122, positionId: 52 }, // Platform 2
  "26184": { stopId: 122, replacementBus: true }, // Replacement bus

  // Hampton
  "vic:rail:HAM": { stopId: 123 }, // Parent
  "14272": { stopId: 123, positionId: 51 }, // Platform 1
  "14273": { stopId: 123, positionId: 52 }, // Platform 2

  // Hartwell
  "vic:rail:HWL": { stopId: 124 }, // Parent
  "11202": { stopId: 124, positionId: 51 }, // Platform 1
  "11201": { stopId: 124, positionId: 52 }, // Platform 2

  // Hastings
  "vic:rail:HST": { stopId: 125 }, // Parent
  "3580": { stopId: 125, positionId: 51 }, // Platform 1

  // Hawksburn
  "vic:rail:HKN": { stopId: 126 }, // Parent
  "14267": { stopId: 126, positionId: 51 }, // Platform 1
  "14268": { stopId: 126, positionId: 52 }, // Platform 2

  // Hawkstowe
  "vic:rail:HWS": { stopId: 127 }, // Parent
  "26511": { stopId: 127, positionId: 51 }, // Platform 1
  "26512": { stopId: 127, positionId: 52 }, // Platform 2
  "vic:rail:HWS_BR1": { stopId: 127 },
  "vic:rail:HWS_DP1": { stopId: 127 },
  "vic:rail:HWS_EN1": { stopId: 127 },
  "vic:rail:HWS_EN2": { stopId: 127 },
  "vic:rail:HWS_LI1": { stopId: 127 },
  "vic:rail:HWS_PR1": { stopId: 127 },
  "vic:rail:HWS_TX1": { stopId: 127 },
  "26189": { stopId: 127, replacementBus: true }, // Replacement bus

  // Hawthorn
  "vic:rail:HAW": { stopId: 128 }, // Parent
  "12244": { stopId: 128, positionId: 51 }, // Platform 1
  "12245": { stopId: 128, positionId: 52 }, // Platform 2
  "12246": { stopId: 128, positionId: 53 }, // Platform 3

  // Heathcote Junction
  "vic:rail:HCJ": { stopId: 129 }, // Parent
  "20316": { stopId: 129 },

  // Heatherdale
  "vic:rail:HTD": { stopId: 130 }, // Parent
  "12234": { stopId: 130, positionId: 51 }, // Platform 1
  "12233": { stopId: 130, positionId: 52 }, // Platform 2
  "26191": { stopId: 130, replacementBus: true }, // Replacement bus

  // Heathmont
  "vic:rail:HMT": { stopId: 131 }, // Parent
  "11412": { stopId: 131, positionId: 51 }, // Platform 1
  "11413": { stopId: 131, positionId: 52 }, // Platform 2

  // Heidelberg
  "vic:rail:HDB": { stopId: 132 }, // Parent
  "13758": { stopId: 132, positionId: 51 }, // Platform 1
  "13759": { stopId: 132, positionId: 52 }, // Platform 2
  "vic:rail:HDB_BR1": { stopId: 132 },
  "vic:rail:HDB_ConX": { stopId: 132 },
  "vic:rail:HDB_DP1": { stopId: 132 },
  "vic:rail:HDB_DP2": { stopId: 132 },
  "vic:rail:HDB_EN1": { stopId: 132 },
  "vic:rail:HDB_EN2": { stopId: 132 },
  "vic:rail:HDB_EN3": { stopId: 132 },
  "vic:rail:HDB_PR1": { stopId: 132 },
  "vic:rail:HDB_TX1": { stopId: 132 },
  "26193": { stopId: 132, replacementBus: true }, // Replacement bus

  // Heyington
  "vic:rail:HEY": { stopId: 133 }, // Parent
  "12263": { stopId: 133, positionId: 51 }, // Platform 1
  "12264": { stopId: 133, positionId: 52 }, // Platform 2
  "vic:rail:HEY_ConX": { stopId: 133 },
  "vic:rail:HEY_DP1": { stopId: 133 },
  "vic:rail:HEY_DP2": { stopId: 133 },
  "vic:rail:HEY_EN1": { stopId: 133 },
  "26194": { stopId: 133, replacementBus: true }, // Replacement bus

  // Highett
  "vic:rail:HIG": { stopId: 134 }, // Parent
  "11471": { stopId: 134, positionId: 51 }, // Platform 1
  "14232": { stopId: 134, positionId: 52 }, // Platform 2

  // Holmesglen
  "vic:rail:HOL": { stopId: 135 }, // Parent
  "8763": { stopId: 135, positionId: 51 }, // Platform 1
  "8766": { stopId: 135, positionId: 52 }, // Platform 2

  // Hoppers Crossing
  "vic:rail:HCG": { stopId: 136 }, // Parent
  "13734": { stopId: 136, positionId: 51 }, // Platform 1
  "13735": { stopId: 136, positionId: 52 }, // Platform 2
  "vic:rail:HCG_BR1": { stopId: 136 },
  "vic:rail:HCG_ConX": { stopId: 136 },
  "vic:rail:HCG_DP1": { stopId: 136 },
  "vic:rail:HCG_DP2": { stopId: 136 },
  "vic:rail:HCG_DP3": { stopId: 136 },
  "vic:rail:HCG_EN1": { stopId: 136 },
  "vic:rail:HCG_EN2": { stopId: 136 },
  "vic:rail:HCG_EN3": { stopId: 136 },
  "vic:rail:HCG_EN4": { stopId: 136 },
  "vic:rail:HCG_KR1": { stopId: 136 },
  "vic:rail:HCG_LI1": { stopId: 136 },
  "vic:rail:HCG_LI2": { stopId: 136 },
  "vic:rail:HCG_LI3": { stopId: 136 },
  "vic:rail:HCG_PR1": { stopId: 136 },
  "vic:rail:HCG_TX1": { stopId: 136 },
  "26197": { stopId: 136, replacementBus: true }, // Replacement bus

  // Hughesdale
  "vic:rail:HUG": { stopId: 137 }, // Parent
  "13725": { stopId: 137, positionId: 51 }, // Platform 1
  "13726": { stopId: 137, positionId: 52 }, // Platform 2
  "vic:rail:HUG_BR1": { stopId: 137 },
  "vic:rail:HUG_BR2": { stopId: 137 },
  "vic:rail:HUG_ConX": { stopId: 137 },
  "vic:rail:HUG_DP1": { stopId: 137 },
  "vic:rail:HUG_DP2": { stopId: 137 },
  "vic:rail:HUG_EN1": { stopId: 137 },
  "vic:rail:HUG_LI1": { stopId: 137 },
  "vic:rail:HUG_PR1": { stopId: 137 },
  "vic:rail:HUG_PR2": { stopId: 137 },
  "26198": { stopId: 137, replacementBus: true }, // Replacement bus

  // Huntingdale
  "vic:rail:HUN": { stopId: 138 }, // Parent
  "13720": { stopId: 138, positionId: 51 }, // Platform 1
  "13721": { stopId: 138, positionId: 52 }, // Platform 2
  "vic:rail:HUN_BR1": { stopId: 138 },
  "vic:rail:HUN_ConX": { stopId: 138 },
  "vic:rail:HUN_DP1": { stopId: 138 },
  "vic:rail:HUN_DP2": { stopId: 138 },
  "vic:rail:HUN_DP3": { stopId: 138 },
  "vic:rail:HUN_DP4": { stopId: 138 },
  "vic:rail:HUN_EN1": { stopId: 138 },
  "vic:rail:HUN_EN2": { stopId: 138 },
  "vic:rail:HUN_EN3": { stopId: 138 },
  "vic:rail:HUN_EN4": { stopId: 138 },
  "vic:rail:HUN_PR1": { stopId: 138 },
  "vic:rail:HUN_TX1": { stopId: 138 },
  "26199": { stopId: 138, replacementBus: true }, // Replacement bus

  // Huntly
  "vic:rail:HUY": { stopId: 314 }, // Parent
  "49296": { stopId: 314 },

  // Hurstbridge
  "vic:rail:HBE": { stopId: 139 }, // Parent
  "15337": { stopId: 139, positionId: 51 }, // Platform 1
  "vic:rail:HBE_BR1": { stopId: 139 },
  "vic:rail:HBE_ConX": { stopId: 139 },
  "vic:rail:HBE_EN1": { stopId: 139 },
  "vic:rail:HBE_PR1": { stopId: 139 },
  "vic:rail:HBE_PR2": { stopId: 139 },
  "vic:rail:HBE_PR3": { stopId: 139 },
  "vic:rail:HBE_PR4": { stopId: 139 },
  "26200": { stopId: 139, replacementBus: true }, // Replacement bus

  // Ivanhoe
  "vic:rail:IVA": { stopId: 140 }, // Parent
  "13754": { stopId: 140, positionId: 51 }, // Platform 1
  "13755": { stopId: 140, positionId: 52 }, // Platform 2
  "vic:rail:IVA_ConX": { stopId: 140 },
  "vic:rail:IVA_DP1": { stopId: 140 },
  "vic:rail:IVA_EN1": { stopId: 140 },
  "vic:rail:IVA_EN2": { stopId: 140 },
  "vic:rail:IVA_EN3": { stopId: 140 },
  "vic:rail:IVA_PR1": { stopId: 140 },
  "vic:rail:IVA_PR2": { stopId: 140 },
  "vic:rail:IVA_PR3": { stopId: 140 },
  "26201": { stopId: 140, replacementBus: true }, // Replacement bus

  // Jacana
  "vic:rail:JAC": { stopId: 141 }, // Parent
  "15531": { stopId: 141, positionId: 51 }, // Platform 1
  "15532": { stopId: 141, positionId: 52 }, // Platform 2

  // Jewell
  "vic:rail:JWL": { stopId: 142 }, // Parent
  "14316": { stopId: 142, positionId: 51 }, // Platform 1
  "14317": { stopId: 142, positionId: 52 }, // Platform 2

  // Jolimont
  "vic:rail:JLI": { stopId: 143 }, // Parent
  "14340": { stopId: 143, positionId: 51 }, // Platform 1
  "14341": { stopId: 143, positionId: 52 }, // Platform 2
  "vic:rail:JLI_DP1": { stopId: 143 },
  "vic:rail:JLI_DP2": { stopId: 143 },
  "vic:rail:JLI_DP3": { stopId: 143 },
  "vic:rail:JLI_DP4": { stopId: 143 },
  "vic:rail:JLI_DP5": { stopId: 143 },
  "vic:rail:JLI_EN1": { stopId: 143 },
  "vic:rail:JLI_EN2": { stopId: 143 },
  "vic:rail:JLI_EN3": { stopId: 143 },
  "vic:rail:JLI_EN4": { stopId: 143 },
  "26204": { stopId: 143, replacementBus: true }, // Replacement bus

  // Jordanville
  "vic:rail:JOR": { stopId: 144 }, // Parent
  "10117": { stopId: 144, positionId: 51 }, // Platform 1
  "11219": { stopId: 144, positionId: 52 }, // Platform 2

  // Kananook
  "vic:rail:KAN": { stopId: 145 }, // Parent
  "11222": { stopId: 145, positionId: 51 }, // Platform 1
  "11223": { stopId: 145, positionId: 52 }, // Platform 2

  // Kangaroo Flat
  "vic:rail:KFT": { stopId: 146 }, // Parent
  "20317": { stopId: 146 },

  // Keilor Plains
  "vic:rail:KPL": { stopId: 147 }, // Parent
  "15358": { stopId: 147, positionId: 51 }, // Platform 1
  "15359": { stopId: 147, positionId: 52 }, // Platform 2

  // Kensington
  "vic:rail:KEN": { stopId: 148 }, // Parent
  "15552": { stopId: 148, positionId: 51 }, // Platform 1
  "15553": { stopId: 148, positionId: 52 }, // Platform 2

  // Keon Park
  "vic:rail:KPK": { stopId: 149 }, // Parent
  "15371": { stopId: 149, positionId: 51 }, // Platform 1
  "15372": { stopId: 149, positionId: 52 }, // Platform 2
  "vic:rail:KPK_BR1": { stopId: 149 },
  "vic:rail:KPK_CN1": { stopId: 149 },
  "vic:rail:KPK_EN1": { stopId: 149 },
  "vic:rail:KPK_EN2": { stopId: 149 },
  "vic:rail:KPK_KR1": { stopId: 149 },
  "vic:rail:KPK_PR1": { stopId: 149 },
  "vic:rail:KPK_PR2": { stopId: 149 },
  "26209": { stopId: 149, replacementBus: true }, // Replacement bus

  // Kerang
  "vic:rail:KER": { stopId: 150 }, // Parent
  "20318": { stopId: 150 },

  // Kilmore East
  "vic:rail:KET": { stopId: 151 }, // Parent
  "20319": { stopId: 151 },

  // Kooyong
  "vic:rail:KYG": { stopId: 152 }, // Parent
  "12265": { stopId: 152, positionId: 51 }, // Platform 1
  "12266": { stopId: 152, positionId: 52 }, // Platform 2

  // Kyneton
  "vic:rail:KYN": { stopId: 153 }, // Parent
  "20320": { stopId: 153 },

  // Laburnum
  "vic:rail:LAB": { stopId: 154 }, // Parent
  "12225": { stopId: 154, positionId: 51 }, // Platform 1
  "12224": { stopId: 154, positionId: 52 }, // Platform 2
  "26211": { stopId: 154, replacementBus: true }, // Replacement bus

  // Lalor
  "vic:rail:LAL": { stopId: 155 }, // Parent
  "15368": { stopId: 155, positionId: 51 }, // Platform 1
  "15369": { stopId: 155, positionId: 52 }, // Platform 2
  "vic:rail:LAL_EN1": { stopId: 155 },
  "vic:rail:LAL_PR1": { stopId: 155 },
  "vic:rail:LAL_PR2": { stopId: 155 },
  "vic:rail:LAL_PR3": { stopId: 155 },
  "vic:rail:LAL_TX1": { stopId: 155 },
  "26212": { stopId: 155, replacementBus: true }, // Replacement bus

  // Lara
  "vic:rail:LRA": { stopId: 156 }, // Parent
  "20321": { stopId: 156 },

  // Laverton
  "vic:rail:LAV": { stopId: 157 }, // Parent
  "13736": { stopId: 157, positionId: 51 }, // Platform 1
  "13737": { stopId: 157, positionId: 52 }, // Platform 2
  "26513": { stopId: 157, positionId: 53 }, // Platform 3
  "vic:rail:LAV_BR1": { stopId: 157 },
  "vic:rail:LAV_BR2": { stopId: 157 },
  "vic:rail:LAV_ConX": { stopId: 157 },
  "vic:rail:LAV_DP1": { stopId: 157 },
  "vic:rail:LAV_DP2": { stopId: 157 },
  "vic:rail:LAV_DP3": { stopId: 157 },
  "vic:rail:LAV_DP4": { stopId: 157 },
  "vic:rail:LAV_EN1": { stopId: 157 },
  "vic:rail:LAV_EN2": { stopId: 157 },
  "vic:rail:LAV_LI1": { stopId: 157 },
  "vic:rail:LAV_LI2": { stopId: 157 },
  "vic:rail:LAV_LI3": { stopId: 157 },
  "vic:rail:LAV_LI4": { stopId: 157 },
  "vic:rail:LAV_PR1": { stopId: 157 },
  "vic:rail:LAV_PR2": { stopId: 157 },
  "vic:rail:LAV_PR3": { stopId: 157 },
  "vic:rail:LAV_PR4": { stopId: 157 },
  "vic:rail:LAV_TX1": { stopId: 157 },
  "26213": { stopId: 157, replacementBus: true }, // Replacement bus

  // Leawarra
  "vic:rail:LWA": { stopId: 158 }, // Parent
  "7878": { stopId: 158, positionId: 51 }, // Platform 1

  // Lilydale
  "vic:rail:LIL": { stopId: 159 }, // Parent
  "12164": { stopId: 159, positionId: 51 }, // Platform 1
  "12165": { stopId: 159, positionId: 52 }, // Platform 2

  // Little River
  "vic:rail:LRR": { stopId: 160 }, // Parent
  "20323": { stopId: 160 },

  // Longwarry
  "vic:rail:LWY": { stopId: 161 }, // Parent
  "20324": { stopId: 161 },

  // Lynbrook
  "vic:rail:LBK": { stopId: 162 }, // Parent
  "26514": { stopId: 162, positionId: 51 }, // Platform 1
  "26515": { stopId: 162, positionId: 52 }, // Platform 2
  "26216": { stopId: 162, replacementBus: true }, // Replacement bus

  // Macaulay
  "vic:rail:MAC": { stopId: 163 }, // Parent
  "14322": { stopId: 163, positionId: 51 }, // Platform 1
  "14323": { stopId: 163, positionId: 52 }, // Platform 2

  // Macedon
  "vic:rail:MDN": { stopId: 164 }, // Parent
  "20325": { stopId: 164 },

  // Macleod
  "vic:rail:MCD": { stopId: 165 }, // Parent
  "15326": { stopId: 165, positionId: 51 }, // Platform 1
  "15325": { stopId: 165, positionId: 52 }, // Platform 2
  "15324": { stopId: 165, positionId: 53 }, // Platform 3
  "vic:rail:MCD_ConX": { stopId: 165 },
  "vic:rail:MCD_EN1": { stopId: 165 },
  "vic:rail:MCD_EN2": { stopId: 165 },
  "vic:rail:MCD_EN3": { stopId: 165 },
  "vic:rail:MCD_PR1": { stopId: 165 },
  "26218": { stopId: 165, replacementBus: true }, // Replacement bus

  // Malmsbury
  "vic:rail:MMY-V": { stopId: 166 }, // Parent
  "20326": { stopId: 166 },

  // Malvern
  "vic:rail:MAL": { stopId: 167 }, // Parent
  "14255": { stopId: 167, positionId: 51 }, // Platform 1
  "14256": { stopId: 167, positionId: 52 }, // Platform 2
  "14257": { stopId: 167, positionId: 53 }, // Platform 3
  "14258": { stopId: 167, positionId: 54 }, // Platform 4

  // Marshall
  "vic:rail:MAS": { stopId: 168 }, // Parent
  "20327": { stopId: 168 },

  // Maryborough
  "vic:rail:MBY": { stopId: 169 }, // Parent
  "44953": { stopId: 169 },

  // McKinnon
  "vic:rail:MCK": { stopId: 170 }, // Parent
  "14242": { stopId: 170, positionId: 51 }, // Platform 1
  "14243": { stopId: 170, positionId: 52 }, // Platform 2
  "14244": { stopId: 170, positionId: 53 }, // Platform 3

  // Melbourne Central
  "vic:rail:MCE": { stopId: 171 }, // Parent
  "10922": { stopId: 171, positionId: 51 }, // Platform 1
  "10923": { stopId: 171, positionId: 52 }, // Platform 2
  "12197": { stopId: 171, positionId: 53 }, // Platform 3
  "12198": { stopId: 171, positionId: 54 }, // Platform 4
  "vic:rail:MCE_CN1": { stopId: 171 },
  "vic:rail:MCE_CN2": { stopId: 171 },
  "vic:rail:MCE_CN4": { stopId: 171 },
  "vic:rail:MCE_CN5": { stopId: 171 },
  "vic:rail:MCE_CN6": { stopId: 171 },
  "vic:rail:MCE_CN8": { stopId: 171 },
  "vic:rail:MCE_ConX": { stopId: 171 },
  "vic:rail:MCE_DP3": { stopId: 171 },
  "vic:rail:MCE_DP4": { stopId: 171 },
  "vic:rail:MCE_DP5": { stopId: 171 },
  "vic:rail:MCE_EN1": { stopId: 171 },
  "vic:rail:MCE_EN2": { stopId: 171 },
  "vic:rail:MCE_EN3": { stopId: 171 },
  "vic:rail:MCE_EN4": { stopId: 171 },
  "vic:rail:MCE_LI1": { stopId: 171 },
  "vic:rail:MCE_LI2": { stopId: 171 },
  "vic:rail:MCE_LI3": { stopId: 171 },
  "vic:rail:MCE_LI4": { stopId: 171 },
  "26221": { stopId: 171, replacementBus: true }, // Replacement bus

  // Melton
  "vic:rail:MEL": { stopId: 172 }, // Parent
  "19980": { stopId: 172 },

  // Mentone
  "vic:rail:MEN": { stopId: 173 }, // Parent
  "11240": { stopId: 173, positionId: 51 }, // Platform 1
  "11241": { stopId: 173, positionId: 52 }, // Platform 2

  // Merinda Park
  "vic:rail:MPK": { stopId: 174 }, // Parent
  "12186": { stopId: 174, positionId: 51 }, // Platform 1
  "26516": { stopId: 174, positionId: 52 }, // Platform 2
  "26223": { stopId: 174, replacementBus: true }, // Replacement bus

  // Merlynston
  "vic:rail:MYN": { stopId: 175 }, // Parent
  "14304": { stopId: 175, positionId: 51 }, // Platform 1
  "14305": { stopId: 175, positionId: 52 }, // Platform 2

  // Mernda
  "vic:rail:MDD": { stopId: 176 }, // Parent
  "26517": { stopId: 176, positionId: 51 }, // Platform 1
  "26518": { stopId: 176, positionId: 52 }, // Platform 2
  "vic:rail:MDD_BR1": { stopId: 176 },
  "vic:rail:MDD_CN1": { stopId: 176 },
  "vic:rail:MDD_DP1": { stopId: 176 },
  "vic:rail:MDD_DP2": { stopId: 176 },
  "vic:rail:MDD_EN1": { stopId: 176 },
  "vic:rail:MDD_EN2": { stopId: 176 },
  "vic:rail:MDD_KR1": { stopId: 176 },
  "vic:rail:MDD_PR1": { stopId: 176 },
  "vic:rail:MDD_PR2": { stopId: 176 },
  "vic:rail:MDD_TX1": { stopId: 176 },
  "26225": { stopId: 176, replacementBus: true }, // Replacement bus

  // Merri
  "vic:rail:MER": { stopId: 177 }, // Parent
  "15389": { stopId: 177, positionId: 51 }, // Platform 1
  "15390": { stopId: 177, positionId: 52 }, // Platform 2
  "vic:rail:MER_DP1": { stopId: 177 },
  "vic:rail:MER_DP2": { stopId: 177 },
  "vic:rail:MER_DP3": { stopId: 177 },
  "vic:rail:MER_EN1": { stopId: 177 },
  "vic:rail:MER_EN2": { stopId: 177 },
  "vic:rail:MER_EN3": { stopId: 177 },
  "vic:rail:MER_PR1": { stopId: 177 },
  "26226": { stopId: 177, replacementBus: true }, // Replacement bus

  // Middle Brighton
  "vic:rail:MBN": { stopId: 178 }, // Parent
  "14277": { stopId: 178, positionId: 51 }, // Platform 1
  "14278": { stopId: 178, positionId: 52 }, // Platform 2

  // Middle Footscray
  "vic:rail:MFY": { stopId: 179 }, // Parent
  "15516": { stopId: 179, positionId: 51 }, // Platform 1
  "15517": { stopId: 179, positionId: 52 }, // Platform 2

  // Middle Gorge
  "vic:rail:MMR": { stopId: 180 }, // Parent
  "26519": { stopId: 180, positionId: 51 }, // Platform 1
  "26520": { stopId: 180, positionId: 52 }, // Platform 2
  "vic:rail:MMR_BR1": { stopId: 180 },
  "vic:rail:MMR_DP1": { stopId: 180 },
  "vic:rail:MMR_DP2": { stopId: 180 },
  "vic:rail:MMR_DP3": { stopId: 180 },
  "vic:rail:MMR_EN1": { stopId: 180 },
  "vic:rail:MMR_EN2": { stopId: 180 },
  "vic:rail:MMR_EN3": { stopId: 180 },
  "vic:rail:MMR_PR1": { stopId: 180 },
  "vic:rail:MMR_TX1": { stopId: 180 },
  "26229": { stopId: 180, replacementBus: true }, // Replacement bus

  // Mitcham
  "vic:rail:MCH": { stopId: 181 }, // Parent
  "12232": { stopId: 181, positionId: 51 }, // Platform 1
  "12231": { stopId: 181, positionId: 52 }, // Platform 2
  "vic:rail:MCH_BR1": { stopId: 181 },
  "vic:rail:MCH_CN1": { stopId: 181 },
  "vic:rail:MCH_ConX": { stopId: 181 },
  "vic:rail:MCH_DP1": { stopId: 181 },
  "vic:rail:MCH_DP2": { stopId: 181 },
  "vic:rail:MCH_EN1": { stopId: 181 },
  "vic:rail:MCH_EN2": { stopId: 181 },
  "vic:rail:MCH_LI1": { stopId: 181 },
  "vic:rail:MCH_LI2": { stopId: 181 },
  "vic:rail:MCH_PR1": { stopId: 181 },
  "vic:rail:MCH_PR2": { stopId: 181 },
  "vic:rail:MCH_TX1": { stopId: 181 },
  "26230": { stopId: 181, replacementBus: true }, // Replacement bus

  // Moe
  "vic:rail:MOE": { stopId: 182 }, // Parent
  "20328": { stopId: 182 },

  // Montmorency
  "vic:rail:MMY": { stopId: 184 }, // Parent
  "15331": { stopId: 184, positionId: 51 }, // Platform 1
  "26521": { stopId: 184, positionId: 52 }, // Platform 2
  "vic:rail:MMY_BR1": { stopId: 184 },
  "vic:rail:MMY_ConX": { stopId: 184 },
  "vic:rail:MMY_DP1": { stopId: 184 },
  "vic:rail:MMY_DP2": { stopId: 184 },
  "vic:rail:MMY_EN1": { stopId: 184 },
  "vic:rail:MMY_EN2": { stopId: 184 },
  "vic:rail:MMY_EN3": { stopId: 184 },
  "vic:rail:MMY_KR1": { stopId: 184 },
  "vic:rail:MMY_KR2": { stopId: 184 },
  "vic:rail:MMY_PR1": { stopId: 184 },
  "vic:rail:MMY_PR2": { stopId: 184 },
  "vic:rail:MMY_PR3": { stopId: 184 },
  "vic:rail:MMY_PR4": { stopId: 184 },
  "26231": { stopId: 184, replacementBus: true }, // Replacement bus

  // Moonee Ponds
  "vic:rail:MPD": { stopId: 185 }, // Parent
  "15546": { stopId: 185, positionId: 51 }, // Platform 1
  "15547": { stopId: 185, positionId: 52 }, // Platform 2
  "vic:rail:MPD_ConX": { stopId: 185 },
  "vic:rail:MPD_EN1": { stopId: 185 },
  "vic:rail:MPD_EN2": { stopId: 185 },
  "vic:rail:MPD_EN3": { stopId: 185 },
  "vic:rail:MPD_EN4": { stopId: 185 },
  "vic:rail:MPD_PR1": { stopId: 185 },
  "vic:rail:MPD_TX1": { stopId: 185 },
  "26232": { stopId: 185, replacementBus: true }, // Replacement bus

  // Moorabbin
  "vic:rail:MRN": { stopId: 186 }, // Parent
  "14233": { stopId: 186, positionId: 51 }, // Platform 1
  "14234": { stopId: 186, positionId: 52 }, // Platform 2
  "14235": { stopId: 186, positionId: 53 }, // Platform 3
  "26233": { stopId: 186, replacementBus: true }, // Replacement bus

  // Mooroolbark
  "vic:rail:MLK": { stopId: 187 }, // Parent
  "12166": { stopId: 187, positionId: 51 }, // Platform 1
  "12167": { stopId: 187, positionId: 52 }, // Platform 2

  // Mooroopna
  "vic:rail:MPA": { stopId: 188 }, // Parent
  "20329": { stopId: 188 },

  // Mordialloc
  "vic:rail:MOR": { stopId: 189 }, // Parent
  "11236": { stopId: 189, positionId: 51 }, // Platform 1
  "11237": { stopId: 189, positionId: 52 }, // Platform 2

  // Moreland
  "vic:rail:MLD": { stopId: 190 }, // Parent
  "14310": { stopId: 190, positionId: 51 }, // Platform 1
  "14311": { stopId: 190, positionId: 52 }, // Platform 2

  // Morradoo
  "vic:rail:MRO": { stopId: 191 }, // Parent
  "2155": { stopId: 191, positionId: 51 }, // Platform 1

  // Morwell
  "vic:rail:MWL": { stopId: 192 }, // Parent
  "20330": { stopId: 192 },

  // Mount Waverley
  "vic:rail:MWY": { stopId: 193 }, // Parent
  "12162": { stopId: 193, positionId: 51 }, // Platform 1
  "12163": { stopId: 193, positionId: 52 }, // Platform 2
  "vic:rail:MWY_ConX": { stopId: 193 },
  "vic:rail:MWY_DP1": { stopId: 193 },
  "vic:rail:MWY_DP2": { stopId: 193 },
  "vic:rail:MWY_EN1": { stopId: 193 },
  "vic:rail:MWY_EN2": { stopId: 193 },
  "vic:rail:MWY_EN3": { stopId: 193 },
  "vic:rail:MWY_PR1": { stopId: 193 },
  "vic:rail:MWY_PR2": { stopId: 193 },
  "26238": { stopId: 193, replacementBus: true }, // Replacement bus

  // Murchison East
  "vic:rail:MST": { stopId: 194 }, // Parent
  "20331": { stopId: 194 },

  // Murrumbeena
  "vic:rail:MRB": { stopId: 195 }, // Parent
  "13727": { stopId: 195, positionId: 51 }, // Platform 1
  "13728": { stopId: 195, positionId: 52 }, // Platform 2
  "vic:rail:MRB_BR1": { stopId: 195 },
  "vic:rail:MRB_ConX": { stopId: 195 },
  "vic:rail:MRB_DP1": { stopId: 195 },
  "vic:rail:MRB_DP2": { stopId: 195 },
  "vic:rail:MRB_EN1": { stopId: 195 },
  "vic:rail:MRB_EN2": { stopId: 195 },
  "vic:rail:MRB_LI1": { stopId: 195 },
  "vic:rail:MRB_PR1": { stopId: 195 },
  "vic:rail:MRB_TX1": { stopId: 195 },
  "26239": { stopId: 195, replacementBus: true }, // Replacement bus

  // Nagambie
  "vic:rail:NGE": { stopId: 196 }, // Parent
  "20332": { stopId: 196 },

  // Nar Nar Goon
  "vic:rail:NNG": { stopId: 197 }, // Parent
  "20333": { stopId: 197 },

  // Narre Warren
  "vic:rail:NWA": { stopId: 198 }, // Parent
  "12180": { stopId: 198, positionId: 51 }, // Platform 1
  "12181": { stopId: 198, positionId: 52 }, // Platform 2
  "vic:rail:NWA_BR1": { stopId: 198 },
  "vic:rail:NWA_CN1": { stopId: 198 },
  "vic:rail:NWA_ConX": { stopId: 198 },
  "vic:rail:NWA_EN1": { stopId: 198 },
  "vic:rail:NWA_EN2": { stopId: 198 },
  "vic:rail:NWA_KR1": { stopId: 198 },
  "vic:rail:NWA_LI1": { stopId: 198 },
  "vic:rail:NWA_LI2": { stopId: 198 },
  "vic:rail:NWA_PR1": { stopId: 198 },
  "vic:rail:NWA_PR2": { stopId: 198 },
  "vic:rail:NWA_TX1": { stopId: 198 },
  "26240": { stopId: 198, replacementBus: true }, // Replacement bus

  // Newmarket
  "vic:rail:NKT": { stopId: 199 }, // Parent
  "15550": { stopId: 199, positionId: 51 }, // Platform 1
  "15551": { stopId: 199, positionId: 52 }, // Platform 2
  "vic:rail:NKT_ConX": { stopId: 199 },
  "vic:rail:NKT_DP1": { stopId: 199 },
  "vic:rail:NKT_DP2": { stopId: 199 },
  "vic:rail:NKT_DP3": { stopId: 199 },
  "vic:rail:NKT_DP4": { stopId: 199 },
  "vic:rail:NKT_DP5": { stopId: 199 },
  "vic:rail:NKT_EN1": { stopId: 199 },
  "vic:rail:NKT_EN2": { stopId: 199 },
  "vic:rail:NKT_EN3": { stopId: 199 },
  "26241": { stopId: 199, replacementBus: true }, // Replacement bus

  // Newport
  "vic:rail:NPT": { stopId: 200 }, // Parent
  "15343": { stopId: 200, positionId: 51 }, // Platform 1
  "15344": { stopId: 200, positionId: 52 }, // Platform 2
  "22245": { stopId: 200 },
  "vic:rail:NPT_BR1": { stopId: 200 },
  "vic:rail:NPT_ConX": { stopId: 200 },
  "vic:rail:NPT_DP1": { stopId: 200 },
  "vic:rail:NPT_DP2": { stopId: 200 },
  "vic:rail:NPT_DP3": { stopId: 200 },
  "vic:rail:NPT_DP4": { stopId: 200 },
  "vic:rail:NPT_DP5": { stopId: 200 },
  "vic:rail:NPT_DP6": { stopId: 200 },
  "vic:rail:NPT_EN1": { stopId: 200 },
  "vic:rail:NPT_EN2": { stopId: 200 },
  "vic:rail:NPT_EN3": { stopId: 200 },
  "vic:rail:NPT_EN4": { stopId: 200 },
  "vic:rail:NPT_PR1": { stopId: 200 },
  "vic:rail:NPT_PR2": { stopId: 200 },
  "vic:rail:NPT_PR3": { stopId: 200 },
  "vic:rail:NPT_TX1": { stopId: 200 },
  "26242": { stopId: 200, replacementBus: true }, // Replacement bus

  // Noble Park
  "vic:rail:NPK": { stopId: 201 }, // Parent
  "12192": { stopId: 201, positionId: 51 }, // Platform 1
  "12193": { stopId: 201, positionId: 52 }, // Platform 2
  "vic:rail:NPK_BR1": { stopId: 201 },
  "vic:rail:NPK_ConX": { stopId: 201 },
  "vic:rail:NPK_DP1": { stopId: 201 },
  "vic:rail:NPK_EN1": { stopId: 201 },
  "vic:rail:NPK_KR1": { stopId: 201 },
  "vic:rail:NPK_LI1": { stopId: 201 },
  "vic:rail:NPK_PR1": { stopId: 201 },
  "vic:rail:NPK_PR2": { stopId: 201 },
  "26243": { stopId: 201, replacementBus: true }, // Replacement bus

  // North Brighton
  "vic:rail:NBN": { stopId: 202 }, // Parent
  "14279": { stopId: 202, positionId: 51 }, // Platform 1
  "14280": { stopId: 202, positionId: 52 }, // Platform 2
  "vic:rail:NBN_ConX": { stopId: 202 },
  "vic:rail:NBN_EN1": { stopId: 202 },
  "vic:rail:NBN_EN2": { stopId: 202 },
  "vic:rail:NBN_EN3": { stopId: 202 },
  "vic:rail:NBN_EN4": { stopId: 202 },
  "vic:rail:NBN_EN5": { stopId: 202 },
  "vic:rail:NBN_PR": { stopId: 202 },
  "26244": { stopId: 202, replacementBus: true }, // Replacement bus

  // North Geelong
  "vic:rail:NGL": { stopId: 203 }, // Parent
  "20334": { stopId: 203 },

  // North Melbourne
  "vic:rail:NME": { stopId: 204 }, // Parent
  "14324": { stopId: 204, positionId: 51 }, // Platform 1
  "14325": { stopId: 204, positionId: 52 }, // Platform 2
  "14326": { stopId: 204, positionId: 53 }, // Platform 3
  "14327": { stopId: 204, positionId: 54 }, // Platform 4
  "14328": { stopId: 204, positionId: 55 }, // Platform 5
  "14329": { stopId: 204, positionId: 56 }, // Platform 6
  "22239": { stopId: 204 },

  // North Richmond
  "vic:rail:NRM": { stopId: 205 }, // Parent
  "14336": { stopId: 205, positionId: 51 }, // Platform 1
  "14337": { stopId: 205, positionId: 52 }, // Platform 2
  "vic:rail:NRM_DP1": { stopId: 205 },
  "vic:rail:NRM_DP2": { stopId: 205 },
  "vic:rail:NRM_DP3": { stopId: 205 },
  "vic:rail:NRM_DP4": { stopId: 205 },
  "vic:rail:NRM_DP5": { stopId: 205 },
  "vic:rail:NRM_DP6": { stopId: 205 },
  "vic:rail:NRM_EN1": { stopId: 205 },
  "vic:rail:NRM_EN2": { stopId: 205 },
  "vic:rail:NRM_EN3": { stopId: 205 },
  "vic:rail:NRM_EN4": { stopId: 205 },
  "26246": { stopId: 205, replacementBus: true }, // Replacement bus

  // North Shore
  "vic:rail:NSH": { stopId: 206 }, // Parent
  "20335": { stopId: 206 },

  // North Williamstown
  "vic:rail:NWN": { stopId: 207 }, // Parent
  "15341": { stopId: 207, positionId: 51 }, // Platform 1
  "15342": { stopId: 207, positionId: 52 }, // Platform 2

  // Northcote
  "vic:rail:NCE": { stopId: 208 }, // Parent
  "15387": { stopId: 208, positionId: 51 }, // Platform 1
  "15388": { stopId: 208, positionId: 52 }, // Platform 2
  "vic:rail:NCE_DP1": { stopId: 208 },
  "vic:rail:NCE_DP2": { stopId: 208 },
  "vic:rail:NCE_DP3": { stopId: 208 },
  "vic:rail:NCE_EN1": { stopId: 208 },
  "vic:rail:NCE_EN2": { stopId: 208 },
  "vic:rail:NCE_EN3": { stopId: 208 },
  "vic:rail:NCE_EN4": { stopId: 208 },
  "vic:rail:NCE_PR1": { stopId: 208 },
  "26248": { stopId: 208, replacementBus: true }, // Replacement bus

  // Nunawading
  "vic:rail:NWG": { stopId: 209 }, // Parent
  "12230": { stopId: 209, positionId: 51 }, // Platform 1
  "12229": { stopId: 209, positionId: 52 }, // Platform 2
  "vic:rail:NWG_BR1": { stopId: 209 },
  "vic:rail:NWG_ConX": { stopId: 209 },
  "vic:rail:NWG_DP1": { stopId: 209 },
  "vic:rail:NWG_DP2": { stopId: 209 },
  "vic:rail:NWG_DP3": { stopId: 209 },
  "vic:rail:NWG_DP4": { stopId: 209 },
  "vic:rail:NWG_DP5": { stopId: 209 },
  "vic:rail:NWG_EN1": { stopId: 209 },
  "vic:rail:NWG_EN2": { stopId: 209 },
  "vic:rail:NWG_EN3": { stopId: 209 },
  "vic:rail:NWG_EN4": { stopId: 209 },
  "vic:rail:NWG_EN5": { stopId: 209 },
  "vic:rail:NWG_KR1": { stopId: 209 },
  "vic:rail:NWG_LI1": { stopId: 209 },
  "vic:rail:NWG_LI2": { stopId: 209 },
  "vic:rail:NWG_PR1": { stopId: 209 },
  "vic:rail:NWG_PR2": { stopId: 209 },
  "vic:rail:NWG_TX1": { stopId: 209 },
  "26249": { stopId: 209, replacementBus: true }, // Replacement bus

  // Oak Park
  "vic:rail:OKP": { stopId: 210 }, // Parent
  "15535": { stopId: 210, positionId: 51 }, // Platform 1
  "15536": { stopId: 210, positionId: 52 }, // Platform 2

  // Oakleigh
  "vic:rail:OAK": { stopId: 211 }, // Parent
  "13722": { stopId: 211, positionId: 51 }, // Platform 1
  "13723": { stopId: 211, positionId: 52 }, // Platform 2
  "vic:rail:OAK_BR1": { stopId: 211 },
  "vic:rail:OAK_ConX": { stopId: 211 },
  "vic:rail:OAK_DP1": { stopId: 211 },
  "vic:rail:OAK_DP2": { stopId: 211 },
  "vic:rail:OAK_DP3": { stopId: 211 },
  "vic:rail:OAK_DP4": { stopId: 211 },
  "vic:rail:OAK_DP5": { stopId: 211 },
  "vic:rail:OAK_EN1": { stopId: 211 },
  "vic:rail:OAK_EN2": { stopId: 211 },
  "vic:rail:OAK_EN3": { stopId: 211 },
  "vic:rail:OAK_EN4": { stopId: 211 },
  "vic:rail:OAK_EN5": { stopId: 211 },
  "vic:rail:OAK_EN6": { stopId: 211 },
  "vic:rail:OAK_LI1": { stopId: 211 },
  "vic:rail:OAK_LI2": { stopId: 211 },
  "vic:rail:OAK_PR1": { stopId: 211 },
  "vic:rail:OAK_PR2": { stopId: 211 },
  "vic:rail:OAK_PR3": { stopId: 211 },
  "vic:rail:OAK_TX1": { stopId: 211 },
  "26251": { stopId: 211, replacementBus: true }, // Replacement bus

  // Officer
  "vic:rail:OFC": { stopId: 212 }, // Parent
  "12174": { stopId: 212, positionId: 51 }, // Platform 1
  "12175": { stopId: 212, positionId: 52 }, // Platform 2
  "26252": { stopId: 212, replacementBus: true }, // Replacement bus

  // Ormond
  "vic:rail:OMD": { stopId: 213 }, // Parent
  "14245": { stopId: 213, positionId: 51 }, // Platform 1
  "14246": { stopId: 213, positionId: 52 }, // Platform 2
  "14247": { stopId: 213, positionId: 53 }, // Platform 3

  // Pakenham
  "vic:rail:PKM": { stopId: 214 }, // Parent
  "12172": { stopId: 214, positionId: 51 }, // Platform 1
  "12173": { stopId: 214, positionId: 52 }, // Platform 2
  "22252": { stopId: 214 },
  "26254": { stopId: 214, replacementBus: true }, // Replacement bus

  // Parkdale
  "vic:rail:PKD": { stopId: 215 }, // Parent
  "11238": { stopId: 215, positionId: 51 }, // Platform 1
  "11239": { stopId: 215, positionId: 52 }, // Platform 2

  // Parkville
  "vic:rail:PKV": { stopId: 321 }, // Parent
  "26550": { stopId: 321, positionId: 51 }, // Platform 1
  "26551": { stopId: 321, positionId: 52 }, // Platform 2
  "vic:rail:PKV_CN1": { stopId: 321 },
  "vic:rail:PKV_CN2": { stopId: 321 },
  "vic:rail:PKV_CN3": { stopId: 321 },
  "vic:rail:PKV_CN4": { stopId: 321 },
  "vic:rail:PKV_EN1": { stopId: 321 },
  "vic:rail:PKV_EN2": { stopId: 321 },
  "vic:rail:PKV_EN3": { stopId: 321 },
  "vic:rail:PKV_EN4": { stopId: 321 },
  "vic:rail:PKV_LI1": { stopId: 321 },
  "vic:rail:PKV_LI2": { stopId: 321 },
  "vic:rail:PKV_LI3": { stopId: 321 },
  "vic:rail:PKV_LI4": { stopId: 321 },
  "vic:rail:PKV_LI5": { stopId: 321 },

  // Parliament
  "vic:rail:PAR": { stopId: 216 }, // Parent
  "10924": { stopId: 216, positionId: 51 }, // Platform 1
  "11210": { stopId: 216, positionId: 52 }, // Platform 2
  "12199": { stopId: 216, positionId: 53 }, // Platform 3
  "12200": { stopId: 216, positionId: 54 }, // Platform 4

  // Pascoe Vale
  "vic:rail:PVL": { stopId: 217 }, // Parent
  "15537": { stopId: 217, positionId: 51 }, // Platform 1
  "15538": { stopId: 217, positionId: 52 }, // Platform 2

  // Patterson
  "vic:rail:PAT": { stopId: 218 }, // Parent
  "14236": { stopId: 218, positionId: 51 }, // Platform 1
  "14237": { stopId: 218, positionId: 52 }, // Platform 2
  "14238": { stopId: 218, positionId: 53 }, // Platform 3

  // Prahran
  "vic:rail:PRA": { stopId: 219 }, // Parent
  "14291": { stopId: 219, positionId: 51 }, // Platform 1
  "14292": { stopId: 219, positionId: 52 }, // Platform 2
  "vic:rail:PRA_BR1": { stopId: 219 },
  "vic:rail:PRA_ConX": { stopId: 219 },
  "vic:rail:PRA_EN1": { stopId: 219 },
  "vic:rail:PRA_EN2": { stopId: 219 },
  "vic:rail:PRA_EN3": { stopId: 219 },
  "vic:rail:PRA_EN4": { stopId: 219 },
  "26259": { stopId: 219, replacementBus: true }, // Replacement bus

  // Preston
  "vic:rail:PRE": { stopId: 220 }, // Parent
  "15379": { stopId: 220, positionId: 51 }, // Platform 1
  "15380": { stopId: 220, positionId: 52 }, // Platform 2
  "vic:rail:PRE_BR1": { stopId: 220 },
  "vic:rail:PRE_BR2": { stopId: 220 },
  "vic:rail:PRE_CN1": { stopId: 220 },
  "vic:rail:PRE_EN1": { stopId: 220 },
  "vic:rail:PRE_EN2": { stopId: 220 },
  "vic:rail:PRE_KR1": { stopId: 220 },
  "vic:rail:PRE_PR1": { stopId: 220 },
  "vic:rail:PRE_PR2": { stopId: 220 },
  "26260": { stopId: 220, replacementBus: true }, // Replacement bus

  // Pyramid
  "vic:rail:PYD": { stopId: 221 }, // Parent
  "20336": { stopId: 221 },

  // Raywood
  "vic:rail:RAY": { stopId: 315 }, // Parent
  "49295": { stopId: 315 },

  // Regent
  "vic:rail:REG": { stopId: 222 }, // Parent
  "15377": { stopId: 222, positionId: 51 }, // Platform 1
  "15378": { stopId: 222, positionId: 52 }, // Platform 2
  "vic:rail:REG_DP1": { stopId: 222 },
  "vic:rail:REG_EN1": { stopId: 222 },
  "vic:rail:REG_EN2": { stopId: 222 },
  "vic:rail:REG_EN3": { stopId: 222 },
  "vic:rail:REG_EN4": { stopId: 222 },
  "vic:rail:REG_EN5": { stopId: 222 },
  "vic:rail:REG_PR1": { stopId: 222 },
  "vic:rail:REG_PR2": { stopId: 222 },
  "vic:rail:REG_PR3": { stopId: 222 },
  "vic:rail:REG_PR4": { stopId: 222 },
  "26261": { stopId: 222, replacementBus: true }, // Replacement bus

  // Reservoir
  "vic:rail:RES": { stopId: 223 }, // Parent
  "15375": { stopId: 223, positionId: 51 }, // Platform 1
  "15376": { stopId: 223, positionId: 52 }, // Platform 2
  "vic:rail:RES_BR1": { stopId: 223 },
  "vic:rail:RES_DP1": { stopId: 223 },
  "vic:rail:RES_DP2": { stopId: 223 },
  "vic:rail:RES_EN1": { stopId: 223 },
  "vic:rail:RES_EN2": { stopId: 223 },
  "vic:rail:RES_LI1": { stopId: 223 },
  "vic:rail:RES_LI2": { stopId: 223 },
  "vic:rail:RES_PR1": { stopId: 223 },
  "vic:rail:RES_PR2": { stopId: 223 },
  "vic:rail:RES_PR3": { stopId: 223 },
  "26262": { stopId: 223, replacementBus: true }, // Replacement bus

  // Richmond
  "vic:rail:RMD": { stopId: 224 }, // Parent
  "12253": { stopId: 224, positionId: 51 }, // Platform 1
  "12254": { stopId: 224, positionId: 52 }, // Platform 2
  "12255": { stopId: 224, positionId: 53 }, // Platform 3
  "12256": { stopId: 224, positionId: 54 }, // Platform 4
  "12257": { stopId: 224, positionId: 55 }, // Platform 5
  "12258": { stopId: 224, positionId: 56 }, // Platform 6
  "12259": { stopId: 224, positionId: 57 }, // Platform 7
  "12260": { stopId: 224, positionId: 58 }, // Platform 8
  "12261": { stopId: 224, positionId: 59 }, // Platform 9
  "12262": { stopId: 224, positionId: 60 }, // Platform 10
  "22247": { stopId: 224 },
  "vic:rail:RMD_CN1": { stopId: 224 },
  "vic:rail:RMD_ConX": { stopId: 224 },
  "vic:rail:RMD_DP1": { stopId: 224 },
  "vic:rail:RMD_DP10": { stopId: 224 },
  "vic:rail:RMD_DP11": { stopId: 224 },
  "vic:rail:RMD_DP12": { stopId: 224 },
  "vic:rail:RMD_DP13": { stopId: 224 },
  "vic:rail:RMD_DP14": { stopId: 224 },
  "vic:rail:RMD_DP15": { stopId: 224 },
  "vic:rail:RMD_DP16": { stopId: 224 },
  "vic:rail:RMD_DP17": { stopId: 224 },
  "vic:rail:RMD_DP2": { stopId: 224 },
  "vic:rail:RMD_DP3": { stopId: 224 },
  "vic:rail:RMD_DP4": { stopId: 224 },
  "vic:rail:RMD_DP5": { stopId: 224 },
  "vic:rail:RMD_DP6": { stopId: 224 },
  "vic:rail:RMD_DP7": { stopId: 224 },
  "vic:rail:RMD_DP8": { stopId: 224 },
  "vic:rail:RMD_DP9": { stopId: 224 },
  "vic:rail:RMD_EN1": { stopId: 224 },
  "vic:rail:RMD_EN2": { stopId: 224 },
  "vic:rail:RMD_EN3": { stopId: 224 },
  "vic:rail:RMD_EN4": { stopId: 224 },
  "26263": { stopId: 224, replacementBus: true }, // Replacement bus

  // Riddells Creek
  "vic:rail:RIK": { stopId: 225 }, // Parent
  "20337": { stopId: 225 },

  // Ringwood
  "vic:rail:RWD": { stopId: 226 }, // Parent
  "12236": { stopId: 226, positionId: 51 }, // Platform 1
  "12237": { stopId: 226, positionId: 52 }, // Platform 2
  "12235": { stopId: 226, positionId: 53 }, // Platform 3
  "vic:rail:RWD_BR1": { stopId: 226 },
  "vic:rail:RWD_ConX": { stopId: 226 },
  "vic:rail:RWD_DP1": { stopId: 226 },
  "vic:rail:RWD_DP2": { stopId: 226 },
  "vic:rail:RWD_DP3": { stopId: 226 },
  "vic:rail:RWD_DP4": { stopId: 226 },
  "vic:rail:RWD_DP5": { stopId: 226 },
  "vic:rail:RWD_DP6": { stopId: 226 },
  "vic:rail:RWD_DP7": { stopId: 226 },
  "vic:rail:RWD_EN1": { stopId: 226 },
  "vic:rail:RWD_EN2": { stopId: 226 },
  "vic:rail:RWD_EN3": { stopId: 226 },
  "vic:rail:RWD_EN4": { stopId: 226 },
  "vic:rail:RWD_EN5": { stopId: 226 },
  "vic:rail:RWD_EN6": { stopId: 226 },
  "vic:rail:RWD_LI1": { stopId: 226 },
  "vic:rail:RWD_LI2": { stopId: 226 },
  "vic:rail:RWD_LI3": { stopId: 226 },
  "vic:rail:RWD_PR1": { stopId: 226 },
  "26265": { stopId: 226, replacementBus: true }, // Replacement bus

  // Ringwood East
  "vic:rail:RWE": { stopId: 227 }, // Parent
  "12170": { stopId: 227, positionId: 51 }, // Platform 1
  "12171": { stopId: 227, positionId: 52 }, // Platform 2

  // Ripponlea
  "vic:rail:RIP": { stopId: 228 }, // Parent
  "14285": { stopId: 228, positionId: 51 }, // Platform 1
  "14286": { stopId: 228, positionId: 52 }, // Platform 2
  "vic:rail:RIP_ConX": { stopId: 228 },
  "vic:rail:RIP_DP1": { stopId: 228 },
  "vic:rail:RIP_EN1": { stopId: 228 },
  "vic:rail:RIP_EN2": { stopId: 228 },
  "vic:rail:RIP_EN3": { stopId: 228 },
  "vic:rail:RIP_EN4": { stopId: 228 },
  "26266": { stopId: 228, replacementBus: true }, // Replacement bus

  // Riversdale
  "vic:rail:RIV": { stopId: 229 }, // Parent
  "11205": { stopId: 229, positionId: 51 }, // Platform 1
  "11206": { stopId: 229, positionId: 52 }, // Platform 2
  "vic:rail:RIV_DP1": { stopId: 229 },
  "vic:rail:RIV_DP2": { stopId: 229 },
  "vic:rail:RIV_EN1": { stopId: 229 },
  "vic:rail:RIV_EN2": { stopId: 229 },
  "vic:rail:RIV_PR1": { stopId: 229 },
  "26267": { stopId: 229, replacementBus: true }, // Replacement bus

  // Rochester
  "vic:rail:ROR": { stopId: 230 }, // Parent
  "20338": { stopId: 230 },

  // Rockbank
  "vic:rail:RBK": { stopId: 231 }, // Parent
  "19981": { stopId: 231 },

  // Rosanna
  "vic:rail:ROS": { stopId: 232 }, // Parent
  "13760": { stopId: 232, positionId: 51 }, // Platform 1
  "15323": { stopId: 232, positionId: 52 }, // Platform 2
  "vic:rail:ROS_BR1": { stopId: 232 },
  "vic:rail:ROS_CN1": { stopId: 232 },
  "vic:rail:ROS_ConX": { stopId: 232 },
  "vic:rail:ROS_DP1": { stopId: 232 },
  "vic:rail:ROS_DP2": { stopId: 232 },
  "vic:rail:ROS_EN1": { stopId: 232 },
  "vic:rail:ROS_EN2": { stopId: 232 },
  "vic:rail:ROS_EN3": { stopId: 232 },
  "vic:rail:ROS_EN4": { stopId: 232 },
  "vic:rail:ROS_EN5": { stopId: 232 },
  "vic:rail:ROS_KR1": { stopId: 232 },
  "vic:rail:ROS_LI1": { stopId: 232 },
  "vic:rail:ROS_LI2": { stopId: 232 },
  "vic:rail:ROS_PR1": { stopId: 232 },
  "vic:rail:ROS_PR2": { stopId: 232 },
  "26268": { stopId: 232, replacementBus: true }, // Replacement bus

  // Rosedale
  "vic:rail:ROE": { stopId: 233 }, // Parent
  "20339": { stopId: 233 },

  // Roxburgh Park
  "vic:rail:RXP": { stopId: 234 }, // Parent
  "40218": { stopId: 234, positionId: 51 }, // Platform 1
  "40219": { stopId: 234, positionId: 52 }, // Platform 2

  // Royal Park
  "vic:rail:RPK": { stopId: 235 }, // Parent
  "14318": { stopId: 235, positionId: 51 }, // Platform 1
  "14319": { stopId: 235, positionId: 52 }, // Platform 2

  // Rushall
  "vic:rail:RUS": { stopId: 236 }, // Parent
  "15391": { stopId: 236, positionId: 51 }, // Platform 1
  "15392": { stopId: 236, positionId: 52 }, // Platform 2
  "vic:rail:RUS_DP1": { stopId: 236 },
  "vic:rail:RUS_DP2": { stopId: 236 },
  "vic:rail:RUS_EN1": { stopId: 236 },
  "vic:rail:RUS_EN2": { stopId: 236 },
  "vic:rail:RUS_EN3": { stopId: 236 },
  "vic:rail:RUS_EN4": { stopId: 236 },
  "vic:rail:RUS_EN5": { stopId: 236 },
  "26271": { stopId: 236, replacementBus: true }, // Replacement bus

  // Ruthven
  "vic:rail:RUT": { stopId: 237 }, // Parent
  "15373": { stopId: 237, positionId: 51 }, // Platform 1
  "15374": { stopId: 237, positionId: 52 }, // Platform 2
  "vic:rail:RUT_DP1": { stopId: 237 },
  "vic:rail:RUT_EN1": { stopId: 237 },
  "vic:rail:RUT_EN2": { stopId: 237 },
  "vic:rail:RUT_PR1": { stopId: 237 },
  "vic:rail:RUT_PR2": { stopId: 237 },
  "26272": { stopId: 237, replacementBus: true }, // Replacement bus

  // Sale
  "vic:rail:SAE": { stopId: 238 }, // Parent
  "20341": { stopId: 238 },

  // Sandown Park
  "vic:rail:SNP": { stopId: 239 }, // Parent
  "12194": { stopId: 239, positionId: 51 }, // Platform 1
  "13713": { stopId: 239, positionId: 52 }, // Platform 2
  "26273": { stopId: 239, replacementBus: true }, // Replacement bus

  // Sandringham
  "vic:rail:SHM": { stopId: 240 }, // Parent
  "14271": { stopId: 240, positionId: 51 }, // Platform 1
  "vic:rail:SHM_BR1": { stopId: 240 },
  "vic:rail:SHM_ConX": { stopId: 240 },
  "vic:rail:SHM_EN1": { stopId: 240 },
  "vic:rail:SHM_PR1": { stopId: 240 },
  "vic:rail:SHM_TX1": { stopId: 240 },
  "26274": { stopId: 240, replacementBus: true }, // Replacement bus

  // Seaford
  "vic:rail:SEA": { stopId: 241 }, // Parent
  "11224": { stopId: 241, positionId: 51 }, // Platform 1
  "11225": { stopId: 241, positionId: 52 }, // Platform 2

  // Seaholme
  "vic:rail:SHE": { stopId: 242 }, // Parent
  "13743": { stopId: 242, positionId: 51 }, // Platform 1
  "26276": { stopId: 242, replacementBus: true }, // Replacement bus

  // Seddon
  "vic:rail:SEN": { stopId: 243 }, // Parent
  "15349": { stopId: 243, positionId: 51 }, // Platform 1
  "15350": { stopId: 243, positionId: 52 }, // Platform 2

  // Seymour
  "vic:rail:SER": { stopId: 244 }, // Parent
  "20342": { stopId: 244 },

  // Shepparton
  "vic:rail:SNH": { stopId: 245 }, // Parent
  "20343": { stopId: 245 },

  // Sherwood Park
  "vic:rail:SDP": { stopId: 246 }, // Parent
  "22257": { stopId: 246 },

  // Showgrounds
  "vic:rail:SGS": { stopId: 247 }, // Parent
  "15526": { stopId: 247, positionId: 51 }, // Platform 1

  // Somerville
  "vic:rail:SVE": { stopId: 248 }, // Parent
  "5082": { stopId: 248, positionId: 51 }, // Platform 1

  // South Geelong
  "vic:rail:SOG": { stopId: 249 }, // Parent
  "20344": { stopId: 249 },

  // South Kensington
  "vic:rail:SKN": { stopId: 250 }, // Parent
  "15522": { stopId: 250, positionId: 51 }, // Platform 1
  "15523": { stopId: 250, positionId: 52 }, // Platform 2

  // South Morang
  "vic:rail:SMG": { stopId: 251 }, // Parent
  "26522": { stopId: 251, positionId: 51 }, // Platform 1
  "26523": { stopId: 251, positionId: 52 }, // Platform 2
  "vic:rail:SMG_BR1": { stopId: 251 },
  "vic:rail:SMG_DP1": { stopId: 251 },
  "vic:rail:SMG_EN1": { stopId: 251 },
  "vic:rail:SMG_EN2": { stopId: 251 },
  "vic:rail:SMG_PR1": { stopId: 251 },
  "vic:rail:SMG_PR2": { stopId: 251 },
  "vic:rail:SMG_TX1": { stopId: 251 },
  "26280": { stopId: 251, replacementBus: true }, // Replacement bus

  // South Yarra
  "vic:rail:SYR": { stopId: 252 }, // Parent
  "14293": { stopId: 252, positionId: 51 }, // Platform 1
  "14294": { stopId: 252, positionId: 52 }, // Platform 2
  "14295": { stopId: 252, positionId: 53 }, // Platform 3
  "14296": { stopId: 252, positionId: 54 }, // Platform 4
  "14297": { stopId: 252, positionId: 55 }, // Platform 5
  "14298": { stopId: 252, positionId: 56 }, // Platform 6
  "vic:rail:SYR_ConX": { stopId: 252 },
  "vic:rail:SYR_DP1": { stopId: 252 },
  "vic:rail:SYR_DP2": { stopId: 252 },
  "vic:rail:SYR_DP3": { stopId: 252 },
  "vic:rail:SYR_DP4": { stopId: 252 },
  "vic:rail:SYR_EN1": { stopId: 252 },
  "26281": { stopId: 252, replacementBus: true }, // Replacement bus

  // Southern Cross
  "vic:rail:SSS": { stopId: 253 }, // Parent
  "22187": { stopId: 253, positionId: 58 }, // Platform 8
  "22188": { stopId: 253, positionId: 59 }, // Platform 9
  "22189": { stopId: 253, positionId: 60 }, // Platform 10
  "22190": { stopId: 253, positionId: 61 }, // Platform 11
  "22191": { stopId: 253, positionId: 62 }, // Platform 12
  "22192": { stopId: 253, positionId: 63 }, // Platform 13
  "22193": { stopId: 253, positionId: 64 }, // Platform 14
  "20043": { stopId: 253 },

  // Southland
  "vic:rail:SOU": { stopId: 254 }, // Parent
  "26527": { stopId: 254, positionId: 51 }, // Platform 1
  "26528": { stopId: 254, positionId: 52 }, // Platform 2

  // Spotswood
  "vic:rail:SPT": { stopId: 255 }, // Parent
  "15345": { stopId: 255, positionId: 51 }, // Platform 1
  "15346": { stopId: 255, positionId: 52 }, // Platform 2

  // Springhurst
  "1620": { stopId: 256 }, // Parent
  "22490": { stopId: 256 },

  // Springvale
  "vic:rail:SPG": { stopId: 257 }, // Parent
  "13714": { stopId: 257, positionId: 51 }, // Platform 1
  "13715": { stopId: 257, positionId: 52 }, // Platform 2
  "vic:rail:SPG_BR1": { stopId: 257 },
  "vic:rail:SPG_CN1": { stopId: 257 },
  "vic:rail:SPG_ConX": { stopId: 257 },
  "vic:rail:SPG_DP1": { stopId: 257 },
  "vic:rail:SPG_DP2": { stopId: 257 },
  "vic:rail:SPG_EN1": { stopId: 257 },
  "vic:rail:SPG_KR1": { stopId: 257 },
  "vic:rail:SPG_LI1": { stopId: 257 },
  "vic:rail:SPG_LI2": { stopId: 257 },
  "vic:rail:SPG_PR1": { stopId: 257 },
  "vic:rail:SPG_TX1": { stopId: 257 },
  "26285": { stopId: 257, replacementBus: true }, // Replacement bus

  // St Albans
  "vic:rail:SAB": { stopId: 258 }, // Parent
  "15361": { stopId: 258, positionId: 51 }, // Platform 1
  "15360": { stopId: 258, positionId: 52 }, // Platform 2
  "22243": { stopId: 258 },
  "vic:rail:SAB_BR1": { stopId: 258 },
  "vic:rail:SAB_ConX": { stopId: 258 },
  "vic:rail:SAB_DP1": { stopId: 258 },
  "vic:rail:SAB_DP2": { stopId: 258 },
  "vic:rail:SAB_EN1": { stopId: 258 },
  "vic:rail:SAB_EN2": { stopId: 258 },
  "vic:rail:SAB_KR1": { stopId: 258 },
  "vic:rail:SAB_LI1": { stopId: 258 },
  "vic:rail:SAB_LI2": { stopId: 258 },
  "vic:rail:SAB_PR1": { stopId: 258 },
  "vic:rail:SAB_PR2": { stopId: 258 },
  "vic:rail:SAB_TX1": { stopId: 258 },
  "26286": { stopId: 258, replacementBus: true }, // Replacement bus

  // State Library
  "vic:rail:STL": { stopId: 320 }, // Parent
  "26552": { stopId: 320, positionId: 51 }, // Platform 1
  "26553": { stopId: 320, positionId: 52 }, // Platform 2
  "vic:rail:STL_EN1": { stopId: 320 },
  "vic:rail:STL_EN2": { stopId: 320 },
  "vic:rail:STL_fDP1": { stopId: 320 },
  "vic:rail:STL_fDP2": { stopId: 320 },
  "vic:rail:STL_fDP3": { stopId: 320 },
  "vic:rail:STL_LI1": { stopId: 320 },
  "vic:rail:STL_LI2": { stopId: 320 },
  "vic:rail:STL_LI3": { stopId: 320 },
  "vic:rail:STL_LI4": { stopId: 320 },
  "vic:rail:STL_LI5": { stopId: 320 },
  "vic:rail:STL_mDP1": { stopId: 320 },
  "vic:rail:STL_mDP2": { stopId: 320 },
  "vic:rail:STL_sCN1": { stopId: 320 },
  "vic:rail:STL_sCN2": { stopId: 320 },
  "vic:rail:STL_sDP1": { stopId: 320 },
  "vic:rail:STL_sDP2": { stopId: 320 },

  // Stony Point
  "vic:rail:STY": { stopId: 259 }, // Parent
  "88": { stopId: 259, positionId: 51 }, // Platform 1

  // Stratford
  "vic:rail:STD": { stopId: 260 }, // Parent
  "20346": { stopId: 260 },

  // Strathmore
  "vic:rail:SME": { stopId: 261 }, // Parent
  "15539": { stopId: 261, positionId: 51 }, // Platform 1
  "15540": { stopId: 261, positionId: 52 }, // Platform 2

  // Sunbury
  "vic:rail:SUY": { stopId: 262 }, // Parent
  "26529": { stopId: 262, positionId: 51 }, // Platform 1
  "15352": { stopId: 262, positionId: 52 }, // Platform 2
  "19998": { stopId: 262 },
  "vic:rail:SUY_BR1": { stopId: 262 },
  "vic:rail:SUY_ConX": { stopId: 262 },
  "vic:rail:SUY_DP1": { stopId: 262 },
  "vic:rail:SUY_DP2": { stopId: 262 },
  "vic:rail:SUY_EN1": { stopId: 262 },
  "vic:rail:SUY_EN2": { stopId: 262 },
  "vic:rail:SUY_EN3": { stopId: 262 },
  "vic:rail:SUY_EN4": { stopId: 262 },
  "vic:rail:SUY_KR1": { stopId: 262 },
  "vic:rail:SUY_PR1": { stopId: 262 },
  "26289": { stopId: 262, replacementBus: true }, // Replacement bus

  // Sunshine
  "vic:rail:SUN": { stopId: 263 }, // Parent
  "26530": { stopId: 263, positionId: 51 }, // Platform 1
  "26531": { stopId: 263, positionId: 52 }, // Platform 2
  "26532": { stopId: 263, positionId: 53 }, // Platform 3
  "26533": { stopId: 263, positionId: 54 }, // Platform 4
  "22241": { stopId: 263 },
  "vic:rail:SUN_BR1": { stopId: 263 },
  "vic:rail:SUN_BR2": { stopId: 263 },
  "vic:rail:SUN_ConX": { stopId: 263 },
  "vic:rail:SUN_DP1": { stopId: 263 },
  "vic:rail:SUN_DP2": { stopId: 263 },
  "vic:rail:SUN_DP3": { stopId: 263 },
  "vic:rail:SUN_DP4": { stopId: 263 },
  "vic:rail:SUN_DP5": { stopId: 263 },
  "vic:rail:SUN_DP6": { stopId: 263 },
  "vic:rail:SUN_EN1": { stopId: 263 },
  "vic:rail:SUN_EN2": { stopId: 263 },
  "vic:rail:SUN_EN3": { stopId: 263 },
  "vic:rail:SUN_EN4": { stopId: 263 },
  "vic:rail:SUN_EN5": { stopId: 263 },
  "vic:rail:SUN_EN6": { stopId: 263 },
  "vic:rail:SUN_EN7": { stopId: 263 },
  "vic:rail:SUN_EN8": { stopId: 263 },
  "vic:rail:SUN_EN9": { stopId: 263 },
  "vic:rail:SUN_KR1": { stopId: 263 },
  "vic:rail:SUN_PR1": { stopId: 263 },
  "vic:rail:SUN_PR2": { stopId: 263 },
  "vic:rail:SUN_PR3": { stopId: 263 },
  "vic:rail:SUN_TX1": { stopId: 263 },
  "26290": { stopId: 263, replacementBus: true }, // Replacement bus

  // Swan Hill
  "vic:rail:SWL": { stopId: 265 }, // Parent
  "20347": { stopId: 265 },

  // Syndal
  "vic:rail:SYN": { stopId: 266 }, // Parent
  "12160": { stopId: 266, positionId: 51 }, // Platform 1
  "12161": { stopId: 266, positionId: 52 }, // Platform 2
  "vic:rail:SYN_BR1": { stopId: 266 },
  "vic:rail:SYN_ConX": { stopId: 266 },
  "vic:rail:SYN_DP1": { stopId: 266 },
  "vic:rail:SYN_DP2": { stopId: 266 },
  "vic:rail:SYN_EN1": { stopId: 266 },
  "vic:rail:SYN_EN2": { stopId: 266 },
  "vic:rail:SYN_EN3": { stopId: 266 },
  "vic:rail:SYN_EN4": { stopId: 266 },
  "vic:rail:SYN_PR1": { stopId: 266 },
  "vic:rail:SYN_PR2": { stopId: 266 },
  "26292": { stopId: 266, replacementBus: true }, // Replacement bus

  // Talbot
  "vic:rail:TAT": { stopId: 267 }, // Parent
  "47482": { stopId: 267 },

  // Tallarook
  "vic:rail:TOK": { stopId: 268 }, // Parent
  "20348": { stopId: 268 },

  // Tarneit
  "vic:rail:TNT": { stopId: 269 }, // Parent
  "47648": { stopId: 269 },

  // Tecoma
  "vic:rail:TCM": { stopId: 270 }, // Parent
  "11121": { stopId: 270, positionId: 51 }, // Platform 1

  // Terang
  "vic:rail:TER": { stopId: 271 }, // Parent
  "20349": { stopId: 271 },

  // Thomastown
  "vic:rail:TSN": { stopId: 272 }, // Parent
  "15370": { stopId: 272, positionId: 51 }, // Platform 1
  "26534": { stopId: 272, positionId: 52 }, // Platform 2
  "vic:rail:TSN_BR1": { stopId: 272 },
  "vic:rail:TSN_DP1": { stopId: 272 },
  "vic:rail:TSN_EN1": { stopId: 272 },
  "vic:rail:TSN_EN2": { stopId: 272 },
  "vic:rail:TSN_EN3": { stopId: 272 },
  "vic:rail:TSN_EN4": { stopId: 272 },
  "vic:rail:TSN_EN5": { stopId: 272 },
  "vic:rail:TSN_LI1": { stopId: 272 },
  "vic:rail:TSN_LI2": { stopId: 272 },
  "vic:rail:TSN_PR1": { stopId: 272 },
  "vic:rail:TSN_PR2": { stopId: 272 },
  "26294": { stopId: 272, replacementBus: true }, // Replacement bus

  // Thornbury
  "vic:rail:TBY": { stopId: 273 }, // Parent
  "15383": { stopId: 273, positionId: 51 }, // Platform 1
  "15384": { stopId: 273, positionId: 52 }, // Platform 2
  "vic:rail:TBY_DP1": { stopId: 273 },
  "vic:rail:TBY_DP2": { stopId: 273 },
  "vic:rail:TBY_EN1": { stopId: 273 },
  "vic:rail:TBY_EN2": { stopId: 273 },
  "26295": { stopId: 273, replacementBus: true }, // Replacement bus

  // Toorak
  "vic:rail:TOR": { stopId: 274 }, // Parent
  "14263": { stopId: 274, positionId: 51 }, // Platform 1
  "14264": { stopId: 274, positionId: 52 }, // Platform 2

  // Tooronga
  "vic:rail:TGA": { stopId: 275 }, // Parent
  "12267": { stopId: 275, positionId: 51 }, // Platform 1
  "12268": { stopId: 275, positionId: 52 }, // Platform 2

  // Tottenham
  "vic:rail:TOT": { stopId: 276 }, // Parent
  "15512": { stopId: 276, positionId: 51 }, // Platform 1
  "15513": { stopId: 276, positionId: 52 }, // Platform 2

  // Town Hall
  "vic:rail:THL": { stopId: 319 }, // Parent
  "26554": { stopId: 319, positionId: 51 }, // Platform 1
  "26555": { stopId: 319, positionId: 52 }, // Platform 2
  "vic:rail:THL_cDP1": { stopId: 319 },
  "vic:rail:THL_cDP2": { stopId: 319 },
  "vic:rail:THL_cDP3": { stopId: 319 },
  "vic:rail:THL_cDP4": { stopId: 319 },
  "vic:rail:THL_cDP5": { stopId: 319 },
  "vic:rail:THL_EN1": { stopId: 319 },
  "vic:rail:THL_LI1": { stopId: 319 },
  "vic:rail:THL_LI2": { stopId: 319 },
  "vic:rail:THL_LI4": { stopId: 319 },
  "vic:rail:THL_LI5": { stopId: 319 },
  "vic:rail:THL_sDP3": { stopId: 319 },
  "vic:rail:THL_sDP4": { stopId: 319 },

  // Trafalgar
  "vic:rail:TAR": { stopId: 277 }, // Parent
  "20350": { stopId: 277 },

  // Traralgon
  "vic:rail:TRN": { stopId: 278 }, // Parent
  "20351": { stopId: 278 },

  // Tyabb
  "vic:rail:TAB": { stopId: 279 }, // Parent
  "4318": { stopId: 279, positionId: 51 }, // Platform 1

  // Tynong
  "vic:rail:TYN": { stopId: 280 }, // Parent
  "20352": { stopId: 280 },

  // Union
  "vic:rail:UNN": { stopId: 316 }, // Parent
  "26535": { stopId: 316, positionId: 51 }, // Platform 1
  "26536": { stopId: 316, positionId: 52 }, // Platform 2
  "26537": { stopId: 316, positionId: 53 }, // Platform 3

  // Upfield
  "vic:rail:UFD": { stopId: 281 }, // Parent
  "14299": { stopId: 281, positionId: 51 }, // Platform 1

  // Upper Ferntree Gully
  "vic:rail:UFG": { stopId: 282 }, // Parent
  "11245": { stopId: 282, positionId: 51 }, // Platform 1
  "11246": { stopId: 282, positionId: 52 }, // Platform 2

  // Upwey
  "vic:rail:UPW": { stopId: 283 }, // Parent
  "11122": { stopId: 283, positionId: 51 }, // Platform 1
  "11123": { stopId: 283, positionId: 52 }, // Platform 2

  // Victoria Park
  "vic:rail:VPK": { stopId: 284 }, // Parent
  "14332": { stopId: 284, positionId: 51 }, // Platform 1
  "14333": { stopId: 284, positionId: 52 }, // Platform 2
  "vic:rail:VPK_DP1": { stopId: 284 },
  "vic:rail:VPK_DP2": { stopId: 284 },
  "vic:rail:VPK_DP3": { stopId: 284 },
  "vic:rail:VPK_DP4": { stopId: 284 },
  "vic:rail:VPK_DP5": { stopId: 284 },
  "vic:rail:VPK_DP6": { stopId: 284 },
  "vic:rail:VPK_EN1": { stopId: 284 },
  "vic:rail:VPK_EN2": { stopId: 284 },
  "vic:rail:VPK_EN3": { stopId: 284 },
  "vic:rail:VPK_EN4": { stopId: 284 },
  "vic:rail:VPK_PR1": { stopId: 284 },
  "26303": { stopId: 284, replacementBus: true }, // Replacement bus

  // Violet Town
  "vic:rail:VTN": { stopId: 285 }, // Parent
  "20353": { stopId: 285 },

  // Wallan
  "vic:rail:WAN": { stopId: 286 }, // Parent
  "17204": { stopId: 286 },

  // Wandong
  "vic:rail:WDG": { stopId: 287 }, // Parent
  "20355": { stopId: 287 },

  // Wangaratta
  "vic:rail:WRT": { stopId: 288 }, // Parent
  "20356": { stopId: 288 },

  // Warragul
  "vic:rail:WGL": { stopId: 289 }, // Parent
  "20357": { stopId: 289 },

  // Warrnambool
  "vic:rail:WBL": { stopId: 290 }, // Parent
  "20358": { stopId: 290 },

  // Watergardens
  "vic:rail:WGS": { stopId: 291 }, // Parent
  "15355": { stopId: 291, positionId: 51 }, // Platform 1
  "15356": { stopId: 291, positionId: 52 }, // Platform 2
  "15357": { stopId: 291, positionId: 53 }, // Platform 3
  "22244": { stopId: 291 },
  "vic:rail:WGS_BR1": { stopId: 291 },
  "vic:rail:WGS_BR2": { stopId: 291 },
  "vic:rail:WGS_ConX": { stopId: 291 },
  "vic:rail:WGS_DP1": { stopId: 291 },
  "vic:rail:WGS_DP2": { stopId: 291 },
  "vic:rail:WGS_DP3": { stopId: 291 },
  "vic:rail:WGS_DP4": { stopId: 291 },
  "vic:rail:WGS_EN1": { stopId: 291 },
  "vic:rail:WGS_EN2": { stopId: 291 },
  "vic:rail:WGS_EN3": { stopId: 291 },
  "vic:rail:WGS_EN4": { stopId: 291 },
  "vic:rail:WGS_EN5": { stopId: 291 },
  "vic:rail:WGS_EN6": { stopId: 291 },
  "vic:rail:WGS_EN7": { stopId: 291 },
  "vic:rail:WGS_LI1": { stopId: 291 },
  "vic:rail:WGS_LI2": { stopId: 291 },
  "vic:rail:WGS_LI3": { stopId: 291 },
  "vic:rail:WGS_LI4": { stopId: 291 },
  "vic:rail:WGS_LI5": { stopId: 291 },
  "vic:rail:WGS_PR1": { stopId: 291 },
  "vic:rail:WGS_PR2": { stopId: 291 },
  "vic:rail:WGS_PR3": { stopId: 291 },
  "vic:rail:WGS_TX1": { stopId: 291 },
  "26304": { stopId: 291, replacementBus: true }, // Replacement bus

  // Watsonia
  "vic:rail:WAT": { stopId: 292 }, // Parent
  "15327": { stopId: 292, positionId: 51 }, // Platform 1
  "15328": { stopId: 292, positionId: 52 }, // Platform 2
  "vic:rail:WAT_BR1": { stopId: 292 },
  "vic:rail:WAT_ConX": { stopId: 292 },
  "vic:rail:WAT_DP1": { stopId: 292 },
  "vic:rail:WAT_EN1": { stopId: 292 },
  "vic:rail:WAT_EN2": { stopId: 292 },
  "vic:rail:WAT_PR1": { stopId: 292 },
  "vic:rail:WAT_PR2": { stopId: 292 },
  "vic:rail:WAT_PR3": { stopId: 292 },
  "26305": { stopId: 292, replacementBus: true }, // Replacement bus

  // Wattle Glen
  "vic:rail:WTT": { stopId: 293 }, // Parent
  "15336": { stopId: 293, positionId: 51 }, // Platform 1
  "vic:rail:WTT_ConX": { stopId: 293 },
  "vic:rail:WTT_EN1": { stopId: 293 },
  "vic:rail:WTT_PR1": { stopId: 293 },
  "vic:rail:WTT_PR2": { stopId: 293 },
  "26306": { stopId: 293, replacementBus: true }, // Replacement bus

  // Waurn Ponds
  "vic:rail:WPP": { stopId: 294 }, // Parent
  "47641": { stopId: 294 },

  // Wendouree
  "vic:rail:WED": { stopId: 295 }, // Parent
  "43469": { stopId: 295 },

  // Werribee
  "vic:rail:WER": { stopId: 296 }, // Parent
  "13731": { stopId: 296, positionId: 51 }, // Platform 1
  "13732": { stopId: 296, positionId: 52 }, // Platform 2
  "13733": { stopId: 296, positionId: 53 }, // Platform 3
  "22246": { stopId: 296 },
  "vic:rail:WER_BR1": { stopId: 296 },
  "vic:rail:WER_ConX": { stopId: 296 },
  "vic:rail:WER_DP1": { stopId: 296 },
  "vic:rail:WER_DP2": { stopId: 296 },
  "vic:rail:WER_EN1": { stopId: 296 },
  "vic:rail:WER_EN2": { stopId: 296 },
  "vic:rail:WER_EN3": { stopId: 296 },
  "vic:rail:WER_EN4": { stopId: 296 },
  "vic:rail:WER_KR1": { stopId: 296 },
  "vic:rail:WER_PR1": { stopId: 296 },
  "vic:rail:WER_PR2": { stopId: 296 },
  "vic:rail:WER_TX1": { stopId: 296 },
  "26307": { stopId: 296, replacementBus: true }, // Replacement bus

  // West Footscray
  "vic:rail:WFY": { stopId: 297 }, // Parent
  "15514": { stopId: 297, positionId: 51 }, // Platform 1
  "15515": { stopId: 297, positionId: 52 }, // Platform 2
  "26538": { stopId: 297, positionId: 53 }, // Platform 3
  "vic:rail:WFY_BR1": { stopId: 297 },
  "vic:rail:WFY_ConX": { stopId: 297 },
  "vic:rail:WFY_DP1": { stopId: 297 },
  "vic:rail:WFY_DP2": { stopId: 297 },
  "vic:rail:WFY_DP3": { stopId: 297 },
  "vic:rail:WFY_DP4": { stopId: 297 },
  "vic:rail:WFY_DP5": { stopId: 297 },
  "vic:rail:WFY_DP6": { stopId: 297 },
  "vic:rail:WFY_EN1": { stopId: 297 },
  "vic:rail:WFY_EN2": { stopId: 297 },
  "vic:rail:WFY_EN3": { stopId: 297 },
  "vic:rail:WFY_EN4": { stopId: 297 },
  "vic:rail:WFY_EN5": { stopId: 297 },
  "vic:rail:WFY_EN6": { stopId: 297 },
  "vic:rail:WFY_KR1": { stopId: 297 },
  "vic:rail:WFY_LI1": { stopId: 297 },
  "vic:rail:WFY_LI2": { stopId: 297 },
  "vic:rail:WFY_LI3": { stopId: 297 },
  "vic:rail:WFY_LI4": { stopId: 297 },
  "vic:rail:WFY_PR1": { stopId: 297 },
  "vic:rail:WFY_PR2": { stopId: 297 },
  "vic:rail:WFY_PR3": { stopId: 297 },
  "vic:rail:WFY_TX1": { stopId: 297 },
  "26308": { stopId: 297, replacementBus: true }, // Replacement bus

  // West Richmond
  "vic:rail:WRM": { stopId: 298 }, // Parent
  "14338": { stopId: 298, positionId: 51 }, // Platform 1
  "14339": { stopId: 298, positionId: 52 }, // Platform 2
  "vic:rail:WRM_DP3": { stopId: 298 },
  "vic:rail:WRM_DP4": { stopId: 298 },
  "vic:rail:WRM_EN1": { stopId: 298 },
  "vic:rail:WRM_EN2": { stopId: 298 },
  "26309": { stopId: 298, replacementBus: true }, // Replacement bus

  // Westall
  "vic:rail:WTL": { stopId: 299 }, // Parent
  "13716": { stopId: 299, positionId: 51 }, // Platform 1
  "13717": { stopId: 299, positionId: 52 }, // Platform 2
  "26539": { stopId: 299, positionId: 53 }, // Platform 3
  "vic:rail:WTL_BR1": { stopId: 299 },
  "vic:rail:WTL_ConX": { stopId: 299 },
  "vic:rail:WTL_DP1": { stopId: 299 },
  "vic:rail:WTL_DP2": { stopId: 299 },
  "vic:rail:WTL_DP3": { stopId: 299 },
  "vic:rail:WTL_DP4": { stopId: 299 },
  "vic:rail:WTL_EN1": { stopId: 299 },
  "vic:rail:WTL_EN2": { stopId: 299 },
  "vic:rail:WTL_EN3": { stopId: 299 },
  "vic:rail:WTL_EN4": { stopId: 299 },
  "vic:rail:WTL_LI1": { stopId: 299 },
  "vic:rail:WTL_LI2": { stopId: 299 },
  "vic:rail:WTL_LI3": { stopId: 299 },
  "vic:rail:WTL_LI4": { stopId: 299 },
  "vic:rail:WTL_PR1": { stopId: 299 },
  "vic:rail:WTL_PR2": { stopId: 299 },
  "vic:rail:WTL_PR3": { stopId: 299 },
  "26310": { stopId: 299, replacementBus: true }, // Replacement bus

  // Westgarth
  "vic:rail:WTG": { stopId: 300 }, // Parent
  "13744": { stopId: 300, positionId: 51 }, // Platform 1
  "13745": { stopId: 300, positionId: 52 }, // Platform 2
  "26311": { stopId: 300, replacementBus: true }, // Replacement bus

  // Westona
  "vic:rail:WTO": { stopId: 301 }, // Parent
  "13740": { stopId: 301, positionId: 51 }, // Platform 1
  "13741": { stopId: 301, positionId: 52 }, // Platform 2
  "26312": { stopId: 301, replacementBus: true }, // Replacement bus

  // Williams Landing
  "vic:rail:WLD": { stopId: 302 }, // Parent
  "26540": { stopId: 302, positionId: 51 }, // Platform 1
  "26541": { stopId: 302, positionId: 52 }, // Platform 2
  "vic:rail:WLD_BR1": { stopId: 302 },
  "vic:rail:WLD_ConX": { stopId: 302 },
  "vic:rail:WLD_DP1": { stopId: 302 },
  "vic:rail:WLD_DP2": { stopId: 302 },
  "vic:rail:WLD_DP3": { stopId: 302 },
  "vic:rail:WLD_DP4": { stopId: 302 },
  "vic:rail:WLD_EN1": { stopId: 302 },
  "vic:rail:WLD_EN2": { stopId: 302 },
  "vic:rail:WLD_EN3": { stopId: 302 },
  "vic:rail:WLD_KR1": { stopId: 302 },
  "vic:rail:WLD_LI1": { stopId: 302 },
  "vic:rail:WLD_LI2": { stopId: 302 },
  "vic:rail:WLD_PR1": { stopId: 302 },
  "vic:rail:WLD_TX1": { stopId: 302 },
  "26313": { stopId: 302, replacementBus: true }, // Replacement bus

  // Williamstown
  "vic:rail:WIL": { stopId: 303 }, // Parent
  "15338": { stopId: 303, positionId: 51 }, // Platform 1
  "vic:rail:WIL_PR": { stopId: 303 },
  "vic:rail:WIL_Railw": { stopId: 303 },
  "26315": { stopId: 303, replacementBus: true }, // Replacement bus

  // Williamstown Beach
  "vic:rail:WBH": { stopId: 304 }, // Parent
  "15339": { stopId: 304, positionId: 51 }, // Platform 1
  "15340": { stopId: 304, positionId: 52 }, // Platform 2

  // Willison
  "vic:rail:WSN": { stopId: 305 }, // Parent
  "11203": { stopId: 305, positionId: 51 }, // Platform 1
  "11204": { stopId: 305, positionId: 52 }, // Platform 2
  "vic:rail:WSN_ConX": { stopId: 305 },
  "vic:rail:WSN_DP1": { stopId: 305 },
  "vic:rail:WSN_EN1": { stopId: 305 },
  "vic:rail:WSN_EN2": { stopId: 305 },
  "vic:rail:WSN_PR1": { stopId: 305 },
  "26316": { stopId: 305, replacementBus: true }, // Replacement bus

  // Winchelsea
  "vic:rail:WIA": { stopId: 306 }, // Parent
  "20359": { stopId: 306 },

  // Windsor
  "vic:rail:WIN": { stopId: 307 }, // Parent
  "14289": { stopId: 307, positionId: 51 }, // Platform 1
  "14290": { stopId: 307, positionId: 52 }, // Platform 2
  "vic:rail:WIN_ConX": { stopId: 307 },
  "vic:rail:WIN_DP1": { stopId: 307 },
  "vic:rail:WIN_EN1": { stopId: 307 },
  "vic:rail:WIN_EN2": { stopId: 307 },
  "vic:rail:WIN_EN3": { stopId: 307 },
  "vic:rail:WIN_EN4": { stopId: 307 },
  "vic:rail:WIN_EN5": { stopId: 307 },
  "26317": { stopId: 307, replacementBus: true }, // Replacement bus

  // Wodonga
  "vic:rail:WOD": { stopId: 308 }, // Parent
  "20360": { stopId: 308 },

  // Woodend
  "vic:rail:WNO": { stopId: 309 }, // Parent
  "20361": { stopId: 309 },

  // Wyndham Vale
  "vic:rail:WVL": { stopId: 310 }, // Parent
  "47647": { stopId: 310 },

  // Yarragon
  "vic:rail:YON": { stopId: 311 }, // Parent
  "20362": { stopId: 311 },

  // Yarraman
  "vic:rail:YMN": { stopId: 312 }, // Parent
  "12190": { stopId: 312, positionId: 51 }, // Platform 1
  "12191": { stopId: 312, positionId: 52 }, // Platform 2
  "26318": { stopId: 312, replacementBus: true }, // Replacement bus

  // Yarraville
  "vic:rail:YVE": { stopId: 313 }, // Parent
  "15347": { stopId: 313, positionId: 51 }, // Platform 1
  "15348": { stopId: 313, positionId: 52 }, // Platform 2
  "vic:rail:YVE_BR1": { stopId: 313 },
  "vic:rail:YVE_ConX": { stopId: 313 },
  "vic:rail:YVE_EN1": { stopId: 313 },
  "vic:rail:YVE_EN2": { stopId: 313 },
  "vic:rail:YVE_EN3": { stopId: 313 },
  "vic:rail:YVE_EN4": { stopId: 313 },
  "vic:rail:YVE_PR1": { stopId: 313 },
  "vic:rail:YVE_TX1": { stopId: 313 },
  "26319": { stopId: 313, replacementBus: true }, // Replacement bus
};
