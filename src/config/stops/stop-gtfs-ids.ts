import type { StopGtfsIdsConfig } from "../third-party-id-mapping-types.js";
import * as stop from "./stop-ids.js";
import * as position from "./stop-position-ids.js";

export const stopGtfsIds: StopGtfsIdsConfig = {
  [stop.AIRCRAFT]: {
    suburban: {
      parent: "vic:rail:ACF",
      platforms: {
        [position.PLATFORM_1]: ["13738"],
        [position.PLATFORM_2]: ["13739"],
      },
      replacementBus: ["26100"],
    },
  },

  [stop.ALAMEIN]: {
    suburban: {
      parent: "vic:rail:ALM",
      platforms: {
        [position.PLATFORM_1]: ["11197"],
      },
      replacementBus: ["26101"],
    },
  },

  [stop.ALBION]: {
    suburban: {
      parent: "vic:rail:ALB",
      platforms: {
        [position.PLATFORM_1]: ["15364"],
        [position.PLATFORM_2]: ["15365"],
      },
      replacementBus: ["26102"],
    },
  },

  [stop.ALBURY]: {
    regional: {
      parent: "nsw:rail:ABY",
      general: ["20287"],
    },
  },

  [stop.ALPHINGTON]: {
    suburban: {
      parent: "vic:rail:ALP",
      platforms: {
        [position.PLATFORM_1]: ["13750"],
        [position.PLATFORM_2]: ["13751"],
      },
      replacementBus: ["26103"],
    },
  },

  [stop.ALTONA]: {
    suburban: {
      parent: "vic:rail:ALT",
      platforms: {
        [position.PLATFORM_1]: ["13742"],
      },
      replacementBus: ["26104"],
    },
  },

  [stop.ANSTEY]: {
    suburban: {
      parent: "vic:rail:ASY",
      platforms: {
        [position.PLATFORM_1]: ["14312"],
        [position.PLATFORM_2]: ["14313"],
      },
    },
  },

  [stop.ANZAC]: {
    suburban: {
      parent: "vic:rail:AZC",
      platforms: {
        [position.PLATFORM_1]: ["26556"],
        [position.PLATFORM_2]: ["26557"],
      },
    },
  },

  [stop.ARARAT]: {
    regional: {
      parent: "vic:rail:ART",
      general: ["20288"],
    },
  },

  [stop.ARDEER]: {
    regional: {
      parent: "vic:rail:ARR",
      general: ["20020"],
    },
  },

  [stop.ARDEN]: {
    suburban: {
      parent: "vic:rail:ARN",
      platforms: {
        [position.PLATFORM_1]: ["26548"],
        [position.PLATFORM_2]: ["26549"],
      },
      replacementBus: ["126323"],
    },
  },

  [stop.ARMADALE]: {
    suburban: {
      parent: "vic:rail:ARM",
      platforms: {
        [position.PLATFORM_1]: ["14259"],
        [position.PLATFORM_2]: ["14260"],
        [position.PLATFORM_3]: ["14261"],
        [position.PLATFORM_4]: ["14262"],
      },
      replacementBus: ["26106"],
    },
  },

  [stop.ASCOT_VALE]: {
    suburban: {
      parent: "vic:rail:ASV",
      platforms: {
        [position.PLATFORM_1]: ["15548"],
        [position.PLATFORM_2]: ["15549"],
      },
      replacementBus: ["26107"],
    },
  },

  [stop.ASHBURTON]: {
    suburban: {
      parent: "vic:rail:ASH",
      platforms: {
        [position.PLATFORM_1]: ["11198"],
      },
      replacementBus: ["26108"],
    },
  },

  [stop.ASPENDALE]: {
    suburban: {
      parent: "vic:rail:ASP",
      platforms: {
        [position.PLATFORM_1]: ["11234"],
        [position.PLATFORM_2]: ["11235"],
      },
      replacementBus: ["26109"],
    },
  },

  [stop.AUBURN]: {
    suburban: {
      parent: "vic:rail:AUB",
      platforms: {
        [position.PLATFORM_1]: ["12238"],
        [position.PLATFORM_2]: ["12239"],
        [position.PLATFORM_3]: ["12240"],
      },
      replacementBus: ["26110"],
    },
  },

  [stop.AVENEL]: {
    regional: {
      parent: "vic:rail:AVL",
      general: ["20289"],
    },
  },

  [stop.BACCHUS_MARSH]: {
    regional: {
      parent: "vic:rail:BAH",
      general: ["20290"],
    },
  },

  [stop.BAIRNSDALE]: {
    regional: {
      parent: "vic:rail:BDE",
      general: ["20291"],
    },
  },

  [stop.BALACLAVA]: {
    suburban: {
      parent: "vic:rail:BCV",
      platforms: {
        [position.PLATFORM_1]: ["14288"],
        [position.PLATFORM_2]: ["14287"],
      },
      replacementBus: ["26111"],
    },
  },

  [stop.BALLAN]: {
    regional: {
      parent: "vic:rail:BLN",
      general: ["20292"],
    },
  },

  [stop.BALLARAT]: {
    regional: {
      parent: "vic:rail:BAT-V",
      general: ["20293"],
    },
  },

  [stop.BATMAN]: {
    suburban: {
      parent: "vic:rail:BAT",
      platforms: {
        [position.PLATFORM_1]: ["14306"],
        [position.PLATFORM_2]: ["14307"],
      },
    },
  },

  [stop.BAXTER]: {
    suburban: {
      parent: "vic:rail:BXR",
      platforms: {
        [position.PLATFORM_1]: ["5701"],
      },
    },
  },

  [stop.BAYSWATER]: {
    suburban: {
      parent: "vic:rail:BAY",
      platforms: {
        [position.PLATFORM_1]: ["11410"],
        [position.PLATFORM_2]: ["11411"],
      },
    },
  },

  [stop.BEACONSFIELD]: {
    suburban: {
      parent: "vic:rail:BFD",
      platforms: {
        [position.PLATFORM_1]: ["12176"],
        [position.PLATFORM_2]: ["12177"],
      },
      replacementBus: ["26115"],
    },
  },

  [stop.BEAUFORT]: {
    regional: {
      parent: "vic:rail:BET",
      general: ["20294"],
    },
  },

  [stop.BELGRAVE]: {
    suburban: {
      parent: "vic:rail:BEG",
      platforms: {
        [position.PLATFORM_1]: ["11119"],
        [position.PLATFORM_2]: ["11120"],
      },
    },
  },

  [stop.BELL]: {
    suburban: {
      parent: "vic:rail:BEL",
      platforms: {
        [position.PLATFORM_1]: ["15381"],
        [position.PLATFORM_2]: ["15382"],
      },
      replacementBus: ["26117"],
    },
  },

  [stop.BENALLA]: {
    regional: {
      parent: "vic:rail:BXA",
      general: ["20295"],
    },
  },

  [stop.BENDIGO]: {
    regional: {
      parent: "vic:rail:BGO",
      general: ["20296"],
    },
  },

  [stop.BENTLEIGH]: {
    suburban: {
      parent: "vic:rail:BEN",
      platforms: {
        [position.PLATFORM_1]: ["14239"],
        [position.PLATFORM_2]: ["14240"],
        [position.PLATFORM_3]: ["14241"],
      },
      replacementBus: ["26118"],
    },
  },

  [stop.BERWICK]: {
    suburban: {
      parent: "vic:rail:BEW",
      general: ["22251", "27882", "27883"],
      platforms: {
        [position.PLATFORM_1]: ["12178"],
        [position.PLATFORM_2]: ["12179"],
      },
      replacementBus: ["26119"],
    },
    regional: {
      parent: "vic:rail:BEW",
      general: ["22251", "27882", "27883", "12178", "12179"],
      replacementBus: ["26119"],
    },
  },

  [stop.BIRREGURRA]: {
    regional: {
      parent: "vic:rail:BGE",
      general: ["20297"],
    },
  },

  [stop.BITTERN]: {
    suburban: {
      parent: "vic:rail:BIT",
      platforms: {
        [position.PLATFORM_1]: ["3236"],
      },
    },
  },

  [stop.BLACKBURN]: {
    suburban: {
      parent: "vic:rail:BBN",
      platforms: {
        [position.PLATFORM_1]: ["12226"],
        [position.PLATFORM_2]: ["12227"],
        [position.PLATFORM_3]: ["12228"],
      },
      replacementBus: ["26121"],
    },
  },

  [stop.BONBEACH]: {
    suburban: {
      parent: "vic:rail:BON",
      platforms: {
        [position.PLATFORM_1]: ["11228"],
        [position.PLATFORM_2]: ["11229"],
      },
      replacementBus: ["26122"],
    },
  },

  [stop.BORONIA]: {
    suburban: {
      parent: "vic:rail:BOR",
      platforms: {
        [position.PLATFORM_1]: ["11249"],
        [position.PLATFORM_2]: ["11409"],
      },
    },
  },

  [stop.BOX_HILL]: {
    suburban: {
      parent: "vic:rail:BOX",
      platforms: {
        [position.PLATFORM_2]: ["12221"],
        [position.PLATFORM_3]: ["12222"],
        [position.PLATFORM_4]: ["12223"],
      },
      replacementBus: ["26124"],
    },
  },

  [stop.BRIGHTON_BEACH]: {
    suburban: {
      parent: "vic:rail:BBH",
      platforms: {
        [position.PLATFORM_2]: ["14275"],
        [position.PLATFORM_3]: ["14276"],
      },
    },
  },

  [stop.BROADFORD]: {
    regional: {
      parent: "vic:rail:BRF",
      general: ["20298"],
    },
  },

  [stop.BROADMEADOWS]: {
    suburban: {
      parent: "vic:rail:BMS",
      platforms: {
        [position.PLATFORM_1]: ["15529"],
        [position.PLATFORM_2]: ["15530"],
      },
      replacementBus: ["26126"],
    },
    regional: {
      parent: "vic:rail:BMS",
      general: ["22254"],
      replacementBus: ["26126"],
    },
  },

  [stop.BRUNSWICK]: {
    suburban: {
      parent: "vic:rail:BWK",
      platforms: {
        [position.PLATFORM_1]: ["14314"],
        [position.PLATFORM_2]: ["14315"],
      },
    },
  },

  [stop.BUNYIP]: {
    regional: {
      parent: "vic:rail:BYP",
      general: ["20299"],
    },
  },

  [stop.BURNLEY]: {
    suburban: {
      parent: "vic:rail:BLY",
      platforms: {
        [position.PLATFORM_1]: ["12247"],
        [position.PLATFORM_2]: ["12248"],
        [position.PLATFORM_3]: ["12249"],
        [position.PLATFORM_4]: ["12250"],
      },
      replacementBus: ["26128"],
    },
  },

  [stop.BURWOOD]: {
    suburban: {
      parent: "vic:rail:BWD",
      platforms: {
        [position.PLATFORM_1]: ["11200"],
        [position.PLATFORM_2]: ["11199"],
      },
      replacementBus: ["26129"],
    },
  },

  [stop.CAMBERWELL]: {
    suburban: {
      parent: "vic:rail:CAM",
      platforms: {
        [position.PLATFORM_1]: ["11207"],
        [position.PLATFORM_2]: ["11208"],
        [position.PLATFORM_3]: ["11209"],
      },
      replacementBus: ["26130"],
    },
  },

  [stop.CAMPERDOWN]: {
    regional: {
      parent: "vic:rail:CPD",
      general: ["20300"],
    },
  },

  [stop.CANTERBURY]: {
    suburban: {
      parent: "vic:rail:CBY",
      platforms: {
        [position.PLATFORM_1]: ["12210"],
        [position.PLATFORM_2]: ["12211"],
        [position.PLATFORM_3]: ["12209"],
      },
      replacementBus: ["26131"],
    },
  },

  [stop.CARDINIA_ROAD]: {
    suburban: {
      parent: "vic:rail:CDA",
      platforms: {
        [position.PLATFORM_1]: ["26501"],
        [position.PLATFORM_2]: ["26502"],
      },
      replacementBus: ["26132"],
    },
  },

  [stop.CARNEGIE]: {
    suburban: {
      parent: "vic:rail:CNE",
      platforms: {
        [position.PLATFORM_1]: ["13729"],
        [position.PLATFORM_2]: ["13730"],
      },
      replacementBus: ["26133"],
    },
  },

  [stop.CAROLINE_SPRINGS]: {
    regional: {
      parent: "vic:rail:RVH",
      general: ["52011"],
    },
  },

  [stop.CARRUM]: {
    suburban: {
      parent: "vic:rail:CAR",
      platforms: {
        [position.PLATFORM_1]: ["11226"],
        [position.PLATFORM_2]: ["11227"],
      },
      replacementBus: ["26134"],
    },
  },

  [stop.CASTLEMAINE]: {
    regional: {
      parent: "vic:rail:CME",
      general: ["20301"],
    },
  },

  [stop.CAULFIELD]: {
    suburban: {
      parent: "vic:rail:CFD",
      general: ["22248"],
      platforms: {
        [position.PLATFORM_1]: ["14251"],
        [position.PLATFORM_2]: ["14252"],
        [position.PLATFORM_3]: ["14253"],
        [position.PLATFORM_4]: ["14254"],
      },
      replacementBus: ["26135"],
    },
    regional: {
      parent: "vic:rail:CFD",
      general: ["22248", "14251", "14252", "14253", "14254"],
      replacementBus: ["26135"],
    },
  },

  [stop.CHATHAM]: {
    suburban: {
      parent: "vic:rail:CHM",
      platforms: {
        [position.PLATFORM_1]: ["12212"],
        [position.PLATFORM_2]: ["12213"],
        [position.PLATFORM_3]: ["12214"],
      },
      replacementBus: ["26136"],
    },
  },

  [stop.CHELSEA]: {
    suburban: {
      parent: "vic:rail:CSA",
      platforms: {
        [position.PLATFORM_1]: ["11230"],
        [position.PLATFORM_2]: ["11231"],
      },
      replacementBus: ["26137"],
    },
  },

  [stop.CHELTENHAM]: {
    suburban: {
      parent: "vic:rail:CTM",
      platforms: {
        [position.PLATFORM_1]: ["11243"],
        [position.PLATFORM_2]: ["11242"],
        [position.PLATFORM_3]: ["11244"],
      },
      replacementBus: ["26138"],
    },
  },

  [stop.CHILTERN]: {
    regional: {
      parent: "vic:rail:CHI",
      general: ["20302"],
    },
  },

  [stop.CLARKEFIELD]: {
    regional: {
      parent: "vic:rail:CKF",
      general: ["20303"],
    },
  },

  [stop.CLAYTON]: {
    suburban: {
      parent: "vic:rail:CLA",
      general: ["22249"],
      platforms: {
        [position.PLATFORM_1]: ["13718"],
        [position.PLATFORM_2]: ["13719"],
      },
      replacementBus: ["26139"],
    },
    regional: {
      parent: "vic:rail:CLA",
      general: ["22249", "13718", "13719"],
      replacementBus: ["26139"],
    },
  },

  [stop.CLIFTON_HILL]: {
    suburban: {
      parent: "vic:rail:CHL",
      platforms: {
        [position.PLATFORM_1]: ["14330"],
        [position.PLATFORM_2]: ["14331"],
      },
      replacementBus: ["26140"],
    },
  },

  [stop.CLUNES]: {
    regional: {
      parent: "vic:rail:CLU",
      general: ["44952"],
    },
  },

  [stop.COBBLEBANK]: {
    regional: {
      parent: "vic:rail:TLN",
      general: ["48804"],
    },
  },

  [stop.COBURG]: {
    suburban: {
      parent: "vic:rail:COB",
      platforms: {
        [position.PLATFORM_1]: ["14308"],
        [position.PLATFORM_2]: ["14309"],
      },
      replacementBus: ["26141"],
    },
  },

  [stop.COLAC]: {
    regional: {
      parent: "vic:rail:COL",
      general: ["20304"],
    },
  },

  [stop.COLLINGWOOD]: {
    suburban: {
      parent: "vic:rail:CWD",
      platforms: {
        [position.PLATFORM_1]: ["14335"],
        [position.PLATFORM_2]: ["14334"],
      },
      replacementBus: ["26142"],
    },
  },

  [stop.COOLAROO]: {
    suburban: {
      parent: "vic:rail:CLO",
      platforms: {
        [position.PLATFORM_1]: ["26503"],
        [position.PLATFORM_2]: ["26504"],
      },
      replacementBus: ["26143"],
    },
  },

  [stop.CORIO]: {
    regional: {
      parent: "vic:rail:COR",
      general: ["20305"],
    },
  },

  [stop.CRAIGIEBURN]: {
    suburban: {
      parent: "vic:rail:CGB",
      general: ["20029"],
      platforms: {
        [position.PLATFORM_1]: ["15527"],
        [position.PLATFORM_2]: ["15528"],
      },
      replacementBus: ["26144"],
    },
    regional: {
      parent: "vic:rail:CGB",
      general: ["20029", "15527", "15528"],
      replacementBus: ["26144"],
    },
  },

  [stop.CRANBOURNE]: {
    suburban: {
      parent: "vic:rail:CBE",
      platforms: {
        [position.PLATFORM_1]: ["12184"],
        [position.PLATFORM_2]: ["12185"],
      },
      replacementBus: ["26145"],
    },
  },

  [stop.CRESWICK]: {
    regional: {
      parent: "vic:rail:CWK",
      general: ["44951"],
    },
  },

  [stop.CRIB_POINT]: {
    suburban: {
      parent: "vic:rail:CPT",
      platforms: {
        [position.PLATFORM_1]: ["615"],
      },
    },
  },

  [stop.CROXTON]: {
    suburban: {
      parent: "vic:rail:CXT",
      platforms: {
        [position.PLATFORM_1]: ["15385"],
        [position.PLATFORM_2]: ["15386"],
      },
      replacementBus: ["26147"],
    },
  },

  [stop.CROYDON]: {
    suburban: {
      parent: "vic:rail:CDN",
      platforms: {
        [position.PLATFORM_1]: ["12168"],
        [position.PLATFORM_2]: ["12169"],
      },
    },
  },

  [stop.DANDENONG]: {
    suburban: {
      parent: "vic:rail:DNG",
      general: ["22250"],
      platforms: {
        [position.PLATFORM_1]: ["12187"],
        [position.PLATFORM_2]: ["12188"],
        [position.PLATFORM_3]: ["12189"],
      },
      replacementBus: ["26149"],
    },
    regional: {
      parent: "vic:rail:DNG",
      general: ["22250", "12187", "12188", "12189"],
      replacementBus: ["26149"],
    },
  },

  [stop.DAREBIN]: {
    suburban: {
      parent: "vic:rail:DBN",
      platforms: {
        [position.PLATFORM_1]: ["13752"],
        [position.PLATFORM_2]: ["13753"],
      },
      replacementBus: ["26150"],
    },
  },

  [stop.DARLING]: {
    suburban: {
      parent: "vic:rail:DLG",
      platforms: {
        [position.PLATFORM_1]: ["8272"],
        [position.PLATFORM_2]: ["8691"],
      },
    },
  },

  [stop.DEER_PARK]: {
    regional: {
      parent: "vic:rail:DEK",
      general: ["19982"],
    },
  },

  [stop.DENNIS]: {
    suburban: {
      parent: "vic:rail:DEN",
      platforms: {
        [position.PLATFORM_1]: ["13746"],
        [position.PLATFORM_2]: ["13747"],
      },
      replacementBus: ["26152"],
    },
  },

  [stop.DIAMOND_CREEK]: {
    suburban: {
      parent: "vic:rail:DCK",
      platforms: {
        [position.PLATFORM_1]: ["15334"],
        [position.PLATFORM_2]: ["15335"],
      },
      replacementBus: ["26153"],
    },
  },

  [stop.DIGGERS_REST]: {
    suburban: {
      parent: "vic:rail:DRT",
      platforms: {
        [position.PLATFORM_1]: ["26505"],
        [position.PLATFORM_2]: ["15354"],
      },
      replacementBus: ["26154"],
    },
  },

  [stop.DINGEE]: {
    regional: {
      parent: "vic:rail:DGE",
      general: ["20306"],
    },
  },

  [stop.DONNYBROOK]: {
    regional: {
      parent: "vic:rail:DBK",
      general: ["20307"],
    },
  },

  [stop.DROUIN]: {
    regional: {
      parent: "vic:rail:DRN",
      general: ["20308"],
    },
  },

  [stop.EAGLEHAWK]: {
    regional: {
      parent: "vic:rail:EHK",
      general: ["20309"],
    },
  },

  [stop.EAGLEMONT]: {
    suburban: {
      parent: "vic:rail:EAG",
      platforms: {
        [position.PLATFORM_1]: ["13756"],
        [position.PLATFORM_2]: ["13757"],
      },
      replacementBus: ["26155"],
    },
  },

  [stop.EAST_CAMBERWELL]: {
    suburban: {
      parent: "vic:rail:ECM",
      platforms: {
        [position.PLATFORM_1]: ["12206"],
        [position.PLATFORM_2]: ["12207"],
        [position.PLATFORM_3]: ["12208"],
      },
      replacementBus: ["26156"],
    },
  },

  [stop.EAST_MALVERN]: {
    suburban: {
      parent: "vic:rail:EMV",
      platforms: {
        [position.PLATFORM_1]: ["8705"],
        [position.PLATFORM_2]: ["8718"],
      },
    },
  },

  [stop.EAST_PAKENHAM]: {
    suburban: {
      parent: "vic:rail:EPH",
      platforms: {
        [position.PLATFORM_1]: ["26506"],
        [position.PLATFORM_2]: ["26507"],
      },
      replacementBus: ["26158"],
    },
  },

  [stop.EAST_RICHMOND]: {
    suburban: {
      parent: "vic:rail:ERM",
      platforms: {
        [position.PLATFORM_1]: ["12251"],
        [position.PLATFORM_2]: ["12252"],
      },
      replacementBus: ["26159"],
    },
  },

  [stop.ECHUCA]: {
    regional: {
      parent: "vic:rail:ECH",
      general: ["20310"],
    },
  },

  [stop.EDITHVALE]: {
    suburban: {
      parent: "vic:rail:EDI",
      platforms: {
        [position.PLATFORM_1]: ["11232"],
        [position.PLATFORM_2]: ["11233"],
      },
      replacementBus: ["26160"],
    },
  },

  [stop.ELMORE]: {
    regional: {
      parent: "vic:rail:EME",
      general: ["20311"],
    },
  },

  [stop.ELSTERNWICK]: {
    suburban: {
      parent: "vic:rail:ELS",
      platforms: {
        [position.PLATFORM_1]: ["14283"],
        [position.PLATFORM_2]: ["14284"],
      },
      replacementBus: ["26161"],
    },
  },

  [stop.ELTHAM]: {
    suburban: {
      parent: "vic:rail:ELT",
      platforms: {
        [position.PLATFORM_1]: ["15332"],
        [position.PLATFORM_2]: ["15333"],
      },
      replacementBus: ["26162"],
    },
  },

  [stop.EPPING]: {
    suburban: {
      parent: "vic:rail:EPP",
      platforms: {
        [position.PLATFORM_1]: ["15366"],
        [position.PLATFORM_2]: ["15367"],
      },
      replacementBus: ["26163"],
    },
  },

  [stop.EPSOM]: {
    regional: {
      parent: "vic:rail:EPM",
      general: ["47642"],
    },
  },

  [stop.ESSENDON]: {
    suburban: {
      parent: "vic:rail:ESD",
      general: ["22253"],
      platforms: {
        [position.PLATFORM_1]: ["15543"],
        [position.PLATFORM_2]: ["15544"],
        [position.PLATFORM_3]: ["15545"],
      },
      replacementBus: ["26164"],
    },
    regional: {
      parent: "vic:rail:ESD",
      general: ["22253", "15543", "15544", "15545"],
      replacementBus: ["26164"],
    },
  },

  [stop.EUROA]: {
    regional: {
      parent: "vic:rail:EOA",
      general: ["20312"],
    },
  },

  [stop.FAIRFIELD]: {
    suburban: {
      parent: "vic:rail:FFD",
      platforms: {
        [position.PLATFORM_1]: ["13748"],
        [position.PLATFORM_2]: ["13749"],
      },
      replacementBus: ["26165"],
    },
  },

  [stop.FAWKNER]: {
    suburban: {
      parent: "vic:rail:FAK",
      platforms: {
        [position.PLATFORM_1]: ["14302"],
        [position.PLATFORM_2]: ["14303"],
      },
    },
  },

  [stop.FERNTREE_GULLY]: {
    suburban: {
      parent: "vic:rail:FTG",
      platforms: {
        [position.PLATFORM_1]: ["11247"],
        [position.PLATFORM_2]: ["11248"],
      },
    },
  },

  [stop.FLAGSTAFF]: {
    suburban: {
      parent: "vic:rail:FGS",
      platforms: {
        [position.PLATFORM_1]: ["10920"],
        [position.PLATFORM_2]: ["10921"],
        [position.PLATFORM_3]: ["12195"],
        [position.PLATFORM_4]: ["12196"],
      },
      replacementBus: ["26168"],
    },
  },

  [stop.FLEMINGTON_BRIDGE]: {
    suburban: {
      parent: "vic:rail:FBD",
      platforms: {
        [position.PLATFORM_1]: ["14320"],
        [position.PLATFORM_2]: ["14321"],
      },
    },
  },

  [stop.FLEMINGTON_RACECOURSE]: {
    suburban: {
      parent: "vic:rail:RCE",
      platforms: {
        [position.PLATFORM_1]: ["15524"],
        [position.PLATFORM_2]: ["15525"],
      },
      replacementBus: ["26322"],
    },
  },

  [stop.FLINDERS_STREET]: {
    suburban: {
      parent: "vic:rail:FSS",
      general: ["22238"],
      platforms: {
        [position.PLATFORM_1]: ["11212"],
        [position.PLATFORM_2]: ["11213"],
        [position.PLATFORM_3]: ["11214"],
        [position.PLATFORM_4]: ["11215"],
        [position.PLATFORM_5]: ["11216"],
        [position.PLATFORM_6]: ["11217"],
        [position.PLATFORM_7]: ["11218"],
        [position.PLATFORM_8]: ["12205"],
        [position.PLATFORM_9]: ["12204"],
        [position.PLATFORM_10]: ["12203"],
        [position.PLATFORM_12]: ["12202"],
        [position.PLATFORM_13]: ["12201"],
      },
      replacementBus: ["26170"],
    },
    regional: {
      parent: "vic:rail:FSS",
      general: [
        "22238",
        "11212",
        "11213",
        "11214",
        "11215",
        "11216",
        "11217",
        "11218",
        "12205",
        "12204",
        "12203",
        "12202",
        "12201",
      ],
      replacementBus: ["26170"],
    },
  },

  [stop.FOOTSCRAY]: {
    suburban: {
      parent: "vic:rail:FSY",
      general: ["22240"],
      platforms: {
        [position.PLATFORM_1]: ["15518"],
        [position.PLATFORM_2]: ["15519"],
        [position.PLATFORM_3]: ["15520"],
        [position.PLATFORM_4]: ["15521"],
        [position.PLATFORM_5]: ["26508"],
        [position.PLATFORM_6]: ["26509"],
      },
      replacementBus: ["26171"],
    },
    regional: {
      parent: "vic:rail:FSY",
      general: ["22240", "15518", "15519", "15520", "15521", "26508", "26509"],
      replacementBus: ["26171"],
    },
  },

  [stop.FRANKSTON]: {
    suburban: {
      parent: "vic:rail:FKN",
      platforms: {
        [position.PLATFORM_1]: ["11220"],
        [position.PLATFORM_2]: ["11221"],
        [position.PLATFORM_3]: ["26510"],
      },
      replacementBus: ["26172"],
    },
  },

  [stop.GARDENVALE]: {
    suburban: {
      parent: "vic:rail:GVE",
      platforms: {
        [position.PLATFORM_1]: ["14281"],
        [position.PLATFORM_2]: ["14282"],
      },
    },
  },

  [stop.GARDINER]: {
    suburban: {
      parent: "vic:rail:GAR",
      platforms: {
        [position.PLATFORM_1]: ["12269"],
        [position.PLATFORM_2]: ["5804"],
      },
    },
  },

  [stop.GARFIELD]: {
    regional: {
      parent: "vic:rail:GFD",
      general: ["20313"],
    },
  },

  [stop.GEELONG]: {
    regional: {
      parent: "vic:rail:GEL",
      general: ["20314"],
    },
  },

  [stop.GINIFER]: {
    suburban: {
      parent: "vic:rail:GIN",
      general: ["22242"],
      platforms: {
        [position.PLATFORM_1]: ["15362"],
        [position.PLATFORM_2]: ["15363"],
      },
      replacementBus: ["26175"],
    },
  },

  [stop.GISBORNE]: {
    regional: {
      parent: "vic:rail:GIS",
      general: ["20315"],
    },
  },

  [stop.GLEN_HUNTLY]: {
    suburban: {
      parent: "vic:rail:GHY",
      platforms: {
        [position.PLATFORM_1]: ["14248"],
        [position.PLATFORM_2]: ["14249"],
        [position.PLATFORM_3]: ["14250"],
      },
      replacementBus: ["26180"],
    },
  },

  [stop.GLEN_IRIS]: {
    suburban: {
      parent: "vic:rail:GIR",
      platforms: {
        [position.PLATFORM_1]: ["5966"],
        [position.PLATFORM_2]: ["8266"],
      },
    },
  },

  [stop.GLEN_WAVERLEY]: {
    suburban: {
      parent: "vic:rail:GWY",
      platforms: {
        [position.PLATFORM_1]: ["12158"],
        [position.PLATFORM_2]: ["12159"],
      },
      replacementBus: ["26177"],
    },
  },

  [stop.GLENBERVIE]: {
    suburban: {
      parent: "vic:rail:GBV",
      platforms: {
        [position.PLATFORM_1]: ["15541"],
        [position.PLATFORM_2]: ["15542"],
      },
      replacementBus: ["26178"],
    },
  },

  [stop.GLENFERRIE]: {
    suburban: {
      parent: "vic:rail:GFE",
      platforms: {
        [position.PLATFORM_1]: ["12241"],
        [position.PLATFORM_2]: ["12242"],
        [position.PLATFORM_3]: ["12243"],
      },
      replacementBus: ["26179"],
    },
  },

  [stop.GLENROY]: {
    suburban: {
      parent: "vic:rail:GRY",
      platforms: {
        [position.PLATFORM_1]: ["15533"],
        [position.PLATFORM_2]: ["15534"],
      },
      replacementBus: ["26181"],
    },
  },

  [stop.GOORNONG]: {
    regional: {
      parent: "vic:rail:GRG",
      general: ["51809"],
    },
  },

  [stop.GOWRIE]: {
    suburban: {
      parent: "vic:rail:GOW",
      platforms: {
        [position.PLATFORM_1]: ["14300"],
        [position.PLATFORM_2]: ["14301"],
      },
    },
  },

  [stop.GREENSBOROUGH]: {
    suburban: {
      parent: "vic:rail:GRN",
      platforms: {
        [position.PLATFORM_1]: ["15329"],
        [position.PLATFORM_2]: ["15330"],
      },
      replacementBus: ["26183"],
    },
  },

  [stop.HALLAM]: {
    suburban: {
      parent: "vic:rail:HLM",
      platforms: {
        [position.PLATFORM_1]: ["12182"],
        [position.PLATFORM_2]: ["12183"],
      },
      replacementBus: ["26184"],
    },
  },

  [stop.HAMPTON]: {
    suburban: {
      parent: "vic:rail:HAM",
      platforms: {
        [position.PLATFORM_1]: ["14272"],
        [position.PLATFORM_2]: ["14273"],
      },
      replacementBus: ["26185"],
    },
  },

  [stop.HARTWELL]: {
    suburban: {
      parent: "vic:rail:HWL",
      platforms: {
        [position.PLATFORM_1]: ["11202"],
        [position.PLATFORM_2]: ["11201"],
      },
      replacementBus: ["26186"],
    },
  },

  [stop.HASTINGS]: {
    suburban: {
      parent: "vic:rail:HST",
      platforms: {
        [position.PLATFORM_1]: ["3580"],
      },
    },
  },

  [stop.HAWKSBURN]: {
    suburban: {
      parent: "vic:rail:HKN",
      platforms: {
        [position.PLATFORM_1]: ["14267"],
        [position.PLATFORM_2]: ["14268"],
      },
    },
  },

  [stop.HAWKSTOWE]: {
    suburban: {
      parent: "vic:rail:HWS",
      platforms: {
        [position.PLATFORM_1]: ["26511"],
        [position.PLATFORM_2]: ["26512"],
      },
      replacementBus: ["26189"],
    },
  },

  [stop.HAWTHORN]: {
    suburban: {
      parent: "vic:rail:HAW",
      platforms: {
        [position.PLATFORM_1]: ["12244"],
        [position.PLATFORM_2]: ["12245"],
        [position.PLATFORM_3]: ["12246"],
      },
      replacementBus: ["26190"],
    },
  },

  [stop.HEATHCOTE_JUNCTION]: {
    regional: {
      parent: "vic:rail:HCJ",
      general: ["20316"],
    },
  },

  [stop.HEATHERDALE]: {
    suburban: {
      parent: "vic:rail:HTD",
      platforms: {
        [position.PLATFORM_1]: ["12234"],
        [position.PLATFORM_2]: ["12233"],
      },
      replacementBus: ["26191"],
    },
  },

  [stop.HEATHMONT]: {
    suburban: {
      parent: "vic:rail:HMT",
      platforms: {
        [position.PLATFORM_1]: ["11412"],
        [position.PLATFORM_2]: ["11413"],
      },
    },
  },

  [stop.HEIDELBERG]: {
    suburban: {
      parent: "vic:rail:HDB",
      platforms: {
        [position.PLATFORM_1]: ["13758"],
        [position.PLATFORM_2]: ["13759"],
      },
      replacementBus: ["26193"],
    },
  },

  [stop.HEYINGTON]: {
    suburban: {
      parent: "vic:rail:HEY",
      platforms: {
        [position.PLATFORM_1]: ["12263"],
        [position.PLATFORM_2]: ["12264"],
      },
      replacementBus: ["26194"],
    },
  },

  [stop.HIGHETT]: {
    suburban: {
      parent: "vic:rail:HIG",
      platforms: {
        [position.PLATFORM_1]: ["11471"],
        [position.PLATFORM_2]: ["14232"],
      },
      replacementBus: ["26195"],
    },
  },

  [stop.HOLMESGLEN]: {
    suburban: {
      parent: "vic:rail:HOL",
      platforms: {
        [position.PLATFORM_1]: ["8763"],
        [position.PLATFORM_2]: ["8766"],
      },
    },
  },

  [stop.HOPPERS_CROSSING]: {
    suburban: {
      parent: "vic:rail:HCG",
      platforms: {
        [position.PLATFORM_1]: ["13734"],
        [position.PLATFORM_2]: ["13735"],
      },
      replacementBus: ["26197"],
    },
  },

  [stop.HUGHESDALE]: {
    suburban: {
      parent: "vic:rail:HUG",
      platforms: {
        [position.PLATFORM_1]: ["13725"],
        [position.PLATFORM_2]: ["13726"],
      },
      replacementBus: ["26198"],
    },
  },

  [stop.HUNTINGDALE]: {
    suburban: {
      parent: "vic:rail:HUN",
      platforms: {
        [position.PLATFORM_1]: ["13720"],
        [position.PLATFORM_2]: ["13721"],
      },
      replacementBus: ["26199"],
    },
  },

  [stop.HUNTLY]: {
    regional: {
      parent: "vic:rail:HUY",
      general: ["49296"],
    },
  },

  [stop.HURSTBRIDGE]: {
    suburban: {
      parent: "vic:rail:HBE",
      platforms: {
        [position.PLATFORM_1]: ["15337"],
      },
      replacementBus: ["26200"],
    },
  },

  [stop.IVANHOE]: {
    suburban: {
      parent: "vic:rail:IVA",
      platforms: {
        [position.PLATFORM_1]: ["13754"],
        [position.PLATFORM_2]: ["13755"],
      },
      replacementBus: ["26201"],
    },
  },

  [stop.JACANA]: {
    suburban: {
      parent: "vic:rail:JAC",
      platforms: {
        [position.PLATFORM_1]: ["15531"],
        [position.PLATFORM_2]: ["15532"],
      },
      replacementBus: ["26202"],
    },
  },

  [stop.JEWELL]: {
    suburban: {
      parent: "vic:rail:JWL",
      platforms: {
        [position.PLATFORM_1]: ["14316"],
        [position.PLATFORM_2]: ["14317"],
      },
    },
  },

  [stop.JOLIMONT]: {
    suburban: {
      parent: "vic:rail:JLI",
      platforms: {
        [position.PLATFORM_1]: ["14340"],
        [position.PLATFORM_2]: ["14341"],
      },
      replacementBus: ["26204"],
    },
  },

  [stop.JORDANVILLE]: {
    suburban: {
      parent: "vic:rail:JOR",
      platforms: {
        [position.PLATFORM_1]: ["10117"],
        [position.PLATFORM_2]: ["11219"],
      },
    },
  },

  [stop.KANANOOK]: {
    suburban: {
      parent: "vic:rail:KAN",
      platforms: {
        [position.PLATFORM_1]: ["11222"],
        [position.PLATFORM_2]: ["11223"],
      },
      replacementBus: ["26206"],
    },
  },

  [stop.KANGAROO_FLAT]: {
    regional: {
      parent: "vic:rail:KFT",
      general: ["20317"],
    },
  },

  [stop.KEILOR_PLAINS]: {
    suburban: {
      parent: "vic:rail:KPL",
      platforms: {
        [position.PLATFORM_1]: ["15358"],
        [position.PLATFORM_2]: ["15359"],
      },
      replacementBus: ["26207"],
    },
  },

  [stop.KENSINGTON]: {
    suburban: {
      parent: "vic:rail:KEN",
      platforms: {
        [position.PLATFORM_1]: ["15552"],
        [position.PLATFORM_2]: ["15553"],
      },
      replacementBus: ["26208"],
    },
  },

  [stop.KEON_PARK]: {
    suburban: {
      parent: "vic:rail:KPK",
      platforms: {
        [position.PLATFORM_1]: ["15371"],
        [position.PLATFORM_2]: ["15372"],
      },
      replacementBus: ["26209"],
    },
  },

  [stop.KERANG]: {
    regional: {
      parent: "vic:rail:KER",
      general: ["20318"],
    },
  },

  [stop.KILMORE_EAST]: {
    regional: {
      parent: "vic:rail:KET",
      general: ["20319"],
    },
  },

  [stop.KOOYONG]: {
    suburban: {
      parent: "vic:rail:KYG",
      platforms: {
        [position.PLATFORM_1]: ["12265"],
        [position.PLATFORM_2]: ["12266"],
      },
    },
  },

  [stop.KYNETON]: {
    regional: {
      parent: "vic:rail:KYN",
      general: ["20320"],
    },
  },

  [stop.LABURNUM]: {
    suburban: {
      parent: "vic:rail:LAB",
      platforms: {
        [position.PLATFORM_1]: ["12225"],
        [position.PLATFORM_2]: ["12224"],
      },
      replacementBus: ["26211"],
    },
  },

  [stop.LALOR]: {
    suburban: {
      parent: "vic:rail:LAL",
      platforms: {
        [position.PLATFORM_1]: ["15368"],
        [position.PLATFORM_2]: ["15369"],
      },
      replacementBus: ["26212"],
    },
  },

  [stop.LARA]: {
    regional: {
      parent: "vic:rail:LRA",
      general: ["20321"],
    },
  },

  [stop.LAVERTON]: {
    suburban: {
      parent: "vic:rail:LAV",
      platforms: {
        [position.PLATFORM_1]: ["13736"],
        [position.PLATFORM_2]: ["13737"],
        [position.PLATFORM_3]: ["26513"],
      },
      replacementBus: ["26213"],
    },
  },

  [stop.LEAWARRA]: {
    suburban: {
      parent: "vic:rail:LWA",
      platforms: {
        [position.PLATFORM_1]: ["7878"],
      },
    },
  },

  [stop.LILYDALE]: {
    suburban: {
      parent: "vic:rail:LIL",
      platforms: {
        [position.PLATFORM_1]: ["12164"],
        [position.PLATFORM_2]: ["12165"],
      },
    },
  },

  [stop.LITTLE_RIVER]: {
    regional: {
      parent: "vic:rail:LRR",
      general: ["20323"],
    },
  },

  [stop.LONGWARRY]: {
    regional: {
      parent: "vic:rail:LWY",
      general: ["20324"],
    },
  },

  [stop.LYNBROOK]: {
    suburban: {
      parent: "vic:rail:LBK",
      platforms: {
        [position.PLATFORM_1]: ["26514"],
        [position.PLATFORM_2]: ["26515"],
      },
      replacementBus: ["26216"],
    },
  },

  [stop.MACAULAY]: {
    suburban: {
      parent: "vic:rail:MAC",
      platforms: {
        [position.PLATFORM_1]: ["14322"],
        [position.PLATFORM_2]: ["14323"],
      },
    },
  },

  [stop.MACEDON]: {
    regional: {
      parent: "vic:rail:MDN",
      general: ["20325"],
    },
  },

  [stop.MACLEOD]: {
    suburban: {
      parent: "vic:rail:MCD",
      platforms: {
        [position.PLATFORM_1]: ["15326"],
        [position.PLATFORM_2]: ["15325"],
        [position.PLATFORM_3]: ["15324"],
      },
      replacementBus: ["26218"],
    },
  },

  [stop.MALMSBURY]: {
    regional: {
      parent: "vic:rail:MBY",
      general: ["20326"],
    },
  },

  [stop.MALVERN]: {
    suburban: {
      parent: "vic:rail:MAL",
      platforms: {
        [position.PLATFORM_1]: ["14255"],
        [position.PLATFORM_2]: ["14256"],
        [position.PLATFORM_3]: ["14257"],
        [position.PLATFORM_4]: ["14258"],
      },
      replacementBus: ["26219"],
    },
  },

  [stop.MARSHALL]: {
    regional: {
      parent: "vic:rail:MAS",
      general: ["20327"],
    },
  },

  [stop.MARYBOROUGH]: {
    regional: {
      parent: "vic:rail:MYB",
      general: ["44953"],
    },
  },

  [stop.MCKINNON]: {
    suburban: {
      parent: "vic:rail:MCK",
      platforms: {
        [position.PLATFORM_1]: ["14242"],
        [position.PLATFORM_2]: ["14243"],
        [position.PLATFORM_3]: ["14244"],
      },
      replacementBus: ["26220"],
    },
  },

  [stop.MELBOURNE_CENTRAL]: {
    suburban: {
      parent: "vic:rail:MCE",
      platforms: {
        [position.PLATFORM_1]: ["10922"],
        [position.PLATFORM_2]: ["10923"],
        [position.PLATFORM_3]: ["12197"],
        [position.PLATFORM_4]: ["12198"],
      },
      replacementBus: ["26221"],
    },
  },

  [stop.MELTON]: {
    regional: {
      parent: "vic:rail:MEL",
      general: ["19980"],
    },
  },

  [stop.MENTONE]: {
    suburban: {
      parent: "vic:rail:MEN",
      platforms: {
        [position.PLATFORM_1]: ["11240"],
        [position.PLATFORM_2]: ["11241"],
      },
      replacementBus: ["26222"],
    },
  },

  [stop.MERINDA_PARK]: {
    suburban: {
      parent: "vic:rail:MPK",
      platforms: {
        [position.PLATFORM_1]: ["12186"],
        [position.PLATFORM_2]: ["26516"],
      },
      replacementBus: ["26223"],
    },
  },

  [stop.MERLYNSTON]: {
    suburban: {
      parent: "vic:rail:MYN",
      platforms: {
        [position.PLATFORM_1]: ["14304"],
        [position.PLATFORM_2]: ["14305"],
      },
    },
  },

  [stop.MERNDA]: {
    suburban: {
      parent: "vic:rail:MDD",
      platforms: {
        [position.PLATFORM_1]: ["26517"],
        [position.PLATFORM_2]: ["26518"],
      },
      replacementBus: ["26225"],
    },
  },

  [stop.MERRI]: {
    suburban: {
      parent: "vic:rail:MER",
      platforms: {
        [position.PLATFORM_1]: ["15389"],
        [position.PLATFORM_2]: ["15390"],
      },
      replacementBus: ["26226"],
    },
  },

  [stop.MIDDLE_BRIGHTON]: {
    suburban: {
      parent: "vic:rail:MBN",
      platforms: {
        [position.PLATFORM_1]: ["14277"],
        [position.PLATFORM_2]: ["14278"],
      },
      replacementBus: ["26227"],
    },
  },

  [stop.MIDDLE_FOOTSCRAY]: {
    suburban: {
      parent: "vic:rail:MFY",
      platforms: {
        [position.PLATFORM_1]: ["15516"],
        [position.PLATFORM_2]: ["15517"],
      },
      replacementBus: ["26228"],
    },
  },

  [stop.MIDDLE_GORGE]: {
    suburban: {
      parent: "vic:rail:MMR",
      platforms: {
        [position.PLATFORM_1]: ["26519"],
        [position.PLATFORM_2]: ["26520"],
      },
      replacementBus: ["26229"],
    },
  },

  [stop.MITCHAM]: {
    suburban: {
      parent: "vic:rail:MCH",
      platforms: {
        [position.PLATFORM_1]: ["12232"],
        [position.PLATFORM_2]: ["12231"],
      },
      replacementBus: ["26230"],
    },
  },

  [stop.MOE]: {
    regional: {
      parent: "vic:rail:MOE",
      general: ["20328"],
    },
  },

  [stop.MONTMORENCY]: {
    suburban: {
      parent: "vic:rail:MMY",
      platforms: {
        [position.PLATFORM_1]: ["15331"],
        [position.PLATFORM_2]: ["26521"],
      },
      replacementBus: ["26231"],
    },
  },

  [stop.MOONEE_PONDS]: {
    suburban: {
      parent: "vic:rail:MPD",
      platforms: {
        [position.PLATFORM_1]: ["15546"],
        [position.PLATFORM_2]: ["15547"],
      },
      replacementBus: ["26232"],
    },
  },

  [stop.MOORABBIN]: {
    suburban: {
      parent: "vic:rail:MRN",
      platforms: {
        [position.PLATFORM_1]: ["14233"],
        [position.PLATFORM_2]: ["14234"],
        [position.PLATFORM_3]: ["14235"],
      },
      replacementBus: ["26233"],
    },
  },

  [stop.MOOROOLBARK]: {
    suburban: {
      parent: "vic:rail:MLK",
      platforms: {
        [position.PLATFORM_1]: ["12166"],
        [position.PLATFORM_2]: ["12167"],
      },
    },
  },

  [stop.MOOROOPNA]: {
    regional: {
      parent: "vic:rail:MPA",
      general: ["20329"],
    },
  },

  [stop.MORDIALLOC]: {
    suburban: {
      parent: "vic:rail:MOR",
      platforms: {
        [position.PLATFORM_1]: ["11236"],
        [position.PLATFORM_2]: ["11237"],
      },
      replacementBus: ["26235"],
    },
  },

  [stop.MORELAND]: {
    suburban: {
      parent: "vic:rail:MLD",
      platforms: {
        [position.PLATFORM_1]: ["14310"],
        [position.PLATFORM_2]: ["14311"],
      },
    },
  },

  [stop.MORRADOO]: {
    suburban: {
      parent: "vic:rail:MRO",
      platforms: {
        [position.PLATFORM_1]: ["2155"],
      },
    },
  },

  [stop.MORWELL]: {
    regional: {
      parent: "vic:rail:MWL",
      general: ["20330"],
    },
  },

  [stop.MOUNT_WAVERLEY]: {
    suburban: {
      parent: "vic:rail:MWY",
      platforms: {
        [position.PLATFORM_1]: ["12162"],
        [position.PLATFORM_2]: ["12163"],
      },
      replacementBus: ["26238"],
    },
  },

  [stop.MURCHISON_EAST]: {
    regional: {
      parent: "vic:rail:MST",
      general: ["20331"],
    },
  },

  [stop.MURRUMBEENA]: {
    suburban: {
      parent: "vic:rail:MRB",
      platforms: {
        [position.PLATFORM_1]: ["13727"],
        [position.PLATFORM_2]: ["13728"],
      },
      replacementBus: ["26239"],
    },
  },

  [stop.NAGAMBIE]: {
    regional: {
      parent: "vic:rail:NGE",
      general: ["20332"],
    },
  },

  [stop.NAR_NAR_GOON]: {
    regional: {
      parent: "vic:rail:NNG",
      general: ["20333"],
    },
  },

  [stop.NARRE_WARREN]: {
    suburban: {
      parent: "vic:rail:NWA",
      platforms: {
        [position.PLATFORM_1]: ["12180"],
        [position.PLATFORM_2]: ["12181"],
      },
      replacementBus: ["26240"],
    },
  },

  [stop.NEWMARKET]: {
    suburban: {
      parent: "vic:rail:NKT",
      platforms: {
        [position.PLATFORM_1]: ["15550"],
        [position.PLATFORM_2]: ["15551"],
      },
      replacementBus: ["26241"],
    },
  },

  [stop.NEWPORT]: {
    suburban: {
      parent: "vic:rail:NPT",
      general: ["22245"],
      platforms: {
        [position.PLATFORM_1]: ["15343"],
        [position.PLATFORM_2]: ["15344"],
      },
      replacementBus: ["26242"],
    },
  },

  [stop.NOBLE_PARK]: {
    suburban: {
      parent: "vic:rail:NPK",
      platforms: {
        [position.PLATFORM_1]: ["12192"],
        [position.PLATFORM_2]: ["12193"],
      },
      replacementBus: ["26243"],
    },
  },

  [stop.NORTH_BRIGHTON]: {
    suburban: {
      parent: "vic:rail:NBN",
      platforms: {
        [position.PLATFORM_1]: ["14279"],
        [position.PLATFORM_2]: ["14280"],
      },
      replacementBus: ["26244"],
    },
  },

  [stop.NORTH_GEELONG]: {
    regional: {
      parent: "vic:rail:NGL",
      general: ["20334"],
    },
  },

  [stop.NORTH_MELBOURNE]: {
    suburban: {
      parent: "vic:rail:NME",
      platforms: {
        [position.PLATFORM_1]: ["14324"],
        [position.PLATFORM_2]: ["14325"],
        [position.PLATFORM_3]: ["14326"],
        [position.PLATFORM_4]: ["14327"],
        [position.PLATFORM_5]: ["14328"],
        [position.PLATFORM_6]: ["14329"],
      },
      replacementBus: ["26245"],
    },
    regional: {
      parent: "vic:rail:NME",
      general: ["22239"],
      replacementBus: ["26245"],
    },
  },

  [stop.NORTH_RICHMOND]: {
    suburban: {
      parent: "vic:rail:NRM",
      platforms: {
        [position.PLATFORM_1]: ["14336"],
        [position.PLATFORM_2]: ["14337"],
      },
      replacementBus: ["26246"],
    },
  },

  [stop.NORTH_SHORE]: {
    regional: {
      parent: "vic:rail:NSH",
      general: ["20335"],
    },
  },

  [stop.NORTH_WILLIAMSTOWN]: {
    suburban: {
      parent: "vic:rail:NWN",
      platforms: {
        [position.PLATFORM_1]: ["15341"],
        [position.PLATFORM_2]: ["15342"],
      },
      replacementBus: ["26247"],
    },
  },

  [stop.NORTHCOTE]: {
    suburban: {
      parent: "vic:rail:NCE",
      platforms: {
        [position.PLATFORM_1]: ["15387"],
        [position.PLATFORM_2]: ["15388"],
      },
      replacementBus: ["26248"],
    },
  },

  [stop.NUNAWADING]: {
    suburban: {
      parent: "vic:rail:NWG",
      platforms: {
        [position.PLATFORM_1]: ["12230"],
        [position.PLATFORM_2]: ["12229"],
      },
      replacementBus: ["26249"],
    },
  },

  [stop.OAK_PARK]: {
    suburban: {
      parent: "vic:rail:OKP",
      platforms: {
        [position.PLATFORM_1]: ["15535"],
        [position.PLATFORM_2]: ["15536"],
      },
      replacementBus: ["26250"],
    },
  },

  [stop.OAKLEIGH]: {
    suburban: {
      parent: "vic:rail:OAK",
      platforms: {
        [position.PLATFORM_1]: ["13722"],
        [position.PLATFORM_2]: ["13723"],
      },
      replacementBus: ["26251"],
    },
  },

  [stop.OFFICER]: {
    suburban: {
      parent: "vic:rail:OFC",
      platforms: {
        [position.PLATFORM_1]: ["12174"],
        [position.PLATFORM_2]: ["12175"],
      },
      replacementBus: ["26252"],
    },
  },

  [stop.ORMOND]: {
    suburban: {
      parent: "vic:rail:OMD",
      platforms: {
        [position.PLATFORM_1]: ["14245"],
        [position.PLATFORM_2]: ["14246"],
        [position.PLATFORM_3]: ["14247"],
      },
      replacementBus: ["26253"],
    },
  },

  [stop.PAKENHAM]: {
    suburban: {
      parent: "vic:rail:PKM",
      platforms: {
        [position.PLATFORM_1]: ["12172"],
        [position.PLATFORM_2]: ["12173"],
      },
      replacementBus: ["26254"],
    },
    regional: {
      parent: "vic:rail:PKM",
      general: ["22252"],
      replacementBus: ["26254"],
    },
  },

  [stop.PARKDALE]: {
    suburban: {
      parent: "vic:rail:PKD",
      platforms: {
        [position.PLATFORM_1]: ["11238"],
        [position.PLATFORM_2]: ["11239"],
      },
      replacementBus: ["26255"],
    },
  },

  [stop.PARKVILLE]: {
    suburban: {
      parent: "vic:rail:PKV",
      platforms: {
        [position.PLATFORM_1]: ["26550"],
        [position.PLATFORM_2]: ["26551"],
      },
      replacementBus: ["126324"],
    },
  },

  [stop.PARLIAMENT]: {
    suburban: {
      parent: "vic:rail:PAR",
      platforms: {
        [position.PLATFORM_1]: ["10924"],
        [position.PLATFORM_2]: ["11210"],
        [position.PLATFORM_3]: ["12199"],
        [position.PLATFORM_4]: ["12200"],
      },
      replacementBus: ["26256"],
    },
  },

  [stop.PASCOE_VALE]: {
    suburban: {
      parent: "vic:rail:PVL",
      platforms: {
        [position.PLATFORM_1]: ["15537"],
        [position.PLATFORM_2]: ["15538"],
      },
      replacementBus: ["26257"],
    },
  },

  [stop.PATTERSON]: {
    suburban: {
      parent: "vic:rail:PAT",
      platforms: {
        [position.PLATFORM_1]: ["14236"],
        [position.PLATFORM_2]: ["14237"],
        [position.PLATFORM_3]: ["14238"],
      },
      replacementBus: ["26258"],
    },
  },

  [stop.PRAHRAN]: {
    suburban: {
      parent: "vic:rail:PRA",
      platforms: {
        [position.PLATFORM_1]: ["14291"],
        [position.PLATFORM_2]: ["14292"],
      },
      replacementBus: ["26259"],
    },
  },

  [stop.PRESTON]: {
    suburban: {
      parent: "vic:rail:PRE",
      platforms: {
        [position.PLATFORM_1]: ["15379"],
        [position.PLATFORM_2]: ["15380"],
      },
      replacementBus: ["26260"],
    },
  },

  [stop.PYRAMID]: {
    regional: {
      parent: "vic:rail:PYD",
      general: ["20336"],
    },
  },

  [stop.RAYWOOD]: {
    regional: {
      parent: "vic:rail:RAY",
      general: ["49295"],
    },
  },

  [stop.REGENT]: {
    suburban: {
      parent: "vic:rail:REG",
      platforms: {
        [position.PLATFORM_1]: ["15377"],
        [position.PLATFORM_2]: ["15378"],
      },
      replacementBus: ["26261"],
    },
  },

  [stop.RESERVOIR]: {
    suburban: {
      parent: "vic:rail:RES",
      platforms: {
        [position.PLATFORM_1]: ["15375"],
        [position.PLATFORM_2]: ["15376"],
      },
      replacementBus: ["26262"],
    },
  },

  [stop.RICHMOND]: {
    suburban: {
      parent: "vic:rail:RMD",
      general: ["22247"],
      platforms: {
        [position.PLATFORM_1]: ["12253"],
        [position.PLATFORM_2]: ["12254"],
        [position.PLATFORM_3]: ["12255"],
        [position.PLATFORM_4]: ["12256"],
        [position.PLATFORM_5]: ["12257"],
        [position.PLATFORM_6]: ["12258"],
        [position.PLATFORM_7]: ["12259"],
        [position.PLATFORM_8]: ["12260"],
        [position.PLATFORM_9]: ["12261"],
        [position.PLATFORM_10]: ["12262"],
      },
      replacementBus: ["26263"],
    },
    regional: {
      parent: "vic:rail:RMD",
      general: [
        "22247",
        "12253",
        "12254",
        "12255",
        "12256",
        "12257",
        "12258",
        "12259",
        "12260",
        "12261",
        "12262",
      ],
      replacementBus: ["26263"],
    },
  },

  [stop.RIDDELLS_CREEK]: {
    regional: {
      parent: "vic:rail:RIK",
      general: ["20337"],
    },
  },

  [stop.RINGWOOD]: {
    suburban: {
      parent: "vic:rail:RWD",
      platforms: {
        [position.PLATFORM_1]: ["12236"],
        [position.PLATFORM_2]: ["12237"],
        [position.PLATFORM_3]: ["12235"],
      },
      replacementBus: ["26265"],
    },
  },

  [stop.RINGWOOD_EAST]: {
    suburban: {
      parent: "vic:rail:RWE",
      platforms: {
        [position.PLATFORM_1]: ["12170"],
        [position.PLATFORM_2]: ["12171"],
      },
    },
  },

  [stop.RIPPONLEA]: {
    suburban: {
      parent: "vic:rail:RIP",
      platforms: {
        [position.PLATFORM_1]: ["14285"],
        [position.PLATFORM_2]: ["14286"],
      },
      replacementBus: ["26266"],
    },
  },

  [stop.RIVERSDALE]: {
    suburban: {
      parent: "vic:rail:RIV",
      platforms: {
        [position.PLATFORM_1]: ["11205"],
        [position.PLATFORM_2]: ["11206"],
      },
      replacementBus: ["26267"],
    },
  },

  [stop.ROCHESTER]: {
    regional: {
      parent: "vic:rail:ROR",
      general: ["20338"],
    },
  },

  [stop.ROCKBANK]: {
    regional: {
      parent: "vic:rail:RBK",
      general: ["19981"],
    },
  },

  [stop.ROSANNA]: {
    suburban: {
      parent: "vic:rail:ROS",
      platforms: {
        [position.PLATFORM_1]: ["13760"],
        [position.PLATFORM_2]: ["15323"],
      },
      replacementBus: ["26268"],
    },
  },

  [stop.ROSEDALE]: {
    regional: {
      parent: "vic:rail:ROE",
      general: ["20339"],
    },
  },

  [stop.ROXBURGH_PARK]: {
    suburban: {
      parent: "vic:rail:RXP",
      platforms: {
        [position.PLATFORM_1]: ["40218"],
        [position.PLATFORM_2]: ["40219"],
      },
      replacementBus: ["26269"],
    },
  },

  [stop.ROYAL_PARK]: {
    suburban: {
      parent: "vic:rail:RPK",
      platforms: {
        [position.PLATFORM_1]: ["14318"],
        [position.PLATFORM_2]: ["14319"],
      },
    },
  },

  [stop.RUSHALL]: {
    suburban: {
      parent: "vic:rail:RUS",
      platforms: {
        [position.PLATFORM_1]: ["15391"],
        [position.PLATFORM_2]: ["15392"],
      },
      replacementBus: ["26271"],
    },
  },

  [stop.RUTHVEN]: {
    suburban: {
      parent: "vic:rail:RUT",
      platforms: {
        [position.PLATFORM_1]: ["15373"],
        [position.PLATFORM_2]: ["15374"],
      },
      replacementBus: ["26272"],
    },
  },

  [stop.SALE]: {
    regional: {
      parent: "vic:rail:SAE",
      general: ["20341"],
    },
  },

  [stop.SANDOWN_PARK]: {
    suburban: {
      parent: "vic:rail:SNP",
      platforms: {
        [position.PLATFORM_1]: ["12194"],
        [position.PLATFORM_2]: ["13713"],
      },
      replacementBus: ["26273"],
    },
  },

  [stop.SANDRINGHAM]: {
    suburban: {
      parent: "vic:rail:SHM",
      platforms: {
        [position.PLATFORM_1]: ["14271"],
      },
      replacementBus: ["26274"],
    },
  },

  [stop.SEAFORD]: {
    suburban: {
      parent: "vic:rail:SEA",
      platforms: {
        [position.PLATFORM_1]: ["11224"],
        [position.PLATFORM_2]: ["11225"],
      },
      replacementBus: ["26275"],
    },
  },

  [stop.SEAHOLME]: {
    suburban: {
      parent: "vic:rail:SHE",
      platforms: {
        [position.PLATFORM_1]: ["13743"],
      },
      replacementBus: ["26276"],
    },
  },

  [stop.SEDDON]: {
    suburban: {
      parent: "vic:rail:SEN",
      platforms: {
        [position.PLATFORM_1]: ["15349"],
        [position.PLATFORM_2]: ["15350"],
      },
      replacementBus: ["26277"],
    },
  },

  [stop.SEYMOUR]: {
    regional: {
      parent: "vic:rail:SER",
      general: ["20342"],
    },
  },

  [stop.SHEPPARTON]: {
    regional: {
      parent: "vic:rail:SNH",
      general: ["20343"],
    },
  },

  [stop.SHERWOOD_PARK]: {
    regional: {
      parent: "vic:rail:SDP",
      general: ["22257"],
    },
  },

  [stop.SHOWGROUNDS]: {
    suburban: {
      parent: "vic:rail:SGS",
      platforms: {
        [position.PLATFORM_1]: ["15526"],
      },
      replacementBus: ["726320"],
    },
  },

  [stop.SOMERVILLE]: {
    suburban: {
      parent: "vic:rail:SVE",
      platforms: {
        [position.PLATFORM_1]: ["5082"],
      },
    },
  },

  [stop.SOUTH_GEELONG]: {
    regional: {
      parent: "vic:rail:SOG",
      general: ["20344"],
    },
  },

  [stop.SOUTH_KENSINGTON]: {
    suburban: {
      parent: "vic:rail:SKN",
      platforms: {
        [position.PLATFORM_1]: ["15522"],
        [position.PLATFORM_2]: ["15523"],
      },
      replacementBus: ["26279"],
    },
  },

  [stop.SOUTH_MORANG]: {
    suburban: {
      parent: "vic:rail:SMG",
      platforms: {
        [position.PLATFORM_1]: ["26522"],
        [position.PLATFORM_2]: ["26523"],
      },
      replacementBus: ["26280"],
    },
  },

  [stop.SOUTH_YARRA]: {
    suburban: {
      parent: "vic:rail:SYR",
      platforms: {
        [position.PLATFORM_1]: ["14293"],
        [position.PLATFORM_2]: ["14294"],
        [position.PLATFORM_3]: ["14295"],
        [position.PLATFORM_4]: ["14296"],
        [position.PLATFORM_5]: ["14297"],
        [position.PLATFORM_6]: ["14298"],
      },
      replacementBus: ["26281"],
    },
  },

  [stop.SOUTHERN_CROSS]: {
    suburban: {
      parent: "vic:rail:SSS",
      platforms: {
        [position.PLATFORM_8]: ["22187"],
        [position.PLATFORM_9]: ["22188"],
        [position.PLATFORM_10]: ["22189"],
        [position.PLATFORM_11]: ["22190"],
        [position.PLATFORM_12]: ["22191"],
        [position.PLATFORM_13]: ["22192"],
        [position.PLATFORM_14]: ["22193"],
      },
    },
    regional: {
      parent: "vic:rail:SSS",
      general: ["20043"],
    },
  },

  [stop.SOUTHLAND]: {
    suburban: {
      parent: "vic:rail:SOU",
      platforms: {
        [position.PLATFORM_1]: ["26527"],
        [position.PLATFORM_2]: ["26528"],
      },
      replacementBus: ["26283"],
    },
  },

  [stop.SPOTSWOOD]: {
    suburban: {
      parent: "vic:rail:SPT",
      platforms: {
        [position.PLATFORM_1]: ["15345"],
        [position.PLATFORM_2]: ["15346"],
      },
      replacementBus: ["26284"],
    },
  },

  [stop.SPRINGHURST]: {
    regional: {
      parent: "vic:rail:SHT",
      general: ["22490"],
    },
  },

  [stop.SPRINGVALE]: {
    suburban: {
      parent: "vic:rail:SPG",
      platforms: {
        [position.PLATFORM_1]: ["13714"],
        [position.PLATFORM_2]: ["13715"],
      },
      replacementBus: ["26285"],
    },
  },

  [stop.ST_ALBANS]: {
    suburban: {
      parent: "vic:rail:SAB",
      general: ["22243"],
      platforms: {
        [position.PLATFORM_1]: ["15361"],
        [position.PLATFORM_2]: ["15360"],
      },
      replacementBus: ["26286"],
    },
  },

  [stop.STATE_LIBRARY]: {
    suburban: {
      parent: "vic:rail:STL",
      platforms: {
        [position.PLATFORM_1]: ["26552"],
        [position.PLATFORM_2]: ["26553"],
      },
    },
  },

  [stop.STONY_POINT]: {
    suburban: {
      parent: "vic:rail:STY",
      platforms: {
        [position.PLATFORM_1]: ["88"],
      },
    },
  },

  [stop.STRATFORD]: {
    regional: {
      parent: "vic:rail:STD",
      general: ["20346"],
    },
  },

  [stop.STRATHMORE]: {
    suburban: {
      parent: "vic:rail:SME",
      platforms: {
        [position.PLATFORM_1]: ["15539"],
        [position.PLATFORM_2]: ["15540"],
      },
      replacementBus: ["26288"],
    },
  },

  [stop.SUNBURY]: {
    suburban: {
      parent: "vic:rail:SUY",
      general: ["19998"],
      platforms: {
        [position.PLATFORM_1]: ["26529"],
        [position.PLATFORM_2]: ["15352"],
      },
      replacementBus: ["26289"],
    },
    regional: {
      parent: "vic:rail:SUY",
      general: ["19998", "15352", "26529"],
      replacementBus: ["26289"],
    },
  },

  [stop.SUNSHINE]: {
    suburban: {
      parent: "vic:rail:SUN",
      general: ["22241"],
      platforms: {
        [position.PLATFORM_1]: ["26530"],
        [position.PLATFORM_2]: ["26531"],
        [position.PLATFORM_3]: ["26532"],
        [position.PLATFORM_4]: ["26533"],
      },
      replacementBus: ["26290"],
    },
    regional: {
      parent: "vic:rail:SUN",
      general: ["22241", "26530", "26531", "26532", "26533"],
      replacementBus: ["26290"],
    },
  },

  [stop.SWAN_HILL]: {
    regional: {
      parent: "vic:rail:SWL",
      general: ["20347"],
    },
  },

  [stop.SYNDAL]: {
    suburban: {
      parent: "vic:rail:SYN",
      platforms: {
        [position.PLATFORM_1]: ["12160"],
        [position.PLATFORM_2]: ["12161"],
      },
      replacementBus: ["26292"],
    },
  },

  [stop.TALBOT]: {
    regional: {
      parent: "vic:rail:TAT",
      general: ["47482"],
    },
  },

  [stop.TALLAROOK]: {
    regional: {
      parent: "vic:rail:TOK",
      general: ["20348"],
    },
  },

  [stop.TARNEIT]: {
    regional: {
      parent: "vic:rail:TNT",
      general: ["47648"],
    },
  },

  [stop.TECOMA]: {
    suburban: {
      parent: "vic:rail:TCM",
      platforms: {
        [position.PLATFORM_1]: ["11121"],
      },
    },
  },

  [stop.TERANG]: {
    regional: {
      parent: "vic:rail:TER",
      general: ["20349"],
    },
  },

  [stop.THOMASTOWN]: {
    suburban: {
      parent: "vic:rail:TSN",
      platforms: {
        [position.PLATFORM_1]: ["15370"],
        [position.PLATFORM_2]: ["26534"],
      },
      replacementBus: ["26294"],
    },
  },

  [stop.THORNBURY]: {
    suburban: {
      parent: "vic:rail:TBY",
      platforms: {
        [position.PLATFORM_1]: ["15383"],
        [position.PLATFORM_2]: ["15384"],
      },
      replacementBus: ["26295"],
    },
  },

  [stop.TOORAK]: {
    suburban: {
      parent: "vic:rail:TOR",
      platforms: {
        [position.PLATFORM_1]: ["14263"],
        [position.PLATFORM_2]: ["14264"],
        [position.PLATFORM_3]: ["14265"],
        [position.PLATFORM_4]: ["14266"],
      },
      replacementBus: ["26296"],
    },
  },

  [stop.TOORONGA]: {
    suburban: {
      parent: "vic:rail:TGA",
      platforms: {
        [position.PLATFORM_1]: ["12267"],
        [position.PLATFORM_2]: ["12268"],
      },
      replacementBus: ["26297"],
    },
  },

  [stop.TOTTENHAM]: {
    suburban: {
      parent: "vic:rail:TOT",
      platforms: {
        [position.PLATFORM_1]: ["15512"],
        [position.PLATFORM_2]: ["15513"],
      },
      replacementBus: ["26298"],
    },
  },

  [stop.TOWN_HALL]: {
    suburban: {
      parent: "vic:rail:THL",
      platforms: {
        [position.PLATFORM_1]: ["26554"],
        [position.PLATFORM_2]: ["26555"],
      },
    },
  },

  [stop.TRAFALGAR]: {
    regional: {
      parent: "vic:rail:TAR",
      general: ["20350"],
    },
  },

  [stop.TRARALGON]: {
    regional: {
      parent: "vic:rail:TRN",
      general: ["20351"],
    },
  },

  [stop.TYABB]: {
    suburban: {
      parent: "vic:rail:TAB",
      platforms: {
        [position.PLATFORM_1]: ["4318"],
      },
    },
  },

  [stop.TYNONG]: {
    regional: {
      parent: "vic:rail:TYN",
      general: ["20352"],
    },
  },

  [stop.UNION]: {
    suburban: {
      parent: "vic:rail:UNN",
      platforms: {
        [position.PLATFORM_1]: ["26535"],
        [position.PLATFORM_2]: ["26536"],
        [position.PLATFORM_3]: ["26537"],
      },
      replacementBus: ["26321"],
    },
  },

  [stop.UPFIELD]: {
    suburban: {
      parent: "vic:rail:UFD",
      platforms: {
        [position.PLATFORM_1]: ["14299"],
      },
    },
  },

  [stop.UPPER_FERNTREE_GULLY]: {
    suburban: {
      parent: "vic:rail:UFG",
      platforms: {
        [position.PLATFORM_1]: ["11245"],
        [position.PLATFORM_2]: ["11246"],
      },
    },
  },

  [stop.UPWEY]: {
    suburban: {
      parent: "vic:rail:UPW",
      platforms: {
        [position.PLATFORM_1]: ["11122"],
        [position.PLATFORM_2]: ["11123"],
      },
    },
  },

  [stop.VICTORIA_PARK]: {
    suburban: {
      parent: "vic:rail:VPK",
      platforms: {
        [position.PLATFORM_1]: ["14332"],
        [position.PLATFORM_2]: ["14333"],
      },
      replacementBus: ["26303"],
    },
  },

  [stop.VIOLET_TOWN]: {
    regional: {
      parent: "vic:rail:VTN",
      general: ["20353"],
    },
  },

  [stop.WALLAN]: {
    regional: {
      parent: "vic:rail:WAN",
      general: ["17204"],
    },
  },

  [stop.WANDONG]: {
    regional: {
      parent: "vic:rail:WDG",
      general: ["20355"],
    },
  },

  [stop.WANGARATTA]: {
    regional: {
      parent: "vic:rail:WRT",
      general: ["20356"],
    },
  },

  [stop.WARRAGUL]: {
    regional: {
      parent: "vic:rail:WGL",
      general: ["20357"],
    },
  },

  [stop.WARRNAMBOOL]: {
    regional: {
      parent: "vic:rail:WBL",
      general: ["20358"],
    },
  },

  [stop.WATERGARDENS]: {
    suburban: {
      parent: "vic:rail:WGS",
      general: ["22244"],
      platforms: {
        [position.PLATFORM_1]: ["15355"],
        [position.PLATFORM_2]: ["15356"],
        [position.PLATFORM_3]: ["15357"],
      },
      replacementBus: ["26304"],
    },
    regional: {
      parent: "vic:rail:WGS",
      general: ["22244", "15355", "15356", "15357"],
      replacementBus: ["26304"],
    },
  },

  [stop.WATSONIA]: {
    suburban: {
      parent: "vic:rail:WAT",
      platforms: {
        [position.PLATFORM_1]: ["15327"],
        [position.PLATFORM_2]: ["15328"],
      },
      replacementBus: ["26305"],
    },
  },

  [stop.WATTLE_GLEN]: {
    suburban: {
      parent: "vic:rail:WTT",
      platforms: {
        [position.PLATFORM_1]: ["15336"],
      },
      replacementBus: ["26306"],
    },
  },

  [stop.WAURN_PONDS]: {
    regional: {
      parent: "vic:rail:WPP",
      general: ["47641"],
    },
  },

  [stop.WENDOUREE]: {
    regional: {
      parent: "vic:rail:WED",
      general: ["43469"],
    },
  },

  [stop.WERRIBEE]: {
    suburban: {
      parent: "vic:rail:WER",
      general: ["22246"],
      platforms: {
        [position.PLATFORM_1]: ["13731"],
        [position.PLATFORM_2]: ["13732"],
        [position.PLATFORM_3]: ["13733"],
      },
      replacementBus: ["26307"],
    },
  },

  [stop.WEST_FOOTSCRAY]: {
    suburban: {
      parent: "vic:rail:WFY",
      platforms: {
        [position.PLATFORM_1]: ["15514"],
        [position.PLATFORM_2]: ["15515"],
        [position.PLATFORM_3]: ["26538"],
      },
      replacementBus: ["26308"],
    },
  },

  [stop.WEST_RICHMOND]: {
    suburban: {
      parent: "vic:rail:WRM",
      platforms: {
        [position.PLATFORM_1]: ["14338"],
        [position.PLATFORM_2]: ["14339"],
      },
      replacementBus: ["26309"],
    },
  },

  [stop.WESTALL]: {
    suburban: {
      parent: "vic:rail:WTL",
      platforms: {
        [position.PLATFORM_1]: ["13716"],
        [position.PLATFORM_2]: ["13717"],
        [position.PLATFORM_3]: ["26539"],
      },
      replacementBus: ["26310"],
    },
  },

  [stop.WESTGARTH]: {
    suburban: {
      parent: "vic:rail:WTG",
      platforms: {
        [position.PLATFORM_1]: ["13744"],
        [position.PLATFORM_2]: ["13745"],
      },
      replacementBus: ["26311"],
    },
  },

  [stop.WESTONA]: {
    suburban: {
      parent: "vic:rail:WTO",
      platforms: {
        [position.PLATFORM_1]: ["13740"],
        [position.PLATFORM_2]: ["13741"],
      },
      replacementBus: ["26312"],
    },
  },

  [stop.WILLIAMS_LANDING]: {
    suburban: {
      parent: "vic:rail:WLD",
      platforms: {
        [position.PLATFORM_1]: ["26540"],
        [position.PLATFORM_2]: ["26541"],
      },
      replacementBus: ["26313"],
    },
  },

  [stop.WILLIAMSTOWN]: {
    suburban: {
      parent: "vic:rail:WIL",
      platforms: {
        [position.PLATFORM_1]: ["15338"],
      },
      replacementBus: ["26315"],
    },
  },

  [stop.WILLIAMSTOWN_BEACH]: {
    suburban: {
      parent: "vic:rail:WBH",
      platforms: {
        [position.PLATFORM_1]: ["15339"],
        [position.PLATFORM_2]: ["15340"],
      },
      replacementBus: ["26314"],
    },
  },

  [stop.WILLISON]: {
    suburban: {
      parent: "vic:rail:WSN",
      platforms: {
        [position.PLATFORM_1]: ["11203"],
        [position.PLATFORM_2]: ["11204"],
      },
      replacementBus: ["26316"],
    },
  },

  [stop.WINCHELSEA]: {
    regional: {
      parent: "vic:rail:WIA",
      general: ["20359"],
    },
  },

  [stop.WINDSOR]: {
    suburban: {
      parent: "vic:rail:WIN",
      platforms: {
        [position.PLATFORM_1]: ["14289"],
        [position.PLATFORM_2]: ["14290"],
      },
      replacementBus: ["26317"],
    },
  },

  [stop.WODONGA]: {
    regional: {
      parent: "vic:rail:WOD",
      general: ["20360"],
    },
  },

  [stop.WOODEND]: {
    regional: {
      parent: "vic:rail:WNO",
      general: ["20361"],
    },
  },

  [stop.WYNDHAM_VALE]: {
    regional: {
      parent: "vic:rail:WVL",
      general: ["47647"],
    },
  },

  [stop.YARRAGON]: {
    regional: {
      parent: "vic:rail:YON",
      general: ["20362"],
    },
  },

  [stop.YARRAMAN]: {
    suburban: {
      parent: "vic:rail:YMN",
      platforms: {
        [position.PLATFORM_1]: ["12190"],
        [position.PLATFORM_2]: ["12191"],
      },
      replacementBus: ["26318"],
    },
  },

  [stop.YARRAVILLE]: {
    suburban: {
      parent: "vic:rail:YVE",
      platforms: {
        [position.PLATFORM_1]: ["15347"],
        [position.PLATFORM_2]: ["15348"],
      },
      replacementBus: ["26319"],
    },
  },
};
